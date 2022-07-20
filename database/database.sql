-- MySQL Script generated by MySQL Workbench
-- Sat Apr 23 10:06:50 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema trunghanh_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema trunghanh_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trunghanh_app` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `trunghanh_app` ;

-- -----------------------------------------------------
-- Table `trunghanh_app`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`categories` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`categories` (
  `category_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`checkins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`checkins` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`checkins` (
  `check_in_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `image` JSON NULL DEFAULT NULL,
  `status` ENUM('Đóng cửa', 'Mở cửa') NULL DEFAULT 'Đóng cửa',
  `user_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `duration` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`check_in_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`notes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`notes` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`notes` (
  `note_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `reply_note` VARCHAR(255) NULL DEFAULT NULL,
  `image` JSON NULL DEFAULT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `note_type_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `status` ENUM('Chờ xử lý', 'Hoàn thành') NULL DEFAULT NULL,
  `pharmacy_id` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`note_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`notetypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`notetypes` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`notetypes` (
  `note_type_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`note_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`units`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`units` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`units` (
  `unit_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`unit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`products` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`products` (
  `product_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `product_name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  `sale_price` FLOAT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `manufacture_date` DATETIME NULL DEFAULT NULL,
  `expiration_date` DATETIME NULL DEFAULT NULL,
  `category_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `unit_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `isActive` TINYINT(1) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `category_id` (`category_id` ASC) VISIBLE,
  INDEX `unit_id` (`unit_id` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`category_id`)
    REFERENCES `trunghanh_app`.`categories` (`category_id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`unit_id`)
    REFERENCES `trunghanh_app`.`units` (`unit_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`roles` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`roles` (
  `role_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `user_id` VARCHAR(45) NULL DEFAULT NULL,
  `rolescol` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`users` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`users` (
  `user_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `fullname` VARCHAR(255) NULL DEFAULT NULL,
  `gender` VARCHAR(255) NULL DEFAULT NULL,
  `role_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `birthday` DATETIME NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `latitude` VARCHAR(255) NULL DEFAULT NULL,
  `longitude` VARCHAR(255) NULL DEFAULT NULL,
  `status` TINYINT(1) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `pharmacy_id` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `trunghanh_app`.`roles` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`orders` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`orders` (
  `order_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `shipping_address` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy', 'Trả hàng') NULL DEFAULT NULL,
  `total_price` FLOAT NULL DEFAULT NULL,
  `date_ordered` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `payment_id` CHAR(36) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `debt_price` FLOAT NULL DEFAULT NULL,
  `paid_price` FLOAT NULL DEFAULT NULL,
  `discount_price` FLOAT NULL DEFAULT NULL,
  `quantity` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `trunghanh_app`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`orderdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`orderdetails` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`orderdetails` (
  `order_detail_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `quantity` VARCHAR(255) NULL DEFAULT NULL,
  `price` VARCHAR(255) NULL DEFAULT NULL,
  `unit` VARCHAR(255) NULL DEFAULT NULL,
  `product_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `order_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  INDEX `order_id` (`order_id` ASC) VISIBLE,
  CONSTRAINT `orderdetails_ibfk_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `trunghanh_app`.`products` (`product_id`),
  CONSTRAINT `orderdetails_ibfk_2`
    FOREIGN KEY (`order_id`)
    REFERENCES `trunghanh_app`.`orders` (`order_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`payments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`payments` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`payments` (
  `payment_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`payment_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`permissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`permissions` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`permissions` (
  `permission_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`pharmacies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`pharmacies` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`pharmacies` (
  `pharmacy_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `shipping_address` VARCHAR(255) NULL DEFAULT NULL,
  `CUSTOMER_CODE` VARCHAR(255) NULL DEFAULT NULL,
  `CUSTOMER_NAME` VARCHAR(255) NULL DEFAULT NULL,
  `CUSTOMER_ADDRESS` VARCHAR(255) NULL DEFAULT NULL,
  `DELIVERY_ADDRESS` VARCHAR(255) NULL DEFAULT NULL,
  `customer_tel` VARCHAR(255) NULL DEFAULT NULL,
  `handphone` VARCHAR(255) NULL DEFAULT NULL,
  `HANTT` INT NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `user_id` CHAR(36) NULL DEFAULT NULL,
  `longitude` FLOAT NULL DEFAULT NULL,
  `latitude` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`pharmacy_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`rolepermissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`rolepermissions` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`rolepermissions` (
  `role_permission_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `role_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `permission_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`role_permission_id`),
  INDEX `role_id` (`role_id` ASC) VISIBLE,
  INDEX `permission_id` (`permission_id` ASC) VISIBLE,
  CONSTRAINT `rolepermissions_ibfk_1`
    FOREIGN KEY (`role_id`)
    REFERENCES `trunghanh_app`.`roles` (`role_id`),
  CONSTRAINT `rolepermissions_ibfk_2`
    FOREIGN KEY (`permission_id`)
    REFERENCES `trunghanh_app`.`permissions` (`permission_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`routes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`routes` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`routes` (
  `route_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `route_name` VARCHAR(255) NULL DEFAULT NULL,
  `status` VARCHAR(255) NULL DEFAULT 'Chờ xác nhận',
  `user_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `route_date` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `pharmacy_id` CHAR(36) NULL DEFAULT NULL,
  `week_date` ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NULL DEFAULT NULL,
  PRIMARY KEY (`route_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`sequelizemeta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`sequelizemeta` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`sequelizemeta` (
  `name` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `trunghanh_app`.`transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trunghanh_app`.`transactions` ;

CREATE TABLE IF NOT EXISTS `trunghanh_app`.`transactions` (
  `transaction_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `paid_price` VARCHAR(255) NULL DEFAULT NULL,
  `order_id` CHAR(36) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `payment_id` CHAR(36) NULL DEFAULT NULL,
  `user_id` CHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`transaction_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
