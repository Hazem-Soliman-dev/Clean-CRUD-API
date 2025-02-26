import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { State } from "./State";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  flag!: string;

  @OneToMany(() => State, (state) => state.country)
  states!: State[];
}
