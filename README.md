# App de exemplo para compras de cafés, Desafio Stone tech.

## Foi usado o React Native boilerplate [Ignite](https://github.com/infinitered/ignite)

![ezgif com-video-to-gif](https://github.com/wwwjsw/ComprasApp/assets/10338666/d7167a50-fa3b-4474-bb1f-88336be262fd)

## Incluido nos pacotes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- i18n

### Dependências
- node.js >= 18.12.0
- Instalar [ngrok](https://docs.expo.dev/more/expo-cli/#tunneling) para o seridor de desenvolvimento ou caso o projeto vá rodar em emulador basta remover a opção `--tunnel` do arquivo `package.json` no script `expo:start`.

## Setup do projeto
 - Clonar o repositório: `git clone git@github.com:wwwjsw/ComprasApp.git`.
 - Acessar a pasta pelo terminal: `cd ComprasApp`.
 - Instalar dependências: `npm install`.
 - Rodar o servidor do projeto `npm run expo:start`.

## Quick Start

A estrutura do Ignite boilerplate vai parecer com isso:

```
ignite-project
├── app
│   ├── components
│   ├── config
│   ├── i18n
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── utils
│   ├── app.tsx
├── test
│   ├── __snapshots__
│   ├── mockFile.ts
│   ├── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   └── templates
|       |── app-icon
│       ├── component
│       ├── model
│       ├── navigator
│       └── screen
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### O diretório ./app

Incluído em um projeto boilerplate do Ignite está o diretório `app`. Este é um diretório que você normalmente teria que criar ao usar o vanilla React Native.

Internamente o diretório `app` vai se parecer similar com o seguinte:

```
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
├── app.tsx
```

**components**
É aqui que vivem os seus componentes reutilizáveis que o ajudam a construir as suas telas.

**i18n**
É aqui que suas traduções estão se você estiver usando `react-native-i18n`.

**models**
É aqui que os modelos do seu aplicativo vão morar. Cada modelo tem um diretório que conterá o arquivo de modelo `mobx-state-tree`, arquivo de teste e quaisquer outros arquivos de suporte, como ações, tipos, etc.

**navigators**
É aqui onde fica a navegação do `react-navigation`.

**screens**
É aqui que os componentes da tela vão morar. Uma tela é um componente do React que ocupará toda a tela e fará parte da hierarquia de navegação. Cada tela terá um diretório contendo o arquivo '.tsx', juntamente com quaisquer ativos ou outros arquivos auxiliares.


**services**
Quaisquer serviços que interajam com o mundo exterior viverão aqui (pense em APIs REST, Notificações Push, etc.).

**theme**
Aqui reside o tema para seu aplicativo, incluindo espaçamento, cores e tipografia.

**utils**
Este é um ótimo lugar para colocar ajudantes e utilitários diversos. Coisas como ajudantes de data, formatters, etc. são frequentemente encontrados aqui. No entanto, ele só deve ser usado para coisas que são realmente compartilhadas em seu aplicativo. Se um auxiliar ou utilitário for usado apenas por um componente ou modelo específico, considere colocalizar seu auxiliar com esse componente ou modelo.

**app.tsx** Este é o ponto de entrada para seu aplicativo. É aqui que você encontrará o componente principal do aplicativo que renderiza o resto do aplicativo.

### ./ignite directory
O diretório `ignite` armazena todas as coisas do Ignite, incluindo CLI e itens do boilerplate. Aqui você encontrará modelos que você pode personalizar para ajudá-lo a começar a usar o React Native.


### ./test directory
Este diretório manterá suas configurações Jest e mocks.

## Running Maestro end-to-end tests (NOT IMPLEMENTED)
Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe from the [Ignite Cookbook](https://ignitecookbook.com/)!


