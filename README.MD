# Blog de fotos e posts

## Descrição

Este projeto é uma aplicação fullstack para gerenciamento de posts e fotos, composta por um backend em Node.js com TypeScript e um frontend em React. O objetivo é fornecer uma API robusta para criação, edição, listagem e remoção de posts e fotos, além de uma interface web moderna para interação com esses dados.

## Backend — Arquitetura e Tecnologias

O backend foi desenvolvido com foco em escalabilidade, testabilidade e separação de responsabilidades, seguindo os princípios da **Clean Architecture**. Abaixo estão os principais pontos da arquitetura e tecnologias utilizadas:

### Tecnologias

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Express**: Framework para criação de APIs REST.
- **Prisma ORM**: Abstração para acesso ao banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência.
- **Jest**: Framework de testes unitários.
- **Docker**: Utilizado para orquestração do banco de dados em ambiente de desenvolvimento.
- **ESLint & Prettier**: Ferramentas para padronização e qualidade do código.

### Estrutura de Pastas

- [`src/domain/entities`](backend/src/domain/entities): Entidades de domínio puras, como [`Post`](backend/src/domain/entities/Post.ts) e [`Photo`](backend/src/domain/entities/Photo.ts).
- [`src/core/domain`](backend/src/core/domain): Classes base, como [`Entity`](backend/src/core/domain/Entity.ts), que abstraem comportamentos comuns das entidades.
- [`src/application`](backend/src/application): Casos de uso (use cases) e interfaces de repositórios. Os casos de uso implementam a lógica de negócio, enquanto os repositórios definem contratos para acesso a dados.
- [`src/application/repositories/prisma`](backend/src/application/repositories/prisma): Implementações concretas dos repositórios usando Prisma ORM, como [`PrismaPostRepository`](backend/src/application/repositories/prisma/prisma-post-repository.ts) e [`PrismaPhotoRepository`](backend/src/application/repositories/prisma/prisma-photo-repository.ts).
- [`src/routes`](backend/src/routes): Definição das rotas HTTP em [`routes.ts`](backend/src/routes/routes.ts), conectando os casos de uso à API REST.
- [`test/repositories`](backend/test/repositories): Repositórios em memória para testes unitários.
- [`src/application/useCases`](backend/src/application/useCases): Testes unitários dos casos de uso, garantindo a qualidade da lógica de negócio.

### Fluxo de Dados

1. **Requisição HTTP**: O usuário faz uma requisição para a API (por exemplo, criar um post).
2. **Roteamento**: A requisição é recebida pelas rotas definidas em [`routes.ts`](backend/src/routes/routes.ts).
3. **Caso de Uso**: A rota invoca o caso de uso correspondente, que contém a lógica de negócio.
4. **Repositório**: O caso de uso utiliza um repositório (interface) para acessar ou modificar os dados.
5. **Prisma ORM**: O repositório concreto utiliza o Prisma para interagir com o banco de dados PostgreSQL.
6. **Resposta**: O resultado é retornado para o usuário via API.

### Testes

- Os testes unitários utilizam repositórios em memória para simular operações sem depender do banco de dados real, garantindo rapidez e isolamento dos testes.
- Os casos de uso são testados em [`src/application/useCases`](backend/src/application/useCases), cobrindo cenários de sucesso e erro.

### Banco de Dados

- O schema do banco está definido em [`prisma/schema.prisma`](backend/prisma/schema.prisma), com as tabelas `posts` e `photos`.
- As migrações são gerenciadas pelo Prisma e armazenadas em [`prisma/migrations`](backend/prisma/migrations).

### Execução

1. Configure o arquivo `.env` com as variáveis necessárias (veja `.env.example`).
2. Suba o banco de dados com Docker:

   ```sh
   make up
   ```

3. Execute o backend em modo desenvolvimento:

   ```sh
   npm run dev
   ```

---

O backend está preparado para evoluir, permitindo fácil adição de novas entidades, casos de uso e integrações, mantendo o sistema organizado e testável.
