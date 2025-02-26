import { AppDataSource } from "../config/database";
import { Country } from "../entities/Country";
import path from "path";
import fs from "fs";

export const getAllCountriesService = async () => {
  const countries = await AppDataSource.getRepository(Country).find({
    relations: ["states"],
  });
  if (!countries) {
    return null;
  }
  return countries; 
};

export const getCountryByIdService = async (id: number) => {
  const country = await AppDataSource.getRepository(Country).findOne({
    where: { id },
    relations: ["states"],
  });
  if (!country) {
    return null;
  }
  return country;
};

export const createCountryService = async (
  name: string,
  flag: string | null
) => {
  const country = await AppDataSource.getRepository(Country).save({
    name: name,
    flag: flag || undefined,
  });
  if (!country) {
    return null;
  }
  return country;
};

export const updateCountryService = async (
  id: number,
  name: string,
  flag: string | null
) => {
  const existingCountry = await AppDataSource.getRepository(Country).findOneBy({
    id,
  });
  if (!existingCountry) {
    return null;
  }

  if (existingCountry.flag && flag && existingCountry.flag !== flag) {
    const oldFlagPath = path.join(
      __dirname,
      "..",
      "uploads",
      existingCountry.flag
    );
    if (fs.existsSync(oldFlagPath)) {
      fs.unlinkSync(oldFlagPath);
    }
  }

  const updatedCountry = await AppDataSource.getRepository(Country).save({
    ...existingCountry,
    name,
    flag: flag || undefined,
  });
  if (!updatedCountry) {
    return null;
  }
  return updatedCountry;
};

export const deleteCountryService = async (id: number) => {
  const country = await AppDataSource.getRepository(Country).findOneBy({ id });
  if (!country) {
    return null;
  }

  const result = await AppDataSource.getRepository(Country).delete(id);
  if (result.affected === 0) {
    return null;
  }

  if (country.flag) {
    const flagPath = path.join(__dirname, "..", "uploads", country.flag);
    if (fs.existsSync(flagPath)) {
      fs.unlinkSync(flagPath);
    }
  }

  return true;
};
