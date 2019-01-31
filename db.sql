CREATE TABLE `log` (
  `oid` int(11) NOT NULL,
  `attr` varchar(45) DEFAULT NULL,
  `new` varchar(45) DEFAULT NULL,
  `old` varchar(45) DEFAULT NULL,
  `action` varchar(45) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `objdata` (
  `oid` int(11) NOT NULL,
  `attr` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `objects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*
-- Query: SELECT * FROM paytm.objects
LIMIT 0, 1000

-- Date: 2019-01-31 17:20
*/
INSERT INTO `objects` (`id`,`parentid`) VALUES (1,NULL);
INSERT INTO `objects` (`id`,`parentid`) VALUES (2,1);
INSERT INTO `objects` (`id`,`parentid`) VALUES (3,1);


/*
-- Query: SELECT * FROM paytm.objdata
LIMIT 0, 1000

-- Date: 2019-01-31 17:21
*/
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (1,'Name','Cotton Shirt');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (2,'Size','L');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (2,'Color','Silver');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (3,'Size','XL');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (3,'Color','Red');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (2,'Quantity','10');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (3,'Quantity','10');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (1,'barcode','111111');
INSERT INTO `objdata` (`oid`,`attr`,`value`) VALUES (1,'Gender','Mens');
