/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ormconfig.js":
/***/ ((module) => {

module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    entities: ['dist/server/**/*.entity.js'],
    migrations: ['dist/server/migrations/*.js'],
    cli: {
        entitiesDir: 'server/src/app/entites',
        migrationsDir: 'server/src/app/migrations',
    },
};
// これは NX では利用できないため参考！（dist にwebpack で統合された main.js のみ配置されるため）
// module.exports = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//     autoLoadEntities: true,
//     entities: ['dist/server/entities/*.entity.js'],
//     migrations: ['dist/server/migrations/*.js'],
//     cli: {
//         entitiesDir: 'src/entites',
//         migrationsDir: 'src/migrations',
//     },
// };


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_module_1 = __webpack_require__("./src/app/items/items.module.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
const ormconfig = tslib_1.__importStar(__webpack_require__("./ormconfig.js"));
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [items_module_1.ItemsModule, typeorm_1.TypeOrmModule.forRoot(ormconfig), auth_module_1.AuthModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const create_user_dto_1 = __webpack_require__("./src/app/auth/dto/create-user-dto.ts");
const credentials_dto_1 = __webpack_require__("./src/app/auth/dto/credentials.dto.ts");
let AuthController = class AuthController {
    /**
     *
     */
    constructor(authService) {
        this.authService = authService;
    }
    signup(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.signUp(createUserDto);
        });
    }
    signIn(credentialsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.authService.signIn(credentialsDto);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('signup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "signup", null);
tslib_1.__decorate([
    (0, common_1.Post)('signin'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof credentials_dto_1.CredentialsDto !== "undefined" && credentials_dto_1.CredentialsDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "signIn", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_controller_1 = __webpack_require__("./src/app/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const user_repository_1 = __webpack_require__("./src/app/auth/user.repository.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const jwt_strategy_1 = __webpack_require__("./src/app/auth/jwt.strategy.ts");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/guards/jwt-auth.guard.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'secretKey123',
                signOptions: {
                    expiresIn: 3600, // JWT有効期限（単位:秒）
                }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        // JwtStrategy, JwtAuthGuardはDIさせるため追加
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard],
        // JwtStrategy, JwtAuthGuardはitems.module（外部モジュール）で利用するため追加
        exports: [jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_repository_1 = __webpack_require__("./src/app/auth/user.repository.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
let AuthService = class AuthService {
    /**
     *
     */
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signUp(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.createUser(createUserDto);
        });
    }
    signIn(credentialsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, password } = credentialsDto;
            const user = yield this.userRepository.findOne({ username });
            // compare(password, user.password) パスワードが同じか比較
            // => password: 入力されたパスワード vs user.password: DBに保存しているHash化されたpassword
            if (user && (yield bcrypt.compare(password, user.password))) {
                const payload = { id: user.id, username: user.username };
                const accessToken = yield this.jwtService.sign(payload); // 署名されたToken生成
                return { accessToken };
            }
            throw new common_1.UnauthorizedException('Please check your username or password!');
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/decorator/get-user.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUser = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((_, ctx) => {
    // Httpのコンテキストが必要なことを明示
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),

/***/ "./src/app/auth/dto/create-user-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const user_status_enum_1 = __webpack_require__("./src/app/auth/user-status.enum.ts");
class CreateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(32),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(user_status_enum_1.UserStatus),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_status_enum_1.UserStatus !== "undefined" && user_status_enum_1.UserStatus) === "function" ? _a : Object)
], CreateUserDto.prototype, "status", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./src/app/auth/dto/credentials.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CredentialsDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CredentialsDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CredentialsDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(32),
    tslib_1.__metadata("design:type", String)
], CredentialsDto.prototype, "password", void 0);
exports.CredentialsDto = CredentialsDto;


/***/ }),

/***/ "./src/app/auth/guards/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
/**
 * このGuardが適用されたリクエストハンドラは、
 * jwt認証に通過していない場合に実行されない。
 */
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const user_repository_1 = __webpack_require__("./src/app/auth/user.repository.ts");
// PassportStrategy: NestJSでStrategyを使いやすくするfunction
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    /**
     *
     */
    constructor(userRepositoy) {
        super({
            // Requestに記述されているjwt部分を指定 => 今回はAuthHeaderのBearerToken
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            // false: 有効期限を無効にしない（つまり有効）
            ignoreExpiration: false,
            secretOrKey: 'secretKey123',
        });
        this.userRepositoy = userRepositoy;
    }
    // 自動で呼び出しされる処理であり、validateのメソッド名は変更不可
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, username } = payload;
            const user = yield this.userRepositoy.findOne({ id, username });
            if (user) {
                return user;
            }
            throw new common_1.UnauthorizedException();
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/auth/user-status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["FREE"] = "FREE";
    UserStatus["PREMIUM"] = "PREMIUM";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));


/***/ }),

/***/ "./src/app/auth/user.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
let UserRepository = class UserRepository extends typeorm_1.Repository {
    createUser(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, password, status } = createUserDto;
            const salt = yield bcrypt.genSalt(); // salt: Hash値の強度を高める文字列
            const hashPassword = yield bcrypt.hash(password, salt);
            const user = this.create({ username, password: hashPassword, status });
            yield this.save(user);
            return user;
        });
    }
};
UserRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ "./src/app/entities/item.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * ## entity, migration, repository の流れ
 * 1. entityを作成
 * 2. entity.tsをトランスパイルしjsに変換
 * 3. migration:generate により、jsに変換したentityからmigrationファイルを生成
 * 4. migration.tsをトランスパイルしjsに変換
 * 5. migration:run により、jsに変換したmigrationからmigrationを実行（DB操作）
 * 6. repositoryを作成
 * 7. moduleのimportsに、repositoryを登録
 *    ex. imports: [TypeOrmModule.forFeature([ItemRepository])],
 */
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Item = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const item_status_enum_1 = __webpack_require__("./src/app/items/item-status.enum.ts");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
let Item = class Item {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: item_status_enum_1.ItemStatus
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof item_status_enum_1.ItemStatus !== "undefined" && item_status_enum_1.ItemStatus) === "function" ? _a : Object)
], Item.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Item.prototype, "userid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.items),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Item.prototype, "user", void 0);
Item = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'item' })
], Item);
exports.Item = Item;


/***/ }),

/***/ "./src/app/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_status_enum_1 = __webpack_require__("./src/app/auth/user-status.enum.ts");
const item_entity_1 = __webpack_require__("./src/app/entities/item.entity.ts");
let User = class User {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_status_enum_1.UserStatus
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_status_enum_1.UserStatus !== "undefined" && user_status_enum_1.UserStatus) === "function" ? _a : Object)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "items", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.User = User;


/***/ }),

/***/ "./src/app/items/dto/create-item-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

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

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemStatus = void 0;
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["ON_SALE"] = "ON_SALE";
    ItemStatus["SOLD_OUT"] = "SOLD_OUT";
})(ItemStatus = exports.ItemStatus || (exports.ItemStatus = {}));


/***/ }),

/***/ "./src/app/items/items.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
const create_item_dto_1 = __webpack_require__("./src/app/items/dto/create-item-dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/guards/jwt-auth.guard.ts");
const get_user_decorator_1 = __webpack_require__("./src/app/auth/decorator/get-user.decorator.ts");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
let ItemsController = class ItemsController {
    /**
     *
     */
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.findAll();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.findById(id);
        });
    }
    create(createItemDto, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log(user);
            return yield this.itemsService.create(createItemDto);
        });
    }
    updateStatus(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.updateStatus(id);
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.itemsService.delete(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ItemsController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id') // /items/id
    ,
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ItemsController.prototype, "findById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard) // JwtAuthGuard適用 ※@Controller('xxx')直下に記載すればコントローラー全体に適用
    ,
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, get_user_decorator_1.GetUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof create_item_dto_1.CreateItemDto !== "undefined" && create_item_dto_1.CreateItemDto) === "function" ? _d : Object, typeof (_e = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ItemsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ItemsController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ItemsController.prototype, "delete", null);
ItemsController = tslib_1.__decorate([
    (0, common_1.Controller)('items') // /items というpathに紐づけ
    ,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof items_service_1.ItemsService !== "undefined" && items_service_1.ItemsService) === "function" ? _a : Object])
], ItemsController);
exports.ItemsController = ItemsController;


/***/ }),

/***/ "./src/app/items/items.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * ## 関連構造
 * module => controller => service => repository => entity
 *           ^             ^          ^
 *           dto,guard     dto        dto
 * - module     : Repository, Controller, Serviceを登録
 * - controller : ルーティング機能を実装（path(URL)を設定）
 * - service    : ビジネスロジックを実装（ex. repository経由でDB操作）
 * - repository : DB操作
 * - entity     : DBのデータ定義
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_controller_1 = __webpack_require__("./src/app/items/items.controller.ts");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const items_repository_1 = __webpack_require__("./src/app/items/items.repository.ts");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
let ItemsModule = class ItemsModule {
};
ItemsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        // Repository の登録は、一つの機能に閉じた設定のためforFeatureを使用
        // importsにAuthModuleを追加 => exportsに記載したprovidersを利用可能
        imports: [typeorm_1.TypeOrmModule.forFeature([items_repository_1.ItemRepository]), auth_module_1.AuthModule],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService],
    })
], ItemsModule);
exports.ItemsModule = ItemsModule;


/***/ }),

/***/ "./src/app/items/items.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const item_entity_1 = __webpack_require__("./src/app/entities/item.entity.ts");
const item_status_enum_1 = __webpack_require__("./src/app/items/item-status.enum.ts");
let ItemRepository = class ItemRepository extends typeorm_1.Repository {
    createItem(createItemDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, price, description } = createItemDto;
            const item = this.create({
                name,
                price,
                description,
                status: item_status_enum_1.ItemStatus.ON_SALE,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            yield this.save(item);
            return item;
        });
    }
};
ItemRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(item_entity_1.Item)
], ItemRepository);
exports.ItemRepository = ItemRepository;


/***/ }),

/***/ "./src/app/items/items.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const item_status_enum_1 = __webpack_require__("./src/app/items/item-status.enum.ts");
const items_repository_1 = __webpack_require__("./src/app/items/items.repository.ts");
let ItemsService = class ItemsService {
    /**
     *
     */
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
        this.items = [];
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemRepository.find();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.itemRepository.findOne(id);
            if (!found) {
                throw new common_1.NotFoundException();
            }
            return found;
        });
    }
    create(createItemDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemRepository.createItem(createItemDto);
        });
    }
    updateStatus(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(id);
            item.status = item_status_enum_1.ItemStatus.SOLD_OUT;
            item.updatedAt = new Date().toISOString();
            yield this.itemRepository.save(item);
            return item;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.itemRepository.delete({ id });
        });
    }
};
ItemsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof items_repository_1.ItemRepository !== "undefined" && items_repository_1.ItemRepository) === "function" ? _a : Object])
], ItemsService);
exports.ItemsService = ItemsService;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

"use strict";
module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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