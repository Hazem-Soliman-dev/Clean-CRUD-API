import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./Country";
import { City } from "./City";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Country, (country) => country.states)
  country!: Country;

  @OneToMany(() => City, (city) => city.state)
  cities!: City[];
}
