CREATE TABLE `sql10240994`.`users` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(45) NOT NULL , `username` VARCHAR(45) NOT NULL , `password` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL ) ENGINE = InnoDB;
CREATE TABLE  `Acc_inst` 
(    
   `inst_ID` INTEGER NOT NULL AUTO_INCREMENT ,
   `inst_Name` VARCHAR( 255 ) ,
   `Inst_Ws` VARCHAR( 255 ) ,
   `inst_ph` VARCHAR( 255 ) ,
   `inst_Fx` VARCHAR( 255 ) ,
   `Inst_E` VARCHAR( 255 ) ,
   PRIMARY KEY `inst_ID`(`inst_ID`)
) ENGINE = INNODB DEFAULT CHARSET = utf8;
