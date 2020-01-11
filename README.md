# Backend-Company

### Updates will be after (Outros) (Bottom of the README)

##### Start server (``` npm start ``` or ``` npm run nodemon ```)

## Updates 
### 12/11
Ideas for authentication:
- When a user registers he shouldn't go to the home page, instead it would go to a default page that says that an email was sent to the client, and to finalize registration he should click on 
the email link that would redirect him to the home page. By doing this 2 things are sent to the client, a token and a cookie, the token is used to authenticat like we did before and the cookie 
will be used to know if computer or smartphone was already used to acess the app or not, if it's not, the user will have to click on a link sent to his mail on that computer/smartphone/new browser.

### 19/11
- A unica maneira de ter uma conta na site é ao confirmar o pagamento. Depois de um utilizador escolher o pacote e confirmar o método de pagamento, deve ser lhe pedido para criar uma conta com nome, morada, código postal, password e mais campos que acharmos importantes, depois escolhe o método de pagamento e insere os dados referentes ao pagamento, ao terminar a conta é criada e o agora cliente tem acesso ao site.

### 22/11
- Já temos como não deixar o servidor ir abaixo quando ocorrem erros.

### 23/11
- Provavelmente a maneira mais segura de procurar alguma coisa é mandar essa coisa no body do pedido e não nos parametros, porque visto que vamos ter uma ligação https os dados do body estão protegidos.... Certo????
- Ainda falta avisa se os dados que foram enviados não são referentes a nada ou não têm resultados.
Ex: tentar apagar um user enviando um id que não existe. (Ver o campo afectedRows, se for 0 é porque nada foi alterado)

### 25/11
- ``` res.header('Access-Control-Allow-Origin', '*'); ``` Header que permite que o pedido à API seja feito de qualquer lado
- ### *não dá para fazer deploy da API no NETLIFY, só dá para fazer deploy de um site* 
- Para ver os logs do heroku ``` heroku logs --tail ```

### 11/01/2020 :)
- já é possivel toda a gente fazer documentação:
    - Para aceder à Documentação é preciso aceder ao endpoint ``` /api-docs ``` por exemplo http://localhost:8002/api-docs 
    - PAra fazer a documentação é fazer como tem no ``` server.js``` ou ``` order.js```.
    - Têm que ter atenção À identação que fazem porque se estiver mal vai dar um erro.
    - Usem as tags para diferenciar a categoria do pedido.
    - Podemos usar a description para explicar ao certo o que cada pedido faz, e o summary para ser mais fácil de ler a documentação
    - Entratanto vou melhorando os detalhes da documentação, como tipo de resposta, etc...

## Git Help
### Fazer merge de um branch de equipa para o master.

Para entrar em num branch tem que se fazer ``` git checkout < branch_a_entrar > ``` *

#### Linha de Comandos

- ``` git add --all ```
- ``` git commit -m "blah blah wiskas saquetas" ```
- ``` git push ```
- ``` git checkout master ``` *
- ``` git merge company-backend ``` ou qualquer outro branch que se queira fazer merge com o master
- ``` git push ```

### Useful Links:
- [Git Rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [Understanding CORS](https://dev.to/g33konaut/understanding-cors-aaf)
- [Heroku API Deployment](https://api-platform.com/docs/deployment/heroku/)

## Important 
+ Authentication (which technology)
    + Token
    + oAuth (express-Auth 2.0)
    + 
+ Create Routes
+ Payment methods
+ Create Connection to database

## TODOS:
+ Sistema de Login
+ Operações CRUD para: 
    + Utilizadores (gestores e Admnistradores)
    + casas 
    + Espaços
    + sensores associados aos espaços

## SQL (Business Logic)
+ Users
+ Casas
+ Sensors (37 different sensors)
+ Spaces

## NoSQL (Data)
+ Notifications
+ Movimentos
+ Log de sensores
+ Implementaion Requests (It has to have a field that says if it was accepted or not)

## Outros 
+ Sobre os ranks:
> Definição de parâmetros da aplicação (p.ex. sensores disponíveis, critérios de medição; créditos por
atividade/seguro (Gamification / Pontos), outros);
