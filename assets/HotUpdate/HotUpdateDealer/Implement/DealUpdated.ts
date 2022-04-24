import { RunGame } from "../../VersionExecuter/Implement/RunGame";
import { IHotUpdateDealer } from "../Interface/IHotUpdateDealer";

export class DealUpdated implements IHotUpdateDealer
{
    isNeed(code: number): boolean
    {
        return code == jsb.EventAssetsManager.ALREADY_UP_TO_DATE;
    }
    Deal(event: jsb.EventAssetsManager): void
    {
        new RunGame().Excute();
    }    
}