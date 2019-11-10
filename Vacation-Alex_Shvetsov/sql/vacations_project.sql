-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2019 at 05:54 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
  `isAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username`, `password`, `isAdmin`) VALUES
(1, 'alex', 'shvetsov', 'alexsh1412', 'As141290', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `beginning` varchar(50) NOT NULL,
  `ending` varchar(50) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `image`, `beginning`, `ending`, `price`) VALUES
(132, 'The best site touring in all of europe', 'London, England', 'a0688b81adce3c431032ff54f2b653e3.jpg', '14/06/19 12:30', '20/06/19 01:00', 1500),
(140, 'Eat shrimps and all the sea food you can eat for free', 'Sochi, Russia', 'f47482bec436d225db515fdfad03961f.jpg', '16/09/20 11:00', '21/10/20 12:00', 1200),
(141, 'Land of ice and fire ', 'Reykjavík, Iceland', 'e18ded622e655d490801f91026bcfa7e.jpg', '11/09/19 15:00', '26/09/19 10:00', 2340),
(142, 'Come enjoy the best waves in the world, five star resorts on the bitch ', 'Jaco, Costa Rica', '56a373ae44600db2ca8d7315472e4641.jpg', '27/12/19 12:00', '05/01/20 18:00', 1220);

-- --------------------------------------------------------

--
-- Table structure for table `vacationsfollowed`
--

CREATE TABLE `vacationsfollowed` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- Indexes for table `vacationsfollowed`
--
ALTER TABLE `vacationsfollowed`
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vacationsfollowed`
--
ALTER TABLE `vacationsfollowed`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `vacationID` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
