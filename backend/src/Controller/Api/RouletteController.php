<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
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

    /**
     * Entry point for the roulette spin logic.
     */
    #[Route('/spin', name: 'spin', methods: ['POST'])]
    public function spin(Request $request): JsonResponse
    {
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$user instanceof User || !$this->isValidRequest($data, $user)) {
            return $this->json(['error' => 'Invalid request or insufficient funds'], 400);
        }

        return $this->processSpin($user, (int)$data['betNumber']);
    }

    /**
     * Orchestrates the spin result and user update.
     */
    private function processSpin(User $user, int $betNumber): JsonResponse
    {
        $winningNumber = random_int(0, self::MAX_ROULETTE_NUMBER);
        $winAmount = 1;

        if($betNumber == $winningNumber){
            $winAmount = 10000;
        }
        $this->updateUserScore($user, $winAmount);


        return $this->json([
            'winningNumber' => $winningNumber,
            'winAmount' => $winAmount,
            'newBalance' => $user->getScore()
        ]);
    }

    /**
     * Checks if the input data is present and the user can afford the bet.
     */
    private function isValidRequest(?array $data, User $user): bool
    {
        $hasRequiredFields = isset($data['betNumber']);
        
        if (!$hasRequiredFields) {
            return false;
        }

        return true;
    }


    /**
     * Adjusts the User entity score and flushes changes to the database.
     */
    private function updateUserScore(User $user, int $winAmount): void
    {
        $newScore = $user->getScore() + $winAmount;
        $user->setScore($newScore);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}