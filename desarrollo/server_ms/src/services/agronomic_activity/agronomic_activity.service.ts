import { Repository } from 'sequelize-typescript';
import { DatabaseService } from '../database/database.service';
import { AgronomicActivity, AgronomicActivityAttributes } from '../../models/agronomic_activity.model';

export class AgronomicActivityService {

    private static instance: AgronomicActivityService;
    private databaseService: DatabaseService;
    private agronomicActivityRepository: Repository<AgronomicActivity>;

    private constructor() {
        this.databaseService = DatabaseService.getInstance();
        this.agronomicActivityRepository = this.databaseService.getSequelize().getRepository(AgronomicActivity);
    }

    public static getInstance(): AgronomicActivityService {
        if (!this.instance) {
            this.instance = new AgronomicActivityService();
        }

        return this.instance;
    }

    async getAll() {
        return this.agronomicActivityRepository.findAndCountAll();
    }

    async getById(id: number) {
        return this.agronomicActivityRepository.findByPk(id);
    }

    async create(agronomicActivity: AgronomicActivity) {
        return this.agronomicActivityRepository.create(agronomicActivity);
    }

    async update(agronomicActivity: AgronomicActivity) {
        return this.agronomicActivityRepository.update(agronomicActivity, {
            where: {
                id: agronomicActivity.id
            },
            individualHooks: true
        });
    }

    async delete(id: number) {
        return this.agronomicActivityRepository.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }

}