Entendendo o Projeto.

myapk ==> Code Angular front end.

myapp ==> Code  Node.js api 

O Node. js pode ser definido como um ambiente de execução Javascript server-side.
Isso significa que com o Node. js é possível criar aplicações Javascript
para rodar como uma aplicação standalone em uma máquina, não dependendo de um browser
 para a execução, como estamos acostumados

Criação do Projeto NODE + Express + MYSQL

-- Esse passo instala o express CLI para auxilair a criação do Projeto NODE + EXPRESS.
npm install express-generator -g

-- Criar o projeto da API usando o seguinmte linha de Instrução:
express --view=html myapp

-- Usamos a seguinte intrução apra instalar a lib do MYSQL, dentro do projeto myapp
npm i mysql2 --save

--> realizamos a criação das dos endpoints na pasta de routes.


=====================================================       myapk Inicio    ===================================================== 


package.json ==> Observação :

No script mobile podemos configura para :

desenvolvimento ==> "mobile": "ng b --prod  --aot  && npx cap copy && npx cap copy android && npx cap open android"

produção ==> "mobile": "ng b --prod --configuration=production --aot  && npx cap copy && npx cap copy android && npx cap open android"

teste ==> "mobile": "ng b --prod --configuration=teste --aot  && npx cap copy && npx cap copy android && npx cap open android"

Exemplo para Produção :
  "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }

Exemplo para teste :
            "teste": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.teste.ts"
                }

Se não for teste nem producao assumimos ambiente de dev e esta diretriz é ignorada.

environment.ts      ==> Definição LOCAL ( DESENVOLVIMENTO ) local API conexao com o banco ==> Exemplo : serveApi: "http://localhost:3000"
environment.prod.ts ==> Definicao WEB   ( PRODUCAO )        local API conexao com o banco ==> Exemplo : serveApi: "https://meuproduto.herokuapp.com"


app ==> model ==> categoria-model.ts ==> export interface Categoria ( definicao da estrutura de Categoria )
app ==> model ==> marca-model.ts ==> export interface Marca ( definicao da estrutura de Marca )
app ==> model ==> pesquisa ==> pesquisa-routing.module.ts ==> import { PesquisaPage } from './pesquisa.page';   ( Defino o local da api <<serveApi>>)
app ==> model ==> pesquisa ==> pesquisa.page.html ==>  Formulario html.
app ==> model ==> pesquisa ==> app.module.ts  ==>  IMPORTANTISSIMO.



										import { AgmCoreModule } from '@agm/core';  ==> componentes AGM (Google Maps Angular)
										apiKey: 'VOCE DEVE CRIAR A SUA CONFORME REGRAS DO GOOGLE'
Para maiores informacoes sobre apiKey :
										https://cloud.google.com/maps-platform?hl=pt
										https://developers.google.com/maps/documentation/javascript/get-api-key


app ==> model ==> pesquisa ==> pesquisa.page.ts  ==> Servicos de requerimento 
Service request  :
					ngOnInit()
					public async pesquisar()
					async getCurrentCoordinates()
					getParameter()
					public async pesquisar() 
					public getCategoria()
					public getMarca() 

===============> Observações Gerais

Para a Geolocalização foi utilizado o componentes AGM (Google Maps Angular)
Observação ==> componentes angulares para o Google Maps. (Anteriormente conhecido como angular2-google-maps)
Ref : https://angular-maps.com/api-docs/agm-core/index.html
app.module.ts  ==> import { AgmCoreModule } from '@agm/core'; 

npm run mobile ==> Com isso consigo buildar apk, abrindo o android studio e buildar a apk no android studio conforme descrito (No script mobile)

ng serve ==> Rodo localmente o projeto
npm run mobile ==> Com isso consigo buildar apk, abrindo o android studio e buildando a apk no android studio 

local geracao apk C:\Users\Rosemberg\Documents\ESTUDO\POS\Engenharia de Software\mobil\myapk\android\app\build\outputs\apk\debug

=====================================================       myapk Fim     ===================================================== 




=====================================================       myapp  Inicio    ===================================================== 

Express Creator

config ==> database.json  ==> Definição string conexao banco ==> server,port,user,pass,database  <<FAVOR CONFIGURA A SUA CONEXAO>>
controller ==> database ==> index.js ==> MySQL client for Node.js  ==> const mysql = require('mysql2');  << executeQuery >> 
middlewares ==> error.js ==> Aviso de erro ==>  Podemos configura mais avisos de erros.

routes :

routes ==> categoria.js ==> router.get("/", async (req, res, next) => let sql = `SELECT * FROM tb_categoria_produto`
routes ==> localidades.js ==> Observações :

											let sql = `SELECT *, distanciaEntreCoordenadas(${latitude}, ${longitude},CONVERT(latitude,decimal(19,6)), CONVERT(longitude,decimal(19,6)) ) as distancia FROM pesquisa WHERE 1=1 `
											## ==> Onde 1=1 serve para iniciar o filtro.
											Filtro :
											         if (categoria) {
											                sql += ` AND  categoria = '${categoria}'`;
											            }
											         
											            if (marca) {
											                sql += ` AND marca = '${marca}' `;
											            }
											         
											            if (produto) {
											                sql += ` AND  nome like '%${produto}%' `;
											            }
											         
											            if (distancia) {
											                sql += ` AND distanciaEntreCoordenadas(${latitude}, ${longitude} ,CONVERT(latitude,decimal(19,6)), CONVERT(longitude,decimal(19,6)) ) <= ${distancia} `;
											            }
											         
											         
											            db.executeQuery(sql).then(r => {
											         
											                return res.status(200).json(r);
											            });

routes ==> marca.js==> router.get("/", async (req, res, next) =>   let sql = `SELECT * FROM tb_marca_produto`;

=====================================================       myapp  Fim    ===================================================== 


=====================================================       MySql Incio    ===================================================== 

=============================> Criação da Função para calculo de GeoProcessamento 

CREATE FUNCTION `distanciaEntreCoordenadas`(
	`lat_origem` DECIMAL(19,10),
	`lng_origem` DECIMAL(19,10),
	`lat_dest` DECIMAL(19,10),
	`lng_dest` DECIMAL(19,10)
)
RETURNS decimal(10,0)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT 'retorna  distancia entre coordenadas .'
BEGIN
  RETURN (6371 *
        acos(
            cos(radians(lat_origem)) *
            cos(radians(lat_dest)) *
            cos(radians(lng_origem) - radians(lng_dest)) +
            sin(radians(lat_origem)) *
            sin(radians(lat_dest))
        ));
 END



=============================> Criação da View para facilitar a pesquisa

--
-- Estrutura para vista `pesquisa`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` 
SQL SECURITY DEFINER VIEW `pesquisa`  AS  select `a`.`id_loja` AS `id_loja`,`a`.`id_produto` AS `id_produto`,
                                                 `b`.`id` AS `idloja`,`b`.`latitude` AS `latitude`,`b`.`longitude` AS `longitude`,
                                                 `b`.`nome` AS `nomeloja`,`c`.`id` AS `idproduto`,`c`.`categoria` AS `categoria`,
                                                 `c`.`descricao` AS `descricao`,`c`.`marca` AS `marca`,`c`.`nome` AS `nome`
										  from ((`tb_loja_produto` `a` join `tb_loja` `b` on(`a`.`id_loja` = `b`.`id`)) 
                                                 join `tb_produto` `c` on(`c`.`id` = `a`.`id_produto`)) ;

--

=====================================================       MySql Fim    ===================================================== 