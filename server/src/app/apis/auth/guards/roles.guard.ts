import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/interfaces/user.interface';

/**
 * CanActivate: Guardとして機能させるために必要 ※補足: AuthGuardはCanActivateを継承しているため不要
 */
@Injectable()
export class RolesGuard implements CanActivate {
    /**
     * 
     * @param reflector // Reflector: デコレーターでセットしたメタデータを取得
     */
    constructor(private reflector: Reflector) {
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
        const { user } = ctx.switchToHttp().getRequest() as { user: User; };
        return requiredStatuses.some((status) => user.status.includes(status));
    }
}