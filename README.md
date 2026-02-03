# Luana Bot - Assistente de IA Filosófica (Conversão From Flow)

Este projeto é a conversão completa e escalável do seu fluxo visual From Flow para um bot Discord em Node.js e `discord.js` v14, seguindo uma arquitetura modular.

## ⚙️ Arquitetura do Projeto

O projeto segue a estrutura modular solicitada:

| Diretório/Arquivo | Função |
| :--- | :--- |
| `index.js` | Ponto de entrada. Inicializa o cliente Discord, carrega comandos, eventos e o banco de dados. |
| `.env` | Variáveis de ambiente (Token, Client ID). |
| `package.json` | Dependências e scripts de execução (`start`, `deploy-commands`). |
| `commands/` | Contém os comandos Slash (`/filosofar.js`). |
| `events/` | Contém os manipuladores de eventos (`ready.js`, `interactionCreate.js`, `messageCreate.js`). |
| `database/` | Contém o gerenciador de banco de dados (`sqlite-manager.js`). |
| `utils/` | Contém scripts utilitários (`deploy-commands.js`). |

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar e rodar o bot.

### 1. Pré-requisitos

*   **Node.js**: Versão 18.x ou superior.
*   **Conta de Bot Discord**: Token e Client ID (ID do Aplicativo).

### 2. Configuração do Ambiente

1.  **Navegue até o diretório do projeto:**
    ```bash
    cd luana-bot
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Edite o arquivo `.env`:**
    Abra o arquivo `.env` e substitua os placeholders com suas informações.

    ```dotenv
    # Variáveis de Ambiente para o Bot Luana

    # O token do seu bot Discord. OBRIGATÓRIO.
    DISCORD_TOKEN=SEU_TOKEN_AQUI

    # O ID do seu bot (Client ID). Necessário para o registro de Slash Commands. OBRIGATÓRIO.
    CLIENT_ID=SEU_CLIENT_ID_AQUI

    # ID do Guilda/Servidor para registrar comandos de teste (opcional, mas recomendado para desenvolvimento)
    # GUILD_ID=SEU_GUILD_ID_AQUI

    # Configuração do Banco de Dados (SQLite por padrão)
    DB_FILE=./database/luana_data.sqlite
    ```

### 3. Registro dos Comandos Slash

Você deve registrar os comandos (`/filosofar`) na API do Discord antes de usá-los.

```bash
npm run deploy-commands
```
> **Nota:** Este script registra os comandos globalmente. Pode levar até 1 hora para aparecerem em todos os servidores. Para registro instantâneo em um servidor de teste, descomente e preencha a variável `GUILD_ID` no `.env` e ajuste o script `deploy-commands.js` para usar `Routes.applicationGuildCommands`.

### 4. Inicialização do Bot

Inicie o bot usando o script de `start`:

```bash
npm start
```
O console deve exibir: `[DB] Conectado ao banco de dados...` e `[BOT] Pronto! Logado como Luana#xxxx`.

## 🧠 Lógica do Flow Convertida

### 1. Comando `/filosofar`

*   **Comando:** `/filosofar tema: [seu tema]`
*   **Lógica:** Implementada em `commands/filosofar.js`. Ele verifica se o `tema` contém palavras-chave profundas ("vida", "morte", "tempo", "liberdade") e ramifica a resposta entre "Reflexão Profunda" e "Reflexão Geral", exatamente como o `Condition Node` do From Flow.

### 2. Interação Contínua (`messageCreate`)

*   **Lógica:** Implementada em `events/messageCreate.js`.
*   **Filtro:** O bot só responde se for mencionado, se a mensagem for um reply a ele, ou se a mensagem contiver "Luana" ou "/luana" (simulando o `Start Node` com o filtro "Verificar Mensagem Direcionada").
*   **Ramificação:** A função verifica o conteúdo da mensagem e ramifica para:
    *   **Saudação:** Se contiver "oi", "olá", etc.
    *   **Reflexão Filosófica:** Se contiver "vida", "morte", "existência", etc.
    *   **Interação Leve:** Se contiver "haha", "kk", "obrigado", etc.
    *   **Continuidade/Padrão:** Para qualquer outro texto, mantendo a conversa.
*   **Persistência:** O `sqlite-manager.js` salva o `last_topic` (último tema) no banco de dados, permitindo que a Luana tenha "memória" de conversas anteriores, simulando o armazenamento de variáveis do From Flow.

## 💾 Banco de Dados (Escalabilidade)

O projeto usa **SQLite** (`better-sqlite3`) por padrão para persistência local.

### Troca para MongoDB

Para trocar para MongoDB, você precisaria:

1.  Instalar o driver do MongoDB: `npm install mongoose`.
2.  Atualizar o `.env` com a URL do MongoDB: `MONGO_URI=SEU_MONGO_URI_AQUI`.
3.  Criar um novo arquivo (ex: `database/mongo-manager.js`) e reescrever as funções `getUserContext` e `saveUserContext` usando `mongoose` ou o driver nativo.
4.  No `index.js`, alterar a linha `client.db = require('./database/sqlite-manager');` para carregar o novo módulo.

## ☁️ Deploy no Render

Este projeto está configurado para deploy fácil no **Render**.

### Passos para Deploy:

1.  **Crie um Web Service** no Render.
2.  **Conecte seu repositório GitHub**.
3.  **Configurações Importantes**:
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install && npm run build` (Isso instalará as dependências e registrará os comandos Slash).
    *   **Start Command**: `npm start`
4.  **Variáveis de Ambiente (Environment Variables)**:
    *   `DISCORD_TOKEN`: Seu token do bot.
    *   `CLIENT_ID`: ID do seu aplicativo bot.
    *   `PORT`: 3000 (O Render preenche isso automaticamente, mas é bom garantir).

### ⚠️ Nota sobre Persistência (SQLite)
O Render utiliza um Sistema de Arquivos Efêmero no Plano Gratuito. Isso significa que **seu banco de dados SQLite será resetado toda vez que o bot reiniciar ou entrar em modo de espera**. 
*   Para manter os dados, use um **Persistent Disk** (pago) no Render.
*   Alternativamente, migre para um banco de dados externo como **MongoDB (Atlas)** ou **Postgres (Supabase/Neon)**.

### 🔋 Mantendo o Bot Online 24/7
No plano gratuito do Render, o serviço entra em standby após 15 minutos de inatividade. Para evitar que o bot fique offline:
### 🔗 URLs de Configuração (Portal do Discord)

Para configurar as opções avançadas no [Discord Developer Portal](https://discord.com/developers/applications):

*   **Interactions Endpoint URL**: `https://seu-app.onrender.com/api/interactions`
    *   *(Necessário adicionar `PUBLIC_KEY` no seu .env/Render)*
*   **Linked Roles Verification URL**: `https://seu-app.onrender.com/verify-user`
*   **Terms of Service URL**: `https://seu-app.onrender.com/terms-of-service`
*   **Privacy Policy URL**: `https://seu-app.onrender.com/privacy-policy`

---

