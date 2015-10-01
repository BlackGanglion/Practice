CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `text` text NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
)
