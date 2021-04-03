"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const chapter_service_1 = require("../modules/chapter/chapter.service");
const manga_service_1 = require("../modules/manga/manga.service");
const request_service_1 = require("../shared/services/request.service");
const cheerio = require("cheerio");
const lodash_1 = require("lodash");
const notification_service_1 = require("../modules/notification/notification.service");
const BASE_URL = "https://bato.to";
let TasksService = TasksService_1 = class TasksService {
    constructor(mangaService, chapterService, requestService, notificationService) {
        this.mangaService = mangaService;
        this.chapterService = chapterService;
        this.requestService = requestService;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(TasksService_1.name);
        this.URL_WEBSITE = "http://www.nettruyen.com/";
    }
    async handleCron() {
        this.logger.debug(Date.now());
        await this.getListMangaNews();
    }
    async getListMangaNews() {
        let listLinkURL = await this.getListUrlNewsManga();
        console.log("total Link In Web :" + listLinkURL.length);
        let listMangaNeedUpdate = await this.mangaService.getListMangaByListUrl(listLinkURL);
        console.log("total Link In DB :" + listMangaNeedUpdate.length);
        const ListPromiseUpdateManga = listMangaNeedUpdate.map(item => this.updateMangaInfo(item));
        await Promise.all(ListPromiseUpdateManga);
    }
    async getListUrlNewsManga() {
        const resultFetch = await this.requestService.getMethod(this.URL_WEBSITE);
        const $ = cheerio.load(resultFetch);
        let listLink = [];
        $(".item").each(function (index, element) {
            let link = cheerio.load(element)("figure > div > a ").attr("href");
            if (link)
                listLink.push(link);
        });
        return listLink;
    }
    async updateMangaInfo(manga_info) {
        const ListChapterInDb = await this.chapterService.getListChapterMangaNoCache(manga_info._id);
        let listChapterOnWeb = await this.getListChapterFromWeb(manga_info.url);
        let ListChapterNeedUpdate = lodash_1.xorBy(ListChapterInDb, listChapterOnWeb, 'index');
        if (ListChapterNeedUpdate.length == 0) {
            return true;
        }
        console.log("list Chapter In DB : " + ListChapterInDb.length);
        console.log("list Chapter In WEB : " + listChapterOnWeb.length);
        console.log("list Chapter Need Update : " + ListChapterNeedUpdate.length);
        const ArrayPromiseInsertChapter = await ListChapterNeedUpdate.map((item) => {
            return this.chapterService.createNewChapter(manga_info._id, item.url, item.name, item.index, item.source);
        });
        const resultInsertChapter = await Promise.all(ArrayPromiseInsertChapter);
        const listIdChapterInsert = resultInsertChapter.map(item => item._id);
        await this.mangaService.updateNewChapter(manga_info._id, listIdChapterInsert);
        this.notificationService.pushNotificationToManga(manga_info._id);
        console.log("update succes manga_id : " + manga_info._id + " NumberChapter : " + listIdChapterInsert.length);
    }
    async getListChapterFromWeb(url) {
        const resultFetch = await this.requestService.getMethod(url);
        const $ = cheerio.load(resultFetch);
        let ListChapter = [];
        $("#nt_listchapter > nav > ul>li:not(:first-child)").each(function (index, element) {
            let object = {};
            let elementDetial = cheerio.load(element);
            object["url"] = elementDetial("div.col-xs-5.chapter > a").attr("href");
            object["name"] = elementDetial("div.col-xs-5.chapter").text().replace(/\n/g, "");
            if (object["url"]) {
                ListChapter.push(object);
            }
        });
        ListChapter = ListChapter.reverse().map((item, index) => { item.index = index + 1; return item; });
        return ListChapter;
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_2_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
TasksService = TasksService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [manga_service_1.MangaService,
        chapter_service_1.ChapterService,
        request_service_1.RequestService,
        notification_service_1.NotificationService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=cron.service.js.map