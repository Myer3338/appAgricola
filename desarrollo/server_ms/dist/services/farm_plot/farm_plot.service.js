"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPlotService = void 0;
const database_service_1 = require("../database/database.service");
const farm_plot_model_1 = require("../../models/farm_plot.model");
class FarmPlotService {
    constructor() {
        this.databaseService = database_service_1.DatabaseService.getInstance();
        this.farmPlotRepository = this.databaseService.getSequelize().getRepository(farm_plot_model_1.FarmPlot);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new FarmPlotService();
        }
        return this.instance;
    }
    async getAll() {
        return this.farmPlotRepository.findAndCountAll();
    }
    async getById(id) {
        return this.farmPlotRepository.findByPk(id);
    }
    async create(farmPlot) {
        return this.farmPlotRepository.create(farmPlot);
    }
    async update(farmPlot) {
        return this.farmPlotRepository.update(farmPlot, {
            where: {
                id: farmPlot.id
            },
            individualHooks: true
        });
    }
    async delete(id) {
        return this.farmPlotRepository.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }
}
exports.FarmPlotService = FarmPlotService;
