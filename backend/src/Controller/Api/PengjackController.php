<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/pengjack', name: 'api_pengjack_')]
class PengjackController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security
    ) {}

    private function drawCard(): int
    {
        $deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
        return $deck[array_rand($deck)];
    }

    private function calculateScore(array $cards): int
    {
        $score = 0;
        $aces = 0;

        foreach ($cards as $card) {
            $score += $card;
            if ($card === 11) {
                $aces++;
            }
        }

        while ($score > 21 && $aces > 0) {
            $score -= 10;
            $aces--;
        }

        return $score;
    }

    #[Route('/start', name: 'start', methods: ['POST'])]
    public function start(RequestStack $requestStack, CacheItemPoolInterface $cache): JsonResponse
    {
        $user = $this->security->getUser();

        if (!$user instanceof User) {
            return $this->json(['error' => 'Invalid request'], 400);
        }

        $cacheKey = 'pengjack_cooldown_' . md5($user->getUserIdentifier());
        $cacheItem = $cache->getItem($cacheKey);

        if ($cacheItem->isHit()) {
            return $this->json(['error' => 'Please wait before your next move.'], 429);
        }

        $cacheItem->set(true);
        $cacheItem->expiresAt(new \DateTimeImmutable('+900 milliseconds'));
        $cache->save($cacheItem);

        $session = $requestStack->getSession();

        if ($session->has('pengjack_game')) {
            return $this->json(['error' => 'Game in progress'], 400);
        }

        $playerCards = [$this->drawCard(), $this->drawCard()];
        $dealerCards = [$this->drawCard(), $this->drawCard()];

        $playerScore = $this->calculateScore($playerCards);

        if ($playerScore === 21) {
            $winAmount = 5000;
            $user->setScore($user->getScore() + $winAmount);
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json([
                'status' => 'blackjack',
                'playerCards' => $playerCards,
                'dealerCards' => $dealerCards,
                'winAmount' => $winAmount,
                'newBalance' => $user->getScore()
            ]);
        }

        $gameState = [
            'playerCards' => $playerCards,
            'dealerCards' => $dealerCards
        ];

        $session->set('pengjack_game', $gameState);

        return $this->json([
            'status' => 'playing',
            'playerCards' => $playerCards,
            'dealerCards' => [$dealerCards[0], '?'],
            'winAmount' => 0,
            'newBalance' => $user->getScore()
        ]);
    }

    #[Route('/hit', name: 'hit', methods: ['POST'])]
    public function hit(RequestStack $requestStack, CacheItemPoolInterface $cache): JsonResponse
    {
        $user = $this->security->getUser();
        if (!$user instanceof User) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $cacheKey = 'pengjack_cooldown_' . md5($user->getUserIdentifier());
        $cacheItem = $cache->getItem($cacheKey);

        if ($cacheItem->isHit()) {
            return $this->json(['error' => 'Please wait before your next move.'], 429);
        }

        $cacheItem->set(true);
        $cacheItem->expiresAt(new \DateTimeImmutable('+900 milliseconds'));
        $cache->save($cacheItem);

        $session = $requestStack->getSession();

        if (!$session->has('pengjack_game')) {
            return $this->json(['error' => 'No active game'], 400);
        }

        $gameState = $session->get('pengjack_game');
        $gameState['playerCards'][] = $this->drawCard();
        $playerScore = $this->calculateScore($gameState['playerCards']);

        if ($playerScore > 21) {
            $winAmount = 1;
            $user->setScore($user->getScore() + $winAmount);
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            $session->remove('pengjack_game');

            return $this->json([
                'status' => 'bust',
                'playerCards' => $gameState['playerCards'],
                'dealerCards' => $gameState['dealerCards'],
                'winAmount' => $winAmount,
                'newBalance' => $user->getScore()
            ]);
        }

        $session->set('pengjack_game', $gameState);

        return $this->json([
            'status' => 'playing',
            'playerCards' => $gameState['playerCards'],
            'dealerCards' => [$gameState['dealerCards'][0], '?'],
            'winAmount' => 0,
            'newBalance' => $user->getScore()
        ]);
    }

    #[Route('/stand', name: 'stand', methods: ['POST'])]
    public function stand(RequestStack $requestStack, CacheItemPoolInterface $cache): JsonResponse
    {
        $user = $this->security->getUser();
        if (!$user instanceof User) {
            return $this->json(['error' => 'Unauthorized'], 401);
        }

        $cacheKey = 'pengjack_cooldown_' . md5($user->getUserIdentifier());
        $cacheItem = $cache->getItem($cacheKey);

        if ($cacheItem->isHit()) {
            return $this->json(['error' => 'Please wait 0.9s before your next move.'], 429);
        }

        $cacheItem->set(true);
        $cacheItem->expiresAt(new \DateTimeImmutable('+900 milliseconds'));
        $cache->save($cacheItem);

        $session = $requestStack->getSession();

        if (!$session->has('pengjack_game')) {
            return $this->json(['error' => 'No active game'], 400);
        }

        $gameState = $session->get('pengjack_game');
        $dealerCards = $gameState['dealerCards'];

        $playerScore = $this->calculateScore($gameState['playerCards']);
        $dealerScore = $this->calculateScore($dealerCards);

        while ($dealerScore < 17) {
            $dealerCards[] = $this->drawCard();
            $dealerScore = $this->calculateScore($dealerCards);
        }

        $winAmount = 0;
        $status = 'push';

        if ($dealerScore > 21 || $playerScore > $dealerScore) {
            $status = 'won';
            $winAmount = 5000;
        } elseif ($playerScore < $dealerScore) {
            $status = 'lost';
            $winAmount = 1;
        }

        if ($winAmount > 0) {
            $user->setScore($user->getScore() + $winAmount);
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }

        $session->remove('pengjack_game');

        return $this->json([
            'status' => $status,
            'playerCards' => $gameState['playerCards'],
            'dealerCards' => $dealerCards,
            'winAmount' => $winAmount,
            'newBalance' => $user->getScore()
        ]);
    }

    #[Route('/state', name: 'state', methods: ['GET'])]
        public function state(RequestStack $requestStack): JsonResponse
        {
            $user = $this->security->getUser();
            if (!$user instanceof User) {
                return $this->json(['error' => 'Unauthorized'], 401);
            }

            $session = $requestStack->getSession();

            if (!$session->has('pengjack_game')) {
                return $this->json([
                    'status' => 'none',
                    'message' => 'Žádná aktivní hra'
                ], 200);
            }

            $gameState = $session->get('pengjack_game');

            return $this->json([
                'status' => 'playing',
                'playerCards' => $gameState['playerCards'],
                'dealerCards' => [$gameState['dealerCards'][0], '?'],
                'winAmount' => 0,
                'newBalance' => $user->getScore()
            ], 200);
        }


}
