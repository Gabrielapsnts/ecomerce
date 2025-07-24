# E-commerce Node.js (Express + EJS)

Este é um projeto simples de e-commerce desenvolvido em Node.js utilizando Express e EJS, seguindo a arquitetura MVC.

## Funcionalidades
- Tela de login
- Estrutura pronta para expansão (cadastro, produtos, carrinho, etc.)

## Estrutura do Projeto
```
src/
  app.js                # Arquivo principal da aplicação
  controller/
    authController.js   # Controller de autenticação
  routes/
    authRoutes.js       # Rotas de autenticação
  views/
    login.ejs           # View da tela de login
package.json            # Dependências e configurações do projeto
```

## Pré-requisitos
- Node.js (versão 18 ou superior recomendada)
- npm (gerenciador de pacotes do Node)

## Instalação
1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/ecomerce.git
   cd ecomerce
   ```
2. Instale as dependências:
   ```
   npm install
   ```

## Como rodar o projeto
1. Execute o servidor:
   ```
   node src/app.js
   ```
   Ou, se preferir usar o nodemon para recarregar automaticamente:
   ```
   npx nodemon src/app.js
   ```
2. Acesse no navegador:
   ```
   http://localhost:3000/login
   ```

## Observações
- O projeto está pronto para receber novas rotas e funcionalidades.
- Sinta-se à vontade para contribuir!

---

Desenvolvido por Gabrielapsnts
