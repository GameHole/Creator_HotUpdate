import { IPostProcesser } from "../PostProcess/IPostProcesser";
import * as fs from 'fs';
import * as Path from "path";
import { IBuildTaskOption } from "../../@types";
export class InjectJs implements IPostProcesser
{

    Run(projectPath: string, buildPath: string,op:IBuildTaskOption): void
    {
        var root = Path.join(buildPath, 'assets');
        var url = Path.join(root, "main.js");
        let str = this.inject_script;
        fs.readFile(url, "utf8", function (err, data)
        {
            if (err)throw err;
            var newStr = str + data;
            fs.writeFile(url, newStr, function (error)
            {
                if (error) throw error;
            });
        });
    }
    readonly inject_script = `
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