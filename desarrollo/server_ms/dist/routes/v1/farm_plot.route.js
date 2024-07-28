"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const farm_plot_service_1 = require("../../services/farm_plot/farm_plot.service");
const farm_plot_model_1 = require("../../models/farm_plot.model");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const farmPlotService = farm_plot_service_1.FarmPlotService.getInstance();
        const farmPlots = await farmPlotService.getAll();
        res.status(200).json({
            "count": farmPlots.count,
            "data": farmPlots.rows
        });
    }
    catch (error) {
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const farmPlotService = farm_plot_service_1.FarmPlotService.getInstance();
        const farmPlot = await farmPlotService.getById(Number(id));
        if (!farmPlot) {
            res.status(404).json({
                "meta": {},
                "data": {
                    error: 'FarmPlot not found'
                }
            });
            return;
        }
        res.status(200).json({
            "meta": {},
            "data": farmPlot
        });
    }
    catch (error) {
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const { error } = farm_plot_model_1.FarmPlotCreateValidator.validate(req.body);
        if (error) {
            return res.status(400).send({
                "meta": {},
                "data": { error: error.details[0].message }
            });
        }
        const farmPlotService = farm_plot_service_1.FarmPlotService.getInstance();
        await farmPlotService.create(req.body);
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'FarmPlot created successfully'
            }
        });
    }
    catch (error) {
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const { error } = farm_plot_model_1.FarmPlotUpdateValidator.validate(req.body);
        if (error) {
            return res.status(400).send({
                "meta": {},
                "data": { error: error.details[0].message }
            });
        }
        const farmPlotService = farm_plot_service_1.FarmPlotService.getInstance();
        await farmPlotService.update(req.body);
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'FarmPlot updated successfully'
            }
        });
    }
    catch (error) {
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const farmPlotService = farm_plot_service_1.FarmPlotService.getInstance();
        await farmPlotService.delete(Number(id));
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'FarmPlot deleted successfully'
            }
        });
    }
    catch (error) {
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
exports.default = router;
