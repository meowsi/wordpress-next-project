# Boilerplate Wordpress

Projeto Inicial para construção de sites e blogs em Wordpress com Docker e Docker Compose.
Exemplos de utilização de [Block Editor](https://developer.wordpress.org/block-editor/) e [Full Site Editing (FSE)](https://developer.wordpress.org/block-editor/getting-started/full-site-editing/)

`Importante:`

- `DP_DEBUG=false nos ambientes de produção e staging`
- `WP_DEFAULT_PASSWORD é a senha padrão do último dump`

# Requerimentos

- Docker
- Docker Compose
- Acesso ao Digital Ocean da Raccoon

# Ambiente local

## Configure o arquivo .env.development

- REPO_NAME: nome do repositorio do Github
- SERVER_NAME: subdominio desejado
- ROOT_PASSWORD: **GERE UMA NOVA SENHA FORTE**

## Iniciando os containers

Para começar o desenvolvimento local, basta executar o seguinte comando no diretório do projeto:
`docker-compose up -d`

- Lembre-se de checar se seu sistema tem o Docker e Docker Compose instalado.
- Certifique que não há nenhum processo utilizando as portas 80 (apache), 8081 (phpmyadmin) e 3306 (mysql)

## Importando banco de dados

- `chmod a+x db` para dar permissão de executar o shell script db
- `bash/db load` para carregar o último dump do mysql localizado em _/data/mysql_

# Digital Ocean

## Configure o arquivo .env.staging

- REPO_NAME: nome do repositorio do Github
- SERVER_NAME: subdominio desejado
- ROOT_PASSWORD: **GERE UMA NOVA SENHA FORTE**

## Criando o Droplet

- Acesse <https://cloud.digitalocean.com/>
- Crie um Droplet Docker do Marketplace
- Cadastre suas infos na seguinte planilha: https://docs.google.com/spreadsheets/d/1CktRZSvPf3txBtlNKZUsn12NGcB9IhbX8PsTKFBlQ9A/edit#gid=0

`ATENÇÃO: Quando o projeto terminar remova o droplet, pois eles geram custo`

## Configurando repositório no Digital Ocean

- Acesse o console do Droplet criado
- Crie uma chave com o comando `ssh-keygen`
- Depois de criar a chave, execute `cat /root/.ssh/id_rsa.pub` e copie a chave pública gerada
- Acesse o github e cadastre a chave SSH no seu perfil (Configurações)
- No console do Droplet, clone o repositório
- Na pasta do repositório execute: `docker-compose -f staging.yml up -d`
- Em seguida carregue o banco: `./db-staging load`

## Alterando o site_url e home no wp_options (mysql)

- Acesse, no seu navegador, o ip do Droplet na porta 8081
- Utilize a senha do arquivo .env para fazer o login com o user _root_
- Navegue até a tabela _wp_options_
- Altere as options _site_url_ e _home_ para http://[ip> do droplet]

## Configurando Dominio

- Acesse o <https://cloud.digitalocean.com/>
- No menu lateral: Networking > Domains > raccoon-stage.com
- Crie um registro do tipo A com os seguintes parametros:
  - HOSTNAME: subdominio (ex. clientex.raccoon-stage.com, o hostname será clientex)
  - WILL DIRECT TO: ip do droplet
  - Não esqueça de remover o registro quando o projeto acabar (cleanup)
- Altere o Site URL no wp-admin

## Configurando SSL

- Acesse o Droplet
- Veja a listagem dos containers: `docker ps`
- Copie o ID do container que utiliza a porta 80/443
- Inicie o Bash via docker exec: `docker exec -it [id do container] bash`
- Execute o comando `certbot` e siga o wizard:
  - Copie os arquivos ssl para o volume /ssl:
    - `cp -f /etc/letsencrypt/archive/*/fullchain1.pem /ssl/fullchain.pem`
    - `cp -f /etc/letsencrypt/archive/*/privkey1.pem /ssl/privkey.pem`

# Utilizando o Container Registry do Github

- No github, acesse Settings > Developer settings > Personal access token
- Crie um novo token com as seguintes permissões
  - repo
  - workflow
  - write:packages
  - delete:packages
- No Droplet do Digital Ocean:
  - `docker login ghcr.io`
  - Utilize o token criado na etapa anterior como senha

## Erros comuns

- Erro 413 ao tentar importar arquivo All-in-One :
  - Execute o seguinte comando `docker ps` e pegue os 4 primeiros dígitos do container do apache recém instalado.
  - Execute o seguinte comando `docker exec -it ID_CONTAINER bash` trocando `ID_CONTAINER` pelos dígitos do container apache que está ocorrendo o erro.
  - Após entrar no container execute `nano /etc/apache2/apache2.conf` e adicione `LimitRequestBody 9999999999` na última linha e salve e feche o arquivo (CTRL + S e depois CTRL + X).
  - E por fim execute o seguinte comando ainda dentro do container `service apache2 restart` e tente subir novamente o arquivo.
