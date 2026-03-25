<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Cache\CacheItemPoolInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/turtlette', name: 'api_turtlette_')]
class RouletteController extends AbstractController
{
    private const MAX_ROULETTE_NUMBER = 36;
    private const WIN_MULTIPLIER = 35;

    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security
    ) {}


    #[Route('/spin', name: 'spin', methods: ['POST'])]
        public function spin(
            Request $request,
            EntityManagerInterface $entityManager,
            CacheItemPoolInterface $cache
        ): JsonResponse
        {
            $user = $this->security->getUser();
            if (!$user instanceof User) {
                return $this->json(['error' => 'Unauthorized'], 401);
            }

            $cacheKey = 'turtlette_cooldown_' . md5($user->getUserIdentifier());
            $cacheItem = $cache->getItem($cacheKey);

            if ($cacheItem->isHit()) {
                return $this->json(['error' => 'Please wait 3.5s before spinning again.'], 429);
            }

            $cacheItem->set(true);
            $cacheItem->expiresAt(new \DateTimeImmutable('+3500 milliseconds'));
            $cache->save($cacheItem);

            $data = json_decode($request->getContent(), true);

            $bet = $data['bet'] ?? null;

            if ($bet === null) {
                return $this->json(['error' => 'Neplatná sázka'], 400);
            }

            $winningNumber = random_int(0, 36);

            $redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

            $isWin = false;
            $winAmount = 1;

            if (is_numeric($bet)) {
                if ((int)$bet === $winningNumber) {
                    $isWin = true;
                    $winAmount = 100000;
                }
            }
            elseif ($bet === 'red' && in_array($winningNumber, $redNumbers)) {
                $isWin = true;
                $winAmount = 5000;
            }
            elseif ($bet === 'black' && $winningNumber !== 0 && !in_array($winningNumber, $redNumbers)) {
                $isWin = true;
                $winAmount = 5000;
            }
            elseif ($bet === 'even' && $winningNumber !== 0 && $winningNumber % 2 === 0) {
                $isWin = true;
                $winAmount = 5000;
            }
            elseif ($bet === 'odd' && $winningNumber % 2 !== 0) {
                $isWin = true;
                $winAmount = 5000;
            }

            $user->setScore($user->getScore() + $winAmount);
            $entityManager->persist($user);
            $entityManager->flush();


            return $this->json([
                'winningNumber' => $winningNumber,
                'isWin' => $isWin,
                'winAmount' => $winAmount,
                'newBalance' => $user->getScore()
            ]);
        }


    private function processSpin(User $user, int $betNumber): JsonResponse
    {
        $winningNumber = random_int(0, self::MAX_ROULETTE_NUMBER);
        $winAmount = 1;

        if($betNumber == $winningNumber){
            $winAmount = 100000;
        }
        $this->updateUserScore($user, $winAmount);


        return $this->json([
            'winningNumber' => $winningNumber,
            'winAmount' => $winAmount,
            'newBalance' => $user->getScore()
        ]);
    }

    private function isValidRequest(?array $data, User $user): bool
    {
        $hasRequiredFields = isset($data['betNumber']);

        if (!$hasRequiredFields) {
            return false;
        }

        return true;
    }


    private function updateUserScore(User $user, int $winAmount): void
    {
        $newScore = $user->getScore() + $winAmount;
        $user->setScore($newScore);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
