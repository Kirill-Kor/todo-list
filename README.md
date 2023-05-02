# todo-list
## Тестовое задание

### Стек:  
Бэкенд: Node.js, Express.js, MySQL  
Фронт: React

### Описание:    

БД и таблицы создавал вручную, поэтому прикладываю дамп.
Тестировал локально, бэк на 3000 порту, фронт на 3001, соответственно cors и api привязаны к этим портам.  

При открытии приложения появляются 2 кнопки: Вход и Регистрация. При регистрации можно указать своего руководителя, список руководителей - все пользователи.
После входа открывается главная страница с заданиями. Задания либо принадлежат текущему пользователю, либо подчинённым текущего пользователя.
Добавлять задания могут только пользователи, которых кто-то указал как руководителей.
Те, у кого нет подчинённых, не могут ни добавлять новые задания, ни изменять текущие (кроме статуса).

### Известные проблемы и что стоит доработать  
+Превалидация входящих данных (например библиотека celebrate)
+Валидация данных на клиенте (react-hook-form)
+Возможно стоило использовать ORM (например sequelize)
+Перенести переменные конфига в .env
