import * as fs from 'fs';
import path, * as Path from "path";
export class FileHelper
{
    static CopyFile(src: string, dest: string):void
    {
        let dir = this.GetDirectory(dest);
        if (!fs.existsSync(dir))
        {
            this.CreateDirectory(dir);
        }
        fs.copyFileSync(src, dest);
    }
    static CreateDirectory(dir: string)
    {
        fs.mkdirSync(dir, { recursive: true });
    }
    static ResolvePath(projectPath:string,relativePath:string):string
    {
        relativePath = relativePath.replace("project://", "");
        return path.resolve(projectPath, relativePath);
    }
    static getFiles(dir: string):Array<string>
    {
        if (fs.existsSync(dir))
        {  
            let res = new Array<string>();
            fs.readdirSync(dir).forEach((f) =>
            {
                let file = path.join(dir, f);
                if (fs.statSync(file).isFile())
                {
                    res.push(file);
                }
            });
            return res;
        } else
        {
           throw "给定的路径不存在！";
        }
    }
    static isExists(path: string):boolean
    {
        return fs.existsSync(path);
    }
    static ReadAllText(path: string):string
    {
        return fs.readFileSync(path, 'utf-8');
    }
    static WriteAllText(path: string,content:string):void
    {
        return fs.writeFileSync(path, content, 'utf-8');
    }
    static GetDirectory(path: string):string
    {
        return Path.dirname(path);
    }
    static GetFileName(path: string):string
    {
        // let dirIdx = path.lastIndexOf('/');
        return Path.basename(path);
    }
    static DeleteDirectory(path: string)
    {
        var files = [];  
        if (fs.existsSync(path))
        {  //判断给定的路径是否存在     
            files = fs.readdirSync(path);   //返回文件和子目录的数组
            files.forEach(file =>
            {
                var curPath = Path.join(path, file);
                if (fs.statSync(curPath).isDirectory())
                { //同步读取文件夹文件，如果是文件夹，则函数回调
                    this.DeleteDirectory(curPath);
                } else
                {
                    fs.unlinkSync(curPath);    //是指定文件，则删除
                }
                        
            });
            fs.rmdirSync(path); //清除文件夹
        } else
        {
           throw "给定的路径不存在！";
        }
    }
    static CopyDirectory(src: string, dest: string):void
    {
        let state = fs.statSync(src);
        if (state.isFile())
        {
            this.CopyFile(src, dest);
        } else
        {
            if (!fs.existsSync(dest))
            {
                fs.mkdirSync(dest);
            }
            fs.readdirSync(src).forEach(v =>
            {
                this.CopyDirectory(src + "/" + v, dest + "/" + v);
            });
        }
    }
    static Combine(...paths: string[]):string
    {
        return path.join(...paths);
    }
}
