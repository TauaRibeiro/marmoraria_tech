# ORGANIZAÇÃO REPOSITÓRIO GIT

## BRANCHS

* No repositório git terá as seguintes branchs:

NOME DA BRANCH|DESCRIÇÃO
:--------|:---------:
MAIN|branch principal onde deve ser terá o código funcional e que foi testado, devendo sempre se manter com o mínimo de bugs
TEST|branch onde o terá o código que será testado e validado
<NOME DO COLABORADOR\>| As branchs com os nomes dos colaboradores (aqueles que estão trabalhando no código) irão salvar as suas versões com o código da forma como desejar

<hr>
<br>

* A **MAIN** como descrita, será o principal e nela só poderá ter o código com a versão estável e testada, pois será apartir dela que será feita o pull das alterações, para que todos possam dar o pull em suas respectivas branchs sem que haja problemas com versionamento e/ou erros.

* A **TEST** é onde o código que o colaborador escreveu irá ser colocado para testes. É sempre essencial que `antes de fazer qualquer merge das alterações na branch principal (MAIN), as alterações devem ser passadas para a branch de testes (TEST) para que minimizar possíveis erros com os demais códigos já funcionais`.

* A branch com o nome do colaborador é de responsabilidade única e exclusiva dele no quesito de organização
dos commits, visto que será onde os colaboradores irão trbalhar apartir delas.
Mas é recomendado que utilize o padrão de commits do projeto para se acustumar com esse padrão.

## COMMITS

* É recomendado que os commits seja feitos da seguinte forma `git commit -m "<tipo_commit>:<arquivo(os)_alterado(os)>" -m "<Descrição breve do que foi feito>"`.

* Os tipos de commits que devem ser utilizados para descrever os commits são:

TIPO|DESCRIÇÃO
:----:|:------:
CREATE|Utilizado quando há a criação de um novo arquivo
UPDATE|Utilizado quando há alguma alteração no código trabalhado
DELETE|Utilizado quando é deletado um arquivo
MERGE/\<nome_branch_destino\>| Utilizado quando é feito algum merge

<hr>

* A razão dessa categoriação se deve para manter o histórico git de forma organizada e fácil de ser lida. Para que assim possa ser mais fácil de fazer reversões caso necessário

### EX DE COMMITS

1. git commit -m "MERGE/teste: app.js" -m "Inserção das routers no aqrquivo principal para que a aplicação possa rodar normalmente"
2. git commit -m "CREATE: usuarioService.js" -m "Criação do service de usuários"

* É recomendável que faça commit de alterações que não sejam muito grandes e que façam sentido.

* Caso em algum momento você esteja mexendo em um arquivo e de repente você perceb que vai precisar fazer alterações em um outro, verifique se as alterações feitas possam ser commitadas antes de começar a mexer no outro arquivo.

## COMANDOS GIT

COMANDO|FUNÇÃO
:----|:----:
`git status`|Rode esse comando para saber quais arquivos foram alterados, criados, deletados ou que estejam prontos para commit
`git commit`|Rode esse comando para salvar uma versão do código
`git push <nome_remote> <branch>`|Utilize esse comando para subir os commits de uma branch para o github
`git checkout <nome_branch>`|Utilize esse comando para mudar de branch. Caso seja necessário criar uma nova branch basta colocar um `-b` antes do nome que uma nova branch será criada com esse mesmo nome
`git pull <nome_remote> [nome_branch]`|Utilize esse comando para fazer o pull das alterações de uma branch que está no repositório remoto para a branch do repositório local. Caso o nome da branch não seja passada, será feito o pull da branch principal (main)
`git branch [--remote] [--list]`|Utilize para saber o nome da branch que está trabalhando. Caso deseje ver as branchs locais disponíveis coloque a flag `--list`, agora deseja ver quais as branchs que há no repositório do github utilize junto da flag `--list` a `--remote`
`git clone <url_repositório>`|Clona o repositório remoto
`git merge <nome_branch>`|Faz a junção dos commits da branch passada em `<nome_branch>` na branch em que está

<hr>

### OBSERVAÇÃO

* Ao fazer o pull de uma branch do repositório remoto é importante ressaltar que você precisa ter ela criada no seu repositório local. (Ex: se você tentar executar o comando `git pull branch_1` sem ter a branch um no seu repositório local irá dar erro).

* Para fazer o pull de branch que está no repositório remoto mas que não está criada no seu repositório local deve ser utilizado o seguinte comando: `git checkout --track -b <nome_branch_local> <nome_remote>/<nome_branch_remota>`.

* A flag `--track` liga o repositório local com o remoto enquanto a flag `-b` cria uma a branch com o nome providenciado em `<nome_branch_local>` igual a do repositório remoto (recomenda-se que crie com o mesmo nome que a da branch remota para facilitar em futuros pulls).

  * EX:

        ~~~~git
        git checkout --track -b TEST origin/TEST
        ~~~~

* Outra coisa importante a ser mencionado é que não será necessário se preocupar com a criação de um remote para o repositório, visto que ao fazer o `git clone` o remote já virá criado com o nome **origin**

# COMO RODAR O BACKEND

* Antes de rodar o backend do projeto será nessário criar um arquivo chamado `.env` dentro da pasta `backend`.

* Nesse arquivo deve conter as seguintes informações:

~~~~js
DATABASE_URL = "<URL_DATABASE>"
PORT = 3000
~~~~

* Após a criação do arquivo basta rodar o seguinte comando `npm run backend`, e o servidor será inicializado no seguinte endereço `http://127.0.0.1:3000/`

* Caso o comando acima dê errado, por favor verifique se o node está na versão `v22.17.0` e o npm na `10.9.2`.

* Se mesmo assim causar ao rodar, basta utilizar o seguinte comando `node app.js`

## AVISO

* A razão pela qual é necessário a criação desse arquivo se deve por questão de segurança, visto que esse repositório está público e qualquer um além dos colaboradores e avaliadores
da banco podem ter acesso à ele. **SOMENTE** o arquivo `.env` deve ser exposto à URL do banco de dados e outros dados sensíves *(chaves privadas, senhas e etc)* e nenhuma outro arquivo deve conter essas informação diretamente neles, eles deverão puxar desse arquivo através do seguinte comando `process.env.<NOME_ITEM>`.

## COMO RODAR O FRONTEND

* Para rodar o frontend basta rodar o seguinte comando `npm run dev`
