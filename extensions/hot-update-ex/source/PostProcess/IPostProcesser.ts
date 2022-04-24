import { IBuildTaskOption } from "../../@types";

export abstract class IPostProcesser 
{    
    abstract Run(projectPath: string, buildPath: string,options:IBuildTaskOption): void;
}