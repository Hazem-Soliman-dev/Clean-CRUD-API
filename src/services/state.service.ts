import { AppDataSource } from "../config/database";
import { State } from "../entities/State";
import { Country } from "../entities/Country";

export const getAllStatesService = async () => {
  const states = await AppDataSource.getRepository(State)
    .createQueryBuilder("state")
    .leftJoinAndSelect("state.country", "country")
    .getMany();

  if (!states) {
    return null;
  }
  return states;
};

export const getStateByIdService = async (id: number) => {
  const state = await AppDataSource.getRepository(State)
    .createQueryBuilder("state")
    .leftJoinAndSelect("state.country", "country")
    .where("state.id = :id", { id })
    .getOne();

  if (!state) {
    return null;
  }
  return state;
};

export const createStateService = async (name: string, countryId: number) => {
  const country = await AppDataSource.getRepository(Country).findOneBy({
    id: countryId,
  });
  if (!country) {
    return null;
  }
  const state = await AppDataSource.getRepository(State).save({ name, country });
  if (!state) {
    return null;
  }
  return state;
};

export const updateStateService = async (
  id: number,
  name: string | undefined,
  countryId: number | undefined
) => {
  const state = await AppDataSource.getRepository(State).findOneBy({ id });
  if (!state) {
    return null;
  }
  const country = await AppDataSource.getRepository(Country).findOneBy({
    id: countryId,
  });
  if (!country) {
    return null;
  }
  const updatedState = await AppDataSource.getRepository(State).save({
    ...state,
    name,
    country,
  });
  if (!updatedState) {
    return null;
  }
  return updatedState;
};

export const deleteStateService = async (id: number) => {
  const state = await AppDataSource.getRepository(State).findOneBy({ id });
  if (!state) {
    return null;
  }

  const result = await AppDataSource.getRepository(State).delete(id);
  if (result.affected === 0) {
    return null;
  }

  return true;
};
