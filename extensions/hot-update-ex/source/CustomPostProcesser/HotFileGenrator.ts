import { resourcesPath } from "process";
import { IBuildTaskOption } from "../../@types";
import { FileHelper } from "../Helper/FileHelper";
import { UploadHelper } from "../Helper/UpLoadHelper";
import { IPostProcesser } from "../PostProcess/IPostProcesser";
import { HotUpdateHelper } from "./HotUpdateHelper";
interface ConfigInfo
{
    channal: string;
    url: string;
    version: string;
    build: number;
    autoUpload: boolean;
}
class Config
{
    info: ConfigInfo;
    readonly filePath: string;
    constructor(filePath: string)
    {
        this.filePath = filePath;
    }
    Save()
    {
        FileHelper.WriteAllText(this.filePath, JSON.stringify(this.info));
    }
    Load()
    {
        this.info = JSON.parse(FileHelper.ReadAllText(this.filePath));
        if (this.info.build == undefined)
            this.info.build = 0;
    }
    IncreaseBuild()
    {
        this.info.build++;
        this.Save();
    }
    getGenrateInfo(buildPath: string, name: string):GenrateInfo
    {
        let v = this.info.version + "." + this.info.build;
        let pName = name + "_" + this.info.channal;
        let destRelate = "../" + pName + "_v_" + v;
        return {
            ver: v,
            projectName:pName,
            manifestPath: FileHelper.ResolvePath(buildPath, destRelate)
        }
    }
}
interface GenrateInfo
{
    ver: string;
    projectName: string;
    manifestPath: string;
}
export class HotFileGenrator implements IPostProcesser
{
    Run(projectPath: string, buildPath: string, op: IBuildTaskOption): void
    {
        let custom = op.packages["hot-update-ex"];
        let configsPath = custom["config"];
        if (configsPath)
        {
            let floaderPath = FileHelper.ResolvePath(projectPath, configsPath);
            let configs = this.getConfigs(floaderPath);
            configs.forEach(cfg =>
            {
                if (custom["autoIncreaseBuild"])
                    cfg.IncreaseBuild();
                let geninfo = cfg.getGenrateInfo(buildPath, op.name);
                let url = this.adjustUrl(cfg) + geninfo.projectName;
                HotUpdateHelper.GenrateHotUpdateFiles(url, geninfo.ver, buildPath, geninfo.manifestPath);
                this.copyFiles(cfg.info, geninfo, buildPath, projectPath);
                this.autoUpLoad(cfg.info, url, geninfo.manifestPath);
            });
        }
    }
    private adjustUrl(cfg: Config)
    {
        let url = cfg.info.url;
        if (url.endsWith("/")) 
            return url ;
        return url + "/";
    }

    private getConfigs(floaderPath: string): Array<Config>
    {
        let res = new Array<Config>();
        FileHelper.getFiles(floaderPath).forEach(json =>
        {
            let cfg = new Config(json);
            cfg.Load();
            res.push(cfg);
        });
        return res;
    }
    copyFiles(cfginfo:ConfigInfo,geninfo:GenrateInfo,buildPath: string,projectPath: string)
    {
        let dir = FileHelper.Combine(buildPath, "assets");
        this.copyFloader(dir, geninfo.manifestPath, "src");
        this.copyFloader(dir, geninfo.manifestPath, "assets");
        let name = "project" + "_" + cfginfo.channal + ".manifest";
        FileHelper.CopyFile(FileHelper.Combine(geninfo.manifestPath,"project.manifest"),FileHelper.Combine(this.getRes(projectPath),name))
    }
    getRes(projectPath: string): string
    {
        return FileHelper.Combine(projectPath, "assets", "resources","hotupdate");
    }

    private copyFloader(dir: string, manifestPath: string,floaderName:string)
    {
        let srcPath = FileHelper.Combine(dir, floaderName);

        let srcDest = FileHelper.Combine(manifestPath, floaderName);

        FileHelper.CopyDirectory(srcPath, srcDest);
    }
    autoUpLoad(cfginfo:ConfigInfo,url:string,manifestPath:string)
    {
        if (cfginfo.autoUpload)
        {
            UploadHelper.UploadDirectroy(url, manifestPath);
        }
    }
}