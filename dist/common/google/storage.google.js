"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageDrive = void 0;
const googleapis_1 = require("googleapis");
const GoogleDriveStorage = require("multer-google-drive");
const token = require("./token.json");
const oAuth2Client = new googleapis_1.google.auth.OAuth2();
oAuth2Client.setCredentials(token);
const drive = googleapis_1.google.drive({ version: "v3", auth: oAuth2Client });
exports.storageDrive = GoogleDriveStorage({
    drive: drive,
    parents: '15fattetjBJv7Fth4-idxtJ6YiY4yBRhm',
    fileName: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('ONLY_IMAGE_FILES_ALLOWED!'), false);
        }
        let filename = `manga_vip-${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});
//# sourceMappingURL=storage.google.js.map