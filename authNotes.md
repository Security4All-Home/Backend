### rotas auth: 
#### não precisa de verificar tokens.

- sign up / register
- sign in / login


### middlewares
#### vai precisar de verificar se o user tem a cookie que diz se ele já entrou a partir do dispositivo ou browser que está a usar
- verifyToken
- verifyRole (Maybe)
- new device cookie
- **os dois middlewares acima vão injetar campos no request, de maneira ser fácil de aceder aos detalhes de um user a partir de qualquer pedido.