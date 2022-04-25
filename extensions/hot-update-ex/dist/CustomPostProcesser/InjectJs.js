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
exports.InjectJs = void 0;
const fs = __importStar(require("fs"));
const Path = __importStar(require("path"));
const FileHelper_1 = require("../Helper/FileHelper");
class InjectJs {
    Run(projectPath, buildPath, op) {
        var root = Path.join(buildPath, 'assets');
        var url = Path.join(root, "main.js");
        let script = this.getInject_script(projectPath);
        fs.readFile(url, "utf8", function (err, data) {
            if (err)
                throw err;
            var newStr = script + data;
            fs.writeFile(url, newStr, function (error) {
                if (error)
                    throw error;
            });
        });
    }
    getInject_script(projectPath) {
        let out = { out: undefined };
        FileHelper_1.FileHelper.Search(projectPath, "__HotUpdateSaveFile.ts", out);
        if (out.out) {
            let content = FileHelper_1.FileHelper.ReadAllText(out.out);
            let funcDefine = this.getContent(content, "##REPLEASE_START##", "//##REPLEASE_END##");
            let funcName = this.getContent(funcDefine, "/*f_s*/", "/*f_e*/");
            return funcDefine + "\n" + funcName + "();";
        }
        else {
            throw "inject file not found";
        }
    }
    getContent(content, startMark, endMark) {
        let startIndex = content.indexOf(startMark) + startMark.length;
        let endIndex = content.indexOf(endMark);
        return content.substring(startIndex, endIndex);
    }
}
exports.InjectJs = InjectJs;
