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