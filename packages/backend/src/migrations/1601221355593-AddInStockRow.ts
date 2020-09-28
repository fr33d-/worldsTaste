import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInStockRow1601221355593 implements MigrationInterface {
    name = "AddInStockRow1601221355593";

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" ADD "inStock" boolean NOT NULL default true`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "coffee_entity" DROP COLUMN "inStock"`, undefined);
    }
}
