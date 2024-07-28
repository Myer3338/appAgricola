"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPlotUpdateValidator = exports.FarmPlotCreateValidator = exports.FarmPlot = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Joy = require("joi");
let FarmPlot = class FarmPlot extends sequelize_typescript_1.Model {
};
exports.FarmPlot = FarmPlot;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], FarmPlot.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], FarmPlot.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], FarmPlot.prototype, "latitude", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], FarmPlot.prototype, "longitude", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], FarmPlot.prototype, "size_in_sqm", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], FarmPlot.prototype, "crop_type", void 0);
exports.FarmPlot = FarmPlot = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        include: []
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'farm_plot'
    })
], FarmPlot);
exports.FarmPlotCreateValidator = Joy.object({
    name: Joy.string().max(50).required(),
    latitude: Joy.number().required(),
    longitude: Joy.number().required(),
    size_in_sqm: Joy.number().required(),
    crop_type: Joy.string().max(255).required(),
});
exports.FarmPlotUpdateValidator = Joy.object({
    id: Joy.number().integer().required(),
    name: Joy.string().max(50),
    latitude: Joy.number(),
    longitude: Joy.number(),
    size_in_sqm: Joy.number(),
    crop_type: Joy.string().max(50),
});
