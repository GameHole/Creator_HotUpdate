import { HotUpdate } from "../../VersionExecuter/Implement/HotUpdate";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { ACheckSubVersion } from "../Interface/ACheckSubVersion";

export class CheckSilentVersion extends ACheckSubVersion
{
    protected getIndex(): number
    {
        return 3;
    }
    getExecuter(): IVersionExcuter
    {
        return new HotUpdate();
    }    
}