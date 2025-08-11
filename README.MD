# sistema-votacao

## Descrição

Este projeto é uma aplicação fullstack para gerenciamento de posts e fotos, composta por um backend em Node.js com TypeScript e um frontend em React. O objetivo é fornecer uma API robusta para criação, edição, listagem e remoção de posts e fotos, além de uma interface web moderna para interação com esses dados.

## Tecnologias Utilizadas

- **Backend**

  - Node.js
  - TypeScript
  - Express
  - Prisma ORM
  - PostgreSQL
  - Jest (testes)
  - Docker (para banco de dados)
  - ESLint & Prettier

- **Frontend**
  - React
  - TypeScript
  - Vite
  - Axios
  - React Router DOM

## Arquitetura do Backend

O backend segue princípios de arquitetura limpa (Clean Architecture), separando responsabilidades em diferentes camadas:

- **Domain**: Entidades de domínio puras, como `Post` e `Photo`, localizadas em [`src/domain/entities`](src/domain/entities).
- **Core**: Classes base e utilitários de domínio, como [`Entity`](src/core/domain/Entity.ts).
- **Application**: Casos de uso (use cases) e interfaces de repositórios, localizados em [`src/application`](src/application). Os casos de uso implementam a lógica de negócio, enquanto os repositórios definem contratos para acesso a dados.
- **Infraestrutura (Prisma)**: Implementações concretas dos repositórios usando Prisma ORM, em [`src/application/repositories/prisma`](src/application/repositories/prisma).
- **Rotas**: Definição das rotas HTTP em [`src/routes/routes.ts`](src/routes/routes.ts), conectando os casos de uso à API REST.
- **Testes**: Repositórios em memória e testes unitários para os casos de uso, em [`test/repositories`](test/repositories) e [`src/application/useCases`](src/application/useCases).

A comunicação com o banco de dados é feita via Prisma, e o projeto utiliza o padrão Repository para desacoplar a lógica de negócio da persistência de dados.

## Como rodar o projeto

1. Configure o arquivo `.env` com as variáveis necessárias (veja `.env.example`).
2. Suba o banco de dados com Docker:

   ```sh
   make up
   ```
