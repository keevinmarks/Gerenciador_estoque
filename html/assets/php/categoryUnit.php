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
    echo json_encode(["succes" => false, "message" => "Deu erro na conexão"]);
    exit();
}

//Pegando o método da requisição:
$method = $_SERVER["REQUEST_METHOD"];

//Condicional para o método GET:
if($method === "GET"){

    //Montando uma query com base na instrução:
    $instruction = $_GET["instruction"];
    if($instruction === "getUnit" || $instruction === "fillHomeUnit"){
        $comand = $connection->prepare("SELECT * FROM unit");
        $comand->execute();
    }else if($instruction === "getCategory" || $instruction === "fillHomeCategory"){
        $comand = $connection->prepare("SELECT * FROM category");
        $comand->execute();
    }else{
        echo json_encode(["message"=> "Falha na instrução"]);
        exit();
    }

    //Armazenando o resultado da query em um array:
    $arrayResult = [];
    $resultQuery = $comand->get_result();

    //Verificando se o resultado tem conteúdo:
    if($resultQuery->num_rows > 0){
        while($row = $resultQuery->fetch_assoc()){
            $arrayResult[] = $row;
        }
        if(empty($arrayResult)){
            echo json_encode(["message" => "Tabela vazio"]);
            exit();
        }else{
            echo json_encode($arrayResult);
            exit();
        }
        
    }else{
        echo json_encode(["message" => "Array vazio"]);
        exit();
    }
    
//Condicional para o método DELETE:
}else if($method === "DELETE"){
    
    //Pegando dados do obejto enviado:
    $data = json_decode(file_get_contents("php://input"),true);
    $instruction = $data["instruction"];
    $id = $data["id"] ?? "";

    //Verificando de se o id existe:
    if(empty($id)){
        echo json_encode(["success" => false, "message"=> "O id está vazio"]);
    }

    //Executando query de delete com base no id e a instrução:
    if($instruction === "delUnit"){
        $comand = $connection->prepare("DELETE FROM unit WHERE id = ?");
        $comand->bind_param("i", $id);
        if($comand->execute()){
            echo json_encode(["success"=>true, "message"=> "Deletado com sucesso"]);
        }else{
            echo json_encode(["success"=>false, "message"=> "Erro no comando mysql"]);
        }
        
    }else if($instruction === "delCategory"){
        $comand = $connection->prepare("DELETE FROM category WHERE id = ?");
        $comand->bind_param("i", $id);
        if($comand->execute()){
            echo json_encode(["success"=>true, "message"=> "Deletado com sucesso"]);
        }else{
            echo json_encode(["success"=> false, "message"=> "Erro no comando mysql"]);
        }
    }

//Condicional para o método POST:   
}else if($method === "POST"){

    //Pegando os dados necessários:
    $data = json_decode(file_get_contents("php://input"),true);
    $name = $data["name"];
    $table = $data["table"];

    //Fazendo uma verificação de segurança para permitir somentes essas tabelas:
    $allowedTables = ["unit", "category"];

    if(!(in_array($table, $allowedTables))){
        echo json_encode(["success" => false, "message" => "Tabela não permitida"]);
        exit();
    }

    //Montando o comando de insert:
    $comand = $connection->prepare("INSERT INTO `$table` (name) VALUES (?)");
    $comand->bind_param("s", $name);

    //Executando o comando:
    if($comand->execute()){
        echo json_encode(["success"=> true, "message" => "Salvo com sucesso"]);
    }
    
}else{
    echo json_encode(["success" => false, "message" => "Nenhuma método encontrado"]);
}

