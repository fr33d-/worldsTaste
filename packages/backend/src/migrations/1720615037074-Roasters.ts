import { MigrationInterface, QueryRunner } from "typeorm";

export class Roasters1720615037074 implements MigrationInterface {
    name = 'Roasters1720615037074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c"`);
        await queryRunner.query(`CREATE TABLE "roaster_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" integer, CONSTRAINT "PK_71b8dc63efe5f31de351acffa91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f8bd70c18a3560cfa1f341309d" ON "roaster_entity" ("name") `);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a" FOREIGN KEY ("owner") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c" FOREIGN KEY ("storeId") REFERENCES "roaster_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8bd70c18a3560cfa1f341309d"`);
        await queryRunner.query(`DROP TABLE "roaster_entity"`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c" FOREIGN KEY ("storeId") REFERENCES "coffee_store_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
