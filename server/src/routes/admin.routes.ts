import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import {authentifier, exigerRole} from "../middlewares/middleware.js";
import {validateBody} from "../middlewares/validate.js";
import {createReportSchema, updateReportSchema} from "../schemas/report.schema.js";


const adminRouter = Router();


//PSOT report
adminRouter.post("/reports", authentifier, validateBody(createReportSchema), adminController.createReport);



// (ADMINISTRTATEEUR) GET reports
adminRouter.get("/admin/reports", authentifier, exigerRole("ADMINISTRATEUR"), adminController.getReports);

// PATCH repondre au report
adminRouter.patch("/admin/reports/:id", authentifier, exigerRole("ADMINISTRATEUR"), validateBody(updateReportSchema), adminController.updateReport);

// GET stats anonymes
adminRouter.get("/admin/stats", authentifier, exigerRole("ADMINISTRATEUR"), adminController.getStats);

// PATCH suspendre un utilisateur
adminRouter.patch("/admin/users/:id/suspend", authentifier, exigerRole("ADMINISTRATEUR"), adminController.suspendUser);

export default adminRouter;