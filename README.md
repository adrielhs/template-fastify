# Template Fastify + Prisma + BullMQ

Um template completo de API backend com autenticação, autorização, fila de jobs e agendamento de tarefas.

## 🎯 Características

- ✅ **Autenticação JWT** com Fastify
- ✅ **Autorização por Roles** (Admin, SuperAdmin)
- ✅ **Banco de Dados** com Prisma + PostgreSQL
- ✅ **Fila de Jobs** com BullMQ + Redis
- ✅ **Cron Jobs** para tarefas agendadas
- ✅ **Envio de Emails** com Nodemailer
- ✅ **Soft Delete** de usuários
- ✅ **Validação de Dados** com Zod
- ✅ **Paginação e Filtros** avançados
- ✅ **Exportação para Excel** (XLSX)
- ✅ **Docker Compose** para desenvolvimento
- ✅ **CI/CD** com GitHub Actions

## 📋 Pré-requisitos

- Node.js 20+
- PostgreSQL 12+
- Redis 6+
- Docker e Docker Compose (opcional)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd template-fastify
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure o ambiente

Copie o arquivo `.env.sample` para `.env`:

```bash
cp .env.sample .env
```

Atualize as variáveis de ambiente no arquivo `.env`:

```env
# Servidor
NODE_ENV=dev
PORT=3340
FRONTEND_URL=http://localhost:3000

# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/database_name

# JWT
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRES_IN=1d

# Criptografia
SALT_RESULT=10

# Email
MAIL_HOST=smtp.sua-provedor.com
MAIL_PORT=587
MAIL_SECURITY=true
MAIL_USER=seu-email@exemplo.com
MAIL_PASS=sua-senha-app
MAIL_FROM="Seu Projeto <noreply@exemplo.com>"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 4. Configure o banco de dados

```bash
npx prisma migrate dev
```

### 5. Inicie o servidor

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3340`

## 🐳 Usando Docker Compose

Para desenvolvimento com Docker:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Isso iniciará:
- PostgreSQL
- Redis
- Aplicação (backend)

## 📚 Estrutura do Projeto

```
src/
├── @types/                 # Type definitions
├── config/                 # Configurações (Prisma, etc)
├── modules/
│   └── users/              # Módulo de Usuários
│       ├── infra/          # Controllers e Routes
│       ├── repositories/   # Camada de dados
│       └── use-cases/      # Lógica de negócio
├── shared/
│   ├── dtos/               # Data Transfer Objects
│   ├── env/                # Variáveis de ambiente
│   ├── error/              # Tratamento de erros
│   ├── helper/             # Utilitários
│   │   ├── encrypt/        # Hash de senhas
│   │   ├── jobs/           # Filas e Crons
│   │   ├── logger/         # Logging
│   │   └── mail/           # Envio de emails
│   ├── infra/              # App, Routes, Redis
│   ├── middlewares/        # Middlewares
│   └── utils/              # Funções auxiliares
└── build/                  # Saída da compilação
```

## 🔐 Autenticação e Autorização

### Login

```bash
POST /login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "usuario@example.com",
    "profile": {
      "is_admin": false
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Usando o Token

Adicione o token no header `Authorization`:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Criar Usuário

```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@anything.com",
  "whatsapp": "11999999999",
  "id_profile": 4,
  "avatar": "https://exemplo.com/foto.jpg"
}
```

### Atualizar Usuário (próprio perfil)

```bash
PUT /users/:id
Authorization: Bearer token
Content-Type: application/json

{
  "name": "João Silva Updated",
  "whatsapp": "11988888888"
}
```

### Atualizar Usuário (apenas Admins)

```bash
PUT /users/:id/admin
Authorization: Bearer token
Content-Type: application/json

{
  "name": "Novo Nome",
  "status": true,
  "id_profile": 2
}
```

### Listar Usuários

```bash
GET /users?page=1&limit=10&orderBy=name&direction=asc&queryString=joao&id_profile=4
Authorization: Bearer token
```

### Soft Delete (desativar usuário)

```bash
PATCH /users/:id
Authorization: Bearer token
Content-Type: application/json

{
  "status": false
}
```

### Deletar Usuário (permanente)

```bash
DELETE /users/:id
Authorization: Bearer token
```

## 📧 Recuperação de Senha

### Solicitar Recuperação

```bash
POST /esqueceu-senha
Content-Type: application/json

{
  "email": "usuario@example.com"
}
```

Um email com link será enviado para o usuário.

### Resetar Senha

```bash
PATCH /resetar-senha/:token
Content-Type: application/json

{
  "password": "nova-senha-123"
}
```

## 📋 Padrão de Requisições

Todas as requisições devem seguir o padrão:

```bash
METHOD /path
Authorization: Bearer token
Content-Type: application/json

{
  "campo": "valor"
}
```

**Respostas de Sucesso (2xx):**
```json
{
  "data": { /* dados */ },
  "message": "Operação realizada com sucesso"
}
```

**Respostas de Erro (4xx/5xx):**
```json
{
  "message": "Descrição do erro"
}
```

## 🔄 Filas e Jobs (BullMQ)

### Envio de Emails

Os emails são enviados assincronamente via fila:

```typescript
// Na sua use-case
await mailQueue.add(
  "send-email",
  {
    to: "usuario@example.com",
    subject: "Bem-vindo",
    template: welcomeEmail("João", "http://..."),
    priority: 5,
  },
  {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
  },
)
```

### Visualizar Filas

As filas são gerenciadas pelo BullMQ e persistidas no Redis.

## ⏰ Cron Jobs

O projeto inclui cron jobs automáticos:

### Atualizar Status de Agendamentos

Executa a cada 30 minutos - marca agendamentos como concluídos quando a data esperada passar.

### Finalizar Manutenções

Executa a cada 15 minutos - marca manutenções como finalizadas automaticamente.

Configure em: `src/shared/helper/jobs/Cron-jobs/updateStatus.jobs.ts`

## 📊 Exportar Usuários para Excel

```bash
GET /users/export-users/:user_id
Authorization: Bearer token
```

Gera um arquivo `users.xlsx` com todos os usuários.

## 🧪 Compilação e Build

### Development

```bash
pnpm dev
```

### Build para Produção

```bash
pnpm build
```

Isso gera os arquivos compilados em `./build/`

### Iniciar em Produção

```bash
pnpm start
```

## 🚀 Deploy

### GitHub Actions (CI/CD)

O projeto inclui um pipeline CI/CD automático (`.github/workflows/ci-cd.yml`).

Configure as secrets do GitHub:
- `SSH_PRIVATE_KEY_PRODUCTION`
- `SERVER_HOST_PRODUCTION`
- `SERVER_USER_PRODUCTION`

### Deploy Manual (Release Script)

```bash
chmod +x release.sh
./release.sh
```

Isso:
1. Incrementa a versão
2. Constrói a imagem Docker
3. Para e remove a imagem antiga
4. Sobe os novos containers

## 📝 Roles e Permissões

| Role | Descrição | Permissões |
|------|-----------|-----------|
| **User** | Usuário comum | Atualizar próprio perfil |
| **Admin** | Administrador | Gerenciar usuários |
| **SuperAdmin** | Super administrador | Acesso total |

Verifique permissões com:
```typescript
const isAdmin = await checkIsAdmin.checkIsAdmin(user_id)
```

## 🛠️ Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NODE_ENV` | Ambiente | `dev`, `test`, `production` |
| `PORT` | Porta do servidor | `3340` |
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://...` |
| `JWT_SECRET` | Chave secreta JWT | gerada automaticamente |
| `JWT_EXPIRES_IN` | Expiração do token | `1d`, `24h` |
| `MAIL_HOST` | Host SMTP | `smtp.gmail.com` |
| `REDIS_HOST` | Host Redis | `localhost` |

## 🐛 Troubleshooting

### Erro de conexão com PostgreSQL

```bash
# Verifique se o PostgreSQL está rodando
psql -U postgres
```

### Erro de conexão com Redis

```bash
# Verifique se o Redis está rodando
redis-cli ping
# Retorno esperado: PONG
```

### Erro ao enviar email

Verifique as credenciais SMTP no `.env` e se o servidor de email está acessível.

## 📖 Documentação Adicional

- [Fastify Docs](https://www.fastify.io/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [BullMQ Docs](https://docs.bullmq.io/)
- [Zod Docs](https://zod.dev/)

## 📄 Licença

MIT

## 👨‍💻 Autor

Seu Nome - [@seu-github](https://github.com/seu-github)

---

**⭐ Se este template foi útil, considere deixar uma estrela no GitHub!**