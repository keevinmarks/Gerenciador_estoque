<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

require_once "conexao.php";

if($connection->connect_error){
    echo json_encode(["success" => false, "message" => "A conexão falhou"]);
    exit();
}
$method = $_SERVER["REQUEST_METHOD"];

if($method === "POST"){
    $data = json_decode(file_get_contents("php://input"),true);

    $id = $data["id"] ?? "";
    $name = $data["name"] ?? "";
    $password = $data["password"] ?? "";
    $level = $data["level"] ?? "";
    $reset = $data["reset"] ?? "";

    if($id === ""){
        $comand = $connection->prepare("INSERT INTO users (name, password, level, reset) VALUES (?, ?, ?, ?)");
        $comand->bind_param("ssii",$name, $password, $level, $reset);

        if($comand->execute()){
            echo json_encode(["success" => true, "message" => "Usuário cadastrado com sucesso"]);
        }else{
            echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
        }
    }else if(is_int($id)){
        $comand = $connection->prepare("UPDATE users SET name = ?, password = ?, level = ?, reset = ? WHERE id = ?");
        $comand->bind_param("ssiii", $name, $password, $level, $reset, $id);

        if($comand->execute()){
            echo json_encode(["success" => true, "message" => "Usuário atualizado"]);
        }else{
            echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
        }
    }
}else if($method === "GET"){
    $comand = $connection->prepare("SELECT * FROM users");
    $users = [];
    if($comand-> execute()){
        $result = $comand->get_result();
        while($row = $result->fetch_assoc()){
            $users[] = $row;
        }
        echo json_encode($users);
    }else{
        echo json_encode(["success" => false, "message"=> "Erro no comando MYSQL"]);
    }
}else if($method === "DELETE"){
    $data = json_decode(file_get_contents("php://input"),true);

    $id = $data["id"] ?? "";
    if(empty($id) || $id === 1){
        echo json_encode(["success" => false, "message" => "Id vazio ou usuário Administrador"]);
        exit();
    }

    $comand = $connection->prepare("DELETE FROM users WhERE id = ?");
    $comand->bind_param("i", $id);

    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Usuário deletado com sucesso"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
    }
}else if($method === "PUT"){
    $data = json_encode(file_get_contents("php://input"),true);

    $id = $data["id"] ?? "";
    $name = $data["name"] ?? "";
    $password = $data["password"] ?? "";
    $level = $data["level"] ?? "";
    $reset = $data["reset"] ?? "";

    if(empty($id) || empty($name) || empty($password) || empty($level) || empty($reset)){
        echo json_encode(["success" => false, "message" => "Alguns campos estão vazios"]);
        exit();
    }

    $comand = $connection->prepare("UPDATE users SET name = ?, password = ?, level = ?, reset = ? WHERE id = ?");
    $comand->bind_param("ssiii", $name, $password, $level, $reset, $id);

    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Usuário atualizado"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando Mysql"]);
    }
}
?>