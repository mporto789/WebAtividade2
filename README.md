# Rick and Morty Characters App

Este projeto é um aplicativo em **React Native** que consome a API pública de Rick and Morty para exibir uma lista de personagens com paginação, busca, pull-to-refresh e carregamento infinito.

## 📸 Funcionalidades

- ✔️ Listagem de personagens com imagens
- ✔️ Busca por nome com debounce
- ✔️ Paginação automática (infinite scroll)
- ✔️ Pull-to-refresh
- ✔️ Tratamento de erros
- ✔️ Layout responsivo com múltiplas colunas

---

## 🚀 Tecnologias utilizadas

- **React Native**
- **React Hooks** (useState, useEffect)
- **Rick and Morty API**
- **FlatList** com recursos avançados

---

## 📦 Como rodar o projeto

### 1. Clone o repositório
```bash
https://github.com/seuusuario/seurepositorio
```

### 2. Instale as dependências
```bash
yarn install
```
ou
```bash
npm install
```

### 3. Inicie o projeto
```bash
yarn start
```
ou
```bash
npm start
```

---

## 🧩 Estrutura do código
O arquivo principal contém:

- Função `fetchCharacters()` para buscar dados da API
- Estado de busca com debounce
- Paginação dinâmica baseada no scroll
- Renderização responsiva com várias colunas

---

## 🖼️ Preview dos Cards
Cada personagem exibe:
- Imagem
- Nome
- Status
- Espécie
- ID

---

## ⚠️ Possíveis melhorias futuras
- Tema escuro
- Tela de detalhes do personagem
- Cache local com AsyncStorage

---

## 📄 Licença
Este projeto é livre para estudo e modificação.

---

## 💚 API utilizada
- https://rickandmortyapi.com/

