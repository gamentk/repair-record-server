"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppController_1 = __importStar(require("./AppController"));
var RecordController = /** @class */ (function (_super) {
    __extends(RecordController, _super);
    function RecordController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/v1/records';
        _this.routes = [
            {
                path: '/',
                method: AppController_1.Methods.GET,
                handler: _this.handleGetRecords,
                localMiddlewares: []
            },
            {
                path: '/:recordId',
                method: AppController_1.Methods.GET,
                handler: _this.handleGetRecordById,
                localMiddlewares: []
            },
            {
                path: '/',
                method: AppController_1.Methods.POST,
                handler: _this.handleCreateRecord,
                localMiddlewares: []
            },
            {
                path: '/:recordId',
                method: AppController_1.Methods.PUT,
                handler: _this.handleUpdateRecord,
                localMiddlewares: []
            },
            {
                path: '/:recordId',
                method: AppController_1.Methods.DELETE,
                handler: _this.handleDeleteRecord,
                localMiddlewares: []
            }
        ];
        return _this;
    }
    RecordController.prototype.handleGetRecords = function (req, res, next) {
        res.json({ message: 'Get Records Route' });
    };
    RecordController.prototype.handleGetRecordById = function (req, res, next) {
        res.json({ message: 'Get Record By Id Route' });
    };
    RecordController.prototype.handleCreateRecord = function (req, res, next) {
        res.json({ message: 'Create Record Route' });
    };
    RecordController.prototype.handleUpdateRecord = function (req, res, next) {
        res.json({ message: 'Update Record Route' });
    };
    RecordController.prototype.handleDeleteRecord = function (req, res, next) {
        res.json({ message: 'Delete Record Route' });
    };
    return RecordController;
}(AppController_1.default));
exports.default = RecordController;
