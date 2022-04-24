import { RunGame } from "../../VersionExecuter/Implement/RunGame";
import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";

export class DealOtherEvent implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return code == jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST ||
            code == jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST ||
            code == jsb.EventAssetsManager.ERROR_PARSE_MANIFEST ||
            code == jsb.EventAssetsManager.ERROR_UPDATING ||
            code == jsb.EventAssetsManager.ERROR_DECOMPRESS
    }
    Deal(event: jsb.EventAssetsManager): void
    {
        new RunGame().Excute();
    }    
}