"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const routes_1 = require("./routes");
const database_service_1 = require("./services/database/database.service");
async function start() {
    const databaseService = database_service_1.DatabaseService.getInstance();
    await databaseService.getSequelize().sync({
        alter: false,
        force: false
    });
    const app = express();
    const port = 3000;
    app.use(express.json());
    app.use(cors());
    app.use('/', routes_1.default);
    app.use((req, res, next) => {
        res.status(404).send();
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500).send();
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
start();
