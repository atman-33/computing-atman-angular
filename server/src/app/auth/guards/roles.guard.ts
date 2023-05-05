import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
// CanActivate: Guardとして機能させるために必要 ※補足: AuthGuardはCanActivateを継承しているため不要
export class RolesGuard implements CanActivate {

    /**
     *
     */
    constructor(private reflector: Reflector) { // Reflector: デコレーターでセットしたメタデータを取得
    }

    canActivate(ctx: ExecutionContext): boolean {
        const requiredStatuses = this.reflector.get<string[]>(
            'statuses',
            ctx.getHandler(),
        );

        // デコレーターに何も指定されていない場合は実行を許可
        if (!requiredStatuses) {
            return true;
        }

        // ユーザーのstatusが、メタデータから取得したstatusのいずれかに一致すれば実行を許可
        const { user } = ctx.switchToHttp().getRequest();
        return requiredStatuses.some((status) => user.status.includes(status));
    }
}