import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSizeCol1740331017100 implements MigrationInterface {
    name = 'AddSizeCol1740331017100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_file" ADD "size" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_file" DROP COLUMN "size"`);
    }

}
