--MARIOS IAKOVIDIS

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema stats_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stats_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stats_database` DEFAULT CHARACTER SET utf8 ;
USE `stats_database` ;

-- -----------------------------------------------------
-- Table `stats_database`.`MEASUREMENTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stats_database`.`MEASUREMENTS` (
  `country` VARCHAR(45) NOT NULL,
  `measurement_year` INT NOT NULL,
  `indicator` VARCHAR(200) NOT NULL,
  `measurement` DOUBLE NOT NULL,
  PRIMARY KEY (`country`, `measurement_year`, `indicator`))
ENGINE = InnoDB;

CREATE INDEX `year` ON `stats_database`.`MEASUREMENTS`(`measurement_year`);

-- -----------------------------------------------------
-- Table `stats_database`.`YEARS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stats_database`.`YEARS` (
  `id_years` INT NOT NULL,
  `year` INT NOT NULL,
  `five_year_period` VARCHAR(10) NULL,
  `decade` VARCHAR(10) NULL,
  `twenty_year_period` VARCHAR(10) NULL,
  PRIMARY KEY (`id_years`),
  INDEX `year` (`year` ASC) INVISIBLE,
  CONSTRAINT `year`
    FOREIGN KEY (`year`)
    REFERENCES `stats_database`.`MEASUREMENTS` (`measurement_year`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
