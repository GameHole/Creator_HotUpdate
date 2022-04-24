import { HotUpdate } from "../../VersionExecuter/Implement/HotUpdate";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { ACheckSubVersion } from "../Interface/ACheckSubVersion";

export class CheckMenualVersion extends ACheckSubVersion
{
    protected getIndex(): number
    {
        return 2;
    }
    getExecuter(): IVersionExcuter
    {
        return new HotUpdate();
    }    
}