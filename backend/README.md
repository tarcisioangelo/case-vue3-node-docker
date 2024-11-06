# API REST

- NodeJS
- TypeScript
- Prisma ORM
- Banco de dados Postgres
- Routing Controllers com decorators
- Autenticação JWT
- Validação de dados com class-validate
- Validação de dados CSRF usando token
- Segurança com Helmet

## Rodando localmente

#### Rodando o banco de dados Postgres 

`docker compose up -d`

#### Rodando a aplicação

`cp .env.dev .env`

`npm install`

`npm run dev`

acesse: <link>http://localhost:8080</link>

### Observação
Se o seu banco de dados estiver em outra região como configuração, basta modificar o .env na variável LOCALE_SUB como 3 por exemplo, ele irá colocar a hora com 3 horas e menos

## Testes
`npm run test`


## Processo de Build

Existem arquivos de configuração de deploy na AWS, para isso você deve configurar o passo a passo para funcionar na sua infra.