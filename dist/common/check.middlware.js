"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRequest = void 0;
function CheckRequest(req, res, next) {
    let { unittime, token, admin } = req.headers;
    let { url } = req;
    if (url.includes("/docs")) {
        return next();
    }
    if (admin == 'ADMIN') {
        return next();
    }
    if (!unittime || !token) {
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "ERROR_AUTHEN"
        });
    }
    next();
}
exports.CheckRequest = CheckRequest;
;
//# sourceMappingURL=check.middlware.js.map