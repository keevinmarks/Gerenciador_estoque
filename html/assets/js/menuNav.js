let menuItem = document.querySelectorAll(".menuItem");
let perfil_photo = document.querySelector(".user-info img");
let menu = document.querySelector(".change-photo");

let exit = document.querySelector(".exit");
let altPhoto = document.querySelector(".alt-photo");

let btnCancelPhoto = document.querySelector(".btn-cancel-photo");
let btnSavePhoto = document.querySelector(".btn-save-photo");

menuItem.forEach(function(menu){
    menu.addEventListener("click", function(){
       window.location.href = `${menu.dataset.value}.html`;
    })
});
perfil_photo.addEventListener("click", function(){
    
    if(menu.style.display === "flex"){
        console.log("Display flex");
        menu.classList.add("fade-out");
        setTimeout(function(){
            menu.style.display = "none";
            menu.classList.remove("fade-out");
        },600)
    }else{
        console.log("Display none")
        menu.style.display = "flex";
    }
});

//Função para salvar foto do usuário:
btnSavePhoto.addEventListener("click", async function(){
    const formData = new FormData();
    if(document.getElementById("input-file").files.length > 0){
        formData.append("photo", document.getElementById("input-file").files[0]);
        formData.append("id", sessionStorage.getItem("id"));

        await AuxiFunc.upPhotUser(formData);
        sessionStorage.setItem("path_photo", await AuxiFunc.getPhotoPath(sessionStorage.getItem("id")));
        window.location.reload();
    }else{
        alert("Nenhuma foto selecionada");
    }
});
//Função para fechar a janela de alterar foto
btnCancelPhoto.addEventListener("click", function(){
    document.querySelector(".box-photo").style.display = "none";
});

//Função para abrir a janela de alterar foto:
altPhoto.addEventListener("click", function(){
    document.querySelector(".box-photo").style.display = "flex";
})

//Função para o usuário fazer logoff:
exit.addEventListener("click", function(){
    window.location.href = "index.html";
});

//Função para mostrar o nome do usuário atula quando o documento carregar:
document.addEventListener("DOMContentLoaded", function(){
    let name_user = sessionStorage.getItem("name");
    let path_photo = sessionStorage.getItem("path_photo");
    let name_box = document.querySelector(".name");
    let imgPerfil = document.getElementById("photo-perfil");
    console.log(path_photo);
    imgPerfil.src = path_photo;
    name_box.innerHTML = `${name_user}`;
    
});

