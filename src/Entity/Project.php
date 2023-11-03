<?php
/*
 * This class is part of a software application developed by Michael Ballester Granero.
 *
 * The application is distributed under the terms of the MIT License.
 * For more information, please see the LICENSE file included in the source code.
 */

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    private ?string $linkGitHub = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $linkDemo = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getLinkGitHub(): ?string
    {
        return $this->linkGitHub;
    }

    public function setLinkGitHub(string $linkGitHub): self
    {
        $this->linkGitHub = $linkGitHub;

        return $this;
    }

    public function __toString(): string
    {
        return $this->getTitle();
    }

    public function getLinkDemo(): ?string
    {
        return $this->linkDemo;
    }

    public function setLinkDemo(?string $linkDemo): self
    {
        $this->linkDemo = $linkDemo;

        return $this;
    }
}
