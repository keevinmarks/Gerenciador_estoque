document.addEventListener("DOMContentLoaded", function(){
    AuxiFunc.getProducts(true);
    AuxiFunc.getCatUni("fillHomeUnit");
    AuxiFunc.getCatUni("fillHomeCategory");
});

let btnAdd = document.querySelector(".button-box button");
let mainContainer = document.querySelector(".main-container");
let addEditContainer = document.querySelector(".container-add-edit");

let cancelButton = document.querySelector(".btn-cancel");
let registerButton = document.querySelector(".btn-insert");



btnAdd.addEventListener("click",function(){
    let dvButton = document.querySelector(".button-box");
    dvButton.style.display = "none";
    mainContainer.style.display = "none";
    document.querySelector(".header-add-edit span").innerHTML = "Cadastro";
    addEditContainer.style.display = "flex";

});

registerButton.addEventListener("click", async function(){

    let name = document.getElementById("input-name").value;
    let category = document.getElementById("input-category").value;
    let amount = Number(document.getElementById("input-amount").value);
    let unit_means = document.getElementById("input-unit").value;

    if(name === "" || category === "" || amount === "" || unit_means === ""){
        alert("Selecione e preencha todos os campos");
        return;
    }

    let product = {name, category, amount, unit_means}

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

cancelButton.addEventListener("click", function(){
    addEditContainer.style.display = "none";
    mainContainer.style.display = "flex";
    document.querySelector(".button-box").style.display = "flex";

    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
});