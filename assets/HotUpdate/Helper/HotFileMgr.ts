import { Asset, resources } from "cc";
import { CheckBigVersion } from "../VersionChecker/Implement/CheckBigVersion";
import { CheckForceVersion } from "../VersionChecker/Implement/CheckForceVersion";
import { CheckFullVersion } from "../VersionChecker/Implement/CheckFullVersion";
import { CheckMenualVersion } from "../VersionChecker/Implement/CheckMenualVersion";
import { CheckSilentVersion } from "../VersionChecker/Implement/CheckSilentVersion";
import { VersionCheckers } from "../VersionChecker/Implement/VersionCheckers";
import { IVersionChecker } from "../VersionChecker/Interface/IVersionChecker";
import { RunGame } from "../VersionExecuter/Implement/RunGame";
import { VersionLoader } from "../VersionLoader/Implement/VersionLoader";
import { IVersionLoader } from "../VersionLoader/Interface/IVersionLoader";

export class HotFileMgr
{    
    static Run(channal:string): void
    {
        resources.load<Asset>("hotupdate/project_" + channal, (err: Error,assets: Asset) =>
        {
            let url = undefined;
            if (!err)
            {
                url = assets.nativeUrl;
            }
            this.HotUpdate(url);
        });
    }
    static HotUpdate(nativeUrl:string)
    {
        let vl = new VersionLoader();
        vl.localManifestUrl = nativeUrl;
        let cs = new VersionCheckers();
        cs.Add(new CheckFullVersion());
        cs.Add(new CheckBigVersion());
        cs.Add(new CheckForceVersion());
        cs.Add(new CheckMenualVersion());
        cs.Add(new CheckSilentVersion());

        let loader: IVersionLoader = vl;
        let checker: IVersionChecker = cs;
        loader.Load((l, r) =>
        {
            checker.Check(l, r);
        });
    }
}