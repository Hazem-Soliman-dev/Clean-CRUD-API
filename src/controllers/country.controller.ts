import { Request, Response } from "express";
import {
  getAllCountriesService,
  getCountryByIdService,
  createCountryService,
  updateCountryService,
  deleteCountryService,
} from "../services/country.service";

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await getAllCountriesService();
    if (!countries) {
      return res.status(404).json({
        message: "No countries found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Countries found",
      data: countries,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || "Unknown error",
      success: false,
    });
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const country = await getCountryByIdService(id);
    if (!country) {
      return res.status(404).json({
        message: "Country not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Country found",
      data: country,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || "Unknown error",
      success: false,
    });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const flag = req.file?.filename || null;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: ["Name is required"],
      });
    }

    const country = await createCountryService(name, flag);
    if (!country) {
      return res.status(400).json({
        message: "Country not created",
        success: false,
      });
    }
    res.status(201).json({
      message: "Country created",
      data: country,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || "Unknown error",
      success: false,
    });
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const flag = req.file?.filename || null;
  try {
    const country = await updateCountryService(id, name, flag);
    if (!country) {
      return res.status(404).json({
        message: "Country not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Country updated",
      data: country,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || "Unknown error",
      success: false,
    });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await deleteCountryService(id);
    if (!result) {
      return res.status(404).json({
        message: "Country not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Country deleted",
      data: result,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error?.message || "Unknown error",
      success: false,
    });
  }
};
