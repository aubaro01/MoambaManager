
# MoambaManager

Uma webApp para gestão de uma loja de produtos diversos.

## Stack utilizada

**Node.js**, **MongoDB**, **Express.js**, **React.js**


## Funcionalidades

- Adicionar, filtar por datas, ver todas as vendas, editar e apagar vendas.
- Adicionar, filtar por produto, ver todos os produtos, editar e apagar produtos.
- Definir objetivos mensais/anuais.
- Autenticação de utilizadores.


## Documentação da API

#### Base url

```http
   localhost:5000/api/v1
```

#### Registro de user

```http
  Post /user/register
```

| Campo    | Tipo   | Descrição                  | Obrigatório |
| -------- | ------ | -------------------------- | ----------- |
| **`logName`**  | string | Nome de login | Sim         |
| **`Nome`** | string | Nome do user         | Sim         |
| **`password`** | string | Password         | Sim         |

#### Requisição
```json 
{
    "nome": "Silas",
    "logName": "Teste12",
    "password": "Teste12"
}
```

Resposta

```diff
+ User criado com sucesso!
```

#### Login do user na app

```http
  Post /user/login
```

| Campo    | Tipo   | Descrição                  | Obrigatório |
| -------- | ------ | -------------------------- | ----------- |
| **`logName`**  | string | Nome de login | Sim         |
| **`password`** | string | Password         | Sim         |


#### Requisição
```json 
{
  "logName": "Teste12",
  "password": "Teste12"
}
```

#### Resposta

``` json
{
    "message": "Login bem-sucedido!",
    "token": "token",
    "user": {
        "id": "id",
        "nome": "nome",
        "logName": "Teste12"
    }
}
```


#### Inserir produtos

```http
  Post /product
```

| Campo     | Tipo   | Obrigatório | Descrição                         | Valores Permitidos                       | Observações                          |
| --------- | ------ | ----------- | --------------------------------- | ---------------------------------------- | ------------------------------------ |
| nome      | String | Sim         | Nome do produto                   | —                                        |                                      |
| preco     | Number | Sim         | Preço do produto                  | —                                        |                                      |
| peso      | Number | Sim         | Peso do produto                   | Valor mínimo: 1                          |                                      |
| pesoTipo  | String | Sim         | Unidade de medida do peso         | "KG", "LT", "Gr", "Uni"                  | Enum (valores fixos)                 |
| descricao | String | Não         | Descrição do produto              | —                                        | Opcional                             |
| categoria | String | Sim         | Categoria do produto              | "alimentar", "bebidas", "não comestivel" | Enum (valores fixos)                 |
| criadoEm  | Date   | Não         | Data de criação do registro       | —                                        | Valor padrão: `Date.now`, imutável   |
| EditadoEm | Date   | Não         | Data da última edição do registro | —                                        | Atualizado automaticamente em update |
 
#### Requisição

``` json
{
  "nome": "Arroz Integral",
  "preco": 15.99,
  "peso": 1,
  "pesoTipo": "KG",
  "descricao": "Arroz integral tipo 1, pacote de 1kg.",
  "categoria": "alimentar"
}
```

#### Resposta

``` json

  {
    "_id": "685d5342261f41c627ae1821",
    "nome": "Arroz Integral",
    "preco": 15.99,
    "peso": 1,
    "pesoTipo": "KG",
    "descricao": "Arroz integral tipo 1, pacote de 1kg.",
    "categoria": "alimentar",
    "criadoEm": "2025-06-26T14:03:46.029Z",
    "EditadoEm": "2025-06-26T14:03:46.029Z",
     "__v": 0
}
```

#### Retorna todos produtos

```http
  Get /products
```

#### Resposta

``` json

{
    "page": {
        "totalPages": 1,
        "totalElements": 2,
        "currentPage": 1,
        "firstPage": 1,
        "nextPage": null,
        "lastPage": 1,
        "previousPage": null
    },
    "content": [
        {
            "_id": "685d22ba4b85c084898d6b1e",
            "nome": "Farrinha de Mandioca",
            "preco": 5,
            "peso": 20,
            "pesoTipo": "KG",
            "descricao": "",
            "categoria": "Alimentar",
            "criadoEm": "2025-06-26T10:36:42.957Z",
            "EditadoEm": "2025-06-26T10:36:42.957Z",
            "__v": 0
        },
```

#### Retorna o total de produtos

```http
  GET /allProducts
```

#### Resposta

``` json
    {
        "totalProducts":1
    }
```


#### Update produto

```http
  Put /product/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O id do produto que  quer alterar. |

#### Requisição
```json
{
	"nome": "Farrinha de Milho(Branca)" -> campo alterar com dos dados alterar
}
``` 

#### Resposta
 ```json
 {
    "_id": "685d22ba4b85c084898d6b1e",
    "nome": "Farrinha de Milho(Branca)", -> campo alterado
    "preco": 5,
    "peso": 20,
    "pesoTipo": "KG",
    "descricao": "",
    "categoria": "Alimentar",
    "criadoEm": "2025-06-26T10:36:42.957Z",
    "EditadoEm": "2025-06-26T16:09:41.223Z",
    "__v": 0
}
```

### Deletar produto

```http
  Delete /product/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `ObjectId` | **Obrigatório**. O id do produto que  quer deletar. |


#### Resposta

```json
{
    "message": "Produto deletado com sucesso"
}
```
