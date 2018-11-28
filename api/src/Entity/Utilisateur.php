<?php
/**
 * Created by PhpStorm.
 * User: Théo
 * Date: 28/11/2018
 * Time: 09:49
 */

namespace App\Entity;

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
}