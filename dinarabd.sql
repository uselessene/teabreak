-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 24 2026 г., 19:13
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
  `ID_Cart` int NOT NULL,
  `ID_User` int NOT NULL,
  `ID_Tea` int NOT NULL,
  `Quantity` int NOT NULL,
  `Sum` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Orders`
--

CREATE TABLE `Orders` (
  `ID_Orders` int NOT NULL,
  `ID_User` int NOT NULL,
  `Numbers_Orders` varchar(50) NOT NULL,
  `Sum` decimal(10,0) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `OrderDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `ID_Status` int NOT NULL,
  `ID_Orders` int NOT NULL,
  `Processing` tinyint(1) DEFAULT '0',
  `Assembled` tinyint(1) DEFAULT '0',
  `Shipped` tinyint(1) DEFAULT '0',
  `Delivered` tinyint(1) DEFAULT '0',
  `Cancelled` tinyint(1) DEFAULT '0',
  `Paid` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Tea`
--

CREATE TABLE `Tea` (
  `ID_Tea` int NOT NULL,
  `Name_Tea` varchar(50) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `Type_Tea` varchar(50) NOT NULL,
  `Price` decimal(10,0) NOT NULL,
  `Availability` tinyint(1) NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Tea`
--

INSERT INTO `Tea` (`ID_Tea`, `Name_Tea`, `Description`, `Type_Tea`, `Price`, `Availability`, `Category`, `Image`) VALUES
(1, 'Клубничный', 'Зеленый чай с клубникой со сливками и глубоким ароматом', 'Джаз', '147', 1, 'Музыка', '/src/tea_image/1.png'),
(2, 'Бергамот', 'Черный чай с бергамотом с ароматом горного пейзажа', 'Фэнтези', '200', 1, 'Литература', '/src/tea_image/2.png'),
(3, 'Перечный', 'Улун с черным перцем и сладким ароматом', 'Стратегии', '356', 1, 'Игры', '/src/tea_image/3.png'),
(4, 'Розовая спесь', 'Гибискус с розой и малиной', 'Фэнтези', '200', 1, 'Литература', '/src/tea_image/4.png'),
(5, 'Лавандовые сновидения', 'Травяной чай с лавандой', 'Классика', '356', 1, 'Литература', '/src/tea_image/5.png'),
(6, 'Сад роз', 'Зеленый чай с розой', 'Классическая', '230', 1, 'Музыка', '/src/tea_image/6.png'),
(7, 'Ромашковый лес', 'Тонизирующий ромашковый чай', 'Приключения', '169', 1, 'Игры', '/src/tea_image/7.png'),
(8, 'Лимонная свежесть', 'Черный чай с лимоном', 'Научная фантастика', '158', 1, 'Литература', '/src/tea_image/8.png'),
(9, 'Клубничный снег', 'Черный чай с клубникой', 'Инди', '321', 1, 'Игры', '/src/tea_image/9.png'),
(10, 'Глинтвейн', 'Черный чай с бадьяном и корицей', 'Рок', '349', 1, 'Музыка', '/src/tea_image/10.png'),
(11, 'Сладость корицы', 'Черный чай с ягодами и корицей', 'Джаз', '284', 1, 'Музыка', '/src/tea_image/11.png'),
(12, 'Изумрудное утро', 'Матча чай с бананом', 'Электронная', '311', 1, 'Музыка', '/src/tea_image/12.png'),
(13, 'Крепкий чай', 'Самый крепкий и черный чай', 'Хоррор', '265', 1, 'Игры', '/src/tea_image/13.png'),
(14, 'Овсяное облако', 'Белый чай с овсяным вкусом', 'Детективы', '194', 1, 'Литература', '/src/tea_image/14.png'),
(15, 'Зеленый луг', 'Зеленый терпкий чай', 'Экшн', '280', 1, 'Игры', '/src/tea_image/15.png');

-- --------------------------------------------------------

--
-- Структура таблицы `Users`
--

CREATE TABLE `Users` (
  `ID_User` int NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Phone` varchar(12) DEFAULT NULL,
  `Address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Users`
--

INSERT INTO `Users` (`ID_User`, `Login`, `Email`, `Password`, `Phone`, `Address`) VALUES
(1, 'Dinara', 'dinara@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`ID_Cart`),
  ADD KEY `ID_User` (`ID_User`),
  ADD KEY `ID_Tea` (`ID_Tea`);

--
-- Индексы таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`ID_Orders`),
  ADD KEY `ID_User` (`ID_User`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`ID_Status`),
  ADD KEY `ID_Orders` (`ID_Orders`);

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
  MODIFY `ID_Cart` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Orders`
--
ALTER TABLE `Orders`
  MODIFY `ID_Orders` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `ID_Status` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Tea`
--
ALTER TABLE `Tea`
  MODIFY `ID_Tea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `Users`
--
ALTER TABLE `Users`
  MODIFY `ID_User` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`ID_User`) REFERENCES `Users` (`ID_User`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`ID_Tea`) REFERENCES `Tea` (`ID_Tea`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`ID_User`) REFERENCES `Users` (`ID_User`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Status`
--
ALTER TABLE `Status`
  ADD CONSTRAINT `status_ibfk_1` FOREIGN KEY (`ID_Orders`) REFERENCES `Orders` (`ID_Orders`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
