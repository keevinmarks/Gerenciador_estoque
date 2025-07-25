let btnCancelUni = document.querySelector(".btn-cancel-uni");
let btnCancelCat = document.querySelector(".btn-cancel-cat");

let btnSaveCat = document.querySelector(".btn-save-cat");
let btnSaveUni = document.querySelector(".btn-save-uni");

let boxConfig = document.querySelector(".box-config");
let boxCat = document.querySelector(".box-add-cat");
let boxUni = document.querySelector(".box-add-uni");

document.addEventListener("DOMContentLoaded", async function(){
    boxCat.style.display = "none";
    boxUni.style.display = "none";
    boxConfig.style.display = "flex";

    await AuxiFunc.getCatUni("getUnit");
    await AuxiFunc.getCatUni("getCategory");
});

let btnAddUnity = document.getElementById("btn-unity");
let btnAddCategory = document.getElementById("btn-category");



btnAddUnity.addEventListener("click",function(){
    boxConfig.style.display = "none";
    boxUni.style.display = "flex";
});
btnAddCategory.addEventListener("click", function(){
    boxConfig.style.display = "none";
    boxCat.style.display = "flex";
});

btnSaveCat.addEventListener("click", async function(){
    if(!(document.querySelector(".input-cat").value === "")){
        let name = document.querySelector(".input-cat").value;
        await AuxiFunc.insertCatUni(name, "category");
        window.location.reload();
    }else{
        alert("Preencha o nome");
    }
    
});
btnSaveUni.addEventListener("click", async function(){
    if(!(document.querySelector(".input-uni").value === "")){
        let name = document.querySelector(".input-uni").value;
        await AuxiFunc.insertCatUni(name, "unit");
        window.location.reload();
    }else{
        alert("Preencha o nome");
    }
})

btnCancelUni.addEventListener("click", function(){
    let input = document.querySelector(".box-add-uni input");
    input.value = "";
    boxUni.style.display = "none";
    boxConfig.style.display = "flex";
});
btnCancelCat.addEventListener("click", function(){
    let input = document.querySelector(".box-add-cat input");
    input.value = "";
    boxCat.style.display = "none";
    boxConfig.style.display = "flex";
});