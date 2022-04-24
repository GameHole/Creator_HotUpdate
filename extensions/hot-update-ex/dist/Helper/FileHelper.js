"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importStar(require("path")), Path = path_1;
class FileHelper {
    static CopyFile(src, dest) {
        let dir = this.GetDirectory(dest);
        if (!fs.existsSync(dir)) {
            this.CreateDirectory(dir);
        }
        fs.copyFileSync(src, dest);
    }
    static CreateDirectory(dir) {
        fs.mkdirSync(dir, { recursive: true });
    }
    static ResolvePath(projectPath, relativePath) {
        relativePath = relativePath.replace("project://", "");
        return path_1.default.resolve(projectPath, relativePath);
    }
    static getFiles(dir) {
        if (fs.existsSync(dir)) {
            let res = new Array();
            fs.readdirSync(dir).forEach((f) => {
                let file = path_1.default.join(dir, f);
                if (fs.statSync(file).isFile()) {
                    res.push(file);
                }
            });
            return res;
        }
        else {
            throw "给定的路径不存在！";
        }
    }
    static isExists(path) {
        return fs.existsSync(path);
    }
    static ReadAllText(path) {
        return fs.readFileSync(path, 'utf-8');
    }
    static WriteAllText(path, content) {
        return fs.writeFileSync(path, content, 'utf-8');
    }
    static GetDirectory(path) {
        return Path.dirname(path);
    }
    static GetFileName(path) {
        // let dirIdx = path.lastIndexOf('/');
        return Path.basename(path);
    }
    static DeleteDirectory(path) {
        var files = [];
        if (fs.existsSync(path)) { //判断给定的路径是否存在     
            files = fs.readdirSync(path); //返回文件和子目录的数组
            files.forEach(file => {
                var curPath = Path.join(path, file);
                if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                    this.DeleteDirectory(curPath);
                }
                else {
                    fs.unlinkSync(curPath); //是指定文件，则删除
                }
            });
            fs.rmdirSync(path); //清除文件夹
        }
        else {
            throw "给定的路径不存在！";
        }
    }
    static CopyDirectory(src, dest) {
        let state = fs.statSync(src);
        if (state.isFile()) {
            this.CopyFile(src, dest);
        }
        else {
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(v => {
                this.CopyDirectory(src + "/" + v, dest + "/" + v);
            });
        }
    }
    static Combine(...paths) {
        return path_1.default.join(...paths);
    }
}
exports.FileHelper = FileHelper;
