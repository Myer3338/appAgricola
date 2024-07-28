"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const moment = require("moment");
const farm_plot_model_1 = require("../../models/farm_plot.model");
const agronomic_activity_model_1 = require("../../models/agronomic_activity.model");
const config_1 = require("../../config/config");
class DatabaseService {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            database: config_1.config.RDS_DATABASE,
            username: config_1.config.RDS_USER,
            password: config_1.config.RDS_PASSWORD,
            host: config_1.config.RDS_HOST,
            models: [
                farm_plot_model_1.FarmPlot,
                agronomic_activity_model_1.AgronomicActivity
            ],
            logging: true,
            repositoryMode: false,
            timezone: moment().format('Z')
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DatabaseService();
        }
        return this.instance;
    }
    getSequelize() {
        return this.sequelize;
    }
}
exports.DatabaseService = DatabaseService;
