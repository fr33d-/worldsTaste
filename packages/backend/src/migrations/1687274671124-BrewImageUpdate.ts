import { MigrationInterface, QueryRunner } from "typeorm";

export class BrewImageUpdate1687274671124 implements MigrationInterface {
    name = 'BrewImageUpdate1687274671124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" DROP CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14"`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" ADD CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14" FOREIGN KEY ("image") REFERENCES "images_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" DROP CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14"`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" ADD CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14" FOREIGN KEY ("image") REFERENCES "images_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
