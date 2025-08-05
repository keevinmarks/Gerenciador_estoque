//Selecionando os botões
let buttonEntry = document.getElementById("btnEntry");
let buttonBack = document.getElementById("btnBack");
let buttonSave = document.getElementById("btn-confirm");

//Evento do botão de entrar:
buttonEntry.addEventListener("click", async function(){

    //Selecionando nome e senha:
    let name = document.getElementById("name-input");
    let password = document.getElementById("password-input");

    //Verificando se não há campos vazios:
    if(name.value != "" && password.value != ""){
        let userInfo = await AuxiFunc.validateUser(name.value, password.value);

        //Verificando se foi encontrado esse usuário:
        if(userInfo.getFind){

            //Verificando se esse usuário tem um pedido de troca de senha:
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
        //Selecionando a senha e a sua confimação:
        let newpw = document.getElementById("alt-pw").value;
        let confirm = document.getElementById("confirm-pw").value;

        //Verificando se não há campos vazios:
        if(newpw != "" && confirm != ""){

            //Verificando se as senhas são iguais:
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