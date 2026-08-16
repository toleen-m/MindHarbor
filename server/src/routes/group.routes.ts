import { Router } from "express";
import * as groupController from "../controllers/group.controller.js";
import { authentifier } from "../middlewares/middleware.js";
import { validateBody } from "../middlewares/validate.js";
import {createGroupSchema, createPostSchema, createCommentSchema, updateRequestSchema} from "../schemas/group.schema.js";


const groupRouter = Router();


// get groups 
groupRouter.get("/groups", groupController.getGroups);


// cree group
groupRouter.post("/groups", authentifier, validateBody(createGroupSchema), groupController.createGroup);




// GET group par id
groupRouter.get("/groups/:id", groupController.getGroupById);


// join un group
groupRouter.post("/groups/:id/join", authentifier, groupController.joinGroup);



// (moderateur)
groupRouter.get("/groups/:id/requests", authentifier, groupController.getGroupRequests);


groupRouter.patch("/groups/:id/requests/:requestId", authentifier, validateBody(updateRequestSchema), groupController.updateGroupRequest);


// (moderateur) delete user
groupRouter.delete("/groups/:id/members/:userId", authentifier, groupController.removeMember);

// get posts
groupRouter.get("/groups/:id/posts",authentifier, groupController.getGroupPosts);

// POST un post
groupRouter.post("/groups/:id/posts",authentifier, validateBody(createPostSchema), groupController.createPost);

// delete un post
groupRouter.delete("/posts/:id", authentifier, groupController.deletePost);


// commentaire
groupRouter.post("/posts/:id/comments", authentifier, validateBody(createCommentSchema), groupController.createComment);


export default groupRouter;