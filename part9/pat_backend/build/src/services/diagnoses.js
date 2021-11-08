"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDiags = void 0;
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
function GetDiags() {
    return diagnoses_1.default;
}
exports.GetDiags = GetDiags;
