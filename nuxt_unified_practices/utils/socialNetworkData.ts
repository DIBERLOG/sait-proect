export type SocialUser = {
  username: string
  firstName: string
  lastName: string
  phone: string
  avatar: string
  info: string
}

export type SocialPost = {
  id: string
  username: string
  name: string
  avatar: string
  content: string
  createdAt: string
  likes?: number
}

export const socialUsers: SocialUser[] = [
  {
    username: 'admin',
    firstName: 'Егор',
    lastName: 'Ангелов',
    phone: '+7-000-000-00-00',
    avatar: 'user0.png',
    info: 'Разрабатываю учебную социальную сеть на Vue, настраиваю маршруты, формы и загрузку данных через API.'
  },
  {
    username: 'user1',
    firstName: 'Александр',
    lastName: 'Николаев',
    phone: '+7-111-111-11-11',
    avatar: 'user1.png',
    info: 'Люблю фронтенд, читаю новости технологий и делюсь полезными заметками с друзьями.'
  },
  {
    username: 'user2',
    firstName: 'Игорь',
    lastName: 'Лебедев',
    phone: '+7-222-222-22-22',
    avatar: 'user2.png',
    info: 'Изучаю JavaScript, Vue и работу с серверными запросами в учебных проектах.'
  },
  {
    username: 'user3',
    firstName: 'Анна',
    lastName: 'Сидорова',
    phone: '+7-333-333-33-33',
    avatar: 'user3.png',
    info: 'Пишу заметки о дизайне интерфейсов, удобной навигации и командной работе.'
  },
  {
    username: 'user4',
    firstName: 'Татьяна',
    lastName: 'Макарова',
    phone: '+7-444-444-44-44',
    avatar: 'user4.png',
    info: 'Собираю интересные материалы по веб-разработке и помогаю друзьям с проектами.'
  }
]

export const socialPosts: SocialPost[] = [
  {
    id: 'post-1',
    username: 'admin',
    name: 'Егор Ангелов',
    avatar: 'user0.png',
    content: 'Сегодня разобрал загрузку профиля через GET-запрос и понял, как данные с сервера попадают в компонент Vue.',
    createdAt: '2023-06-02T12:00:00.000Z',
    likes: 8
  },
  {
    id: 'post-2',
    username: 'user3',
    name: 'Анна Сидорова',
    avatar: 'user3.png',
    content: 'Добавила страницу друзей: список строится через v-for, а клик по карточке открывает динамический маршрут пользователя.',
    createdAt: '2023-05-23T14:49:06.810Z',
    likes: 5
  },
  {
    id: 'post-3',
    username: 'user1',
    name: 'Александр Николаев',
    avatar: 'user1.png',
    content: 'Настроил ленту новостей. Теперь посты сортируются по дате, и самые свежие записи видны первыми.',
    createdAt: '2023-05-08T14:50:01.067Z',
    likes: 11
  },
  {
    id: 'post-4',
    username: 'user3',
    name: 'Анна Сидорова',
    avatar: 'user3.png',
    content: 'Форма создания поста работает через POST-запрос. После отправки запись сразу появляется на странице профиля.',
    createdAt: '2023-04-01T14:55:00.802Z',
    likes: 7
  },
  {
    id: 'post-5',
    username: 'user2',
    name: 'Игорь Лебедев',
    avatar: 'user2.png',
    content: 'Проверил vue-router: маршруты /, /friends, /user/:username и /feed переключаются без перезагрузки страницы.',
    createdAt: '2023-06-01T14:46:40.625Z',
    likes: 6
  },
  {
    id: 'post-6',
    username: 'user4',
    name: 'Татьяна Макарова',
    avatar: 'user4.png',
    content: 'Сегодня улучшила боковую панель: активная кнопка зависит от текущего маршрута и помогает ориентироваться в приложении.',
    createdAt: '2023-05-23T14:49:06.810Z',
    likes: 9
  },
  {
    id: 'post-7',
    username: 'user2',
    name: 'Игорь Лебедев',
    avatar: 'user2.png',
    content: 'Разобрал watch для $route. Когда открываешь другого пользователя, компонент снова загружает профиль и посты.',
    createdAt: '2023-05-08T14:50:01.067Z',
    likes: 4
  },
  {
    id: 'post-8',
    username: 'admin',
    name: 'Егор Ангелов',
    avatar: 'user0.png',
    content: 'Перевёл тестовые записи на русский язык, чтобы учебная социальная сеть выглядела как настоящий проект.',
    createdAt: '2023-06-03T10:30:00.000Z',
    likes: 13
  }
]

export function getSocialAvatarPath(avatar: string) {
  return `/social-avatars/${avatar}`
}

export function getSocialUserName(user: SocialUser) {
  return `${user.firstName} ${user.lastName}`
}
