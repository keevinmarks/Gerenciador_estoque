//Selecionando os botões
let buttonEntry = document.getElementById("btnEntry");
let buttonBack = document.getElementById("btnBack");
let buttonSave = document.getElementById("btn-confirm");

//Evento do botão de entrar:
buttonEntry.addEventListener("click", async function(){
    let name = document.getElementById("name-input");
    let password = document.getElementById("password-input");
    if(name.value != "" && password.value != ""){
        let userInfo = await AuxiFunc.validateUser(name.value, password.value);
        if(userInfo.getFind){
            if(userInfo.getReset){
                document.querySelector(".box-Alt-Pass").style.display = "flex";
            }else{
                window.location.href = "home.html";
            }
        }
    }else{
        alert("Preencha os campos");
    }
});

//Evento do botão de voltar:
buttonBack.addEventListener("click", function(){
    window.location.href = "index.html";
});

//Evento de alterar a senha ao logar:
if(buttonSave){
    buttonSave.addEventListener("click", async function(){

        let newpw = document.getElementById("alt-pw").value;
        let confirm = document.getElementById("confirm-pw").value;
        if(newpw != "" && confirm != ""){
            if(newpw === confirm){
                await AuxiFunc.updatePassword(sessionStorage.getItem("id"), newpw);
                alert("Senha alterada com sucesso");
                window.location.href = "home.html";
            }else{
                alert("As senhas não conferem");
            }
        }else{
            alert("Preencha todos os campos");
        }


    })
}