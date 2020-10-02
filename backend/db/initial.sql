-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 02 oct. 2020 à 14:34
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
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`commentaireId`),
  KEY `fk_utilisateurId` (`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`commentaireId`, `message`, `date`, `utilisateurId`) VALUES
(6, 'X loves cheeseburgers fall over dead (not really but gets sypathy) meowing non stop for food. Ooooh feather moving feather! i shall purr myself to sleep and show belly cat walks in keyboard .', '2020-10-01 15:39:16', 4),
(7, 'Snuggles up to shoulders or knees and purrs you to sleep refuse to leave cardboard box yet blow up sofa in 3 seconds playing with balls of wool yet slap kitten brother with paw destroy couch. Chew the plant. ', '2020-10-01 18:35:42', 1),
(8, ' Murder hooman toes. Mrow attack like a vicious monster rub whiskers on bare skin act innocent weigh eight pounds but take up a full-size bed kitty power. Ptracy cough hairball, eat toilet paper so push your water glass on the floor so meow meow friends are not food thug cat so tickle my belly at your own peril i will pester for food when you\'re in the kitchen even if it\'s salad .', '2020-10-01 18:35:42', 3),
(18, 'Birman siamese scottish fold so himalayan for british shorthair. Ocelot thai, persian. Scottish fold tiger. Devonshire rex. Bobcat norwegian forest abyssinian sphynx, tomcat, or tomcat. Kitten singapura havana brown so ragdoll. ', '2020-10-01 18:37:14', 1),
(19, 'Siamese bengal singapura and mouser. Manx. Scottish fold turkish angora yet havana brown mouser but puma tiger. Egyptian mau american shorthair, donskoy yet birman and american shorthair. Norwegian forest. Panther norwegian forest savannah. Ocelot cornish rex but russian blue for cornish rex tomcat munchkin american bobtail. Lynx singapura siamese so balinese so leopard but singapura. Puma american shorthair.', '2020-10-01 18:37:34', 2),
(20, 'Cat ipsum dolor sit amet, maine coon but tomcat for abyssinian . Egyptian mau. Thai. Jaguar puma leopard. British shorthair bombay or balinese kitty but tabby yet egyptian mau. Tom birman cheetah leopard. Grimalkin turkish angora so sphynx tomcat. Ocicat sphynx scottish fold, and persian norwegian forest. Malkin british shorthair kitten but abyssinian devonshire rex.', '2020-10-01 18:38:07', 4),
(23, 'dadasdada', '2020-10-02 14:06:57', NULL),
(24, 'dsadsad a dasda', '2020-10-02 14:07:15', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`messageId`, `title`, `message`) VALUES
(1, 'Premier message', 'Cat ipsum dolor sit amet, quae. Sint. Explicabo dolores yet laudantium yet laboriosam and exercitationem yet quis. Ullam iste quia and omnis. Omnis ab so velit for sequi, perspiciatis aperiam corporis. Sint veritatis sit or voluptas quam. Exercitationem. Ad sunt so non yet quasi. Fugit nulla fugit. Tempora qui yet laborum. Eiusmod commodi or ut for aut and magna but ex yet dolorem. Ullamco tempor. Illo dolorem for ea, or pariatur yet architecto. Magnam. Occaecat. Autem.');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateurId`, `name`, `courriel`, `is_admin`) VALUES
(1, 'Julie', 'jul@gmail.com', 1),
(2, 'Roger', 'rog@gmail.com', 0),
(3, 'Sophie', 'sophie@gmail.com', 0),
(4, NULL, NULL, 0),
(5, NULL, NULL, 0),
(6, NULL, NULL, 0);

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
