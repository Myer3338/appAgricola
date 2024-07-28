"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgronomicActivityService = void 0;
const database_service_1 = require("../database/database.service");
const agronomic_activity_model_1 = require("../../models/agronomic_activity.model");
class AgronomicActivityService {
    constructor() {
        this.databaseService = database_service_1.DatabaseService.getInstance();
        this.agronomicActivityRepository = this.databaseService.getSequelize().getRepository(agronomic_activity_model_1.AgronomicActivity);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new AgronomicActivityService();
        }
        return this.instance;
    }
    async getAll() {
        return this.agronomicActivityRepository.findAndCountAll();
    }
    async getById(id) {
        return this.agronomicActivityRepository.findByPk(id);
    }
    async create(agronomicActivity) {
        return this.agronomicActivityRepository.create(agronomicActivity);
    }
    async update(agronomicActivity) {
        return this.agronomicActivityRepository.update(agronomicActivity, {
            where: {
                id: agronomicActivity.id
            },
            individualHooks: true
        });
    }
    async delete(id) {
        return this.agronomicActivityRepository.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }
}
exports.AgronomicActivityService = AgronomicActivityService;
