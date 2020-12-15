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
        let filename = `test-${file.originalname}`;
        cb(null, filename);
    }
})
