import { Repository } from 'sequelize-typescript';
import { DatabaseService } from '../database/database.service';
import { FarmPlot, FarmPlotAttributes } from '../../models/farm_plot.model';

export class FarmPlotService {

    private static instance: FarmPlotService;
    private databaseService: DatabaseService;
    private farmPlotRepository: Repository<FarmPlot>;

    private constructor() {
        this.databaseService = DatabaseService.getInstance();
        this.farmPlotRepository = this.databaseService.getSequelize().getRepository(FarmPlot);
    }

    public static getInstance(): FarmPlotService {
        if (!this.instance) {
            this.instance = new FarmPlotService();
        }

        return this.instance;
    }

    async getAll() {
        return this.farmPlotRepository.findAndCountAll();
    }

    async getById(id: number) {
        return this.farmPlotRepository.findByPk(id);
    }

    async create(farmPlot: FarmPlot) {
        return this.farmPlotRepository.create(farmPlot);
    }

    async update(farmPlot: FarmPlot) {
        return this.farmPlotRepository.update(farmPlot, {
            where: {
                id: farmPlot.id
            },
            individualHooks: true
        });
    }

    async delete(id: number) {
        return this.farmPlotRepository.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }

}