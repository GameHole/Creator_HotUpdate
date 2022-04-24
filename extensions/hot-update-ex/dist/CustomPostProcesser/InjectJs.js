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
class InjectJs {
    constructor() {
        this.inject_script = `
    (function () {
        if (typeof window.jsb === 'object') {
            var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
            if (hotUpdateSearchPaths) {
                var paths = JSON.parse(hotUpdateSearchPaths);
                jsb.fileUtils.setSearchPaths(paths);
    
                var fileList = [];
                var storagePath = paths[0] || '';
                var tempPath = storagePath + '_temp/';
                var baseOffset = tempPath.length;
    
                if (jsb.fileUtils.isDirectoryExist(tempPath) && !jsb.fileUtils.isFileExist(tempPath + 'project.manifest.temp')) {
                    jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                    fileList.forEach(srcPath => {
                        var relativePath = srcPath.substr(baseOffset);
                        var dstPath = storagePath + relativePath;
    
                        if (srcPath[srcPath.length] == '/') {
                            jsb.fileUtils.createDirectory(dstPath)
                        }
                        else {
                            if (jsb.fileUtils.isFileExist(dstPath)) {
                                jsb.fileUtils.removeFile(dstPath)
                            }
                            jsb.fileUtils.renameFile(srcPath, dstPath);
                        }
                    })
                    jsb.fileUtils.removeDirectory(tempPath);
                }
            }
        }
    })();
    `;
    }
    Run(projectPath, buildPath, op) {
        var root = Path.join(buildPath, 'assets');
        var url = Path.join(root, "main.js");
        let str = this.inject_script;
        fs.readFile(url, "utf8", function (err, data) {
            if (err)
                throw err;
            var newStr = str + data;
            fs.writeFile(url, newStr, function (error) {
                if (error)
                    throw error;
            });
        });
    }
}
exports.InjectJs = InjectJs;
