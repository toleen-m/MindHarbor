import type {Request, Response} from "express";

import * as groupService from "../services/group.service.js";


// GET /groups
export async function getGroups(req: Request, res: Response) {

    const search = req.query.search as string | undefined;

    const groups = await groupService.getGroups(search);

    res.json(groups);
}


// POST /groups
export async function createGroup(req: Request, res: Response) {

    const group = await groupService.createGroup(req.user!.id, req.body);

    res.status(201).json(group);
}




// GET /groups/:id
export async function getGroupById(req: Request, res: Response) {

    const group = await groupService.getGroupById(req.params.id as string, req.user?.id);

    res.json(group);
}

// POST /groups/:id/join
export async function joinGroup(req: Request, res: Response) {

    const result = await groupService.joinGroup( req.params.id as string, req.user!.id);

    res.status(201).json(result);
}


// GET /groups/:id/requests
export async function getGroupRequests(req: Request, res: Response) {

    const requests = await groupService.getGroupRequests(req.params.id as string, req.user!.id);

    res.json(requests);
}


// PATCH /groups/:id/requests/:requestId
export async function updateGroupRequest(req: Request, res: Response) {

    const result = await groupService.updateGroupRequest(req.params.id as string, req.params.requestId as string, req.body, req.user!.id);

    res.json(result);
}




// DELETE /groups/:id/members/:userId
export async function removeMember(req: Request, res: Response) {

}


// GET /groups/:id/posts
export async function getGroupPosts(req: Request, res: Response) {

    const posts =await groupService.getGroupPosts(req.params.id as string, req.user!.id);

    res.json(posts);
}


// POST /groups/:id/posts
export async function createPost(req: Request, res: Response) {

    const post = await groupService.createPost(req.params.id as string, req.user!.id, req.body);

    res.status(201).json(post);
}


// DELETE /posts/:id
export async function deletePost(req: Request, res: Response) {

}


// POST /posts/:id/comments
export async function createComment(req: Request, res: Response) {

    const comment =await groupService.createComment(req.params.id as string, req.user!.id, req.body);

    res.status(201).json(comment);
}