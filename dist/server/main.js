/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../libs/src/shared/utils/html-utils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addTextAfterClosingTag = exports.addClassToHtml = void 0;
/**
  * htmlのタグにクラスを追加
  * @param html
  * @param className
  * @param tagName
  * @returns
  */
function addClassToHtml(html, className, tagName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
        el.classList.add(className);
    });
    return doc.documentElement.innerHTML;
}
exports.addClassToHtml = addClassToHtml;
/**
 * 要素の終了タグの後ろにテキストを追加
 * @param html
 * @param tagName
 * @param text
 * @returns
 */
function addTextAfterClosingTag(html, tagName, text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.querySelectorAll(tagName);
    elements.forEach((el) => {
        const textNode = document.createTextNode(text);
        if (el.parentNode) {
            el.parentNode.insertBefore(textNode, el.nextSibling);
        }
    });
    return doc.documentElement.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}
exports.addTextAfterClosingTag = addTextAfterClosingTag;


/***/ }),

/***/ "../libs/src/shared/utils/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../libs/src/shared/utils/html-utils.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../libs/src/shared/utils/markdown-utils.ts"), exports);


/***/ }),

/***/ "../libs/src/shared/utils/markdown-utils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMetadataArray = exports.getMetadataValue = exports.getMdContent = exports.addMdPrefixToImageSource = void 0;
/**
 * mdファイル内の画像に文字列を追加
 * @param md
 * @param prefix
 */
function addMdPrefixToImageSource(md, prefix) {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const imgToken = tokens[idx];
        const srcIndex = imgToken.attrIndex('src');
        if (imgToken.attrs !== null) {
            const srcValue = imgToken.attrs[srcIndex][1];
            const newSrcValue = prefix + srcValue;
            imgToken.attrs[srcIndex][1] = newSrcValue;
        }
        return self.renderToken(tokens, idx, options);
    };
}
exports.addMdPrefixToImageSource = addMdPrefixToImageSource;
/**
 * mdファイルのコンテンツデータを取得
 * @param str
 * @returns
 */
function getMdContent(str) {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const content = str.slice(endIndex + 3).trim();
    return content;
}
exports.getMdContent = getMdContent;
/**
 * mdファイルのメタデータを取得
 * @param str
 * @param key
 * @returns
 */
function getMetadataValue(str, key) {
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1) + 1;
    const metadata = str.slice(startIndex + 3, endIndex).trim();
    const keyStartIndex = metadata.indexOf(key);
    if (keyStartIndex === -1) {
        return '';
    }
    const keyEndIndex = metadata.indexOf('\n', keyStartIndex);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex).trim();
    return value;
}
exports.getMetadataValue = getMetadataValue;
/**
 * mdファイルのメタデータの配列を取得
 * @param str
 * @param key
 * @returns
 */
function getMetadataArray(str, key) {
    const find = getMetadataValue(str, key);
    if (find) {
        return [find];
    }
    const startIndex = str.indexOf('---');
    const endIndex = str.indexOf('---', startIndex + 1);
    const metadata = str.slice(startIndex + 3, endIndex).trim();
    const keyStartIndex = metadata.indexOf(key);
    if (keyStartIndex < 0) {
        return [];
    }
    const keyEndIndex = metadata.indexOf(':', keyStartIndex + key.length);
    const value = metadata.slice(keyStartIndex + key.length, keyEndIndex);
    const lines = value.split('\n').filter(line => line.startsWith('-'));
    const values = lines.map(v => v.slice(2, v.indexOf('\n')).trim());
    return values;
}
exports.getMetadataArray = getMetadataArray;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const blogs_module_1 = __webpack_require__("./src/app/blogs/blogs.module.ts");
// import { ItemsModule } from './items/items.module';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from '../../data-source';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            // ItemsModule,
            // AuthModule,
            // TypeOrmModule.forRoot(dataSourceOptions),
            blogs_module_1.BlogsModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/blogs/blogs.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const blogs_service_1 = __webpack_require__("./src/app/blogs/blogs.service.ts");
const express_1 = __webpack_require__("express");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    findAllIds() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogsService.findAllIds();
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogsService.findAll();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogsService.findById(id);
        });
    }
    getBlogImageFile(id, fileName, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.blogsService.getBlogImageFile(id, fileName, res);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('ids'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], BlogsController.prototype, "findAllIds", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BlogsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], BlogsController.prototype, "findById", null);
tslib_1.__decorate([
    (0, common_1.Get)('/img/:id/:fileName'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Param)('fileName')),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogImageFile", null);
BlogsController = tslib_1.__decorate([
    (0, common_1.Controller)('blogs'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof blogs_service_1.BlogsService !== "undefined" && blogs_service_1.BlogsService) === "function" ? _a : Object])
], BlogsController);
exports.BlogsController = BlogsController;


/***/ }),

/***/ "./src/app/blogs/blogs.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const blogs_controller_1 = __webpack_require__("./src/app/blogs/blogs.controller.ts");
const blogs_service_1 = __webpack_require__("./src/app/blogs/blogs.service.ts");
let BlogsModule = class BlogsModule {
};
BlogsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [blogs_controller_1.BlogsController],
        providers: [blogs_service_1.BlogsService],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;


/***/ }),

/***/ "./src/app/blogs/blogs.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fs_1 = __webpack_require__("fs");
const util_1 = __webpack_require__("util");
// eslint-disable-next-line @nx/enforce-module-boundaries
const utils = tslib_1.__importStar(__webpack_require__("../libs/src/shared/utils/index.ts"));
const path_1 = __webpack_require__("path");
let BlogsService = class BlogsService {
    findAllIds() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const folderPath = (0, path_1.join)(process.cwd(), 'dist/server/assets/posts');
            try {
                const dirents = yield (0, util_1.promisify)(fs_1.readdir)(folderPath, {
                    withFileTypes: true,
                });
                const folders = dirents
                    .filter((dirent) => dirent.isDirectory())
                    .map((dirent) => dirent.name);
                return folders;
            }
            catch (error) {
                console.error(`Failed to read directories: ${error}`);
                throw new Error('Failed to read directories');
            }
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ids = yield this.findAllIds();
            const blogs = [];
            for (const id of ids) {
                blogs.push(yield this.findById(id));
            }
            return blogs;
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(id);
            const filePath = (0, path_1.join)(process.cwd(), 'dist/server/assets/posts', id, 'index.md');
            try {
                const content = (0, util_1.promisify)(fs_1.readFile)(filePath, { encoding: 'utf-8' });
                return this.parseBlogContent(id, yield content);
            }
            catch (error) {
                console.error(`Failed to read file: ${filePath}`);
                console.error(error);
            }
        });
    }
    getBlogImageFile(id, fileName, res) {
        const imageFilePath = (0, path_1.join)(process.cwd(), 'dist/server/assets/posts', id, fileName);
        return res.sendFile(imageFilePath);
    }
    parseBlogContent(id, content) {
        // console.log(`id: ${id}`);
        const blog = {
            id: id,
            title: utils.getMetadataValue(content, 'title:'),
            date: utils.getMetadataValue(content, 'date:'),
            thumbnail: utils.getMetadataValue(content, 'thumbnail:'),
            tags: utils.getMetadataArray(content, 'tags:'),
            categories: utils.getMetadataArray(content, 'categories:'),
            article: utils.getMdContent(content),
        };
        if (blog.thumbnail) {
            blog.thumbnail = (0, path_1.join)('/api/blogs/img', blog.id, blog.thumbnail);
        }
        return blog;
    }
};
BlogsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], BlogsService);
exports.BlogsService = BlogsService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "util":
/***/ ((module) => {

module.exports = require("util");

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