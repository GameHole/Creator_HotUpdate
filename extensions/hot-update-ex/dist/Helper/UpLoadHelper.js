"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadHelper = void 0;
const ftp_ts_1 = __importDefault(require("ftp-ts"));
class UploadHelper {
    static UploadDirectroy(url, dir) {
        ftp_ts_1.default.connect({ host: this.getAddress(url), port: 21 }).then((c) => {
            // c.put('foo.txt', 'foo.remote-copy.txt');
            console.log("aaa");
            c.end();
        });
    }
    static getAddress(url) {
        let index = url.indexOf("//");
        url = url.substring(index + 1, url.length - 1);
        index = url.indexOf("/");
        if (index > 0)
            url = url.substring(0, index - 1);
        return url;
    }
}
exports.UploadHelper = UploadHelper;
