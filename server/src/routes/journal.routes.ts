import { Router } from 'express';
import { getEntries, createEntry, getEntryByDate, updateEntryByDate, getStats, getInsights } from '../controllers/journal.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { authentifier } from '../middlewares/middleware.js';
import { createJournalSchema, updateJournalSchema } from '../schemas/journal.schema.js';


const journalRouter = Router();

// Appliquer le middleware authentifier à toutes les routes journal
journalRouter.use(authentifier);

// GET localhost:3000/journal -> liste paginee de mes entrees
journalRouter.get('/', getEntries);



// POST localhost:3000/journal -> entree du jour 
journalRouter.post('/', validateBody(createJournalSchema), createEntry);



// GET localhost:3000/journal/stats?range=30d -> statistiques sur les entrees du journal
journalRouter.get('/stats', getStats);

// GET localhost:3000/journal/insights -> insights sur les entrees du journal
journalRouter.get('/insights', getInsights);




//GET localhost:3000/journal/:date 
journalRouter.get('/:date', getEntryByDate);


// PATCH localhost:3000/journal/:date -> modifier l'entree du jour
journalRouter.patch('/:date', validateBody(updateJournalSchema), updateEntryByDate);




export default journalRouter;