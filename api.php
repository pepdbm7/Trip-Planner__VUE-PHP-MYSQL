<?php
require "connection.php";

$db_logic = new DataBase();

$action = "retrieve";
$res=array();

if(isset($_GET["action"])) {
    $action=$_GET["action"];
}

switch ($action) {
    case "retrieve":
    //calling the method of db_logic that shows data from db:
        $u=$db_logic->retrieve("trips", "1");
        if($u):
            $res["trips"]=$u; //push results into array
            $res["message"]="success";
        else:
            $res["message"]="No trips yet!";
            $res["error"]=true;
        endif;
        break;

    case "create":
        $Where = $_POST["where"];
        $When = $_POST["when"];
        $Who = $_POST["who"];
        $Budget = $_POST["budget"];
        
        // concatenating all formdata:
        $data= "'".$Where."','".$When."','".$Who."','".$Budget."'";
        //calling the method of db_logic that inserts data to db:
        $u=$db_logic->create("trips", $data);

        if($u):
            $res["message"]="Successful insertion!";
        else:
            $res["message"]="Failed inserting!";
            $res["error"]=true;
        endif;

        break;

    case "update":
        $ID = $_POST["ID"];
        $Where = $_POST["where"];
        $When = $_POST["when"];
        $Who = $_POST["who"];
        $Budget = $_POST["budget"];
        
        // concatenating all formdata:
        $data= "Where='".$Where."',When='".$When."',Who='".$Who."',Budget='".$Budget."'";
        //calling the method of db_logic that inserts data to db:
        $u=$db_logic->update("trips", $data, "ID=".$ID);

        if($u):
            $res["message"]="Successful update!";
        else:
            $res["message"]="Failed updating!";
            $res["error"]=true;
        endif;

        break;

    case "delete":

        break;
    
    default:

        break;
}

//we get a json:
echo json_encode($res);


?>