import { Router } from "express";
import { getActivities, getResources, getResourceById, createResource, addFavorite, removeFavorite, getFavorites, getSuggestions } from "../controllers/resource.controller.js";
import { authentifier } from "../middlewares/middleware.js";
import { exigerRole } from "../middlewares/middleware.js";
import { validateBody } from "../middlewares/validate.js";
import { createResourceSchema } from "../schemas/resource.schema.js";

const resourceRouter = Router();


// GET lolcalhost:3000/activities -> liste des activites
resourceRouter.get("/activities", getActivities);

// GET localhost:3000/resources -> liste des ressources
resourceRouter.get("/resources", getResources);

// GET localhost:3000/resources/:id -> details d'une ressource
resourceRouter.get("/resources/:id", getResourceById);


// POST localhost:3000/resources -> creer une ressource (ADMIN)
resourceRouter.post("/resources", authentifier, exigerRole("ADMINISTRATEUR"), validateBody(createResourceSchema), createResource);


// POST localhost:3000/resources/:id/favorite -> ajouter une ressource aux favoris
resourceRouter.post("/resources/:id/favorite", authentifier, addFavorite);

// DELETE localhost:3000/resources/:id/favorite -> retirer une ressource des favoris
resourceRouter.delete("/resources/:id/favorite", authentifier, removeFavorite);


// GET localhost:3000/me/favorites -> liste des ressources favorites de l'utilisateur
resourceRouter.get("/me/favorite", authentifier, getFavorites);


// GET localhost:3000/me/suggestions -> liste des suggestions de ressources pour l'utilisateur
resourceRouter.get("/me/suggestions", authentifier, getSuggestions);




export default resourceRouter;