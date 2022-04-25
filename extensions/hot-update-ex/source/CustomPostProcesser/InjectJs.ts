import { IPostProcesser } from "../PostProcess/IPostProcesser";
import * as fs from 'fs';
import * as Path from "path";
import { IBuildTaskOption } from "../../@types";
import { FileHelper } from "../Helper/FileHelper";
export class InjectJs implements IPostProcesser
{
    Run(projectPath: string, buildPath: string,op:IBuildTaskOption): void
    {
        var root = Path.join(buildPath, 'assets');
        var url = Path.join(root, "main.js");
        let script = this.getInject_script(projectPath);
        fs.readFile(url, "utf8", function (err, data)
        {
            if (err)throw err;
            var newStr = script + data;
            fs.writeFile(url, newStr, function (error)
            {
                if (error) throw error;
            });
        });
    }
    getInject_script(projectPath: string): string
    {
        let out = { out: undefined };
        FileHelper.Search(projectPath, "__HotUpdateSaveFile.ts", out);
        if (out.out)
        {
            let content = FileHelper.ReadAllText(out.out);
            let funcDefine = this.getContent(content,"##REPLEASE_START##","//##REPLEASE_END##");
            let funcName = this.getContent(funcDefine, "/*f_s*/", "/*f_e*/");
            return funcDefine + "\n" + funcName + "();";
        } else
        {
            throw "inject file not found";
        }
    }

    private getContent(content: string,startMark:string,endMark:string)
    {
        let startIndex = content.indexOf(startMark) + startMark.length;
        let endIndex = content.indexOf(endMark);
        return content.substring(startIndex, endIndex);
    }
}