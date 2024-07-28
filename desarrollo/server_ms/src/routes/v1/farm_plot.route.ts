import { Request, Response, Router } from 'express';
import { FarmPlotService } from '../../services/farm_plot/farm_plot.service';
import { FarmPlotCreateValidator, FarmPlotUpdateValidator } from '../../models/farm_plot.model';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const farmPlotService = FarmPlotService.getInstance();
    const farmPlots = await farmPlotService.getAll();
    res.status(200).json({
      "count": farmPlots.count,
      "data": farmPlots.rows
    });
  } catch (error) {
    res.status(500).json({
      "meta": {},
      "data": { error: error }
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const farmPlotService = FarmPlotService.getInstance();
    const farmPlot = await farmPlotService.getById(Number(id));
    if (!farmPlot) {
      res.status(404).json({
        "meta": {},
        "data": {
          error: 'FarmPlot not found'
        }
      })
      return;
    }
    res.status(200).json({
      "meta": {},
      "data": farmPlot
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
    const { error } = FarmPlotCreateValidator.validate(req.body);

    if (error) {
      return res.status(400).send({
        "meta": {},
        "data": { error: error.details[0].message }
      });
    }

    const farmPlotService = FarmPlotService.getInstance();
    await farmPlotService.create(req.body);
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'FarmPlot created successfully'
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
    const { error } = FarmPlotUpdateValidator.validate(req.body);

    if (error) {
      return res.status(400).send({
        "meta": {},
        "data": { error: error.details[0].message }
      });
    }

    const farmPlotService = FarmPlotService.getInstance();
    await farmPlotService.update(req.body);
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'FarmPlot updated successfully'
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
    const farmPlotService = FarmPlotService.getInstance();
    await farmPlotService.delete(Number(id));
    res.status(200).json({
      "meta": {
      },
      "data": {
        message: 'FarmPlot deleted successfully'
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