-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 07 2026 г., 07:26
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dinarabd`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Cart`
--

CREATE TABLE `Cart` (
  `ID_Cart` int NOT NULL COMMENT 'Корзина',
  `ID_User` int NOT NULL COMMENT 'Пользователь',
  `ID_Tea` int NOT NULL COMMENT 'Чай',
  `Quantity` int NOT NULL COMMENT 'Количество товаров',
  `Sum` decimal(10,0) NOT NULL COMMENT 'Общая сумма корзины'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Корзина';

--
-- Дамп данных таблицы `Cart`
--

INSERT INTO `Cart` (`ID_Cart`, `ID_User`, `ID_Tea`, `Quantity`, `Sum`) VALUES
(1, 2, 1, 56, '78090');

-- --------------------------------------------------------

--
-- Структура таблицы `Orders`
--

CREATE TABLE `Orders` (
  `ID_Orders` int NOT NULL COMMENT 'Заказы',
  `ID_User` int NOT NULL COMMENT 'Пользователи',
  `ID_Status` int NOT NULL COMMENT 'Статус',
  `Numbers_Orders` varchar(50) NOT NULL COMMENT 'Номер заказа',
  `Sum` decimal(10,0) NOT NULL COMMENT 'Сумма',
  `Adress` varchar(50) NOT NULL COMMENT 'Адрес'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Заказы';

--
-- Дамп данных таблицы `Orders`
--

INSERT INTO `Orders` (`ID_Orders`, `ID_User`, `ID_Status`, `Numbers_Orders`, `Sum`, `Adress`) VALUES
(1, 5, 1, '1', '45454', 'ул. Петра Алексеева');

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `ID_Status` int NOT NULL COMMENT 'Статус',
  `ID_Orders` int NOT NULL,
  `Processing` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'В обработке',
  `Assembled` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Собран на складе',
  `Shipped` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Передан в доставку',
  `Delivered` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Доставлен',
  `Cancelled` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Отменен',
  `Paid` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Оплачен'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Статусы заказов';

--
-- Дамп данных таблицы `Status`
--

INSERT INTO `Status` (`ID_Status`, `ID_Orders`, `Processing`, `Assembled`, `Shipped`, `Delivered`, `Cancelled`, `Paid`) VALUES
(1, 1, 1, 1, 1, 0, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Tea`
--

CREATE TABLE `Tea` (
  `ID_Tea` int NOT NULL COMMENT 'Чай',
  `Name_Tea` varchar(50) NOT NULL COMMENT 'Название чая',
  `Description` varchar(300) NOT NULL COMMENT 'Описание',
  `Type_Tea` varchar(50) NOT NULL COMMENT 'Тип чая',
  `Price` decimal(10,0) NOT NULL COMMENT 'Цена',
  `Availability` tinyint(1) NOT NULL COMMENT 'Наличие на складе',
  `Category` varchar(50) NOT NULL COMMENT 'Категория',
  `Image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Фотография'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Чай';

--
-- Дамп данных таблицы `Tea`
--

INSERT INTO `Tea` (`ID_Tea`, `Name_Tea`, `Description`, `Type_Tea`, `Price`, `Availability`, `Category`, `Image`) VALUES
(1, 'Клубничный', 'Зеленый чай с клубникой со сливками и глубоким ароматом', 'Джаз', '147', 1, 'Музыка', ''),
(2, 'Бергамот', 'Черный чай с бергамотом с ароматом горного пейзажа', 'Фэнтези', '200', 1, 'Литература', ''),
(3, 'Перечный', 'Улун с черным прцем и сладким ароматом', 'Игры', '356', 0, 'Инди', '');

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `ID_User` int NOT NULL COMMENT 'Пользователи',
  `Login` varchar(20) NOT NULL COMMENT 'Логин',
  `Email` varchar(50) NOT NULL COMMENT 'Почта',
  `Password` varchar(20) NOT NULL COMMENT 'Пароль',
  `Phone` varchar(12) DEFAULT NULL COMMENT 'Телефон'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Пользователи';

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`ID_User`, `Login`, `Email`, `Password`, `Phone`) VALUES
(1, 'Dinara', 'dinara@gmail.com', '123', '+79999999999'),
(2, 'Saida', 'saidka@gmail.com', '123', '+79999999999'),
(3, 'Alesya', 'alesya@gmail.com', '123', '+79999999999'),
(4, 'Sasha', 'sasha@gmail.com', '123', '+79999999999'),
(5, 'Kirill', 'kirill@gmail.com', '123', '+79999999999'),
(6, 'Roman', 'roman@gmail.com', '123', '+79999999999');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`ID_Cart`),
  ADD KEY `Cart_Users_UsersID` (`ID_User`),
  ADD KEY `Cart_Tea_TeaID` (`ID_Tea`);

--
-- Индексы таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`ID_Orders`),
  ADD KEY `User_Orders_UserID` (`ID_User`),
  ADD KEY `Orders_Status_StatusID` (`ID_Status`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`ID_Status`),
  ADD KEY `Status_Orders_ID_Orders` (`ID_Orders`);

--
-- Индексы таблицы `Tea`
--
ALTER TABLE `Tea`
  ADD PRIMARY KEY (`ID_Tea`);

--
-- Индексы таблицы `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID_User`),
  ADD UNIQUE KEY `Login` (`Login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Cart`
--
ALTER TABLE `Cart`
  MODIFY `ID_Cart` int NOT NULL AUTO_INCREMENT COMMENT 'Корзина', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Orders`
--
ALTER TABLE `Orders`
  MODIFY `ID_Orders` int NOT NULL AUTO_INCREMENT COMMENT 'Заказы', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `ID_Status` int NOT NULL AUTO_INCREMENT COMMENT 'Статус', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Tea`
--
ALTER TABLE `Tea`
  MODIFY `ID_Tea` int NOT NULL AUTO_INCREMENT COMMENT 'Чай', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `ID_User` int NOT NULL AUTO_INCREMENT COMMENT 'Пользователи', AUTO_INCREMENT=64;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_Tea_TeaID` FOREIGN KEY (`ID_Tea`) REFERENCES `Tea` (`ID_Tea`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_Users_UsersID` FOREIGN KEY (`ID_User`) REFERENCES `Users` (`ID_User`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_Status_StatusID` FOREIGN KEY (`ID_Status`) REFERENCES `Status` (`ID_Status`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `User_Orders_UserID` FOREIGN KEY (`ID_User`) REFERENCES `Users` (`ID_User`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Status`
--
ALTER TABLE `Status`
  ADD CONSTRAINT `Status_Orders_ID_Orders` FOREIGN KEY (`ID_Orders`) REFERENCES `Orders` (`ID_Orders`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
