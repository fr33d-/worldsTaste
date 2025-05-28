import { MigrationInterface, QueryRunner } from "typeorm";

export class RoastersConnection1721379691613 implements MigrationInterface {
    name = 'RoastersConnection1721379691613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD "roaster" integer`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD CONSTRAINT "FK_adecb0d5f97d830486821dc8783" FOREIGN KEY ("roaster") REFERENCES "roaster_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP CONSTRAINT "FK_adecb0d5f97d830486821dc8783"`);
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP COLUMN "roaster"`);
    }

}
