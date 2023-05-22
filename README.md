# Sistema de Blog  (Backend)

## 📖  Descrição

Este é um projeto de um sistema de blog. Ele armazena os novos usuários, faz a autenticação de usuários já cadastrados, edita usuários.
Ele também armazena publicações com título, corpo do texto, categoria e a data da criação da publicação. Com rotas para poder alterar e excluir publicações que foram feitas pelo usuário logado.

</br>

## 🛠️ Funcionalidades

- Verificar se o usuário se encontra no banco de dados
- Libera o acesso ao sistema somente se o usuário estiver logado.
- Faz o registro do novo usuário caso todas as regras estejam corretas ( email válido, email já cadastrado, senha forte, senhas iguais ).
- Faz a adição, exclusão e alteração de publicações.
- Exibe todas as publicações que estão no banco de dados.

</br>

## 📡 Tecnologias utilizadas 
<br/>
<div align="center"> 
<img align="left" alt="NodeJs" height="50" width="50" src="./imgREADME/nodejs.svg">
<img align="left" alt="Typescript" height="50" width="50" src="./imgREADME/typescript.svg">
<img align="left" alt="Mongoose" height="50" width="50" src="./imgREADME/mongoose.svg">
<img align="left" alt="Express" height="50" width="50" src="./imgREADME/expressjs.png">
<img align="left" alt="Express-Validator" height="50" width="50" src="./imgREADME/express-validator.svg">
<img align="left" alt="JWT" height="50" width="50" src="./imgREADME/jwt.svg">
</div>
<br/><br/><br/><br/>

## 📖 Aprendizado
- Configurar o servidor, de modo que se comunique via JSON.
- Fazer a configuração de rotas com o Router do express.
- Modelo MVC.
- Criar a instâcia do mongoose para comunicação com o banco de dados não relacional.
- Configuração das variáveis de ambientes do dotenv.
- Trabalhar com a Requisição e Resposta da api via JSON.
- Fazer as devidas verificações das requisições envidas pelos usuários com o express-validator.
- Fazer a criptografia da senha com o Bcrypt, antes de salvar no banco de dados.
- Criar um Token, com o JWT, para cada usuário e atualiza-lo a cada login.
- Utilizar esse Token para a verificação se o usuário está logado para autorizar o acesso ao sistema.



## 🔎 Status do Projeto
- Projeto Finalizado.