import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * アプリケーションモジュールで利用する設定値は、ここから取得
 */
@Injectable()
export class EnvService {
    constructor(private configService: ConfigService) { }

    isProduction(): boolean {
        return this.configService.get('NODE_ENV') === 'production';
    }

    get service() {
        return this.configService;
    }

    get nodeEnv(): string {
        return this.configService.get('NODE_ENV');
    }

    get dbUri(): string {
        return this.configService.get('DB_URI');
    }

    get jwtSecret(): string {
        return this.configService.get('JWT_SECRET');
    }
}