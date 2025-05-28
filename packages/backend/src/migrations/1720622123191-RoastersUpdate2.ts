import { MigrationInterface, QueryRunner } from "typeorm";

export class RoastersUpdate21720622123191 implements MigrationInterface {
    name = "RoastersUpdate21720622123191";

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "roaster_entity" DROP CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a"`);
        // await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "owner"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "visited" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "rating" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "visited"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "roaster_entity" DROP COLUMN "country"`);
        // await queryRunner.query(`ALTER TABLE "roaster_entity" ADD "owner" integer`);
        // await queryRunner.query(`ALTER TABLE "roaster_entity" ADD CONSTRAINT "FK_9e679eb787b1a43afd411bb7e1a" FOREIGN KEY ("owner") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
