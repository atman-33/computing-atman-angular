import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {

    // Httpのコンテキストを明示
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});