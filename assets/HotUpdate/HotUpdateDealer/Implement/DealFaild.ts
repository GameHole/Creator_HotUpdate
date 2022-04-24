import { NativeMgr } from "../../Helper/NativeMgr";
import { VersionLoader } from "../../VersionLoader/Implement/VersionLoader";
import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";

export class DealFaild implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return code == jsb.EventAssetsManager.UPDATE_FAILED;
    }
    Deal(event: jsb.EventAssetsManager): void
    {
        NativeMgr.Mgr.downloadFailedAssets();
        console.log("DealFaild re load");
    }    
}