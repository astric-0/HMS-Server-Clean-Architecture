import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1739962243429 implements MigrationInterface {
  name = ' $npmConfigName1739962243429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "base_entity" ("id" uuid NOT NULL, "created" TIMESTAMP NOT NULL, CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "base_entity"`);
  }
}
