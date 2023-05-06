import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1683371071800 implements MigrationInterface {
    name = 'Test1683371071800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "aaa" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "aaa"`);
    }

}
