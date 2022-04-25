import { NativeMgr } from "./NativeMgr";
export function SaveSearchPath()
{
    let searchPaths = jsb.fileUtils.getSearchPaths();
    let newPaths =  NativeMgr.Mgr.getLocalManifest().getSearchPaths();
    Array.prototype.unshift.apply(searchPaths, newPaths);
    localStorage.setItem(getKey(), JSON.stringify(searchPaths));
    jsb.fileUtils.setSearchPaths(searchPaths);
}
//used by hot-update-ex 
//##REPLEASE_START##
function /*f_s*/UpdateHotFiles/*f_e*/()
{
    if (typeof window.jsb === 'object')
    {
        let hotUpdateSearchPaths = localStorage.getItem(getKey());
        if (hotUpdateSearchPaths)
        {
            let paths = JSON.parse(hotUpdateSearchPaths);
            jsb.fileUtils.setSearchPaths(paths);

            let fileList = [];
            let storagePath = paths[0] || '';
            let tempPath = storagePath + '_temp/';
            let baseOffset = tempPath.length;

            if (jsb.fileUtils.isDirectoryExist(tempPath) && !jsb.fileUtils.isFileExist(tempPath + 'project.manifest.temp'))
            {
                jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                fileList.forEach(srcPath =>
                {
                    let relativePath = srcPath.substr(baseOffset);
                    let dstPath = storagePath + relativePath;

                    if (srcPath[srcPath.length] == '/')
                    {
                        jsb.fileUtils.createDirectory(dstPath)
                    }
                    else
                    {
                        if (jsb.fileUtils.isFileExist(dstPath))
                        {
                            jsb.fileUtils.removeFile(dstPath)
                        }
                        jsb.fileUtils["renameFile"](srcPath, dstPath);
                    }
                })
                jsb.fileUtils.removeDirectory(tempPath);
            }
        }
    }
}
function getKey()
{
    return "HotUpdateSearchPaths";
}
//##REPLEASE_END##