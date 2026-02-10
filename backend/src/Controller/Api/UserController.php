<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/v1', name: 'api')]
class UserController extends AbstractController
{
    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            return $this->json(['error' => 'Chybí username nebo password'], 400);
        }

        $user = new User();
        $user->setUsername($data['username']);

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $data['password']
        );
        $user->setPassword($hashedPassword);

        $score = $data['score'] ?? 0;
        $user->setScore($score);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'Uživatel registrován!',
            'username' => $user->getUserIdentifier()
        ], 201);
    }

    #[Route('/users', name: 'users_list', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'username' => $user->getUsername(),
                'score' => $user->getScore(),
            ];
        }

        return $this->json($data);
    }
}
