# 📋 ToDo App — Ionic + MVVM + Clean Architecture

## Descrição

Aplicativo de Lista de Tarefas desenvolvido com **Ionic + Angular**, utilizando **MVVM + Clean Architecture** e integração com [MockAPI.io](https://mockapi.io/). O app permite criar, editar, excluir e agendar lembretes com **notificações locais** (Android e iOS).

---

## 🧱 Arquitetura

- **MVVM** (Model-View-ViewModel)
- **Clean Architecture** (divisão clara por camadas)
- **Reactive Forms**
- **Capacitor Plugins** (notificações locais)
- **MockAPI.io** como backend fake

---

## ✨ Funcionalidades

- ✅ Listagem de tarefas
- ✅ Criação e edição com formulário reativo
- ✅ Campo de lembrete (data e hora)
- ✅ Notificações locais
- ✅ MockAPI para persistência online
- ✅ Responsivo e pronto para Android/iOS

---

## 🔔 Notificações Locais

- Utiliza `@capacitor/local-notifications`
- Permissão solicitada automaticamente
- Notificação reagendada ao editar a tarefa
- Cancelamento automático ao excluir tarefa

---

## 🔧 Tecnologias e Bibliotecas

- [Ionic Framework](https://ionicframework.com/)
- [Angular Signals](https://angular.io/guide/signals)
- [MockAPI.io](https://mockapi.io/)
- [Capacitor Local Notifications](https://capacitorjs.com/docs/apis/local-notifications)
- [RxJS](https://rxjs.dev/)

---

## 🚀 Como executar

```bash
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app

npm install
npx cap sync

# Rodar no navegador (sem notificações)
ionic serve

# Rodar em Android ou iOS
ionic cap run android --device
ionic cap run ios --device
```

•	Prints ou vídeo do app
•	Como rodar

---

## 🔗 Link da API mockada

- https://685870dd138a18086dfaf840.mockapi.io/api/v1/tasks


---

## 🚀 Diferenciais Técnicos

- Estrutura com separação de camadas por Clean Architecture
- Uso de ViewModel isolado da camada de UI (MVVM puro)
- Integração com API fake e pronta para testes
- Notificações nativas programadas automaticamente
- Formulário reativo com validação de campos
- Pronto para escalar com novos módulos e entidades

---

## 🧑‍💻 Autor

Desenvolvido por Clei Sabino

📧 cleisabino@hotmail.com

🔗 [www.linkedin.com/in/clei-sabino-528a21a1](www.linkedin.com/in/clei-sabino-528a21a1)

🐙 [github.com/cleisabino](https://github.com/cleisabino)

---

## 📝 Licença

- MIT © 2025 - Você pode usar, modificar e compartilhar à vontade.
