import type { Request, Response } from "express";
import { prisma } from "../prisma/index.js";
import asyncHandler from "express-async-handler";

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const image = req.file?.path;
  if (!name || !image) {
    res
      .status(400)
      .json({ message: "Please fill all the fields", success: false });
    return;
  }
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });
  if (isCategoryExist) {
    res
      .status(400)
      .json({ message: "Category already exists", success: false });
    return;
  }
  const category = await prisma.category.create({
    data: {
      name,
      picture: image,
      ...(description && { description }),
    },
  });
  res.status(200).json({
    message: "Category added successfully",
    success: true,
    category,
  });
  return;
});

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.status(200).json({
    message: "Categories fetched successfully",
    success: true,
    data: categories,
  });
  return;
});

export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Category fetched successfully",
      success: true,
      data: category,
    });
    return;
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file?.path;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(name && { name: name }),
        ...(image && { picture: image }),
        ...(description && { description }),
      },
    });
    res.status(200).json({
      message: "Category updated successfully",
      success: true,
      data: category,
    });
    return;
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      data: category,
    });
    return;
  },
);
