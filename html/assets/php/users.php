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
    echo json_encode(["success" => false, "message" => "A conexão falhou"]);
    exit();
}

//Pegando o método da requisição:
$method = $_SERVER["REQUEST_METHOD"];

//Condicional para o método POST:
if($method === "POST"){
    
    //Pegando os dados necessários:
    $data = json_decode(file_get_contents("php://input"),true);

    $name = $data["name"] ?? "";
    $password = $data["password"] ?? "";
    $level = $data["level"] ?? "";
    $reset = $data["reset"] ?? "";

    //Criando comando para inserir um novo usuário:
    $comand = $connection->prepare("INSERT INTO users (name, password, level, reset) VALUES (?, ?, ?, ?)");
    $comand->bind_param("ssii",$name, $password, $level, $reset);

    //Executando o comando:
    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Usuário cadastrado com sucesso"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
    }

//Condicional para o método GET:
}else if($method === "GET"){

    //Criando o comando para pegar todos os usuários:
    $comand = $connection->prepare("SELECT * FROM users");
    $users = [];

    //Executando o comando:
    if($comand-> execute()){
        $result = $comand->get_result();
        while($row = $result->fetch_assoc()){
            $users[] = $row;
        }
        echo json_encode($users);
    }else{
        echo json_encode(["success" => false, "message"=> "Erro no comando MYSQL"]);
    }
//Condicional para o método DELETE:
}else if($method === "DELETE"){

    //Pegando os dados necessários:
    $data = json_decode(file_get_contents("php://input"),true);
    $id = $data["id"] ?? "";

    //Verificando se o id está vazio ou se ele é o administrador o qual não pode ser apagado:
    if(empty($id) || $id === 1){
        echo json_encode(["success" => false, "message" => "Id vazio ou usuário Administrador"]);
        exit();
    }

    //Criando o comando para deletar o usuário:
    $comand = $connection->prepare("DELETE FROM users WhERE id = ?");
    $comand->bind_param("i", $id);

    //Executando o comando:
    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Usuário deletado com sucesso"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
    }

//Condicional para o método PUT:
}else if($method === "PUT"){
    $data = json_decode(file_get_contents("php://input"),true);

    $id = $data["id"] ?? "";
    $name = $data["name"] ?? "";
    $password = $data["password"] ?? "";
    $level = $data["level"] ?? "";
    $reset = $data["reset"] ?? "";


    //Criando comando para atualizar o usuário:
    $comand = $connection->prepare("UPDATE users SET name = ?, password = ?, level = ?, reset = ? WHERE id = ?");
    $comand->bind_param("ssiii", $name, $password, $level, $reset, $id);

    //Executando o comando:
    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Usuário atualizado pelo put"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando Mysql"]);
    }
}
?>