import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {

    // Httpのコンテキストが必要なことを明示
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});