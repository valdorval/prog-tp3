-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 05 oct. 2020 à 01:16
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `full-archetype`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `commentaireId` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int(11) DEFAULT NULL,
  `hide` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`commentaireId`),
  KEY `fk_utilisateurId` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`commentaireId`, `message`, `date`, `utilisateurId`, `hide`) VALUES
(6, 'X loves cheeseburgers fall over dead (not really but gets sypathy) meowing non stop for food. Ooooh feather moving feather! i shall purr myself to sleep and show belly cat walks in keyboard .', NULL, 4, 0),
(7, 'Snuggles up to shoulders or knees and purrs you to sleep refuse to leave cardboard box yet blow up sofa in 3 seconds playing with balls of wool yet slap kitten brother with paw destroy couch. Chew the plant. ', '2020-10-01 18:35:42', 1, 0),
(8, ' Murder hooman toes. Mrow attack like a vicious monster rub whiskers on bare skin act innocent weigh eight pounds but take up a full-size bed kitty power. Ptracy cough hairball, eat toilet paper so push your water glass on the floor so meow meow friends are not food thug cat so tickle my belly at your own peril i will pester for food when you\'re in the kitchen even if it\'s salad .', '2020-10-01 18:35:42', 3, 0),
(18, 'Birman siamese scottish fold so himalayan for british shorthair. Ocelot thai, persian. Scottish fold tiger. Devonshire rex. Bobcat norwegian forest abyssinian sphynx, tomcat, or tomcat. Kitten singapura havana brown so ragdoll. ', '2020-10-04 19:01:33', 1, 1),
(19, 'Siamese bengal singapura and mouser. Manx. Scottish fold turkish angora yet havana brown mouser but puma tiger. Egyptian mau american shorthair, donskoy yet birman and american shorthair. Norwegian forest. Panther norwegian forest savannah. Ocelot cornish rex but russian blue for cornish rex tomcat munchkin american bobtail. Lynx singapura siamese so balinese so leopard but singapura. Puma american shorthair.', '2020-10-01 18:37:34', 2, 0),
(20, 'Cat ipsum dolor sit amet, maine coon but tomcat for abyssinian . Egyptian mau. Thai. Jaguar puma leopard. British shorthair bombay or balinese kitty but tabby yet egyptian mau. Tom birman cheetah leopard. Grimalkin turkish angora so sphynx tomcat. Ocicat sphynx scottish fold, and persian norwegian forest. Malkin british shorthair kitten but abyssinian devonshire rex.', '2020-10-01 18:38:07', 4, 0),
(25, 'fsdfdsf', '2020-10-02 17:08:19', NULL, 0),
(29, 'valdsadsa', '2020-10-02 17:14:58', 11, 0),
(37, 'dsadasdjkasdkasjdhkas ', '2020-10-03 23:32:08', 19, 0),
(38, 'dasdas asdas', '2020-10-03 23:36:18', 21, 0),
(43, 'dasdasdas dadas ', '2020-10-04 19:47:14', 26, 0),
(44, 'dsadas das dasdas das das', '2020-10-04 19:49:03', 27, 0);

-- --------------------------------------------------------

--
-- Structure de la table `message_accueil`
--

DROP TABLE IF EXISTS `message_accueil`;
CREATE TABLE IF NOT EXISTS `message_accueil` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `presentation` mediumtext NOT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message_accueil`
--

INSERT INTO `message_accueil` (`messageId`, `presentation`) VALUES
(1, 'Cat ipsum dolor sit amet, quae. Sint. Explicabo dolores yet laudantium yet laboriosam and exercitationem yet quis. Ullam iste quia and omnis. Omnis ab so velit for sequi, perspiciatis aperiam corporis. Sint veritatis sit or voluptas quam. Exercitationem. Ad sunt so non yet quasi. Fugit nulla fugit. Tempora qui yet laborum. Eiusmod commodi or ut for aut and magna but ex yet dolorem. Ullamco tempor. Illo dolorem for ea, or pariatur yet architecto. Magnam. Occaecat. Autem. 22222');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateurId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `courriel` varchar(250) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateurId`, `name`, `courriel`, `is_admin`) VALUES
(1, 'Julie', 'jul@gmail.com', 1),
(2, 'Roger', 'rog@gmail.com', 0),
(3, 'Sophie', 'sophie@gmail.com', 0),
(4, NULL, NULL, 0),
(5, NULL, NULL, 0),
(6, NULL, NULL, 0),
(7, NULL, NULL, 0),
(8, 'val', 'val@val.vom', 0),
(9, 'val', 'val@val.com', 0),
(10, 'val', 'val@val.val', 0),
(11, 'val', 'val@val.val', 0),
(12, NULL, NULL, 0),
(13, NULL, NULL, 0),
(14, 'blabla', 'bla@blalvla.com', 0),
(15, 'Blabla', 'blabla@bla.com', 0),
(16, 'Blabla', 'kasjdlkas@ldadas.com', 0),
(17, NULL, NULL, 0),
(18, NULL, NULL, 0),
(19, 'vaaa', NULL, 0),
(20, 'dsad', '', 0),
(21, 'dsa', NULL, 0),
(22, NULL, NULL, 0),
(23, NULL, NULL, 0),
(24, NULL, NULL, 0),
(25, NULL, NULL, 0),
(26, NULL, NULL, 0),
(27, 'val', NULL, 0),
(28, 'val', NULL, 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `fk_utilisateurId` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`utilisateurId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
