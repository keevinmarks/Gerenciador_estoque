class AuxiFunc{
    //Função para adicionar um usuário:
    static async insertUser(user){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/users.php",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(user)
            });

            //Pegando resposta em json:
            const json = await resp.json();

            alert(json.message);

        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }

    //Função para pegar todos os usuários e renderizar na tabela:
    static async getUsers(){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/users.php",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            });

            //Pegando resposta em json:
            const json = await resp.json();

            let tbody = document.querySelector("tbody");
            
            //Loop para renderizar as tabelas:
            for(let user of json){
                let row = document.createElement("tr");

                if(user.id === 1){
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td><img src="${user.path_photo}" alt= "Foto de perfil"></td>
                        <td>${user.name}</td>
                        <td>${user.level}</td>
                        <td>
                            <button class = "btn-edit">Editar</button>
                    `;
                }else{
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td><img src="${user.path_photo}" alt= "Foto de perfil"></td>
                        <td>${user.name}</td>
                        <td>${user.level}</td>
                        <td>
                            <button class = "btn-edit">Editar</button>
                            <button class = "btn-del">Excluir</button>
                        </td>
                    `;
                }
                
                let btnEdit = row.querySelector(".btn-edit");
                let btnDel = row.querySelector(".btn-del");

                //Adicinando o evento de deletar no botão:
                if(btnDel){
                    btnDel.addEventListener("click", async function(){
                        if(Number(sessionStorage.getItem("level")) === 2){
                            if(Number(sessionStorage.getItem("id")) === user.id){
                                if(confirm("Tem certeza que quer deletar seu próprio usuário ?")){
                                    await AuxiFunc.deleteUser(user.id);
                                    window.location.href = "index.html";
                                }
                            }else if(confirm("Tem certeza que deseja deletar este usuário ?")){
                                await AuxiFunc.deleteUser(user.id);
                                window.location.reload();
                            }
                        }else{
                            alert("Você não tem permissão para isso.");
                        } 
                    });
                }
                
                //Adicinando o evento de editar no botão:
                if(btnEdit){
                    btnEdit.addEventListener("click", function(){
                        if(Number(sessionStorage.getItem("level")) === 2){

                            document.querySelector(".main-container").style.display = "none";
                            document.querySelector(".box-button").style.display = "none";
                            document.querySelector(".title-insert span").innerHTML = "Editar usuário";
                            document.getElementById("name-input").value = `${user.name}`;
                            document.getElementById("password-input").value = `${user.password}`;
                            document.querySelector(".insert-user").innerHTML = "Salvar";
                            document.querySelector(".insert-user").value = "Salvar";
                            
                            if(user.id === 1){
                                document.getElementById("level-input-box").style.display = "none";
                            }else{
                                document.getElementById("level-input-box").style.display = "flex";
                                document.getElementById("level-input").value = `${user.level}`;
                            }

                            sessionStorage.setItem("idUser", user.id);
                            document.querySelector(".main-insert").style.display = "flex";
                        }else{
                            alert("Você não tem permissão para isso.");
                        }
                    });
                }
                tbody.appendChild(row);
            }
        }catch(error){
            console.log(`Deu o seguinte o erro: ${error}`)
        }
    }

    //Função para atualizar as informações do usuário:
    static async updateUser(user){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/users.php",{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            //Pegando resposta em json:
            const json = await resp.json();

            alert(json.message);
        }catch(error){  
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }
    //Função para deletar um usuário:
    static async deleteUser(id){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/users.php",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });

            //Pegando resposta em json:
            const json = await resp.json();

            alert(json.message);


        }catch(error){
            console.log(`Deu o seguinte erro ${error}`);
        }
    }

    //Função para atualizar a foto do usuário:
    static async upPhotUser(formData){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/photo.php",{
                method: "POST",
                body: formData
            });

            const json = await resp.json();

            alert(json.message);

        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }

    //Função para validar informações do usuário na hora do login, e também para guardar algumas informações no localStorage:
    static async validateUser(name, password){
        try{
            
            //Requisição para o arquivo php:
            const respo = await fetch("./assets/php/users.php",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            //Pegando resposta em json:
            const jsonResp = await respo.json();


    
            //Vairiáveis para armazenar algumas informações do usuário:
            let find = false;
            let reset;

            //Percorrendo os dados para fazer a validação:
            for(let user of jsonResp){
                if(name === user.name && password === user.password){
                    find = true;
                    reset = user.reset;

                    //Guardando algumas informações do usuário:
                    sessionStorage.setItem("name", user.name);
                    sessionStorage.setItem("level", user.level.toString());
                    sessionStorage.setItem("id", (user.id).toString());
                    sessionStorage.setItem("path_photo", user.path_photo);
                    break;
                }
            }

            //Verificando se foi validado:
            if(find){
                return {getFind: find, getReset: reset};
            }else{
                alert("Usuário não econtrado");
            }
            
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`);
        }
    }

    //Função para pegar o caminho da foto de perfil do usuário:
    static async getPhotoPath(id){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch(`./assets/php/photo.php?instruction=${id}`,{
                method: "GET"
            });

            //Pegando resposta em json:
            const json = await resp.json();
            return json.path_photo;
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }

    //Função para inserir um novo produto:
    static async insertProduct(product){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/products.php",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            });

            //Pegando resposta em json:
            const json = await resp.json();
            console.log(json.message);

        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`);
        }
    }

    //Função para pegar todos os produtos e renderizar na tebela, sendo home=true para renderizar na página home, e home=false para renderizar na tela inicial:
    static async getProducts(home=false){
        try{
            //Requisição para o arquivo php:
            const respo = await fetch("./assets/php/products.php",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            //Pegando resposta em json:
            const jsonResp = await respo.json();

            let tbody = document.querySelector(".body-table");

            //Loops para renderizar os produtos na tabela conforme o parâmetro home:
            if(home){
                for(let product of jsonResp){
                    let rowProduct = document.createElement("tr");
                    rowProduct.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.amount} ${product.unit_means}</td>
                        <td>${product.date}</td>
                        <td>
                            <button class="btn-edit">Editar</button>
                            <button class="btn-delete">Excluir</button>
                        </td>
                    `
                    tbody.appendChild(rowProduct);

                    let btn_edit = rowProduct.querySelector(".btn-edit");
                    let btn_delete = rowProduct.querySelector(".btn-delete");
                    
                    //Função para o botão de editar produtos
                    btn_edit.addEventListener("click", function(){
                        let tableProducts = document.querySelector(".main-container");
                        let btnAdd = document.querySelector(".button-box");
                        let addEdit = document.querySelector(".container-add-edit");

                        tableProducts.style.display = "none";
                        btnAdd.style.display = "none";
                        document.querySelector(".header-add-edit span").innerHTML = "Editar";
                        addEdit.style.display = "flex";

                        sessionStorage.setItem("idProduct", (product.id).toString());

                        document.getElementById("input-name").value = `${product.name}`;
                        document.getElementById("input-amount").value = `${product.amount}`;
                        document.getElementById("input-category").value = `${product.category}`;
                        document.getElementById("input-unit").value = `${product.unit_means}`;
                        document.querySelector(".btn-insert").textContent = `Salvar`;
                    })

                    //Função para deletar um produto
                    btn_delete.addEventListener("click", async function(){
                        await AuxiFunc.deleteProduct(Number(product.id));
                        window.location.reload();
                    })
                }

            }else{
                for(let product of jsonResp){
                    let rowProduct = document.createElement("tr");
                    rowProduct.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>${product.amount} ${product.unit_means}</td>
                        <td>${product.date}</td>
                    `;
                    tbody.appendChild(rowProduct);
                } 
            }
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }

    //Função para deletar um produto:
    static async deleteProduct(id){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/products.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            });

            //Pegando resposta em json:
            const json = await resp.json();
            alert(json.message);
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`)
        }
    }

    //Função para alterar a senha de um usuário:
    static async updatePassword(id, password){
        try{
            //Requisição para o arquivo php:
            await fetch("./assets/php/upPassword.php", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id, password})
            })
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`);
        }
    }

    //Função para pegar todas as categorias e unidades de medidas, de acordo com a instrução:
    static async getCatUni(instruction){
        try{
            //Requisição para o arquivo php:
            const respo = await fetch(`./assets/php/categoryUnit.php?instruction=${instruction}`, {
                method: "GET",
                headers: {
                    "Content-Type":"application/json"
                }
            });

            //Pegando resposta em json:
            const json = await respo.json();

            if(instruction === "getUnit"){
                let ul = document.querySelector(".unit ul")
                for(let unit of json){
                    let li = document.createElement("li");
                    li.innerHTML = `${unit.name}`;

                    //Adicionando um evento de click para deletar uma unidade de medida clicando nela:
                    li.addEventListener("click",function(){
                        if(confirm(`Deletar o item ${unit.name} ?`)){
                            AuxiFunc.deleteCatUni(unit.id, "delUnit");
                            window.location.reload();
                        }
                    })
                    ul.appendChild(li);
                }
            }else if(instruction === "getCategory"){
                let ul = document.querySelector(".category ul");
                for(let category of json){
                    let li = document.createElement("li");
                    li.innerHTML = `${category.name}`;

                    //Adicionando um evento de click para deletar uma categoria clicando nela:
                    li.addEventListener("click", function(){
                        if(confirm(`Deletar o item ${category.name} ?`)){
                            AuxiFunc.deleteCatUni(category.id, "delCategory");
                            window.location.reload();
                        }
                    })
                    ul.appendChild(li);
                }

            //Renderizando dinâmicamente categorias e unidades de medidas na tela
            }else if(instruction === "fillHomeUnit"){
                let select = document.getElementById("input-unit");
                for(let unit of json){
                    let option = document.createElement("option");
                    option.value = `${unit.name}`;
                    option.label = `${unit.name}`;
                    select.appendChild(option);
                }
            }else if(instruction === "fillHomeCategory"){
                let select = document.getElementById("input-category");
                for(let cat of json){
                    let option = document.createElement("option");
                    option.value = `${cat.name}`;
                    option.label = `${cat.name}`;
                    select.appendChild(option);
                }
            }
        }catch(error){
            console.log(`Deu oo seguinte erro ${error}`);
        }
    }

    //Função para deletar categorias e unidades de medidas, de acordo com a instrução:
    static async deleteCatUni(id, instruction){
        try{
            //Requisição para o arquivo php:
            const resp = await fetch("./assets/php/categoryUnit.php",{
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id, instruction})
            });

            //Pegando resposta em json:
            const json = await resp.json();
        }catch(error){
            console.log(`Deu o seguinte erroo ${error}`);
        }
    }

    //Função para inserir uma categoria ou unidade de medida, de acordo com a sua tabela:
    static async insertCatUni(name, table){
        try{
            //Requisição para o arquivo php:
            const respo = await fetch("./assets/php/categoryUnit.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, table})
            });

            //Pegando resposta em json:
            const json = await respo.json();
            alert(json.message);
        }catch(error){
            console.log(`Deu o seguinte erro: ${error}`);
        }
    }
}