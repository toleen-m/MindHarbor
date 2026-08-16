import { type Request, type Response } from 'express';
import * as resourceService from '../services/resource.service.js';

// GET lolcalhost:3000/activities -> liste des activites
export async function getActivities(req: Request,res: Response) {
    const activities = await resourceService.getActivities();

    res.json(activities);
}

// GET /resources
export async function getResources(req: Request,res: Response) {

    const resources = await resourceService.getResources(req.query);

    res.json(resources);
}



export async function getResourceById(req: Request,res: Response) {

    const resource = await resourceService.getResourceById( req.params.id as string);
    res.json(resource);
}


export async function createResource(req: Request,res: Response) {

    const resource = await resourceService.createResource(req.user!.id, req.body);

    res.status(201).json(resource);
}




export async function addFavorite(req: Request,res: Response) {

    const favorite = await resourceService.addFavorite(req.user!.id, req.params.id as string);
    // if (favorite){
    //     res.status(201).json("Ajouter a mes favoris!!! "+ favorite)
    // }
    res.status(201).json(favorite)
    
}


export async function removeFavorite(req: Request,res: Response) {

    await resourceService.removeFavorite(req.user!.id, req.params.id as string);

    res.status(201).json("Retirer de mes favoris !!!");
}


export async function getFavorites(req: Request,res: Response) {

    const favorites = await resourceService.getFavorites(req.user!.id);
    res.json(favorites);
}


export async function getSuggestions(req: Request,res: Response) {

    const suggestions = await resourceService.getSuggestions(req.user!.id);
    res.json(suggestions);
}