import express from 'express';
import stub from './../controllers/stub.js';

const router = express.Router();

import databaseControllers from './../controllers/databases/index.js'
import tableControllers from './../controllers/tables/index.js'


// GET requests

router.get('/databases', databaseControllers.get.databases);
router.get('/databases/:database', databaseControllers.get.database);

router.get('/:database/tables', tableControllers.get.tables);
router.get('/:database/tables/:table', tableControllers.get.table);
router.get('/:database/tables/:table/row', tableControllers.get.row);

// POST requests

router.post('/databases/:name', databaseControllers.post.database);

router.post('/:databaseName/tables/:name', tableControllers.post.table);

router.post('/:databaseName/tables/:name/row', tableControllers.post.row);

// PATCH requests

router.patch('/:databaseName/tables/:name/row/:id', tableControllers.patch.row);

// DELETE requests

router.delete('/databases/:database', databaseControllers.delete.database);

router.delete('/:databaseName/tables/:name', tableControllers.delete.table);

router.delete('/:databaseName/tables/:name/row', tableControllers.delete.rowByParams);
router.delete('/:databaseName/tables/:name/row/:id', tableControllers.delete.rowByID);


export default router;