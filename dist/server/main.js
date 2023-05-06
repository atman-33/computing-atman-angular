/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./data-source.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dataSourceOptions = void 0;
const typeorm_1 = __webpack_require__("typeorm");
exports.dataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['server/src/app/entities/*.entity.ts'],
    migrations: ['server/src/app/migrations/*.ts'],
    // entities: ['dist/server/**/*.entity.js'],     // migrationファイルを生成するentityファイル
    // migrations: ['dist/server/migrations/*.js'],  // migration実行用のファイル
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports["default"] = dataSource;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_module_1 = __webpack_require__("./src/app/items/items.module.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
const data_source_1 = __webpack_require__("./data-source.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [items_module_1.ItemsModule, typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions), auth_module_1.AuthModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const auth_controller_1 = __webpack_require__("./src/app/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const jwt_strategy_1 = __webpack_require__("./src/app/auth/jwt.strategy.ts");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__("./src/app/auth/guards/roles.guard.ts");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'secretKey123',
                signOptions: {
                    expiresIn: 3600, // JWT有効期限（単位:秒）
                }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        // JwtStrategy, JwtAuthGuard, RolesGuardはDIさせるため追加
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        // JwtStrategy, JwtAuthGuard, RolesGuardはitems.module（外部モジュール）で利用するため追加
        exports: [jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signUp(createUserDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, password, status } = createUserDto;
            const salt = yield bcrypt.genSalt();
            const hashPassword = yield bcrypt.hash(password, salt);
            const user = this.userRepository.create({
                username,
                password: hashPassword,
                status,
            });
            yield this.userRepository.save(user);
            return user;
        });
    }
    signIn(credentialsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { username, password } = credentialsDto;
            const user = yield this.userRepository.findOneBy({ username });
            // compare(password, user.password) パスワードが同じか比較
            // => password: 入力されたパスワード vs user.password: DBに保存しているHash化されたpassword
            if (user && (yield bcrypt.compare(password, user.password))) {
                const payload = { id: user.id, username: user.username };
                const accessToken = this.jwtService.sign(payload);
                return { accessToken };
            }
            throw new common_1.UnauthorizedException('ユーザー名またはパスワードを確認してください');
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/decorator/get-user.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUser = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((_, ctx) => {
    // Httpのコンテキストを明示
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),

/***/ "./src/app/auth/decorator/role.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const common_1 = __webpack_require__("@nestjs/common");
/**
 * 認可が必要なロールを受け取り、メタデータに登録
 * （メタデータはguardで取得して認可処理）
 * @param statuses
 * @returns
 */
const Role = (...statuses) => (0, common_1.SetMetadata)('statuses', statuses);
exports.Role = Role;


/***/ }),

/***/ "./src/app/auth/dto/create-user-dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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

/***/ "./src/app/auth/guards/roles.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
let RolesGuard = class RolesGuard {
    /**
     *
     */
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(ctx) {
        const requiredStatuses = this.reflector.get('statuses', ctx.getHandler());
        // デコレーターに何も指定されていない場合は実行を許可
        if (!requiredStatuses) {
            return true;
        }
        // ユーザーのstatusが、メタデータから取得したstatusのいずれかに一致すれば実行を許可
        const { user } = ctx.switchToHttp().getRequest();
        return requiredStatuses.some((status) => user.status.includes(status));
    }
};
RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
    // CanActivate: Guardとして機能させるために必要 ※補足: AuthGuardはCanActivateを継承しているため不要
    ,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),

/***/ "./src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
// PassportStrategy: NestJSでStrategyを使いやすくするfunction
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKey123',
        });
        this.userRepository = userRepository;
    }
    // 自動で呼び出しされる処理であり、validateのメソッド名は変更不可
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { id, username } = payload;
            const user = yield this.userRepository.findOneBy({ id, username });
            if (user) {
                return user;
            }
            throw new common_1.UnauthorizedException();
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/auth/user-status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["FREE"] = "FREE";
    UserStatus["PREMIUM"] = "PREMIUM";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));


/***/ }),

/***/ "./src/app/entities/item.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * ## entity, migration, repository の流れ
 * 1. entityを作成
 * 2. entity.tsをトランスパイルしjsに変換
 * 3. migration:generate により、jsに変換したentityからmigrationファイルを生成
 * 4. migration.tsをトランスパイルしjsに変換
 * 5. migration:run により、jsに変換したmigrationからmigrationを実行（DB操作）
 * 6. repositoryを作成 ※TypeORM ver0.3.Xの場合、serviceにrepositoryをDI
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
    (0, typeorm_1.Column)(),
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
], Item.prototype, "userId", void 0);
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


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_status_enum_1 = __webpack_require__("./src/app/auth/user-status.enum.ts");
const item_entity_1 = __webpack_require__("./src/app/entities/item.entity.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
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
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }) // toPlainOnly: レスポンスから除外する時はtrue
    ,
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
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

/***/ "./src/app/items/items.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
const create_item_dto_1 = __webpack_require__("./src/app/items/dto/create-item-dto.ts");
const jwt_auth_guard_1 = __webpack_require__("./src/app/auth/guards/jwt-auth.guard.ts");
const get_user_decorator_1 = __webpack_require__("./src/app/auth/decorator/get-user.decorator.ts");
const user_entity_1 = __webpack_require__("./src/app/entities/user.entity.ts");
const role_decorator_1 = __webpack_require__("./src/app/auth/decorator/role.decorator.ts");
const user_status_enum_1 = __webpack_require__("./src/app/auth/user-status.enum.ts");
const roles_guard_1 = __webpack_require__("./src/app/auth/guards/roles.guard.ts");
// /items というpathに紐づけ
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
            return yield this.itemsService.create(createItemDto, user);
        });
    }
    updateStatus(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemsService.updateStatus(id, user);
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.itemsService.delete(id, user);
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
    (0, role_decorator_1.Role)(user_status_enum_1.UserStatus.PREMIUM)
    // JwtAuthGuard適用 ※@Controller('xxx')直下に記載すればコントローラー全体に適用
    ,
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
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
    tslib_1.__param(1, (0, get_user_decorator_1.GetUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_g = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ItemsController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, get_user_decorator_1.GetUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_j = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ItemsController.prototype, "delete", null);
ItemsController = tslib_1.__decorate([
    (0, common_1.Controller)('items')
    // ハンドラーがレスポンスを返す前にExcludeを付けたパスワードを除外する処理を挟む
    ,
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof items_service_1.ItemsService !== "undefined" && items_service_1.ItemsService) === "function" ? _a : Object])
], ItemsController);
exports.ItemsController = ItemsController;


/***/ }),

/***/ "./src/app/items/items.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * ## 関連構造
 * module => controller => service(repository) => entity
 *           ^             ^
 *           dto,guard     dto
 * - module     : Repository, Controller, Serviceを登録
 * - controller : ルーティング機能を実装（path(URL)を設定）
 * - service    : ビジネスロジックを実装（ex. repository経由でDB操作）
 * - repository : DB操作 ※TypeORM ver0.3.Xの場合、serviceにrepositoryをDI
 * - entity     : DBのデータ定義
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const items_controller_1 = __webpack_require__("./src/app/items/items.controller.ts");
const items_service_1 = __webpack_require__("./src/app/items/items.service.ts");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const auth_module_1 = __webpack_require__("./src/app/auth/auth.module.ts");
const item_entity_1 = __webpack_require__("./src/app/entities/item.entity.ts");
let ItemsModule = class ItemsModule {
};
ItemsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        // Repository の登録は、一つの機能に閉じた設定のためforFeatureを使用
        // importsにAuthModuleを追加 => exportsに記載したprovidersを利用可能
        imports: [typeorm_1.TypeOrmModule.forFeature([item_entity_1.Item]), auth_module_1.AuthModule],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService],
    })
], ItemsModule);
exports.ItemsModule = ItemsModule;


/***/ }),

/***/ "./src/app/items/items.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const item_entity_1 = __webpack_require__("./src/app/entities/item.entity.ts");
const item_status_enum_1 = __webpack_require__("./src/app/items/item-status.enum.ts");
const typeorm_1 = __webpack_require__("typeorm");
const typeorm_2 = __webpack_require__("@nestjs/typeorm");
let ItemsService = class ItemsService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.itemRepository.find();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const found = yield this.itemRepository.findOneBy({ id });
            if (!found) {
                throw new common_1.NotFoundException();
            }
            return found;
        });
    }
    create(createItemDto, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, price, description } = createItemDto;
            const item = this.itemRepository.create({
                name,
                price,
                description,
                status: item_status_enum_1.ItemStatus.ON_SALE,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user,
            });
            yield this.itemRepository.save(item);
            return item;
        });
    }
    updateStatus(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(id);
            if (item.userId === user.id) {
                throw new common_1.BadRequestException('自身の商品を購入することはできません');
            }
            item.status = item_status_enum_1.ItemStatus.SOLD_OUT;
            item.updatedAt = new Date().toISOString();
            const updatedItem = yield this.itemRepository.update(id, {
                status: item.status,
                updatedAt: item.updatedAt,
            });
            if (updatedItem.affected === 0) {
                throw new common_1.NotFoundException(`${id}のデータを更新できませんでした`);
            }
            return item;
        });
    }
    delete(id, user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(id);
            if (item.userId !== user.id) {
                throw new common_1.BadRequestException('他人の商品を削除することはできません');
            }
            const response = yield this.itemRepository.delete({ id });
            if (response.affected !== 1) {
                throw new common_1.NotFoundException(`${id}のデータを削除できませんでした`);
            }
        });
    }
};
ItemsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(item_entity_1.Item)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
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

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

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