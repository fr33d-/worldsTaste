import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
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
        const userRepository = getRepository(UserEntity);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
