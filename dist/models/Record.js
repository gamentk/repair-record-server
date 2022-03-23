"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RecordSchema = new mongoose_1.Schema({
    recordId: { type: String, required: true },
    recordNo: { type: Number, required: true },
    repairDate: { type: Date, default: Date.now },
    section: { type: String, required: true },
    deviceName: { type: String, required: true },
    deviceSerialNumber: { type: String },
    deviceAccessories: { type: String },
    sender: { type: String, required: true },
    reciever: { type: String, required: true },
    recieveDate: { type: Date },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
var RecordModel = (0, mongoose_1.model)('Record', RecordSchema);
exports.default = RecordModel;
