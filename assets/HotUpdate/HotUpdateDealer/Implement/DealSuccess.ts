import { game } from "cc";
import { NativeMgr } from "../../Helper/NativeMgr";
import { VersionLoader } from "../../VersionLoader/Implement/VersionLoader";
import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";
export class DealSuccess implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return code == jsb.EventAssetsManager.UPDATE_FINISHED;
    }
    Deal(event: jsb.EventAssetsManager): void
    {
        console.log("DealSuccess");
        var searchPaths = jsb.fileUtils.getSearchPaths();
        var newPaths =  NativeMgr.Mgr.getLocalManifest().getSearchPaths();
        // console.log(JSON.stringify(newPaths));
        Array.prototype.unshift.apply(searchPaths, newPaths);
        localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
        jsb.fileUtils.setSearchPaths(searchPaths);

        // restart game.
        setTimeout(() =>
        {
            game.restart();
        }, 1000);
    }    
}