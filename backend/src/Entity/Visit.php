<?php

namespace App\Entity;

use App\Repository\VisitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisitRepository::class)]
class Visit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $utmSource = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $utmMedium = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $utmCampaign = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $visited = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtmSource(): ?string
    {
        return $this->utmSource;
    }

    public function setUtmSource(?string $utmSource): static
    {
        $this->utmSource = $utmSource;

        return $this;
    }

    public function getUtmMedium(): ?string
    {
        return $this->utmMedium;
    }

    public function setUtmMedium(?string $utmMedium): static
    {
        $this->utmMedium = $utmMedium;

        return $this;
    }

    public function getUtmCampaign(): ?string
    {
        return $this->utmCampaign;
    }

    public function setUtmCampaign(?string $utmCampaign): static
    {
        $this->utmCampaign = $utmCampaign;

        return $this;
    }

    public function getVisited(): ?\DateTimeImmutable
    {
        return $this->visited;
    }

    public function setVisited(\DateTimeImmutable $visited): static
    {
        $this->visited = $visited;

        return $this;
    }
}
