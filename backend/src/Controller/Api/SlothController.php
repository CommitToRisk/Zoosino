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

#[Route('/api/sloth', name: 'api_sloth_')]
class SlothController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security
    ) {}

    #[Route('/spin', name: 'spin', methods: ['POST'])]
    public function spin(Request $request, CacheItemPoolInterface $cache): JsonResponse
    {
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$user instanceof User) {
            return $this->json(['error' => 'Invalid request'], 400);
        }

        if ($user->getScore() < $betAmount) {
            return $this->json(['error' => 'Insufficient funds'], 400);
        }

        $cacheKey = 'sloth_cooldown_' . md5($user->getUserIdentifier());
        $cacheItem = $cache->getItem($cacheKey);

        if ($cacheItem->isHit()) {
            return $this->json(['error' => 'Please wait 2 seconds before spinning again.'], 429);
        }

        $cacheItem->set(true);
        $cacheItem->expiresAfter(2);
        $cache->save($cacheItem);


        return $this->processSpin($user, $betAmount);
    }

    private function processSpin(User $user, int $betAmount): JsonResponse
    {
        $fruit1 = random_int(0,6);
        $fruit2 = random_int(0,6);
        $fruit3 = random_int(0,6);

        $fruits = [$fruit1, $fruit2, $fruit3];
        $winAmount = 0;


        if ($fruit1 === $fruit2 && $fruit2 === $fruit3) {
            $winAmount = 100000;

        }

        if ($winAmount > 0) {
            $user->setScore($user->getScore() + $winAmount);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json([
            'fruits' => $fruits,
            'winAmount' => $winAmount,
            'newBalance' => $user->getScore()
        ]);
    }
}
