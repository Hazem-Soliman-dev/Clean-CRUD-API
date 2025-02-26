import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { State } from "./State";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => State, (state) => state.cities)
  state!: State;
}
