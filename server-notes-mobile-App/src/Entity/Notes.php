<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use App\Repository\NotesRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: NotesRepository::class)]
#[ApiResource(
    // security:"is_granted('ROLE_USER')"
    //  security: "is_granted('ROLE_ADMIN')",
    operations:[
        new Get(
            security: "is_granted('ROLE_USER')"
        ),
        new GetCollection(
            security: "is_granted('ROLE_USER')"
        ),
        new Post(
            security: "is_granted('ROLE_USER')"
        ),
        new Patch(
            security: "is_granted('ROLE_USER')"
        ),
        new Delete(
            security: "is_granted('ROLE_USER')"
        )
    ]
)]
#[ApiResource(
    shortName:'User-notes',
    uriTemplate:'/users/{user_id}/notes',
    operations: [new GetCollection()],
     uriVariables:[
        'user_id'=>new Link(
            fromClass:User::class,
            fromProperty:'notes'
        )
    ],
    normalizationContext:[
        'groups'=>['notes:read']
    ]
)]
class Notes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['notes:read'])]
    private ?int $id = null;

    
    #[ORM\Column(length: 255)]
    #[Groups(['notes:read'])]
    private ?string $text = null;

    #[ORM\Column]
    #[Groups(['notes:read'])]
    private ?\DateTimeImmutable $createdAt;

    #[ORM\ManyToOne(inversedBy: 'notes',cascade:['persist'])]
    #[Groups(['notes:read'])]
    private ?User $user = null;

    public function __construct()
    {   
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    // public function setCreatedAt(\DateTimeImmutable $createdAt): static
    // {
    //     $this->createdAt = $createdAt;

    //     return $this;
    // }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
