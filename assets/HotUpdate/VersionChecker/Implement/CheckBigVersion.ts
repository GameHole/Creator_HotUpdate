import { ReDownLoad } from "../../VersionExecuter/Implement/ReDownLoad";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { ACheckSubVersion } from "../Interface/ACheckSubVersion";

export class CheckBigVersion extends ACheckSubVersion
{
    protected getIndex(): number
    {
        return 0;
    }
    getExecuter(): IVersionExcuter
    {
        return new ReDownLoad();
    }    
}