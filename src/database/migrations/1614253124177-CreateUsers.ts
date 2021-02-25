import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614253124177 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        });
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("users");
    };

};
