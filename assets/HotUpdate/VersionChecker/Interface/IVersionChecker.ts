import { Version } from "../../Version";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";

export abstract class IVersionChecker 
{    
    abstract Check(localVersion: Version, remoteVersion: Version): boolean;
    abstract getExecuter(): IVersionExcuter;
}