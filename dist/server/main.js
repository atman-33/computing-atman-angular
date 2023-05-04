/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_module_1 = __webpack_require__("./src/app/items/items.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [items_module_1.ItemsModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/items/dto/create-item-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateItemDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
class CreateItemDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(40),
    tslib_1.__metadata("design:type", String)
], CreateItemDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], CreateItemDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateItemDto.prototype, "description", void 0);
exports.CreateItemDto = CreateItemDto;


/***/ }),

/***/ "./src/app/items/item-status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemStatus = void 0;
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["ON_SALE"] = "ON_SALE";
    ItemStatus["SOLD_OUT"] = "SOLD_OUT";
})(ItemStatus = exports.ItemStatus || (exports.ItemStatus = {}));


/***/ }),

/***/ "./src/app/items/item.model.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/app/items/items.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
const item_model_1 = __webpack_require__("./src/app/items/item.model.ts");
const create_item_dto_1 = __webpack_require__("./src/app/items/dto/create-item-dto.ts");
let ItemsController = class ItemsController {
    /**
     *
     */
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    findAll() {
        return this.itemsService.findAll();
    }
    findById(id) {
        return this.itemsService.findById(id);
    }
    create(createItemDto) {
        return this.itemsService.create(createItemDto);
    }
    updateStatus(id) {
        return this.itemsService.updateStatus(id);
    }
    delete(id) {
        this.itemsService.delete(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Array)
], ItemsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id') // /items/id
    ,
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof item_model_1.Item !== "undefined" && item_model_1.Item) === "function" ? _b : Object)
], ItemsController.prototype, "findById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof create_item_dto_1.CreateItemDto !== "undefined" && create_item_dto_1.CreateItemDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof item_model_1.Item !== "undefined" && item_model_1.Item) === "function" ? _d : Object)
], ItemsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof item_model_1.Item !== "undefined" && item_model_1.Item) === "function" ? _e : Object)
], ItemsController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ItemsController.prototype, "delete", null);
ItemsController = tslib_1.__decorate([
    (0, common_1.Controller)('items'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof items_service_1.ItemsService !== "undefined" && items_service_1.ItemsService) === "function" ? _a : Object])
], ItemsController);
exports.ItemsController = ItemsController;


/***/ }),

/***/ "./src/app/items/items.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_controller_1 = __webpack_require__("./src/app/items/items.controller.ts");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
let ItemsModule = class ItemsModule {
};
ItemsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService],
    })
], ItemsModule);
exports.ItemsModule = ItemsModule;


/***/ }),

/***/ "./src/app/items/items.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const item_status_enum_1 = __webpack_require__("./src/app/items/item-status.enum.ts");
const uuid_1 = __webpack_require__("uuid");
let ItemsService = class ItemsService {
    constructor() {
        this.items = [];
    }
    findAll() {
        return this.items;
    }
    findById(id) {
        const found = this.items.find((item) => item.id === id);
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
    create(createItemDto) {
        const item = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createItemDto), { status: item_status_enum_1.ItemStatus.ON_SALE });
        this.items.push(item);
        return item;
    }
    updateStatus(id) {
        const item = this.items.find((item) => item.id === id);
        item.status = item_status_enum_1.ItemStatus.SOLD_OUT;
        return item;
    }
    delete(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }
};
ItemsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ItemsService);
exports.ItemsService = ItemsService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3000;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map