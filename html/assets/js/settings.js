//Selecionando os elementos necessários:
let btnCancelUni = document.querySelector(".btn-cancel-uni");
let btnCancelCat = document.querySelector(".btn-cancel-cat");

let btnSaveCat = document.querySelector(".btn-save-cat");
let btnSaveUni = document.querySelector(".btn-save-uni");

let boxConfig = document.querySelector(".box-config");
let boxCat = document.querySelector(".box-add-cat");
let boxUni = document.querySelector(".box-add-uni");

//Abrindo tela de categorias e unidades de medidas caso a tela recarrege:
document.addEventListener("DOMContentLoaded", async function(){
    boxCat.style.display = "none";
    boxUni.style.display = "none";
    boxConfig.style.display = "flex";

    //Preenchendo as categorias e unidades de medidas
    await AuxiFunc.getCatUni("getUnit");
    await AuxiFunc.getCatUni("getCategory");
});

//Selecionando os botões de adicão:
let btnAddUnity = document.getElementById("btn-unity");
let btnAddCategory = document.getElementById("btn-category");


//Evento do botão para abrir tela de adicionar unidade de medida:
btnAddUnity.addEventListener("click",function(){
    boxConfig.style.display = "none";
    boxUni.style.display = "flex";
});

//Evento do botão para abrir tela de adicionar categoria:
btnAddCategory.addEventListener("click", function(){
    boxConfig.style.display = "none";
    boxCat.style.display = "flex";
});

//Evento do botão para registrar uma nova categoria:
btnSaveCat.addEventListener("click", async function(){
    if(!(document.querySelector(".input-cat").value === "")){
        let name = document.querySelector(".input-cat").value;
        await AuxiFunc.insertCatUni(name, "category");
        window.location.reload();
    }else{
        alert("Preencha o nome");
    }
    
});

//Evento do botão para registrar uma nova unidade de medida:
btnSaveUni.addEventListener("click", async function(){
    if(!(document.querySelector(".input-uni").value === "")){
        let name = document.querySelector(".input-uni").value;
        await AuxiFunc.insertCatUni(name, "unit");
        window.location.reload();
    }else{
        alert("Preencha o nome");
    }
})

//Evento do botão para sair da janela de cadastro da unidade de medida:
btnCancelUni.addEventListener("click", function(){
    let input = document.querySelector(".box-add-uni input");
    input.value = "";
    boxUni.style.display = "none";
    boxConfig.style.display = "flex";
});

//Evento do botão para sair da janela de cadastro da categoria:
btnCancelCat.addEventListener("click", function(){
    let input = document.querySelector(".box-add-cat input");
    input.value = "";
    boxCat.style.display = "none";
    boxConfig.style.display = "flex";
});