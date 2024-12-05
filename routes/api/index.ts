import express from 'express';
import workOrderRoutes from './inventory';

const router = express.Router();

router.use('/inventory', workOrderRoutes);

export default router;
