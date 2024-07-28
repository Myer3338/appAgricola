import { Request, Response, Router } from 'express';

import agronomic_activity from './agronomic_activity.route';
import farm_plot from './farm_plot.route';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      "meta": {},
      "data": {
        message: 'welcome to api v1'
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.use('/agronomic_activity', agronomic_activity);
router.use('/farm_plot', farm_plot);

export default router;