import { SetMetadata } from '@nestjs/common';

/**
 * 認可が必要なロールを受け取り、メタデータに登録
 * （メタデータはguardで取得して認可処理）
 * @param statuses 
 * @returns 
 */
export const Role = (...statuses: string[]) => SetMetadata('statuses', statuses);