import { Request, Response } from "express";
import {
  getAllStatesService,
  getStateByIdService,
  createStateService,
  updateStateService,
  deleteStateService,
} from "../services/state.service";

export const getAllStates = async (req: Request, res: Response) => {
  const states = await getAllStatesService();
  if (!states) {
    return res.status(404).json({
      message: "No states found",
      success: false,
    });
  }
  res.status(200).json({
    message: "States found",
    data: states,
    success: true,
  });
};

export const getStateById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const state = await getStateByIdService(id);
  if (!state) {
    return res.status(404).json({
      message: "State not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "State found",
    data: state,
    success: true,
  });
};

export const createState = async (req: Request, res: Response) => {
  const { name, countryId } = req.body;
  const state = await createStateService(name, countryId);
  if (!state) {
    return res.status(400).json({
      message: "State not created",
      success: false,
    });
  }
  res.status(201).json({
    message: "State created",
    data: state,
    success: true,
  });
};

export const updateState = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, countryId } = req.body;
  const state = await updateStateService(id, name, countryId);
  if (!state) {
    return res.status(404).json({
      message: "State not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "State updated",
    data: state,
    success: true,
  });
};

export const deleteState = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const state = await deleteStateService(id);
  if (!state) {
    return res.status(404).json({
      message: "State not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "State deleted",
    data: state,
    success: true,
  });
};
