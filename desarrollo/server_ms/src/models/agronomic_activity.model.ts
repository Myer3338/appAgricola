import { Table, Column, Model, PrimaryKey, DataType, AllowNull, AutoIncrement, DefaultScope } from 'sequelize-typescript';
import * as Joy from 'joi';
import { Optional } from 'sequelize';

export interface AgronomicActivityAttributes {
    id: number;
    date: string;
    activity_type: string;
    supply: string;
    duration: string;
}

export interface AgronomicActivityCreationAttributes extends Optional<AgronomicActivityAttributes, 'id'> { }

@DefaultScope(()=>({
    include: []
}))
@Table({
    timestamps: true,
    tableName: 'agronomic_activity',
})
export class AgronomicActivity extends Model<AgronomicActivityAttributes, AgronomicActivityCreationAttributes> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    date: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    activity_type: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    supply: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    duration: string;

}

export const AgronomicActivityCreateValidator = Joy.object({
    date: Joy.string().max(50).required(),
    activity_type: Joy.string().max(50).required(),
    supply: Joy.string().max(255).required(),
    duration: Joy.string().max(50).required()
});

export const AgronomicActivityUpdateValidator = Joy.object({
    id: Joy.number().integer().required(),
    date: Joy.string().max(50),
    activity_type: Joy.string().max(50),
    supply: Joy.string().max(255),
    duration: Joy.string().max(50)
});