<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ApiResource()
 * Class Ingredient
 * @ORM\Table(name="ingrediente")
 * @ORM\Entity()
 *
 */
class Ingredient
{
    /**
     * @var int $id
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string $title
     * @ORM\Column(name="nom", type="string", length=255)
     */
    private $nom;

    /**
     * @var float $prixLeclerc
     * @ORM\Column(name="prix_leclerc", type="float", length=255)
     */
    private $prixLeclerc;

    /**
     * @var float $prixIntermarche
     * @ORM\Column(name="prix_intermarche", type="float", length=255)
     */
    private $prixIntermarche;


    /**
     * @var float $prixSuperu
     * @ORM\Column(name="prix_superu", type="float", length=255)
     */
    private $prixSuperu;


    /**
     * @var float $prixMoyen
     * @ORM\Column(name="prix_moyen", type="float", length=255)
     */
    private $prixMoyen;


    /**
     * @var int $indiceSante
     * @ORM\Column(name="indice_sante", type="string", length=255)
     */
    private $indiceSante;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getNom(): string
    {
        return $this->nom;
    }

    /**
     * @param string $nom
     */
    public function setNom(string $nom): void
    {
        $this->nom = $nom;
    }

    /**
     * @return float
     */
    public function getPrixLeclerc(): float
    {
        return $this->prixLeclerc;
    }

    /**
     * @param float $prixLeclerc
     */
    public function setPrixLeclerc(float $prixLeclerc): void
    {
        $this->prixLeclerc = $prixLeclerc;
    }

    /**
     * @return float
     */
    public function getPrixIntermarche(): float
    {
        return $this->prixIntermarche;
    }

    /**
     * @param float $prixIntermarche
     */
    public function setPrixIntermarche(float $prixIntermarche): void
    {
        $this->prixIntermarche = $prixIntermarche;
    }

    /**
     * @return float
     */
    public function getPrixSuperu(): float
    {
        return $this->prixSuperu;
    }

    /**
     * @param float $prixSuperu
     */
    public function setPrixSuperu(float $prixSuperu): void
    {
        $this->prixSuperu = $prixSuperu;
    }

    /**
     * @return float
     */
    public function getPrixMoyen(): float
    {
        return $this->prixMoyen;
    }

    /**
     * @param float $prixMoyen
     */
    public function setPrixMoyen(float $prixMoyen): void
    {
        $this->prixMoyen = $prixMoyen;
    }

    /**
     * @return int
     */
    public function getIndiceSante(): int
    {
        return $this->indiceSante;
    }

    /**
     * @param int $indiceSante
     */
    public function setIndiceSante(int $indiceSante): void
    {
        $this->indiceSante = $indiceSante; // MBI
    }
}