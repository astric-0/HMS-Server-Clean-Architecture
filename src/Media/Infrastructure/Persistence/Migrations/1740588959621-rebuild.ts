import { MigrationInterface, QueryRunner } from "typeorm";

export class Rebuild1740588959621 implements MigrationInterface {
    name = 'Rebuild1740588959621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "i_base_entity_raw" ("id" uuid NOT NULL, "created" TIMESTAMP NOT NULL, CONSTRAINT "PK_d24f57ac3b51283a8ac36247714" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "i_base_entity_raw"`);
    }

}
