import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateTables21740935252918 implements MigrationInterface {
    name = 'RecreateTables21740935252918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "media_file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "full_path" character varying NOT NULL, "size" double precision NOT NULL, "media_directory_id" uuid, CONSTRAINT "PK_cac82b29eea888470cc40043b76" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media_directory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "parent_id" uuid, CONSTRAINT "PK_754b81f7d0c38a9514327fff8f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media_directory_closure" ("Id_ancestor" uuid NOT NULL, "Id_descendant" uuid NOT NULL, CONSTRAINT "PK_7b5340c62dac98b6b9943e51801" PRIMARY KEY ("Id_ancestor", "Id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e5144c8cf6eb87c6fe7de42588" ON "media_directory_closure" ("Id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5e64dc7fb664fde28ce29178e" ON "media_directory_closure" ("Id_descendant") `);
        await queryRunner.query(`ALTER TABLE "media_file" ADD CONSTRAINT "FK_9b87ce80cb32af28ac8a0209920" FOREIGN KEY ("media_directory_id") REFERENCES "media_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_directory" ADD CONSTRAINT "FK_ac6de95979bd9174127ae535674" FOREIGN KEY ("parent_id") REFERENCES "media_directory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_directory_closure" ADD CONSTRAINT "FK_e5144c8cf6eb87c6fe7de425888" FOREIGN KEY ("Id_ancestor") REFERENCES "media_directory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_directory_closure" ADD CONSTRAINT "FK_b5e64dc7fb664fde28ce29178ea" FOREIGN KEY ("Id_descendant") REFERENCES "media_directory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_directory_closure" DROP CONSTRAINT "FK_b5e64dc7fb664fde28ce29178ea"`);
        await queryRunner.query(`ALTER TABLE "media_directory_closure" DROP CONSTRAINT "FK_e5144c8cf6eb87c6fe7de425888"`);
        await queryRunner.query(`ALTER TABLE "media_directory" DROP CONSTRAINT "FK_ac6de95979bd9174127ae535674"`);
        await queryRunner.query(`ALTER TABLE "media_file" DROP CONSTRAINT "FK_9b87ce80cb32af28ac8a0209920"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5e64dc7fb664fde28ce29178e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5144c8cf6eb87c6fe7de42588"`);
        await queryRunner.query(`DROP TABLE "media_directory_closure"`);
        await queryRunner.query(`DROP TABLE "media_directory"`);
        await queryRunner.query(`DROP TABLE "media_file"`);
    }

}
