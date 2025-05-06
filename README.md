# ISUI/EVT

---

👉[Ссылка на лаюораторные работы](https://grazhina-ulyanova.github.io/piis/)👈

---

## 📝 Мои контактные данные

- **E-mail:** grazhinaulyanova@gmail.com
- **Telegram:** @gradirnyaa
- **GitHub:** [github.com/VonAqua](https://github.com/Grazhina-Ulyanova/)

## Кто я ❓

🎇Я🎇 - студентка 3 курса БГУИР, работаю Java разработчиком в IT компании LeverX. Пытаюсь совмещать учёбу с работой, пока тяжеловато с этим😔. Я очень целеустремлённая, упёртая и любознательная. Когда я чего-то хочу, то меня никакие трудности не остановят перед достижению своей цели. 

У меня большой спект интересов: и техническое направление, и гуманитарное и творческое. Стараюсь везде потихоньку реализовываться по мере возможностей. 

## 📑 Навыки

- _Java_
- _Spring_
- _SQL_
- _Cap_
- _Postman_
- Хорошие навыки коммуникации и умения договариваться
- Владею английским языком на уровне А2 к сожалению, но я на пути к исправлению этого

## Опыт

Опыт написания курсовых работ и лаборатный на языке программирования Java. Базовые знания Python на прошлой работе, где подрабатывала преподавателем этого языка для детей. На данный момент работаю в IT компании на проекте по созданию облачного приложения с использованием языка Java, а также фреймворками: Spring Boot и CAP(Cloud Application Programming Model). 


## Образование

| Год                      | Учебное заведение | Специальность         | Факультет  |
| -------------------------| ------------------| ----------------------| -----------|
| 2022 – по настоящее время| БГУИР             | Инженер-системотехник | ФКП        |


## ⚡ Пример кода на Java

Ниже — реализация **быстрой сортировки** на Java. отрывок кода двух методов моего класса с моей прошлой курсовой. Тема курсовой была "Социальные сети" и этот класс-сервис отвечал за логику работы чатов и работой с базой данных:

```java
    public boolean isAlreadyWasCreate(User user, User anotherUser) {
        List<User> chatParticipant = user.getChats().stream()
                .map(Chat::getChatParticipant)
                .flatMap(Collection::stream)
                .toList();
        return chatParticipant.contains(anotherUser);
    }

    @Transactional
    public void createChatWithUsername(User currentUser, String username) {
        Chat chat = new Chat();
        User anotherUser = userService.findByUsername(username);
        chat.setChatParticipant(new HashSet<>());
        Collections.addAll(chat.getChatParticipant(), currentUser, anotherUser);
        chat.setLastMessage(LocalDateTime.now());
        currentUser = setChatsForUser(currentUser, chat);
        anotherUser = setChatsForUser(anotherUser, chat);

        chatRepository.save(chat);
        userService.saveChanges(currentUser);
        userService.saveChanges(anotherUser);
    }
```

