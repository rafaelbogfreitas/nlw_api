import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Survey } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SurveysUsers {

  @PrimaryColumn()
  readonly id!: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column()
  survey_id: string;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: "survey_id" })
  survey: Survey

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