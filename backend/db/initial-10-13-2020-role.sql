-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 14 oct. 2020 à 00:20
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `full-archetype`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE
IF NOT EXISTS `commentaire`
(
  `commentaireId` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(250) NOT NULL DEFAULT 'Anonyme',
  `message` varchar
(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp
(),
  `utilisateurId` int
(11) DEFAULT NULL,
  `hide` tinyint
(3) NOT NULL DEFAULT 0,
  PRIMARY KEY
(`commentaireId`),
  KEY `fk_utilisateurId`
(`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`
commentaireId`,
`name
`, `message`, `date`, `utilisateurId`, `hide`) VALUES
(8, '', ' Murder hooman toes. Mrow attack like a vicious monster rub whiskers on bare skin act innocent weigh eight pounds but take up a full-size bed kitty power. Ptracy cough hairball, eat toilet paper so push your water glass on the floor so meow meow friends are not food thug cat so tickle my belly at your own peril i will pester for food when you\'re in the kitchen even
if it\'s salad .', '2020-10-06 21:09:07', 3, 0),
(18, '', 'Birman siamese scottish fold so himalayan for british shorthair. Ocelot thai, persian. Scottish fold tiger. Devonshire rex. Bobcat norwegian forest abyssinian sphynx, tomcat, or tomcat. Kitten singapura havana brown so ragdoll. ', '2020-10-06 21:02:21', 1, 0),
(19, '', 'Siamese bengal singapura and mouser. Manx. Scottish fold turkish angora yet havana brown mouser but puma tiger. Egyptian mau american shorthair, donskoy yet birman and american shorthair. Norwegian forest. Panther norwegian forest savannah. Ocelot cornish rex but russian blue for cornish rex tomcat munchkin american bobtail. Lynx singapura siamese so balinese so leopard but singapura. Puma american shorthair.', '2020-10-06 19:16:12', 2, 0),
(20, '', 'Cat ipsum dolor sit amet, maine coon but tomcat for abyssinian . Egyptian mau. Thai. Jaguar puma leopard. British shorthair bombay or balinese kitty but tabby yet egyptian mau. Tom birman cheetah leopard. Grimalkin turkish angora so sphynx tomcat. Ocicat sphynx scottish fold, and persian norwegian forest. Malkin british shorthair kitten but abyssinian devonshire rex.', '2020-10-14 00:14:23', 4, 0);

-- --------------------------------------------------------

--
-- Structure de la table `message_accueil`
--

DROP TABLE IF EXISTS `message_accueil`;
CREATE TABLE
IF NOT EXISTS `message_accueil`
(
  `messageId` int
(11) NOT NULL AUTO_INCREMENT,
  `presentation` mediumtext NOT NULL,
  PRIMARY KEY
(`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message_accueil`
--

INSERT INTO `message_accueil` (`
messageId`,
`presentation
`) VALUES
(1, 'Cat ipsum dolor sit amet, quae. Sint. Explicabo dolores yet laudantium yet laboriosam and exercitationem yet quis. Ullam iste quia and omnis. Omnis ab so velit for sequi, perspiciatis aperiam corporis. Sint veritatis sit or voluptas quam. Exercitationem. Ad sunt so non yet quasi. Fugit nulla fugit. Tempora qui yet laborum. Eiusmod commodi or ut for aut and magna but ex ');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE
IF NOT EXISTS `role`
(
  `utilisateurId` int
(11) NOT NULL,
  `role` varchar
(250) NOT NULL,
  PRIMARY KEY
(`utilisateurId`,`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`
utilisateurId`,
`role
`) VALUES
(1, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE
IF NOT EXISTS `utilisateur`
(
  `utilisateurId` int
(11) NOT NULL AUTO_INCREMENT,
  `username` varchar
(250) NOT NULL,
  `password` varchar
(250) NOT NULL,
  `name` varchar
(250) DEFAULT NULL,
  `courriel` varchar
(250) DEFAULT NULL,
  PRIMARY KEY
(`utilisateurId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`
utilisateurId`,
`username
`, `password`, `name`, `courriel`) VALUES
(1, 'julie', '$2b$10$sKaMgnkR8KzrM.m7uYx4RespKEoH6IRWx/ME38KQ8kODmQjMoTXfq', 'Julie', 'jul@gmail.com'),
(2, 'rog', '123', 'Roger', 'rog@gmail.com'),
(3, 'sophie', '1234', 'Sophie', 'sophie@gmail.com'),
(4, 'quelqun', '345', 'quel', 'quel@gmail.com');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
ADD CONSTRAINT `fk_utilisateurId` FOREIGN KEY
(`utilisateurId`) REFERENCES `utilisateur`
(`utilisateurId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
