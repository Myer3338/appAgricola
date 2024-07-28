"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agronomic_activity_service_1 = require("../../services/agronomic_activity/agronomic_activity.service");
const agronomic_activity_model_1 = require("../../models/agronomic_activity.model");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const agronomic_activityService = agronomic_activity_service_1.AgronomicActivityService.getInstance();
        const cities = await agronomic_activityService.getAll();
        res.status(200).json({
            "count": cities.count,
            "data": cities.rows
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            "meta": {},
            "data": { error: error }
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const agronomic_activityService = agronomic_activity_service_1.AgronomicActivityService.getInstance();
        const agronomic_activity = await agronomic_activityService.getById(Number(id));
        if (!agronomic_activity) {
            res.status(404).json({
                "meta": {},
                "data": {
                    error: 'AgronomicActivity not found'
                }
            });
            return;
        }
        res.status(200).json({
            "meta": {},
            "data": agronomic_activity
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
        const { error } = agronomic_activity_model_1.AgronomicActivityCreateValidator.validate(req.body);
        if (error) {
            return res.status(400).send({
                "meta": {},
                "data": { error: error.details[0].message }
            });
        }
        const agronomicActivityService = agronomic_activity_service_1.AgronomicActivityService.getInstance();
        await agronomicActivityService.create(req.body);
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'AgronomicActivity created successfully'
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
        const { error } = agronomic_activity_model_1.AgronomicActivityUpdateValidator.validate(req.body);
        if (error) {
            return res.status(400).send({
                "meta": {},
                "data": { error: error.details[0].message }
            });
        }
        const agronomicActivityService = agronomic_activity_service_1.AgronomicActivityService.getInstance();
        await agronomicActivityService.update(req.body);
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'AgronomicActivity updated successfully'
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
        const agronomicActivityService = agronomic_activity_service_1.AgronomicActivityService.getInstance();
        await agronomicActivityService.delete(Number(id));
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'AgronomicActivity deleted successfully'
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
