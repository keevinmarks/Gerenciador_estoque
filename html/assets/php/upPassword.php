<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"),true);

if($connection->connect_error){
    echo json_encode(["success" => false, "message" => "Não foi possível se conectar com o banco"]);
    exit();
}

$id = $data["id"] ?? "";
$password = $data["password"] ?? "";

if(empty($id) || empty($password)){
    echo json_encode(["success" => false, "message" => "Algum campo está vazio"]);
    exit();
}

$comand = $connection->prepare("UPDATE users SET password = ? WHERE id = ?");
$comand2 = $connection->prepare("UPDATE users SET reset = ? WHERE   id = ?");
$comand->bind_param("si", $password, $id);
$reset = 0;
$comand2->bind_param("ii", $reset, $id);

if($comand->execute() && $comand2->execute()){
    echo json_encode(["success" => true, "message"=>"Senha alterada com sucesso"]);
}else{
    echo json_encode(["success" => false, "message" => "Possivel erro no comando mySQl"]);
}

?>