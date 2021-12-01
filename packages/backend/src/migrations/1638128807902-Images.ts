import {MigrationInterface, QueryRunner} from "typeorm";

export class Images1638128807902 implements MigrationInterface {
    name = 'Images1638128807902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "alt" character varying NOT NULL, "file" character varying NOT NULL, "coffeeId" integer, CONSTRAINT "PK_0af204a246849241bba22acbc29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_ce33ff6746df7595d4b9dbe1f4c" FOREIGN KEY ("coffeeId") REFERENCES "coffee_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_ce33ff6746df7595d4b9dbe1f4c"`);
        await queryRunner.query(`DROP TABLE "images_entity"`);
    }

}
