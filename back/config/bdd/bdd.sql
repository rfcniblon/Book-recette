-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 13 mars 2023 à 06:38
-- Version du serveur : 8.0.32-0ubuntu0.22.04.2
-- Version de PHP : 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Recettes`
--
CREATE DATABASE Recettes
-- --------------------------------------------------------

--
-- Structure de la table `recette`
--

DROP TABLE IF EXISTS `recette`;
CREATE TABLE `recette` (
  `id_recette` int NOT NULL,
  `nom` varchar(200) NOT NULL,
  `categories` varchar(200) NOT NULL,
  `tpsCuisson` varchar(40) DEFAULT NULL,
  `tpsRepos` varchar(30) DEFAULT NULL,
  `tpsPreparation` varchar(100) DEFAULT NULL,
  `cout` varchar(60) DEFAULT NULL,
  `personne` varchar(30) DEFAULT NULL,
  `niveau` varchar(30) NOT NULL,
  `rating` varchar(10) DEFAULT NULL,
  `ingredient` text NOT NULL,
  `url1` varchar(200) NOT NULL,
  `url2` varchar(200) DEFAULT NULL,
  `url3` varchar(200) DEFAULT NULL,
  `url4` varchar(200) DEFAULT NULL,
  `ustensile` text,
  `etape1` text,
  `etape2` text,
  `etape3` text DEFAULT NULL,
  `etape4` text DEFAULT NULL,
  `etape5` text DEFAULT NULL,
  `etape6` text DEFAULT NULL,
  `etape7` text DEFAULT NULL,
  `boisson` varchar(255) DEFAULT NULL
);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `recette`
--
ALTER TABLE `recette`
  ADD PRIMARY KEY (`id_recette`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `recette`
--
ALTER TABLE `recette`
  MODIFY `id_recette` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
