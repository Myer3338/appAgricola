import { Request, Response, Router } from 'express';
import { AgronomicActivityService } from '../../services/agronomic_activity/agronomic_activity.service';
import { AgronomicActivityCreateValidator, AgronomicActivityUpdateValidator } from '../../models/agronomic_activity.model';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const agronomic_activityService = AgronomicActivityService.getInstance();
    const cities = await agronomic_activityService.getAll();
    res.status(200).json({
      "count": cities.count,
      "data": cities.rows
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agronomic_activityService = AgronomicActivityService.getInstance();
    const agronomic_activity = await agronomic_activityService.getById(Number(id));
    if (!agronomic_activity) {
      res.status(404).json({
        "meta": {},
        "data": {
          error: 'AgronomicActivity not found'
        }
      })
      return;
    }
    res.status(200).json({
      "meta": {},
      "data": agronomic_activity
    });
  } catch (error) {
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { error } = AgronomicActivityCreateValidator.validate(req.body);

    if (error) {
      return res.status(400).send({
        "meta": {},
        "data": { error: error.details[0].message }
      });
    }

    const agronomicActivityService = AgronomicActivityService.getInstance();
    await agronomicActivityService.create(req.body);
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'AgronomicActivity created successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = AgronomicActivityUpdateValidator.validate(req.body);

    if (error) {
      return res.status(400).send({
        "meta": {},
        "data": { error: error.details[0].message }
      });
    }

    const agronomicActivityService = AgronomicActivityService.getInstance();
    await agronomicActivityService.update(req.body);
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'AgronomicActivity updated successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agronomicActivityService = AgronomicActivityService.getInstance();
    await agronomicActivityService.delete(Number(id));
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'AgronomicActivity deleted successfully'
      }
    });
  } catch (error) {
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

export default router;