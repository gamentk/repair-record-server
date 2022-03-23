"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
var express_1 = require("express");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
    Methods["DELETE"] = "delete";
})(Methods = exports.Methods || (exports.Methods = {}));
var AppController = /** @class */ (function () {
    function AppController() {
        this.router = (0, express_1.Router)();
    }
    AppController.prototype.setRoutes = function () {
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            for (var _b = 0, _c = route.localMiddlewares; _b < _c.length; _b++) {
                var middleware = _c[_b];
                this.router.use(route.path, middleware);
            }
            this.router[route.method](route.path, route.handler);
        }
        return this.router;
    };
    return AppController;
}());
exports.default = AppController;
