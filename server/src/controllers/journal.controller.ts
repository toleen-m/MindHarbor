import { type Request, type Response } from 'express';
import * as journalService from '../services/journal.service.js';

// GET localhost:3000/journal -> liste paginee de mes entrees
export async function getEntries(req: Request, res: Response) {
    const entries = await journalService.getEntries(req.user!.id);
    res.json(entries);
}


// POST localhost:3000/journal -> entree du jour
export async function createEntry(req: Request, res: Response) {
    const entry = await journalService.createEntry(req.user!.id, req.body);
    res.status(201).json(entry);
}

// GET localhost:3000/journal/:date
export async function getEntryByDate(req: Request, res: Response) {
    const entry = await journalService.getEntryByDate(req.user!.id, req.params.date as string);
    res.json(entry);
}

// PATCH localhost:3000/journal/:date -> modifier l'entree du jour
export async function updateEntryByDate(req: Request, res: Response) {
    const entry = await journalService.updateEntryByDate(req.user!.id, req.params.date as string, req.body);
    res.json(entry);
}

// GET localhost:3000/journal/stats?range=30d -> statistiques sur les entrees du journal
export async function getStats(req: Request, res: Response) {
    const range = Number(req.query.days ?? 30);
    const stats = await journalService.getStats(req.user!.id, range);
    res.json(stats);
}


// GET localhost:3000/journal/insights -> insights sur les entrees du journal
export async function getInsights(req: Request, res: Response) {
    const insights = await journalService.getInsights(req.user!.id);
    res.json(insights);
}
