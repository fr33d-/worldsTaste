import { MigrationInterface, QueryRunner } from "typeorm";

export class TravelBlog1685954870086 implements MigrationInterface {
    name = 'TravelBlog1685954870086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "text" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "owner" integer, CONSTRAINT "PK_b14b2bcb2f12fe6a7f8ab703a55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "blog_post_entity" ADD CONSTRAINT "FK_d4090d384650a3f0174662310be" FOREIGN KEY ("owner") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_post_entity" DROP CONSTRAINT "FK_d4090d384650a3f0174662310be"`);
        await queryRunner.query(`DROP TABLE "blog_post_entity"`);
    }

}
