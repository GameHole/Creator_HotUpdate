import { Version } from "../../Version";
import { IVersionChecker } from "./IVersionChecker";

export abstract class ACheckSubVersion extends IVersionChecker
{
    Check(localVersion: Version, remoteVersion: Version): boolean
    {
        let localSub = localVersion.GetVersion(this.getIndex());
        let remoteSub = remoteVersion.GetVersion(this.getIndex());
        return localSub != remoteSub;
    }  
    protected abstract getIndex(): number;
}