import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1683281996848 implements MigrationInterface {
    name = 'CreateUser1683281996848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('FREE', 'PREMIUM')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."user_status_enum" NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."item_status_enum" AS ENUM('ON_SALE', 'SOLD_OUT')`);
        await queryRunner.query(`ALTER TABLE "item" ADD "status" "public"."item_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."item_status_enum"`);
        await queryRunner.query(`ALTER TABLE "item" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
