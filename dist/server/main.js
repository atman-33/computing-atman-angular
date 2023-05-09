/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../libs/src/shared/helpers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../libs/src/shared/helpers/markdown-helper.ts"), exports);


/***/ }),

/***/ "../libs/src/shared/helpers/markdown-helper.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMetadataArray = exports.getMetadataValue = exports.getMdContent = exports.addMdPrefixToImageSource = void 0;
const MarkdownIt = __webpack_require__("markdown-it");
/**
 * mdファイル内の画像に文字列を追加
 * @param prefix
 * @returns
 */
function addMdPrefixToImageSource(str, prefix) {
    const md = new MarkdownIt();
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
    return md.render(str);
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
const post_module_1 = __webpack_require__("./src/app/post/post.module.ts");
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
            post_module_1.PostModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/post/post.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const post_service_1 = __webpack_require__("./src/app/post/post.service.ts");
const express_1 = __webpack_require__("express");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    findAllIds() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.postService.findAllIds();
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.postService.findAll();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.postService.findById(id);
        });
    }
    getPostImageFile(id, fileName, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.postService.getPostImageFile(id, fileName, res);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('ids'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PostController.prototype, "findAllIds", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PostController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PostController.prototype, "findById", null);
tslib_1.__decorate([
    (0, common_1.Get)('/img/:id/:fileName'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Param)('fileName')),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PostController.prototype, "getPostImageFile", null);
PostController = tslib_1.__decorate([
    (0, common_1.Controller)('post'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof post_service_1.PostService !== "undefined" && post_service_1.PostService) === "function" ? _a : Object])
], PostController);
exports.PostController = PostController;


/***/ }),

/***/ "./src/app/post/post.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const post_controller_1 = __webpack_require__("./src/app/post/post.controller.ts");
const post_service_1 = __webpack_require__("./src/app/post/post.service.ts");
let PostModule = class PostModule {
};
PostModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
    })
], PostModule);
exports.PostModule = PostModule;


/***/ }),

/***/ "./src/app/post/post.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fs_1 = __webpack_require__("fs");
const util_1 = __webpack_require__("util");
// eslint-disable-next-line @nx/enforce-module-boundaries
const helpers = tslib_1.__importStar(__webpack_require__("../libs/src/shared/helpers/index.ts"));
const path_1 = __webpack_require__("path");
let PostService = class PostService {
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
            const posts = [];
            for (const id of ids) {
                posts.push(yield this.findById(id));
            }
            return posts;
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(id);
            const filePath = (0, path_1.join)(process.cwd(), 'dist/server/assets/posts', id, 'index.md');
            try {
                const content = (0, util_1.promisify)(fs_1.readFile)(filePath, { encoding: 'utf-8' });
                return this.parsePostContent(id, yield content);
            }
            catch (error) {
                console.error(`Failed to read file: ${filePath}`);
                console.error(error);
            }
        });
    }
    getPostImageFile(id, fileName, res) {
        const imageFilePath = (0, path_1.join)(process.cwd(), 'dist/server/assets/posts', id, fileName);
        return res.sendFile(imageFilePath);
    }
    parsePostContent(id, content) {
        // console.log(`id: ${id}`);
        let post = {
            id: id,
            title: helpers.getMetadataValue(content, 'title:'),
            date: helpers.getMetadataValue(content, 'date:'),
            thumbnail: helpers.getMetadataValue(content, 'thumbnail:'),
            tags: helpers.getMetadataArray(content, 'tags:'),
            categories: helpers.getMetadataArray(content, 'categories:'),
            article: helpers.getMdContent(content),
        };
        post = this.addPrefixTothumbnail(post);
        post = this.addPrefixToImageSource(post);
        return post;
    }
    addPrefixTothumbnail(post) {
        if (post.thumbnail) {
            post.thumbnail = (0, path_1.join)('/api/post/img', post.id, post.thumbnail);
        }
        return post;
    }
    addPrefixToImageSource(post) {
        post.article = helpers.addMdPrefixToImageSource(post.article, './api/post/img/' + post.id + '/');
        return post;
    }
};
PostService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PostService);
exports.PostService = PostService;


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

/***/ "markdown-it":
/***/ ((module) => {

module.exports = require("markdown-it");

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