<?php
/**
 * Created by PhpStorm.
 * User: Mehdi
 * Date: 28/11/2018
 * Time: 11:03
 */

namespace App\Entity;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource()
 * Class MotsCles
 * @ORM\Table(name="mots_cles")
 * @ORM\Entity()
 *
 */
class MotsCles
{

    /**
     * @var int The entity Id
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @var float $motCle
     * @ORM\Column(name="mot_cle", type="string", length=255)
     */
    private $motCle;


    /**
     * @var \DateTime $date
     * @ORM\Column(type="datetime")
     */
    private $date;


    /** @Id @ManyToOne(targetEntity="Utilisateur", inversedBy="motscles") */
    private $utilisateur;



    public function __construct(float $motCle)
    {
        $this->motCle = $motCle;
        $this->date = new \DateTime();
    }

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
     * @return float
     */
    public function getMotCle(): float
    {
        return $this->motCle;
    }

    /**
     * @param float $motCle
     */
    public function setMotCle(float $motCle): void
    {
        $this->motCle = $motCle;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     */
    public function setDate(\DateTime $date): void
    {
        $this->date = $date;
    }

    /**
     * @return mixed
     */
    public function getUtilisateur()
    {
        return $this->utilisateur;
    }

    /**
     * @param mixed $utilisateur
     */
    public function setUtilisateur($utilisateur): void
    {
        $this->utilisateur = $utilisateur;
    }



}