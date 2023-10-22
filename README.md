# Resolução do teste para vaga DEV BACKEND NODEJS PLENO.

### Contexto: Desenvolva uma API utilizando Node/TypeScript com qualquer framework web, como Express, Fastify, ou NestJS, por exemplo, e que contemple os requisitos descritos abaixo.

- Para a avaliação do teste, o candidato deverá disponibilizar o link de um repositório público em
  um serviço de controle de código, como Github ou Gitlab, com um README descrevendo o
  desenvolvimento e com instruções para a execução da aplicação.

#### Requisitos funcionais:

- Cadastro de clientes, com integração com serviço de consulta de endereços
- Listagem de clientes com paginação.
- Busca de clientes pelo nome com paginação.
- Exibição dos detalhes de um cliente.
- Exclusão de um cliente.

#### Requisitos não funcionais:

- Utilizar um banco de dados não relacional.
- Utilizar alguma estratégia de cache para armazenamento de consultas de CEP.
- Integrar com pelo menos duas APIs públicas de consulta por CEP, considerando a possibilidade
  de troca de fornecedor sem a necessidade de novas alterações no código
- Utilizar corretamente verbos e status HTTP.
- Padronizar as mensagens de erro com informações consistentes, como códigos de erro
  padronizados e mensagens descritivas que ajudem os usuários a identificar e solucionar
  possíveis problemas.
- Executar o projeto em contêineres Docker.
- Utilizar o servidor web Nginx expondo a porta 8080 para a execução da aplicação.

## Primeiros passos

- Clone este repositório em sua máquina e em seguida no diretorio raiz do projeto execute o comando `npm i` para instalar todas as dependencias necessarias.
- Na pasta raiz do projeto crie um arquivo `.env` e adicione o `DATABASE_URL` e o `REDIS_URL`, eles serão necessarios para conectar a aplicação ao MongoDB e ao Redis.
- No terminar no diretorio onde se encontra o arquivo docker-compose.yaml execute o comando `docker compose up -d` para subir o MongoDB e o Redis.
