"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agronomic_activity_route_1 = require("./agronomic_activity.route");
const farm_plot_route_1 = require("./farm_plot.route");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        res.status(200).json({
            "meta": {},
            "data": {
                message: 'welcome to api v1'
            }
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
router.use('/agronomic_activity', agronomic_activity_route_1.default);
router.use('/farm_plot', farm_plot_route_1.default);
exports.default = router;
