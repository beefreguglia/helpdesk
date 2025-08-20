# Help Desk - API ⚙️

Este é o repositório do back-end da aplicação **Help Desk**. Ele fornece uma API RESTful para servir o front-end, gerenciando toda a lógica de negócio, autenticação, permissões e interações com o banco de dados.

---

## Índice

- [Help Desk - API ⚙️](#help-desk---api-️)
  - [Índice](#índice)
  - [Funcionalidades Principais ✨](#funcionalidades-principais-)
  - [Stack de Tecnologias 💻](#stack-de-tecnologias-)
  - [Blueprint da API (Endpoints) 🗺️](#blueprint-da-api-endpoints-️)
    - [Autenticação e Usuários](#autenticação-e-usuários)
    - [Técnicos](#técnicos)
    - [Clientes](#clientes)
    - [Serviços](#serviços)
    - [Chamados (Calls)](#chamados-calls)
  - [Como Executar Localmente 🛠️](#como-executar-localmente-️)
    - [**Pré-requisitos**](#pré-requisitos)
    - [**Passos para Instalação**](#passos-para-instalação)
  - [Licença 📄](#licença-)

---

## Funcionalidades Principais ✨

- **Autenticação Segura**: Sistema de autenticação baseado em JWT (JSON Web Tokens) com senhas criptografadas usando `bcrypt`.
- **Controle de Acesso por Papel (RBAC)**: Permissões distintas para as três personas do sistema: `Admin`, `Técnico` e `Cliente`.
- **Gerenciamento Completo**: Operações CRUD (Create, Read, Update, Delete) para todos os recursos principais: Usuários, Serviços e Chamados.
- **Upload de Imagens**: Endpoint dedicado para upload de avatares de perfil, gerenciado com `Multer`.
- **Validação de Dados**: Validação robusta de todas as requisições de entrada utilizando `Zod` para garantir a integridade dos dados.
- **Banco de Dados Moderno**: Persistência de dados gerenciada pelo ORM **Prisma**, com um banco de dados SQLite para simplicidade no desenvolvimento.

---

## Stack de Tecnologias 💻

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript para um código mais robusto e seguro.
- **Express**: Framework web para a construção da API.
- **Prisma**: ORM para interação com o banco de dados.
- **Zod**: Biblioteca para validação de schemas.
- **JWT** & **Bcrypt**: Para autenticação e segurança de senhas.
- **Multer**: Middleware para upload de arquivos.
- **TSX**: Executor de TypeScript de alta performance para desenvolvimento.
- **Biome**: Linter e formatador de código.

---

## Blueprint da API (Endpoints) 🗺️

A seguir estão os endpoints implementados na API, agrupados por recurso.

### Autenticação e Usuários

| Método | Endpoint          | Descrição                                         | Autorização                |
| :----- | :---------------- | :------------------------------------------------ | :------------------------- |
| `POST` | `/sessions`       | Autentica um usuário e retorna um token JWT.      | Pública                    |
| `POST` | `/users`          | Cria uma nova conta de **Cliente**.               | Pública                    |
| `PUT`  | `/users/:id`      | Atualiza os dados do próprio usuário.             | Autenticado (próprio usuário)|
| `POST` | `/uploads`        | Faz o upload de um arquivo para o servidor.       | Autenticado                |
| `PATCH`| `/users-avatar/update` | Associa um arquivo já enviado ao perfil do usuário. | Autenticado                |

### Técnicos

| Método | Endpoint       | Descrição                                 | Autorização |
| :----- | :------------- | :---------------------------------------- | :---------- |
| `POST` | `/technicians` | Cria uma nova conta de Técnico.           | `[ADMIN]`   |
| `GET`  | `/technicians` | Lista todas as contas de Técnicos.        | `[ADMIN]`   |
| `GET`  | `/technicians/:id` | Exibe os dados de um Técnico específico.  | `[ADMIN]`   |
| `PUT`  | `/technicians/:id` | Atualiza os dados de um Técnico.          | `[ADMIN]`   |

### Clientes

| Método   | Endpoint     | Descrição                                       | Autorização    |
| :------- | :----------- | :---------------------------------------------- | :------------- |
| `GET`    | `/clients`   | Lista todas as contas de Clientes.              | `[ADMIN]`      |
| `GET`    | `/clients/:id` | Exibe os dados de um Cliente específico.      | `[ADMIN]`      |
| `PUT`    | `/clients/:id` | Atualiza os dados de um Cliente.                | `[ADMIN]`      |
| `DELETE` | `/clients/:id` | Exclui uma conta de Cliente.                    | `[ADMIN, CLIENT]` |

### Serviços

| Método   | Endpoint          | Descrição                                                | Autorização            |
| :------- | :---------------- | :------------------------------------------------------- | :--------------------- |
| `POST`   | `/services`       | Cria um novo serviço.                                    | `[ADMIN]`              |
| `GET`    | `/services`       | **Admin:** Lista todos os serviços (ativos e inativos).  | `[ADMIN]`              |
| `GET`    | `/services/active`| **Cliente/Técnico:** Lista apenas os serviços ativos.  | `[CLIENT, TECHNICian]` |
| `GET`    | `/services/:id`   | Exibe os dados de um serviço específico.                 | `[ADMIN]`              |
| `PUT`    | `/services/:id`   | Atualiza os dados de um serviço.                         | `[ADMIN]`              |
| `PATCH`  | `/services/:id/active` | Ativa um serviço.                                    | `[ADMIN]`              |
| `PATCH`  | `/services/:id/inactive` | Desativa um serviço (Soft Delete).                 | `[ADMIN]`              |

### Chamados (Calls)

| Método   | Endpoint                                          | Descrição                                         | Autorização            |
| :------- | :------------------------------------------------ | :------------------------------------------------ | :--------------------- |
| `POST`   | `/calls`                                          | **Cliente:** Cria um novo chamado.                | `[CLIENT]`             |
| `GET`    | `/calls`                                          | Lista chamados (filtrados automaticamente por papel). | `[ADMIN, CLIENT, TECHNICian]` |
| `GET`    | `/calls/:id`                                      | Exibe os detalhes de um chamado específico.       | `[ADMIN, CLIENT, TECHNICian]` |
| `PATCH`  | `/calls/:id/start`                                | **Técnico/Admin:** Inicia o atendimento de um chamado. | `[ADMIN, TECHNICian]`  |
| `PATCH`  | `/calls/:id/finish`                               | **Técnico/Admin:** Finaliza um chamado.           | `[ADMIN, TECHNICian]`  |
| `POST`   | `/calls/:id/additional-call-service`              | **Técnico/Admin:** Adiciona um serviço a um chamado. | `[ADMIN, TECHNICian]`  |
| `DELETE` | `/calls/:callId/additional-call-service/:serviceId` | **Técnico/Admin:** Remove um serviço de um chamado.  | `[ADMIN, TECHNICian]`  |


---

## Como Executar Localmente 🛠️

Siga os passos abaixo para configurar e executar a API na sua máquina.

### **Pré-requisitos**

- **Node.js** (versão 18 ou superior)
- **pnpm** (ou outro gerenciador de pacotes como npm ou yarn)

### **Passos para Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/beefreguglia/helpdesk-api](https://github.com/beefreguglia/helpdesk-api)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd help-desk-api
    ```

3.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

4.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    O arquivo `.env` já virá pré-configurado para usar um banco de dados SQLite local. Se desejar, você pode alterar o segredo do JWT:
    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your-super-secret-jwt-key"
    ```

5.  **Configure o Banco de Dados com Prisma:**
    Estes comandos irão criar o arquivo do banco de dados SQLite e populá-lo com os dados iniciais do `seed`.
    ```bash
    # Aplica as migrações e cria o banco de dados
    npx prisma migrate dev

    # Popula o banco com dados iniciais (admin, técnicos, etc.)
    npx prisma db seed
    ```

6.  **Execute a API:**
    ```bash
    pnpm dev
    ```

A API estará rodando em `http://localhost:3333`.

---

## Licença 📄

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.