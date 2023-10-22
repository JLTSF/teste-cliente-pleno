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

- Clone este repositório em sua máquina e em seguida no diretorio raiz do projeto execute o comando `docker compose up -d` para subir a aplicação, o MongoDB e o Redis.
- A aplicação ficara disponivel na porta `8080`, para testar se deu tudo certo, a rota `http://localhost:8080/api/v1/health` devera retornar um `OK`.

```
{
    "status": "OK",
    "version": "1.0.0"
}
```

- A collection do postman está disponivel [clicando aqui!](https://pastebin.com/raw/tJgm8qwW)

## Exemplos de requisições

### Cadastro de um cliente:

- [POST] <`http://localhost:8080/api/v1/clients`>
- Request:

  ```
  {
    "name": "João",
    "email": "joao@autovist.com.br",
    "phone": "11999887766",
    "cep": "01001000",
  }
  ```

- Response:

  ```
  {
    "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
    "name": "João",
    "email": "joao@autovist.com.br",
    "phone": "11999887766",
    "address": {
      "cep": "01001000",
      "street": "Praça da Sé",
      "neighborhood": "Sé",
      "city": "São Paulo",
      "state": "SP"
    }
  }
  ```

### Listagem de clientes:

- [GET] <`http://localhost:8080/api/v1/clients`>

- Response:

  ```
  {
    "count": 10,
    "previous": null,
    "next": "http://localhost:3000/api/v1/clients?limit=2&offset=2",
    "results": [
      {
        "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
        "name": "João",
      },
      {
        "id": "e486af2c-e5da-4a9b-916e-55a41d26e22d",
        "name": "Maria",
      },
    ]
  }
  ```

### Detalhes de um cliente:

- [GET] <`http://localhost:8080/api/v1/clients/bd981cab-d315-4486-85c7-c6af24c475f9`>

- Response:

  ```
  {
      "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
      "name": "João",
      "email": "joao@autovist.com.br",
      "phone": "11999887766",
      "address": {
        "cep": "01001000",
        "street": "Praça da Sé",
        "neighborhood": "Sé",
        "city": "São Paulo",
        "state": "SP"
      }
    }
  ```

### Exclusão de um cliente:

- [DELETE] <`http://localhost:8080/api/v1/clients/bd981cab-d315-4486-85c7-c6af24c475f9`>

- Response:

  ```
  { "message": "Client deleted successfully" }
  ```
