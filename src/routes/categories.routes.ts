import multer from "multer";

import { Router } from "express";

import { CreateCategoryController } from "../modules/cars/useCases/CreateCategory/CreateCategoryController"
import { importCategoryController } from "../modules/cars/useCases/ImportCategories";
import { listCategoriesController } from "../modules/cars/useCases/ListCategories";

const categoriesRoutes = Router();

const upload = multer({ 
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handle(req, res);
})

export { categoriesRoutes }