# Criando uma aplicação Mobile Dinâmica

Esse repositório foi criado para estudo em relação a uma aplicação feita em React Native.
A princial proposta do estudo, é criar um aplicativo que possa rendezar os componentes dinâmicamente através de um Json. Veja um exemplo de Json [aqui](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/constants/moduleParam.ts).

Ou seja, toda uma estrutura de CRUD em modulos, que são buscados da web, e futuramente, criado no armazenamento do celular para manter as informações sem precisar fazer um fetch toda vez.

## iniciando o projeto

1. Instale as dependêcias

   ```bash
   npm install
   ```

2. Inicie o aplicativo

   ```bash
    npx expo start
   ```

   ou caso esteja usando o WSL2 acesse [Expo QR code on Windows Subsystem for Linux (WSL2)](https://www.linkedin.com/pulse/expo-qr-code-windows-subsystem-linux-wsl2-alexandre-gomes-6xxxe/) para saber como fazer o sdk rodar no seu pc

   ```bash
    npm run start:wsl
   ```

3. Abra o aplicativo da Expo no seu celular e escaneio o QR que aparece no terminal

# Ferramentas

- Linguagem:
   Typescript

- Framework:
   React Native c/ Expo

- Bibliotecas:
   @react-native-community/datetimepicker
   @react-navigation
   react-native-reanimated-table

# Componentes

## Formulário

Os formulários são criados automaticamente atrás do Json ModuleParam.[Module Name].formParam, onde carrega todos os campos e suas particularidades.
Atualmente os paramêtros estão em conjunto com outro objeto chamado [params.ts](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/constants/params.ts), que carrega um lote com todos os tipos de campo prédefinidos.

1. [Parâmetros](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/constants/params.ts)

```bash
interface FormParam {
label?: string; # Título do campo
inputType: string; # Tipo de campo, ex.: text box, select, input, boolean
inputMode?: string; # Informa o tipo de teclado que aparece
value: string; # Valor inicial do campo
placeholder?: string; # Valor de pré-prenchimento 
masks?: string[]; # Mascara para campo, ex.: Telefone (##) #####-####, CPF ###.###.###-##
valueMasked?: string; # Valor incial do campo com mascara inclusa 
maxLength?: number; # Tamanho maximo de caracteres (contabiliza as mascaras)
isRequired: boolean; # Se é obrigatório o preenchimento para enviar o formulário
isEditable: boolean; # Se é um campo que permite edição
customCSS?: object; # Caso o campo precise de algum CSS a mais que outros campos
function?: string[]; # WIP
options?: { label: string; value: string }[]; # Opções quando o inputType é Select
link?: { # Link para realizar alguma busca de API online
 paramBeginning: string; # Inicio da URL
 paramSize: number; #tamanho do parâmetro enviado na URL (desconsiderando a mascara)
 paramEnd?: string; # Final da URL caso tenha
 type: "fillform" | "errorMsg" | null; # tipo de ação que vai ser realizada com o fetch
  };
};
```

2. [Criador de formulários](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/components/moduleForm.tsx)

Nesse componente, é feito um map em cada um dos modulos do [ModuleParam](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/constants/moduleParam.ts), e renderiza cada input de acordo com os valores fornecidos no formParam, e realiza as funções basicas como aplicar a mascara, verificar se o campo é obrigatório, enviar o formulário, etc.

## Funções

1. Funções Dinâmicas

**[WIP](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/components/dynamicFunc.tsx)**

## Navegação

1. Biblioteca [React-navigation](https://reactnavigation.org/)

A escolha do React Navigation ao invés do sistema mais atualizado do expo navigation, foi feito por conta da criação dinâmica de rotas que é disponibilizado, onde no expo navigation mesmo sendo mais simples a navegação, ela é feita com o uso de file routing, ou seja, o caminho precisa existir para ser acasso, enquanto o React Navigation permite passar um componente dentro da **Screen**, permitindo a criação de modulos e de navegadores.

2. [Navegador de modulos](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/app/(tabs)/_layout.tsx)

A navegação é criada em forma de cascata com **Navigators** que acomodam **Screens**.

As Tags **Screens** carregam a propriedade **component**, que podem ser carregadas novos React.Component, inclusive novos **Navigators**.

3. Tipos de Navegadores

- Stack: Funciona como um navegador, tendo apenas a opção de ir e voltar
- Drawer: Abre uma gaveta na lateral do celular, liberando todas as screens dentro da mesma
- Tabs: Um menu de icones na parte inferior(padrão) que libera acesso a todas as screens

4. Estrutura (simplificada)
```bash
   <Stack.Navigator> # Navegador pai
      <Stack.Screen # Tela de login
      component={Login}>
      <Stack.Screen # Aplicativo que carrega os modulos
      component={
         <Drawer.Navigator> # Navegador de Modulos
            <Drawer.Screen # Pagina inicial de todos os Modulos
            component={HomeAplicativo}>
            <Drawer.Screen # Gerador de Modulo
            component={
               <Drawer.Navigator> # Navegador do Modulo
                  <Drawer.Screen
                  component={Index}> # Pagina inicial do modulo
                  <Drawer.Screen
                  component={Cadastro}> # Cadastro de novo item do modulo
                  <Drawer.Screen
                  component={Lista}> # Listagem de itens cadastrados
                  ... # Cria paginas de modulo conforme necessário
               <Drawer.Navigator>
            }>
         <Drawer.Navigator>
         ... # Crie novos modulos conforme necessário
      }>
   <Stack.Navigador>
```

## Tabela

1. Biblioteca [react-native-reanimated-table](https://github.com/dohooo/react-native-reanimated-table)

Essa biblioteca foi escolhida por conta da customização e da simplicidade para criar tabelas, o unico problema é a falta de funcionalidades nativas como paginação e busca.

2. [Estrutura](https://github.com/FeQuaresma/CRUD_clientes/blob/main/src/app/useStateTable.tsx)

A tabela foi construida para adaptar o uso de travas e scrolls em pontos especificos, como travar os headers para mover a coluna na vertical, mas na horizontal o header acompanha.
Isso é realizado atráves de um agrupamento de ScrollViews(Tag nativa do React Native) que fazer o ScrollView apenas na direção necessária.

Além disso, é possível travar uma coluna para que a mesma não acompanhe o scroll horizontal, mas o vertical sim, isso foi realizado com a ajuda [desse vídeo no youtube](https://www.youtube.com/watch?v=9tE32G7WGj4). Esse vídeo demonstra uma forma de realizar um link entre duas scrollviews para se moverem ao mesmo tempo sem a necessidade de um ScrollView pai, que movimentaria os headers junto.

3. Esconder Colunas



4. Filtro/Pesquisa