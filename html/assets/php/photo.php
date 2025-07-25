<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

require_once "conexao.php";

if($connection->connect_error){
    echo json_encode(["success" => false, "message" => "Erro na conexão"]);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

if($method === "POST"){
    if(isset($_FILES["photo"]) && isset($_POST["id"])){
        $idUser = intval($_POST["id"]);
        $photo = $_FILES["photo"];

        $nameFile = uniqid() . "-" . basename($photo["name"]);

        $directory =  "../img/";
        $pathPHP = $directory . $nameFile;

        $directoryHTML = "./assets/img/";
        $pathHTML = $directoryHTML . $nameFile;

        $comandVerify = $connection->prepare("SELECT path_photo FROM users WHERE id = ?");
        $comandVerify->bind_param("i", $idUser);

        if($comandVerify->execute()){
            $result = $comandVerify->get_result();
            if($result->num_rows > 0){
                $data = $result->fetch_assoc();
                $oldPhoto = $data["path_photo"];
                $oldPhotoPHP = str_replace("./assets/", "../", $oldPhoto);
                if(file_exists($oldPhotoPHP) && strpos($oldPhotoPHP, "default.png") === false){
                    unlink($oldPhotoPHP);
                }
            }
        }

        if(is_dir($directory)){
            if(move_uploaded_file($photo["tmp_name"], $pathPHP)){
                $comand = $connection->prepare("UPDATE users SET path_photo = ? WHERE id = ?");
                $comand->bind_param("si", $pathHTML, $idUser);

                if($comand->execute()){
                    echo json_encode(["success" => true, "message" => "Foto alterada com sucesso'"]);
                }else{
                    echo json_encode(["success" => false, "message" => "Erro no comando Mysql"]);
                }
            }
        }else{
            echo json_encode(["message" => "Diretorio não funcionando"]);
            exit();
        }
    }else{
        echo json_encode(["message" => "Dados imcopletos"]);
    }
}else if($method === "GET"){
    $id = intval($_GET["instruction"]);

    $comand = $connection->prepare("SELECT path_photo FROM users WHERE id = ?");
    $comand->bind_param("i", $id);

    if($comand->execute()){
        $result = $comand->get_result();
        $sqlResult = $result->fetch_assoc();
        $path_photo = $sqlResult["path_photo"];


        echo json_encode(["path_photo" => $path_photo]);
    }else{
        echo json_encode(["success" => false, "message" => "Erro no comando MySql"]);
    }
}


?>