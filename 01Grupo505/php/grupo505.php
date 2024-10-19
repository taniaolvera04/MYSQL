<?php
require_once "config.php";
header('Content-Type: application/json; charset=utf-8');

if($_POST){
    $action=$_REQUEST['action'];
    switch($action){
        case "apiGrupo":
                    $valido ['success'] = array('gr'=>false,);
                    $valido ['success'] = true;
                    $res = $cx->query("SELECT * FROM datos");
                    $rows = array();

                    while($row=$res->fetch_assoc()){
                        $rows[]= $row;
                    }

                    $valido["datos"]=$rows;

                    
                    $equipos= $cx->query("SELECT DISTINCT equipo FROM datos ");
                        while($row2=$equipos->fetch_assoc()){
                        $rows2[]= $row2;

                    }
                     $valido["equipos"]=$rows2;
                    

                    $edades= $cx->query("SELECT DISTINCT edad FROM datos");
                    while($row3=$edades->fetch_assoc()){
                        $rows3[]= $row3;

                    }
                     $valido["edades"]=$rows3;


                     $mayoredad= $cx->query("SELECT edad FROM datos WHERE edad=(SELECT MAX(edad) FROM datos)");
                     $row4=$mayoredad->fetch_assoc();

                      $valido["mayoredad"]=$row4['edad'];


                      $menoredad= $cx->query("SELECT edad FROM datos WHERE edad=(SELECT MIN(edad) FROM datos)");
                      $row5=$menoredad->fetch_assoc();
                       $valido["menoredad"]=$row5['edad'];


                       $promedio= $cx->query("SELECT AVG(edad) AS promedio FROM datos ");
                       $row6= $promedio->fetch_assoc();
                        $valido["promedio"]=$row6['promedio'];



                        $suma= $cx->query("SELECT SUM(edad) AS suma FROM datos");
                        $row7=$suma->fetch_assoc();
                        $valido["suma"]=$row7['suma'];



                        $comidafavorita= $cx->query("SELECT comida FROM datos GROUP BY comida ORDER BY COUNT(*) DESC LIMIT 1;");
                       while($row8=$comidafavorita->fetch_assoc()){
                           $rows8[]= $row8;
   
                       }
                        $valido["comidaFavorita"]=$rows8;



                        $cmunicipio= $cx->query("SELECT municipio, COUNT(*) AS 'cuantos'  FROM datos GROUP BY municipio ");
                        while($row9=$cmunicipio->fetch_assoc()){
                            $rows9[]= $row9;
    
                        }
                         $valido["cuantosMunicipio"]=$rows9;


                         
                        $cequipo= $cx->query("SELECT equipo, COUNT(*) AS cantidad FROM datos GROUP BY equipo");
                        while($row10=$cequipo->fetch_assoc()){
                            $rows10[]= $row10;
    
                        }
                         $valido["cuantosEquipo"]=$rows10;


                        

                         $csigno= $cx->query("SELECT signo, COUNT(*) AS cuantos FROM datos GROUP BY signo");
                         while($row11=$csigno->fetch_assoc()){
                             $rows11[]= $row11;
     
                         }
                          $valido["cuantosSigno"]=$rows11;


                    echo json_encode($valido);
                    break;           
    }
    
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR NO SE RECIBIÓ NADA";
}
?>