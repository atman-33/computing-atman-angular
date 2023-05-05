import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIdColumn1683297250996 implements MigrationInterface {
    name = 'AddUserIdColumn1683297250996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "userid" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "userid"`);
    }

}
