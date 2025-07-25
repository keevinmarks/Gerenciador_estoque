<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

require_once "conexao.php";

if($connection->connect_error){
    echo json_encode(["success" => false, "message" => "Não foi possivel realizar conexão"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];


if($method === "GET"){
    $comand = $connection->prepare("SELECT * FROM products");
    $products = [];
    if($comand-> execute()){
        $result = $comand->get_result();
        while($row = $result->fetch_assoc()){
            $products[] = $row;
        }
        echo json_encode($products);
    }
}else if($method === "POST"){
    $data = json_decode(file_get_contents("php://input"),true);

    $name = $data["name"] ?? "";
    $category = $data["category"] ?? "";
    $amount = $data["amount"] ?? "";
    $unit_means = $data["unit_means"] ?? "";
    $id = $data["id"] ?? "";

    if($id === ""){
        $comand = $connection->prepare("INSERT INTO products (name, category, amount, unit_means) VALUES (?, ?, ?, ?)");
        $comand->bind_param("ssis", $name, $category, $amount, $unit_means);

        if($comand->execute()){
            echo json_encode(["success" => true, "message"=> "Cadastrado com sucesso"]);
        }else{
            echo json_encode(["success"=> false, "message"=> "Erro no comando mysql"]);
        }
    }else if(is_int($id)){
        $comand = $connection->prepare("UPDATE products SET name = ?, category = ?, amount = ?, unit_means = ? WHERE id = ?");
        $comand->bind_param("ssssi", $name, $category, $amount, $unit_means, $id);

        if($comand->execute()){
            echo json_encode(["success" => true, "message" => "Produto editado"]);
        }else{
            echo json_encode(["success" => false, "message" => "Erro no comando Mysql"]);
        }
    }
    
}else if($method === "DELETE"){
    $data = json_decode(file_get_contents("php://input"),true);

    $id = $data["id"];

    $comand = $connection->prepare("DELETE FROM products WHERE id = ?");
    $comand->bind_param("i", $id);

    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Produto excluido"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando mysql"]);
    }
}

?>