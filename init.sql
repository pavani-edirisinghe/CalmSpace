-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2026 at 03:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calmspace_db`
--
CREATE DATABASE IF NOT EXISTS `calmspace_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `calmspace_db`;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `counsellor_id` int(11) NOT NULL,
  `appointment_date` varchar(20) NOT NULL,
  `time_slot` varchar(50) NOT NULL,
  `status` varchar(20) DEFAULT 'confirmed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `counsellor_id`, `appointment_date`, `time_slot`, `status`, `created_at`) VALUES
(1, 20, 4, 'Monday', '20:53 - 21:23', 'confirmed', '2026-01-24 10:47:56'),
(2, 20, 4, 'Tuesday', '22:33 - 23:03', 'confirmed', '2026-01-24 10:50:13'),
(3, 20, 4, 'Monday', '21:23 - 21:53', 'confirmed', '2026-01-24 10:50:27'),
(4, 20, 4, 'Wednesday', '01:00 - 01:30', 'confirmed', '2026-01-24 10:54:03'),
(5, 20, 4, 'Tuesday', '22:03 - 22:33', 'confirmed', '2026-01-24 10:55:05'),
(6, 20, 4, 'Wednesday', '01:30 - 02:00', 'confirmed', '2026-01-24 10:55:38'),
(7, 20, 5, 'Monday', '21:25 - 21:55', 'confirmed', '2026-01-24 10:57:32'),
(8, 20, 5, 'Monday', '20:55 - 21:25', 'confirmed', '2026-01-24 11:00:56'),
(9, 20, 4, 'Wednesday', '02:00 - 02:30', 'confirmed', '2026-01-24 11:02:04'),
(10, 20, 4, 'Thursday', '17:00 - 17:30', 'confirmed', '2026-01-24 11:03:47'),
(11, 20, 4, 'Thursday', '16:00 - 16:30', 'confirmed', '2026-01-24 11:04:09'),
(12, 5, 5, 'Tuesday', '03:30 - 04:00', 'confirmed', '2026-01-24 11:06:24'),
(13, 4, 5, 'Tuesday', '01:30 - 02:00', 'confirmed', '2026-01-24 14:36:05'),
(14, 4, 4, 'Wednesday', '02:30 - 03:00', 'confirmed', '2026-01-24 14:36:15'),
(15, 4, 5, 'Tuesday', '04:30 - 05:00', 'confirmed', '2026-01-24 14:42:57');

-- --------------------------------------------------------

--
-- Table structure for table `counsellor_availability`
--

CREATE TABLE `counsellor_availability` (
  `id` int(11) NOT NULL,
  `counsellor_id` int(11) NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counsellor_availability`
--

INSERT INTO `counsellor_availability` (`id`, `counsellor_id`, `day_of_week`) VALUES
(27, 4, 'Monday'),
(28, 4, 'Tuesday'),
(29, 4, 'Wednesday'),
(30, 4, 'Thursday'),
(33, 5, 'Monday'),
(34, 5, 'Tuesday'),
(35, 5, 'Wednesday');

-- --------------------------------------------------------

--
-- Table structure for table `counsellor_profiles`
--

CREATE TABLE `counsellor_profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `counsellor_profiles`
--

INSERT INTO `counsellor_profiles` (`id`, `user_id`, `name`, `profession`, `bio`) VALUES
(1, 5, 'lakmina', 'Councellor', 'c4t'),
(9, 4, 'Pavani Edirisinghe', 'Councellor', 'aaaaaaaaaaaaaaaaaaaa');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` int(11) NOT NULL,
  `availability_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `availability_id`, `start_time`, `end_time`) VALUES
(27, 27, '20:53:00', '21:53:00'),
(28, 28, '22:03:00', '23:03:00'),
(29, 29, '01:00:00', '03:00:00'),
(30, 30, '16:00:00', '17:30:00'),
(33, 33, '20:55:00', '21:55:00'),
(34, 34, '01:00:00', '06:00:00'),
(35, 35, '17:50:00', '19:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','counsellor') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(3, 'ddd', 'codestorm41@gmail.com', '123', 'user', '2025-11-01 16:37:45'),
(4, 'pavani', 'pavani@gmail.com', 'pavani', 'counsellor', '2025-11-02 08:47:20'),
(5, 'lakmina', 'lakmina@gmail.com', '123', 'counsellor', '2025-11-02 10:24:45'),
(6, 'Test User', 'user@test.com', 'password123', 'user', '2025-11-08 09:56:50'),
(7, 'Test Counsellor', 'counsellor@test.com', 'password123', 'counsellor', '2025-11-08 09:56:50'),
(20, 'Nuwani', 'n@gmail.com', 'nuwa', 'user', '2025-11-08 10:13:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `counsellor_id` (`counsellor_id`);

--
-- Indexes for table `counsellor_availability`
--
ALTER TABLE `counsellor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `counsellor_id` (`counsellor_id`);

--
-- Indexes for table `counsellor_profiles`
--
ALTER TABLE `counsellor_profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `availability_id` (`availability_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `counsellor_availability`
--
ALTER TABLE `counsellor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `counsellor_profiles`
--
ALTER TABLE `counsellor_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`counsellor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `counsellor_availability`
--
ALTER TABLE `counsellor_availability`
  ADD CONSTRAINT `counsellor_availability_ibfk_1` FOREIGN KEY (`counsellor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `counsellor_profiles`
--
ALTER TABLE `counsellor_profiles`
  ADD CONSTRAINT `counsellor_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`availability_id`) REFERENCES `counsellor_availability` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
