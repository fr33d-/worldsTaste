import { MigrationInterface, QueryRunner } from "typeorm";

export class RoastersUpdate1720621903912 implements MigrationInterface {
    name = 'RoastersUpdate1720621903912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "owner"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "owner" integer`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a" FOREIGN KEY ("owner") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
