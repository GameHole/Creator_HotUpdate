import { IBuildTaskOption } from "../../@types";
import { IPostProcesser } from "../PostProcess/IPostProcesser";

export class PlatformDecrator implements IPostProcesser
{
    constructor(v: IPostProcesser)
    {
        this.v = v;
    }
    private v: IPostProcesser;
    Run(projectPath: string, buildPath: string, options: IBuildTaskOption): void
    {
        if (this.isVailedPlatform(options))
        {
            this.v.Run(projectPath,buildPath,options);
        }
    }   
    isVailedPlatform(op: IBuildTaskOption)
    {
        return op.platform == "android";
    }
}