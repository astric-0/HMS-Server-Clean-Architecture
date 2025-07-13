import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableThumbnails1743329325356 implements MigrationInterface {
  name = 'NullableThumbnails1743329325356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_file" ALTER COLUMN "thumbnail_full_path" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_file" ALTER COLUMN "thumbnail_full_path" SET NOT NULL`,
    );
  }
}
