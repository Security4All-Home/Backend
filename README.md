# Backend-Company

### Updates will be after (Outros) (Bottom of the README)

##### Start server (``` npm start ``` or ``` npm run nodemon ```)
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

## Outros 
+ Sobre os ranks:
> Definição de parâmetros da aplicação (p.ex. sensores disponíveis, critérios de medição; créditos por
atividade/seguro (Gamification / Pontos), outros);
+ Useful Links:
    + [Git Rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)

## Updates 

### 12/11
Ideas for authentication:
- When a user registers he shouldn't go to the home page, instead it would go to a default page that says that an email was sent to the client, and to finalize registration he should click on 
the email link that would redirect him to the home page. By doing this 2 things are sent to the client, a token and a cookie, the token is used to authenticat like we did before and the cookie 
will be used to know if computer or smartphone was already used to acess the app or not, if it's not, the user will have to click on a link sent to his mail on that computer/smartphone/new browser.
