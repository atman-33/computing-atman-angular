import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEntities1683374707304 implements MigrationInterface {
    name = 'FixEntities1683374707304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('FREE', 'PREMIUM')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."item_status_enum" AS ENUM('ON_SALE', 'SOLD_OUT')`);
        await queryRunner.query(`ALTER TABLE "item" ADD "status" "public"."item_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."item_status_enum"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying NOT NULL`);
    }

}
