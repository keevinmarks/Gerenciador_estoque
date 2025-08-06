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
    echo json_encode(["success" => false, "message" => "Erro na conexão"]);
    exit();
}

//Pegando o método da requisição:
$method = $_SERVER["REQUEST_METHOD"];

//Condicional para o método POST:
if($method === "POST"){
    //Verificando se o id e o arquivo da foto foram setados:
    if(isset($_FILES["photo"]) && isset($_POST["id"])){

        //Pegando o dados necessários:
        $idUser = intval($_POST["id"]);
        $photo = $_FILES["photo"];

        //Criando um id único para cada arquivo de imagem:
        $nameFile = uniqid() . "-" . basename($photo["name"]);

        //Criando um diretorio relativo ao PHP e outro relativo ao HTML:
        $directory =  "../img/";
        $pathPHP = $directory . $nameFile;

        $directoryHTML = "./assets/img/";
        $pathHTML = $directoryHTML . $nameFile;

        //Criando comando para pegar a foto atual desse usuário
        $comandVerify = $connection->prepare("SELECT path_photo FROM users WHERE id = ?");
        $comandVerify->bind_param("i", $idUser);

        if($comandVerify->execute()){
            $result = $comandVerify->get_result();
            if($result->num_rows > 0){
                $data = $result->fetch_assoc();
                $oldPhoto = $data["path_photo"];

                //Verificando se a foto existe e se ela não é a foto padrão:
                $oldPhotoPHP = str_replace("./assets/", "../", $oldPhoto);
                if(file_exists($oldPhotoPHP) && strpos($oldPhotoPHP, "default.png") === false){

                    //Deletando a foto atual do servidor para que possa ser substituida pela nova:
                    unlink($oldPhotoPHP);
                }
            }
        }

        //Verificando se o diretorio existe:
        if(is_dir($directory)){

            //Movendo a foto para este diretório:
            if(move_uploaded_file($photo["tmp_name"], $pathPHP)){

                //Criando o comando para armazenar o endereço da nova foto na tebala do usuário:
                $comand = $connection->prepare("UPDATE users SET path_photo = ? WHERE id = ?");
                $comand->bind_param("si", $pathHTML, $idUser);

                //Executando o comando:
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

//Condicional para o método GET:
}else if($method === "GET"){

    //Pegando o id do usuário desejado:
    $id = intval($_GET["instruction"]);

    //Preparando um comando select para pegar o endereço da foto do usuário:
    $comand = $connection->prepare("SELECT path_photo FROM users WHERE id = ?");
    $comand->bind_param("i", $id);

    //Executando o comando:
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