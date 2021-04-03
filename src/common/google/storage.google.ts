import {google} from 'googleapis';
import * as GoogleDriveStorage from 'multer-google-drive';
import * as token from './token.json';
const oAuth2Client = new google.auth.OAuth2();
oAuth2Client.setCredentials(token);
const drive = google.drive({version:"v3",auth:oAuth2Client});
export const storageDrive = GoogleDriveStorage({
    drive:drive,
    parents:'15fattetjBJv7Fth4-idxtJ6YiY4yBRhm',
    fileName: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('ONLY_IMAGE_FILES_ALLOWED!'), false);
        }
        let filename = `manga_vip-${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
})
