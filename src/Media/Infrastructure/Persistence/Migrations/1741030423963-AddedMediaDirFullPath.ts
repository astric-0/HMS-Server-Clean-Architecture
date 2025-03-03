import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMediaDirFullPath1741030423963 implements MigrationInterface {
    name = 'AddedMediaDirFullPath1741030423963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_directory" ADD "full_path" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_directory" DROP COLUMN "full_path"`);
    }

}
