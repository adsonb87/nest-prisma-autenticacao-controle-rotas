"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    if (Object.keys(request.user).length === 0) {
        throw new Error("Não foi encontrado usuario para validação.");
    }
    else {
        return request.user;
    }
});
//# sourceMappingURL=current-user.decorator.js.map