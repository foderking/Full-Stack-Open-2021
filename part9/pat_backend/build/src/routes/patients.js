"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = require("../services/patients");
const Utils_1 = require("../Utils");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send((0, patients_1.GetPatientsSafe)());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send((0, patients_1.GetByID)(id));
    // res.send( GetPatientsSafe() )
});
router.post('/', (req, res) => {
    try {
        const new_diary_entry = (0, Utils_1.ToPatientEntry)(req.body);
        const new_entry = (0, patients_1.CreateDiaryEntry)(new_diary_entry);
        res.json(new_entry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
