<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/json');

$server = "db";
$username = "root";
$password = "root";
$database = "product_manager";

$connection = new mysqli($server, $username, $password, $database);

if($connection->connect_error){
    die ("Erro na conexão");
}
?>