import { Optional } from 'sequelize';
import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement, AllowNull, DefaultScope, Unique } from 'sequelize-typescript';
import * as Joy from 'joi';

export interface FarmPlotAttributes {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    size_in_sqm: number;
    crop_type: string;
}

export interface FarmPlotCreationAttributes extends Optional<FarmPlotAttributes, 'id'> { }

@DefaultScope(() => ({
    include: []
}))
@Table({
    timestamps: true,
    tableName: 'farm_plot'
})
export class FarmPlot extends Model<FarmPlotAttributes, FarmPlotCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(50))
    name: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    latitude: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    longitude: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    size_in_sqm: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    crop_type: string;

}

export const FarmPlotCreateValidator = Joy.object({
    name: Joy.string().max(50).required(),
    latitude: Joy.number().required(),
    longitude: Joy.number().required(),
    size_in_sqm: Joy.number().required(),
    crop_type: Joy.string().max(255).required(),
});

export const FarmPlotUpdateValidator = Joy.object({
    id: Joy.number().integer().required(),
    name: Joy.string().max(50),
    latitude: Joy.number(),
    longitude: Joy.number(),
    size_in_sqm: Joy.number(),
    crop_type: Joy.string().max(50),
});