import { AppDataSource } from "../config/database";
import { City } from "../entities/City";
import { State } from "../entities/State";

export const getAllCitiesService = async () => {
  const cities = await AppDataSource.getRepository(City).find({
    relations: ["state"],
  });
  if (!cities) {
    return null;
  }
  return cities;
};

export const getCityByIdService = async (id: number) => {
  const city = await AppDataSource.getRepository(City).findOne({
    where: { id },
    relations: ["state"],
  });
  if (!city) {
    return null;
  }
  return city;
};

export const createCityService = async (name: string, stateId: number) => {
  const state = await AppDataSource.getRepository(State).findOneBy({ id: stateId });
  if (!state) {
    return null;
  }
  const city = await AppDataSource.getRepository(City).save({ name, state });
  if (!city) {
    return null;
  }
  return city;
};

export const updateCityService = async (
  id: number,
  name: string,
  stateId: number
) => {
  const city = await AppDataSource.getRepository(City).findOne({
    where: { id },
    relations: ["state"],
  });
  if (!city) {
    return null;
  }
  const state = await AppDataSource.getRepository(State).findOneBy({ id: stateId });
  if (!state) {
    return null;
  }
  const updatedCity = await AppDataSource.getRepository(City).save({
    ...city,
    name,
    state,
  });
  if (!updatedCity) {
    return null;
  }
  return updatedCity;
};

export const deleteCityService = async (id: number) => {
  const city = await AppDataSource.getRepository(City).findOneBy({ id });
  if (!city) {
    return null;
  }
  const result = await AppDataSource.getRepository(City).delete(id);
  if (result.affected === 0) {
    return null;
  }
  return true;
};
