"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FlagImageSchema = new mongoose_1.Schema({
    public_id: { type: String },
    url: { type: String }
}, { _id: false });
var CountrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    currency: { type: String, required: true },
    continent: { type: String, required: true },
    description: { type: String },
    flagImage: FlagImageSchema
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Country', CountrySchema);
