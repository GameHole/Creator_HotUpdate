import { HotUpdate } from "../../VersionExecuter/Implement/HotUpdate";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { ACheckSubVersion } from "../Interface/ACheckSubVersion";

export class CheckForceVersion extends ACheckSubVersion
{
    protected getIndex(): number
    {
        return 1;
    }
    getExecuter(): IVersionExcuter
    {
        return new HotUpdate();
    }    
}