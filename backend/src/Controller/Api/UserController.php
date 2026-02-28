<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    #[Route('/me', name: 'auth_check', methods: ['GET'])]
    public function checkAuth(Security $security): JsonResponse
    {
        $user = $security->getUser();

        if (!$user) {
            return $this->json(['error' => 'Nejste přihlášeni'], 401);
        }

        return $this->json([
            'username' => $user->getUserIdentifier(),
            'score' => $user->getScore()
        ], 200);
    }

    #[Route('/register', name: 'user_register', methods: ['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Security $security
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            return $this->json(['error' => 'Chybí username nebo password'], 400);
        }

        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']]);
        if ($existingUser) {
            return $this->json(['error' => 'Uživatel s tímto jménem už existuje'], 409);
        }

        $user = new User();
        $user->setUsername($data['username']);

        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $score = $data['score'] ?? 0;
        $user->setScore($score);

        $entityManager->persist($user);
        $entityManager->flush();

        $security->login($user);

        return $this->json([
            'message' => 'Uživatel registrován a přihlášen!',
            'username' => $user->getUserIdentifier(),
            'score' => $user->getScore()
        ], 200);
    }

    #[Route('/login', name: 'user_login', methods: ['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Security $security
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            return $this->json(['error' => 'Chybí username nebo password'], 400);
        }

        $user = $entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return $this->json(['error' => 'Nesprávné jméno nebo heslo'], 401);
        }

        $security->login($user);

        return $this->json([
            'message' => 'Úspěšně přihlášeno!',
            'username' => $user->getUserIdentifier(),
            'score' => $user->getScore()
        ], 200);
    }

    #[Route('/logout', name: 'user_logout', methods: ['POST'])]
    public function logout(Security $security): JsonResponse
    {
        $security->logout(false);

        return $this->json([
            'message' => 'Odhlášení proběhlo úspěšně.'
        ]);
    }

    #[Route('/guest', name: 'user_guest', methods: ['POST'])]
    public function guestLogin(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        Security $security
    ): JsonResponse
    {
        $guest = new User();
        $guestName = 'Guest_' . substr(uniqid(), -5);
        $guest->setUsername($guestName);

        $randomPassword = bin2hex(random_bytes(16));
        $guest->setPassword($passwordHasher->hashPassword($guest, $randomPassword));

        $guest->setScore(0);

        $entityManager->persist($guest);
        $entityManager->flush();

        $security->login($guest);

        return $this->json([
            'message' => 'Přihlášen jako host!',
            'isGuest' => true,
            'username' => $guest->getUserIdentifier(),
            'score' => $guest->getScore()
        ], 200);
    }

    #[Route('/leaderboard', name: 'leaderboard', methods: ['GET'])]
        public function leaderboard(
            EntityManagerInterface $entityManager,
            Security $security
        ): JsonResponse
        {
            $users = $entityManager->getRepository(User::class)->findBy([], ['score' => 'DESC']);

            $leaderboard = [];
            $myPosition = null;

            $currentUser = $security->getUser();
            $currentUsername = $currentUser ? $currentUser->getUserIdentifier() : null;

            $position = 1;
            foreach ($users as $user) {
                $leaderboard[] = [
                    'username' => $user->getUsername(),
                    'balance' => $user->getScore(),
                ];

                if ($currentUsername && $user->getUsername() === $currentUsername) {
                    $myPosition = $position;
                }

                $position++;
            }

            return $this->json([
                'leaderboard' => $leaderboard,
                'myPosition' => $myPosition
            ], 200);
        }
}


