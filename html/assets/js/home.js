//Evento para carregar as categorias e unidades de medida:
document.addEventListener("DOMContentLoaded", function(){
    AuxiFunc.getProducts(true);
    AuxiFunc.getCatUni("fillHomeUnit");
    AuxiFunc.getCatUni("fillHomeCategory");
});

//Pegando os elementos necessários para abrir tela de cadastro de produtos:
let btnAdd = document.querySelector(".button-box button");
let mainContainer = document.querySelector(".main-container");
let addEditContainer = document.querySelector(".container-add-edit");

let cancelButton = document.querySelector(".btn-cancel");
let registerButton = document.querySelector(".btn-insert");


//Evento do botão para abrir tela de cadastro:
btnAdd.addEventListener("click",function(){
    let dvButton = document.querySelector(".button-box");
    dvButton.style.display = "none";
    mainContainer.style.display = "none";
    document.querySelector(".header-add-edit span").innerHTML = "Cadastro";
    addEditContainer.style.display = "flex";

});

//Evento do botão de cadastrar um novo produto ou atualizar um existente:
registerButton.addEventListener("click", async function(){

    let name = document.getElementById("input-name").value;
    let category = document.getElementById("input-category").value;
    let amount = Number(document.getElementById("input-amount").value);
    let unit_means = document.getElementById("input-unit").value;

    //Verificando se não há campos vazios:
    if(name === "" || category === "" || amount === "" || unit_means === ""){
        alert("Selecione e preencha todos os campos");
        return;
    }

    //Montando um objeto com as informações do produto:
    let product = {name, category, amount, unit_means}

    //Verificando se é uma atualização de um produto existente ou um novo produto:
    if(this.textContent === "Cadastrar"){
        await AuxiFunc.insertProduct(product);
        alert("Produto cadastrado");
        window.location.reload();
    }else if(this.textContent === "Salvar"){
        product.id = Number(sessionStorage.getItem("idProduct"));
        await AuxiFunc.insertProduct(product);
        window.location.reload();
    }    
});

//Evento para sair da tela de cadastro/atualização:
cancelButton.addEventListener("click", function(){
    addEditContainer.style.display = "none";
    mainContainer.style.display = "flex";
    document.querySelector(".button-box").style.display = "flex";

    //Limpando os input:
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
});