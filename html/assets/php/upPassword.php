<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

//Requerendo o arquivo de conexão:
require_once "connection.php";

//Verificando se a conexão com o banco foi estabelecida:
if($connection->connect_error){
    echo json_encode(["success" => false, "message" => "Não foi possível se conectar com o banco"]);
    exit();
}

//Pegando os dados necessários:
$data = json_decode(file_get_contents("php://input"),true);
$id = $data["id"] ?? "";
$password = $data["password"] ?? "";

//Verificando se id ou senha estão vazios:
if(empty($id) || empty($password)){
    echo json_encode(["success" => false, "message" => "Algum campo está vazio"]);
    exit();
}

//Criando comando para alterar senha e resetar o condicional de alterar a senha no login:
$comand = $connection->prepare("UPDATE users SET password = ?, reset = ? WHERE id = ?");
$comand->bind_param("sii", $password, $reset, $id);

//Executando o comando:
if($comand->execute()){
    echo json_encode(["success" => true, "message"=>"Senha alterada com sucesso"]);
}else{
    echo json_encode(["success" => false, "message" => "Possivel erro no comando mySQl"]);
}
?>