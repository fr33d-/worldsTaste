import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesAndStores1686912555796 implements MigrationInterface {
    name = 'ImagesAndStores1686912555796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" ADD "image" integer`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" ADD CONSTRAINT "UQ_d192e1e614990dd1895b6b4dc14" UNIQUE ("image")`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD "extractionId" integer`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" ADD CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14" FOREIGN KEY ("image") REFERENCES "images_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_3ddebef5538d7b8d2c9df5e25f7" FOREIGN KEY ("extractionId") REFERENCES "coffee_brewing_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c" FOREIGN KEY ("storeId") REFERENCES "coffee_store_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images_entity" ADD CONSTRAINT "FK_ffe2bbf06f2d7a5cef7a9437579" FOREIGN KEY ("postId") REFERENCES "blog_post_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_ffe2bbf06f2d7a5cef7a9437579"`);
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_7324022bc1e95cfcb699eec9f2c"`);
        await queryRunner.query(`ALTER TABLE "images_entity" DROP CONSTRAINT "FK_3ddebef5538d7b8d2c9df5e25f7"`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" DROP CONSTRAINT "FK_d192e1e614990dd1895b6b4dc14"`);
        await queryRunner.query(`ALTER TABLE "images_entity" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "images_entity" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "images_entity" DROP COLUMN "extractionId"`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" DROP CONSTRAINT "UQ_d192e1e614990dd1895b6b4dc14"`);
        await queryRunner.query(`ALTER TABLE "coffee_brewing_entity" DROP COLUMN "image"`);
    }

}
