import { Sequelize } from 'sequelize-typescript';
import * as moment from 'moment';
import { FarmPlot } from '../../models/farm_plot.model';
import { AgronomicActivity } from '../../models/agronomic_activity.model';
import { config } from '../../config/config';

export class DatabaseService {

    private static instance: DatabaseService;
    private sequelize: Sequelize;

    private constructor() {
        this.sequelize = new Sequelize({
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            database: config.RDS_DATABASE,
            username: config.RDS_USER,
            password: config.RDS_PASSWORD,
            host: config.RDS_HOST,
            models: [
                FarmPlot,
                AgronomicActivity
            ],
            logging: true,
            repositoryMode: false,
            timezone: moment().format('Z')
        });
    }

    public static getInstance(): DatabaseService {
        if (!this.instance) {
            this.instance = new DatabaseService();
        }

        return this.instance;
    }

    public getSequelize() {
        return this.sequelize;
    }

}
