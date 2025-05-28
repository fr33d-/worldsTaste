/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../models/entities/UserEntity";

export class CreateAdminUser1566994781138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new UserEntity();
    user.username = "admin";
    user.name = "Admin";
    user.password = "admin";
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.email = "admin@nsa.gov";
    user.hashPassword();
    user.role = "ADMIN";
    const userRepository = AppDataSource.getRepository(UserEntity);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
