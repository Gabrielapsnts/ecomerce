# E-commerce Node.js

Um sistema de e-commerce completo desenvolvido em Node.js utilizando Express, EJS e SQLite, seguindo a arquitetura MVC.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-5.x-blue)
![SQLite](https://img.shields.io/badge/SQLite-3.x-lightblue)
![EJS](https://img.shields.io/badge/EJS-3.x-red)

## 🚀 Funcionalidades

### ✅ **Implementadas**
- 🔐 **Sistema de Autenticação** - Login/Cadastro com bcrypt
- 🛍️ **Catálogo de Produtos** - Listagem com imagens e filtros por categoria
- 🛒 **Carrinho de Compras** - Adicionar, remover e gerenciar itens
- 📦 **Sistema de Pedidos** - Criar e visualizar pedidos
- 🗃️ **Banco de Dados SQLite** - Persistência de dados local
- 🔄 **Migrações Automáticas** - Estrutura do banco atualizada automaticamente
- 🌱 **Seed de Dados** - População automática de produtos

### 🎯 **Categorias de Produtos**
- Roupas (Camisetas, Calças, Moletom)
- Calçados (Tênis, Salto)
- Acessórios (Bonés, Pulseiras)

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js + Express.js
- **Template Engine:** EJS
- **Banco de Dados:** SQLite3
- **Autenticação:** bcrypt
- **Arquitetura:** MVC (Model-View-Controller)

## 📁 Estrutura do Projeto

```
ecomerce/
├── src/
│   ├── app.js                 # Arquivo principal da aplicação
│   ├── db.js                  # Configuração e cliente do banco de dados
│   ├── controller/            # Controllers (lógica de negócio)
│   │   ├── authController.js      # Autenticação
│   │   ├── productsController.js  # Produtos
│   │   ├── pedidoController.js    # Pedidos
│   │   └── carrinhoController.js  # Carrinho
│   ├── models/                # Modelos (entidades do banco)
│   │   ├── User.js               # Usuários
│   │   ├── Product.js            # Produtos
│   │   ├── Pedido.js             # Pedidos
│   │   └── Carrinho.js           # Carrinho
│   ├── routes/                # Rotas da aplicação
│   │   ├── authRoutes.js         # Rotas de autenticação
│   │   ├── productsRoutes.js     # Rotas de produtos
│   │   ├── pedidoRoutes.js       # Rotas de pedidos
│   │   └── carrinhoRoutes.js     # Rotas do carrinho
│   └── views/                 # Templates EJS
│       ├── login.ejs             # Tela de login
│       ├── products.ejs          # Catálogo de produtos
│       ├── carrinho.ejs          # Carrinho de compras
│       ├── pedidos.ejs           # Lista de pedidos
│       └── pedido.ejs            # Detalhes do pedido
├── package.json               # Dependências do projeto
├── README.md                  # Este arquivo
└── ecomerce.db               # Banco de dados SQLite (criado automaticamente)
```

## 🚀 Como Rodar o Projeto

### 📋 **Pré-requisitos**

- Node.js (versão 18 ou superior)
- npm (geralmente vem com o Node.js)
- Git

### 📥 **1. Clonar o Repositório**

```bash
# Clone o repositório
git clone https://github.com/Gabrielapsnts/ecomerce.git

# Entre na pasta do projeto
cd ecomerce
```

### 📦 **2. Instalar Dependências**

```bash
# Instale todas as dependências
npm install
```

### ▶️ **3. Executar o Projeto**

```bash
# Inicie o servidor
node src/app.js
```

### 🌐 **4. Acessar a Aplicação**

Abra o navegador e acesse: **http://localhost:3000**

- A aplicação irá iniciar na porta 3000
- O banco de dados SQLite será criado automaticamente
- Os produtos serão populados automaticamente na primeira execução

## 📋 **Rotas Disponíveis**

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/` | Redireciona para login |
| `GET` | `/login` | Tela de login/cadastro |
| `POST` | `/login` | Processar login/cadastro |
| `GET` | `/products` | Catálogo de produtos |
| `GET` | `/products?category=categoria` | Filtrar produtos por categoria |
| `GET` | `/carrinho` | Visualizar carrinho |
| `POST` | `/carrinho/add` | Adicionar item ao carrinho |
| `POST` | `/carrinho/remove/:id` | Remover item do carrinho |
| `POST` | `/carrinho/clear` | Limpar carrinho |
| `GET` | `/pedidos` | Lista de pedidos |
| `POST` | `/pedidos` | Criar novo pedido |
| `GET` | `/pedidos/:id` | Detalhes de um pedido |

## 🗄️ **Estrutura do Banco de Dados**

### **Tabelas:**

- **`users`** - Usuários do sistema
- **`produtos`** - Catálogo de produtos
- **`pedidos`** - Pedidos realizados (com FK para users)
- **`carrinho`** - Itens no carrinho de compras

### **Relacionamentos:**
- `pedidos.user_id` → `users.id` (Cada pedido pertence a um usuário)

## 🔧 **Comandos Úteis**

```bash
# Parar o servidor
Ctrl + C

# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Ver logs em tempo real (se houver)
tail -f logs/app.log
```

## 🚧 **Roadmap / Próximas Funcionalidades**

- [ ] Sistema de sessões (express-session)
- [ ] Finalização de compras
- [ ] Histórico de pedidos por usuário
- [ ] Painel administrativo
- [ ] Upload de imagens de produtos
- [ ] Sistema de pagamento
- [ ] API REST
- [ ] Testes automatizados

## 🤝 **Contribuindo**

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 📞 **Contato**

**Gabriela** - [GitHub](https://github.com/Gabrielapsnts)

---

⭐ **Se este projeto foi útil para você, deixe uma estrela no repositório!**

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
