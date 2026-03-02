<?php

namespace App\Controller\Api;

use App\Entity\Visit;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class TrackingController extends AbstractController
{
    #[Route('/track', name: 'track_visit', methods: ['POST'])]
    public function trackVisit(
        Request $request,
        EntityManagerInterface $entityManager,
        LoggerInterface $logger
    ): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $source = $data['utm_source'] ?? null;
        $medium = $data['utm_medium'] ?? null;
        $campaign = $data['utm_campaign'] ?? null;

        if ($source || $medium || $campaign) {
            $visit = new Visit();
            $visit->setUtmSource($source);
            $visit->setUtmMedium($medium);
            $visit->setUtmCampaign($campaign);
            $visit->setVisitedAt(new \DateTimeImmutable());

            $entityManager->persist($visit);
            $entityManager->flush();

            $logger->info('Tracking - Nova navsteva', [
                'source' => $source,
                'medium' => $medium,
                'campaign' => $campaign,
                'ip' => $request->getClientIp()
            ]);
        }

        return $this->json(['message' => 'Zaznamenáno']);
    }

    #[Route('/analytics', name: 'analytics', methods: ['GET'])]
    public function getAnalytics(EntityManagerInterface $entityManager): JsonResponse
    {
        $stats = $entityManager->createQuery(
            'SELECT v.utmSource, COUNT(v.id) as visitCount
             FROM App\Entity\Visit v
             WHERE v.utmSource IS NOT NULL
             GROUP BY v.utmSource
             ORDER BY visitCount DESC'
        )->getResult();

        return $this->json([
            'overview' => $stats
        ]);
    }
}
