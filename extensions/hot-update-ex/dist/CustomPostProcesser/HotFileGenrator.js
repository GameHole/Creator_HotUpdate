"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotFileGenrator = void 0;
const FileHelper_1 = require("../Helper/FileHelper");
const UpLoadHelper_1 = require("../Helper/UpLoadHelper");
const HotUpdateHelper_1 = require("./HotUpdateHelper");
class Config {
    constructor(filePath) {
        this.filePath = filePath;
    }
    Save() {
        FileHelper_1.FileHelper.WriteAllText(this.filePath, JSON.stringify(this.info));
    }
    Load() {
        this.info = JSON.parse(FileHelper_1.FileHelper.ReadAllText(this.filePath));
        if (this.info.build == undefined)
            this.info.build = 0;
    }
    IncreaseBuild() {
        this.info.build++;
        this.Save();
    }
    getGenrateInfo(buildPath, name) {
        let v = this.info.version + "." + this.info.build;
        let pName = name + "_" + this.info.channal;
        let destRelate = "../" + pName + "_v_" + v;
        return {
            ver: v,
            projectName: pName,
            manifestPath: FileHelper_1.FileHelper.ResolvePath(buildPath, destRelate)
        };
    }
}
class HotFileGenrator {
    Run(projectPath, buildPath, op) {
        let custom = op.packages["hot-update-ex"];
        let configsPath = custom["config"];
        if (configsPath) {
            let floaderPath = FileHelper_1.FileHelper.ResolvePath(projectPath, configsPath);
            let configs = this.getConfigs(floaderPath);
            configs.forEach(cfg => {
                let geninfo = cfg.getGenrateInfo(buildPath, op.name);
                let url = this.adjustUrl(cfg) + geninfo.projectName;
                HotUpdateHelper_1.HotUpdateHelper.GenrateHotUpdateFiles(url, geninfo.ver, buildPath, geninfo.manifestPath);
                this.copyFiles(cfg.info, geninfo, buildPath, projectPath);
                this.autoUpLoad(cfg.info, url, geninfo.manifestPath);
                if (custom["autoIncreaseBuild"])
                    cfg.IncreaseBuild();
            });
        }
    }
    adjustUrl(cfg) {
        let url = cfg.info.url;
        if (url.endsWith("/"))
            return url;
        return url + "/";
    }
    getConfigs(floaderPath) {
        let res = new Array();
        FileHelper_1.FileHelper.getFiles(floaderPath).forEach(json => {
            let cfg = new Config(json);
            cfg.Load();
            res.push(cfg);
        });
        return res;
    }
    copyFiles(cfginfo, geninfo, buildPath, projectPath) {
        let dir = FileHelper_1.FileHelper.Combine(buildPath, "assets");
        this.copyFloader(dir, geninfo.manifestPath, "src");
        this.copyFloader(dir, geninfo.manifestPath, "assets");
        let name = "project" + "_" + cfginfo.channal + ".manifest";
        FileHelper_1.FileHelper.CopyFile(FileHelper_1.FileHelper.Combine(geninfo.manifestPath, "project.manifest"), FileHelper_1.FileHelper.Combine(this.getRes(projectPath), name));
    }
    getRes(projectPath) {
        return FileHelper_1.FileHelper.Combine(projectPath, "assets", "resources", "hotupdate");
    }
    copyFloader(dir, manifestPath, floaderName) {
        let srcPath = FileHelper_1.FileHelper.Combine(dir, floaderName);
        let srcDest = FileHelper_1.FileHelper.Combine(manifestPath, floaderName);
        FileHelper_1.FileHelper.CopyDirectory(srcPath, srcDest);
    }
    autoUpLoad(cfginfo, url, manifestPath) {
        if (cfginfo.autoUpload) {
            UpLoadHelper_1.UploadHelper.UploadDirectroy(url, manifestPath);
        }
    }
}
exports.HotFileGenrator = HotFileGenrator;
