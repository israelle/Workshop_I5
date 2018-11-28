<?php
/**
 * Created by PhpStorm.
 * User: Théo
 * Date: 28/11/2018
 * Time: 09:49
 */

namespace App\Entity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ApiResource()
 * Class Utilisateur
 * @ORM\Table(name="utilisateur")
 * @ORM\Entity()
 *
 */
class Utilisateur
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id ;

    /**
     * @var string
     * @ORM\Column(name="nom_utilisateur", type="string", length=255)
     */
    private $nom_utilisateur;

    /**
     * @var string
     * @ORM\Column(name="email", type="string", length=50)
     */
    private  $email;

    /**
     * @var string
     * @ORM\Column(name="mot_de_passe", type="string", length=50)
     */
    private $mot_de_passe;

    /**
     * @var string
     * @ORM\Column(name="adresse", type="string", length=255)
     */
    private $adresse;

    /**
     * @var string
     * @ORM\Column(name="photo_profil", type="string", length=255)
     */
    private $photo_profil;

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
    public function getNomUtilisateur(): string
    {
        return $this->nom_utilisateur;
    }

    /**
     * @param string $nom_utilisateur
     */
    public function setNomUtilisateur(string $nom_utilisateur): void
    {
        $this->nom_utilisateur = $nom_utilisateur;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getMotDePasse(): string
    {
        return $this->mot_de_passe;
    }

    /**
     * @param string $mot_de_passe
     */
    public function setMotDePasse(string $mot_de_passe): void
    {
        $this->mot_de_passe = $mot_de_passe;
    }

    /**
     * @return string
     */
    public function getAdresse(): string
    {
        return $this->adresse;
    }

    /**
     * @param string $adresse
     */
    public function setAdresse(string $adresse): void
    {
        $this->adresse = $adresse;
    }

    /**
     * @return string
     */
    public function getPhotoProfil(): string
    {
        return $this->photo_profil;
    }

    /**
     * @param string $photo_profil
     */
    public function setPhotoProfil(string $photo_profil): void
    {
        $this->photo_profil = $photo_profil;
    }

    /**
     * @OneToMany(targetEntity="MotsCles", mappedBy="utilisateur", cascade={"ALL"}, indexBy="mots_cles")
     */
    private $motscles;

    public function ajoutMotsCles($valeur)
    {
        $this->motscles[$valeur] = new MotsCles($valeur);
    }
}