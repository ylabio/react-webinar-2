# React Project "ToDo or Shopping List"
## _A simple To-Do and Shopping list where you can add and delete new entriesr_

### Installation

Для запуска проекта на своем ПК выполните следующие действия:


```sh
git clone https://github.com/AlexandrRogulin/react-webinar-2.git
npm i
npm install --save plural-ru
npm start
```

Перейдите по ссылке на локальный сервер, которая появится в терминале.
Или сразу по адресу: [http://localhost:8010/]

### Development History

1. 31.07.2022
- При клике по одному из пунктов сбрасываются выделения с других пунктов.
- Вывод количества совершенных выделений для каждого пункта сопровождается фразой “Выделялось N раз”. По умолчанию у всех ноль.
2. 02.08.2022
- добавлен пакет ```npm plural-ru```
- исправлено обновление счетчика при  клике на запись (повторный клик снимает выделение, но не обновляет счетчик)
- устранена проблема неотображения счетчика у новых записей.
