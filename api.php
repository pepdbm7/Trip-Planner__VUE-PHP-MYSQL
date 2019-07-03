<?php
require "connection.php";

$user = new DataBase();

$action = "retrieve";
$res=array();

if(isset($_GET["action"])) {
    $action=$_GET["action"];
}

switch ($action) {
    case "retrieve":
        $u=$user->retrieve("trips", "1");
        if($u):
            $res["trips"]=$u; //push results into array
            $res["message"]="success";
        else:
            $res["message"]="No trips yet!";
            $res["error"]=true;
        endif;
        break;
    case "create":
        echo "create!";
        break;
    case "update":

        break;
    case "delete":

        break;
    
    default:

        break;
}

//we get a json:
echo json_encode($res);

?>