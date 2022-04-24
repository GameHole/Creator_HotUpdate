import { IVersionChecker } from "../Interface/IVersionChecker";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { Version } from "../../Version";
import { RunGame } from "../../VersionExecuter/Implement/RunGame";

export class CheckFullVersion implements IVersionChecker
{
    Check(localVersion: Version, remoteVersion: Version): boolean
    {
        return localVersion.strVer == remoteVersion.strVer;
    }
    getExecuter(): IVersionExcuter
    {
        return new RunGame();
    }    
}