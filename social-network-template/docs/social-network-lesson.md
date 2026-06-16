# Социальная сеть: материалы занятия

Этот проект начинается с раздела **«1. Профиль пользователя»** и включает только то, что делали по социальной сети.

## 1. Профиль пользователя

Цель проекта — собрать простую социальную сеть на Vue:

- загрузка данных страницы пользователя через GET-запрос;
- загрузка постов пользователя через GET-запрос;
- создание нового поста через форму и POST-запрос;
- рендер массивов через `v-for`;
- многостраничность через `vue-router`.

## Чеклист запуска шаблона

1. Скачать шаблон проекта.
2. Проверить, что в папке `json/` есть `users.json` и `posts.json`.
3. Установить npm-пакеты:

```bash
npm install
```

4. Запустить сервер:

```bash
npm run start
```

5. Запустить клиент во втором терминале:

```bash
npm run dev
```

## Заполнение `loadData()`

```js
async loadData() {
    this.isReady = false;

    await this.loadUser();
    await this.loadPosts();

    this.isReady = true;
}
```

## Создание нового поста

```js
async createPost() {
    await axios.post('/post/create', {
        content: this.postContent
    });

    this.postContent = '';

    this.loadPosts();
}
```

## 2. Две страницы. Настраиваем роутер

Установить роутер:

```bash
npm install vue-router
```

Итоговые страницы занятия:

- `/` — профиль текущего пользователя;
- `/friends` — список друзей;
- `/user/:username` — динамическая страница друга;
- `/feed` — лента новостей.

Файл `src/router.js`:

```js
import { createRouter, createWebHistory } from 'vue-router'

import UserPage from './views/UserPage.vue'
import FriendsPage from './views/FriendsPage.vue'
import FeedPage from './views/FeedPage.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'profile',
            component: UserPage
        },
        {
            path: '/friends',
            name: 'friends',
            component: FriendsPage
        },
        {
            path: '/user/:username',
            name: 'user',
            component: UserPage
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedPage
        }
    ]
})
```

## Подключение роутера в `main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

createApp(App).use(router).mount('#app')
```

## Вывод страниц в `App.vue`

```vue
<router-view></router-view>
```

## Переходы через боковую панель

Для кнопки профиля:

```js
goProfile() {
    this.$router.push({
        name: 'profile'
    })
}
```

Для кнопки друзей:

```js
goFriends() {
    this.$router.push({
        name: 'friends'
    })
}
```

Для кнопки новостей:

```js
goFeed() {
    this.$router.push({
        name: 'feed'
    })
}
```

Активный класс проверяется через `$route`:

```vue
:class="{ active: $route.name == 'profile' }"
```

## Переход на страницу друга

```js
goUser(user) {
    this.$router.push({
        name: 'user',
        params: {
            username: user.username
        }
    })
}
```

Динамический адрес:

```txt
/user/:username
```

Пример:

```txt
/user/cligon-1234
```

## Обновление данных при смене маршрута

```js
watch: {
    $route() {
        this.loadData();
    }
}
```

## FeedPage.vue

Страница `/feed` загружает новости через GET-запрос:

```js
async loadFeed() {
    let response = await axios.get('/feed')
    this.feed = response.data
}
```

Вывод массива:

```vue
<div v-for="(item, index) in feed" :key="item._id">
    {{ item.content }}
</div>
```

Дата выводится через:

```js
getRelativeDate(item.createdAt)
```
