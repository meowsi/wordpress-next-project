# Projeto em Next / Wordpress / SASS

Pode ser usado como boilerplate para blogs em Next.js com Wordpress.

<br />

## Instalação do Wordpress

- Criar novo site no localwp:
- Escolher user/senha
- Selecionar a versão do PHP
- Instalar a versão 6.7 do plugin all-in-one
- Instalar o plugin Advanced File Manager
- No Advanced File Manager: wp-content > ai1wm-backups > colar aqui arquivo de exportação
- No localwp clicar “go to site folder"
- app > public > wp-content > plugins > all-in-one-wp-migration > constants.php: 
- define( 'AI1WM_MAX_FILE_SIZE', 10737418240 );
- Em all-in-one: backups > restaurar
- app > public > wp-config.php:
- ini_set('display_errors','Off');
- ini_set('error_reporting', E_ALL );
- define('WP_DEBUG', false);
- define('WP_DEBUG_DISPLAY', false);

<br />

## Backend

Projeto em docker <br />
Para o backend utilizamos o wordpress com os seguites plugins por padrão:

- [ACF Pro](https://www.advancedcustomfields.com/resources/)
- [GraphQL](https://www.wpgraphql.com/docs/posts-and-pages)

<br />

## Frontend

Projeto em Next.Js <br />
Requisições criadas pelo [Apollo](https://www.apollographql.com/docs/react/get-started)

<br />

### TO DO

- Adicionar testes automatizados
- Adicionar typescript
- Adicioanr Painel de SEO no WORDPRESS
- Ajustar aqruivo db para MAC, os continaers são criados com '-' ao invés de '\_'
