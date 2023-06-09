import multer from "multer";

import { Router } from "express";

import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCategoryController";

import { ListCategoriesController } from "@modules/cars/useCases/ListCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/ImportCategories/ImportCategoryController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({ 
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", 
ensureAuthenticated, 
ensureAdmin, 
createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import", 
ensureAuthenticated,
ensureAdmin,
upload.single("file"), 
importCategoryController.handle)

export { categoriesRoutes }