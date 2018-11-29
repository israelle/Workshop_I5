<?php
/**
 * Created by PhpStorm.
 * User: Mehdi
 * Date: 29/11/2018
 * Time: 13:42
 */


namespace App\Controller;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;

class ApiController
{

    public function test(Request $request){
        // recup des ingredients en get
        $params = $request->query->get('ingredients');


        $tab = explode(",", $params);
        // il faut spécifier le chemin complet sinon ça ne fonctionne pas.
        $pathExe = 'C:\Users\Mehdi\AppData\Local\Programs\Python\Python37\python.exe';
        $pathFile = 'C:\Users\Mehdi\Documents\GitHub\Workshop_I5\api\src\Python\ia_recette.py';
        $command = $pathExe.' '.$pathFile;

        foreach($tab as $t){
            $command .= ' "'.$t.'"'; // on ajoute des quotes aux variables car python découpe les variables à chaques espaces
        }

        $process = new Process($command);
        $process->run();

        // executes after the command finishes
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }
        $return = $process->getOutput();

        // ok c'est degueu le code en dessous mais on n'as pas le temps !

        // on retire les charactères générés en python
        if (preg_match('/{(.*?)}/', $return, $match) == 1) {
            $return = "{".$match[1]."}";
        }

        $return = json_decode(str_replace("'", "\"", $return)); // on ne peut pas json decode avec des simples quotes ..
        //$return = substr($return, 70);
        var_dump($return);
        die( );
    }

}