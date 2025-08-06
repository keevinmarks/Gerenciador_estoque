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
    echo json_encode(["success" => false, "message" => "Não foi possivel realizar conexão"]);
    exit();
}

//Pegando o método da requisição:
$method = $_SERVER['REQUEST_METHOD'];

//Condicional para o método GET:
if($method === "GET"){

    //Criando comando para pegar todos os produtos da tebela:
    $comand = $connection->prepare("SELECT * FROM products");
    $products = [];

    //Executando o comando:
    if($comand-> execute()){
        $result = $comand->get_result();
        while($row = $result->fetch_assoc()){
            $products[] = $row;
        }
        echo json_encode($products);
    }

//Condicional para o método POST:
}else if($method === "POST"){

    //Pegando os dados necessários para inserir um produto:
    $data = json_decode(file_get_contents("php://input"),true);

    $name = $data["name"] ?? "";
    $category = $data["category"] ?? "";
    $amount = $data["amount"] ?? "";
    $unit_means = $data["unit_means"] ?? "";
    $id = $data["id"] ?? "";

    //Se um id não for passado significa que é um novo produto:
    if($id === ""){

        //Criando comando para inserir um novo produto:
        $comand = $connection->prepare("INSERT INTO products (name, category, amount, unit_means) VALUES (?, ?, ?, ?)");
        $comand->bind_param("ssis", $name, $category, $amount, $unit_means);

        //Executando o comando:
        if($comand->execute()){
            echo json_encode(["success" => true, "message"=> "Cadastrado com sucesso"]);
        }else{
            echo json_encode(["success"=> false, "message"=> "Erro no comando mysql"]);
        }

    //Se um id for passado significa que é um update de um produto:
    }else if(is_int($id)){

        //Criando o comando para atualizar o produto existente:
        $comand = $connection->prepare("UPDATE products SET name = ?, category = ?, amount = ?, unit_means = ? WHERE id = ?");
        $comand->bind_param("ssssi", $name, $category, $amount, $unit_means, $id);

        //Executando o comando:
        if($comand->execute()){
            echo json_encode(["success" => true, "message" => "Produto editado"]);
        }else{
            echo json_encode(["success" => false, "message" => "Erro no comando Mysql"]);
        }
    }
    
//Condicional para o método DELETE:
}else if($method === "DELETE"){

    //Pegando o id do produto a ser deletado:
    $data = json_decode(file_get_contents("php://input"),true);
    $id = $data["id"];

    //Craindo o comando de delete desse produto:
    $comand = $connection->prepare("DELETE FROM products WHERE id = ?");
    $comand->bind_param("i", $id);

    //Executando o comando:
    if($comand->execute()){
        echo json_encode(["success" => true, "message" => "Produto excluido"]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando mysql"]);
    }
}

?>