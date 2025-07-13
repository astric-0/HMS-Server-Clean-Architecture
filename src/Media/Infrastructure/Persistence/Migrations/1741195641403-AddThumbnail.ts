import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddThumbnail1741195641403 implements MigrationInterface {
  name = 'AddThumbnail1741195641403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_file" ADD "thumbnail_full_path" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_file" DROP COLUMN "thumbnail_full_path"`,
    );
  }
}
