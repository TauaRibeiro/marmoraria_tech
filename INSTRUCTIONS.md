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

* A branch com o nome do colaborador é de responsabilidade única e exclusiva dele no quesito de organização dos commits, visto que será onde os colaboradores irão trbalhar apartir delas. Mas é recomendado utilize o padrão de commits do projeto para não confundir e que também tenha uma sub-branch de testes para a sua própria branch para manter a organização, caso venha a criar uma branch de testes só para os códigos que está trabalhando por favor utilize a seguinte nomeclatura `<nome_colaborador/TEST>` para evitar que confunda a branch pessoal de testes com a do projeto.


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

* É recomendável que faça commit de alterações significativas e que não sejam muito grandes.

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
<hr>

### OBSERVAÇÃO!
* Ao fazer o pull de uma branch do repositório remoto é importante ressaltar que você precisa ter ela criada no seu repositório local. (Ex: se você tentar executar o comando `git pull branch_1` sem ter a branch um no seu repositório local irá dar erro).

* Para fazer o pull de branch que está no repositório remoto mas que não está criada no seu repositório local deve ser utilizado o seguinte comando: `git checkout --track -b <nome_branch_local> <nome_remote>/<nome_branch_remota>`.

* A flag `--track` liga o repositório local com o remoto enquanto a flag `-b` cria uma a branch com o nome providenciado em `<nome_branch_local>` igual a do repositório remoto (recomenda-se que crie com o mesmo nome que a da branch remota para facilitar em futuros pulls).

    * EX:
        ~~~~git
        git checkout --track -b TEST origin/TEST
        ~~~~

* Outra coisa importanto a ser mencionado é que não será necessário se preocupar com a criação de um remote para o repositório, visto que ao fazer o `git clone` o remote já virá criado com o nome **origin**