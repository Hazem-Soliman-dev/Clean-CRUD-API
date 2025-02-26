import { Request, Response } from "express";
import {
  getAllCitiesService,
  getCityByIdService,
  createCityService,
  updateCityService,
  deleteCityService,
} from "../services/city.service";

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await getAllCitiesService();
    if (!cities) {
      return res.status(404).json({
        message: "No cities found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Cities found successfully",
      data: cities,
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

export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await getCityByIdService(parseInt(id));
    if (!city) {
      return res.status(404).json({
        message: "City not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "City found successfully",
      data: city,
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

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, stateId } = req.body;
    const city = await createCityService(name, parseInt(stateId));
    if (!city) {
      return res.status(400).json({
        message: "Failed to create city",
        success: false,
      });
    }
    res.status(201).json({
      message: "City created successfully",
      data: city,
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

export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, stateId } = req.body;
    const city = await updateCityService(parseInt(id), name, parseInt(stateId));
    if (!city) {
      return res.status(404).json({
        message: "City not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "City updated successfully",
      data: city,
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

export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const city = await deleteCityService(parseInt(id));
    if (!city) {
      return res.status(404).json({
        message: "City not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "City deleted successfully",
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
