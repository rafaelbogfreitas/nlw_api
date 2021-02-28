import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys_users")
class SurveysUsers {

  @PrimaryColumn()
  readonly id!: string;

  @Column()
  user_id: string;

  @Column()
  survey_id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  create_at: Date;

  constructor(id?: string) {
    if(!this.id) {
      this.id = uuid()
    }
  }
};

export { SurveysUsers };