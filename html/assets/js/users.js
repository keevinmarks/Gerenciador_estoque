//Evento para renderizar todos os usuários na tabela:
document.addEventListener("DOMContentLoaded", function(){
    AuxiFunc.getUsers();
});

//Pegando os elementos da tela:
let mainConatiner = document.querySelector(".main-container");
let boxButton = document.querySelector(".box-button");
let mainInsert = document.querySelector(".main-insert");

//Pegando os botões de controle:
let btnBoxRegister = document.querySelector(".box-button button");
let btnCancel = document.querySelector(".cancel-user");
let btnRegister = document.querySelector(".insert-user");

//Função para o botão de abrir tela de registro:
btnBoxRegister.addEventListener("click", function(){

    //Verificando de o usuário atual tem permissão para fazer isso:
    if(Number(sessionStorage.getItem("level")) === 2){
        mainConatiner.style.display = "none";
        boxButton.style.display = "none";
        mainInsert.style.display = "flex";
        document.querySelector(".title-insert span").innerHTML = "Cadastrar usuário";
        btnRegister.value = "Cadastrar";
        btnRegister.textContent = "Cadastrar";
    }else{
        alert("Você não tem permissão para isso");
    }
    
});

//Função para cadastrar ou atualizar um usuário:
btnRegister.addEventListener("click", async function(){

    //Pegando os dados necessários:
    let name = document.getElementById("name-input").value;
    let password = document.getElementById("password-input").value;
    let level = document.getElementById("level-input").value;
    let reset;
    if(document.getElementById("check-input").checked){
        reset = 1;
    }else{
        reset = 0;
    }

    //Verificando se não há campos vazios:
    if(name === "" || password === "" || level === "" || reset === ""){
        alert("Preencha todos os campos");
        return;
    }

    //Montando um objeto com as informações do usuário:
    let user = {name, password, level, reset};

    //Verificando se é um novo usuário ou se é a atualização de um existente:
    if(this.value === "Cadastrar"){      
        await AuxiFunc.insertUser(user);
        window.location.reload();       
    }else if(this.value === "Salvar"){
        user.id = Number(sessionStorage.getItem("idUser"));
        await AuxiFunc.insertUser(user);
        window.location.reload();
    }

    //Limpandos todos os inputs:
    document.querySelectorAll("input").forEach(input=> input.value = "");
    document.getElementById("level-input").selectedIndex = 0;
    
});

//Função para o botão de cancelar o registro de usuário:
btnCancel.addEventListener("click", function(){
    mainInsert.style.display = "none";
    mainConatiner.style.display = "flex";
    boxButton.style.display = "flex";

    //Limpando todos os inputs:
    document.querySelectorAll("input").forEach(input=> input.value = "");
    document.getElementById("level-input").selectedIndex = 0;
});

