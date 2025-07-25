# 🐳 dockerproject – Ambiente PHP + MySQL com Docker

Projeto criado por **Kevin Marques** utilizando Docker e Docker Compose para configurar um ambiente de desenvolvimento com Apache, PHP 8.2 e MySQL 5.7.

Ideal para aplicações web PHP com persistência em banco de dados MySQL.

---

## 📁 Estrutura do Projeto

```
dockerproject/
├── Dockerfile                  # Imagem personalizada do PHP + Apache
├── docker-compose.yml         # Orquestração dos containers
├── html/                      # Código-fonte da aplicação PHP
│   └── index.php              # Arquivo inicial
├── init-sql/                  # Scripts SQL executados na criação do banco
│   └── schema.sql             # (exemplo)
├── .gitignore
└── README.md
```

---

## ⚙️ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Como executar

Clone o repositório e inicie os containers com:

```bash
git clone https://github.com/kevinmarques/dockerproject.git
cd dockerproject
docker-compose up --build
```

Acesse a aplicação:

🔗 [http://localhost:8080](http://localhost:8080)

---

## 🛠️ Serviços

### 🔹 Web (PHP + Apache)
- Porta local: `8080`
- Pasta de código: `html/`

### 🔹 MySQL
- Imagem: `mysql:5.7`
- Porta: `3306`
- Usuário root: `root`
- Senha root: `root`
- Banco de dados: `product_manager`
- Inicialização com os scripts da pasta `init-sql/`

- Usuario Administrador, senha: '1234'

---

## 🔄 Resetando o projeto

Para resetar volumes e o banco de dados:

```bash
docker-compose down -v
```

---

## 📄 Licença

Distribuído sob a licença MIT.

---

Feito com 💻 por **Kevin Marques**
