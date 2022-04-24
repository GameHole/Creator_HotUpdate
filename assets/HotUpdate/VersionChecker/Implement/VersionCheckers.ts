import { IVersionChecker } from "../Interface/IVersionChecker";
import { IVersionExcuter } from "../../VersionExecuter/Interface/IVersionExcuter";
import { Version } from "../../Version";

export class VersionCheckers implements IVersionChecker
{
    checkers: Array<IVersionChecker> = new Array<IVersionChecker>();
    Add(checker: IVersionChecker)
    {
        this.checkers.push(checker);
    }
    Check(localVersion: Version, remoteVersion: Version): boolean
    {
        for (let i = 0; i < this.checkers.length; i++)
        {
            let checker = this.checkers[i];
            if (checker.Check(localVersion, remoteVersion))
            {
                let exe = checker.getExecuter();
                exe.Excute();
                return true;
            }
        }
        return false;
    }
    getExecuter(): IVersionExcuter
    {
        throw new Error("Method not implemented.");
    }    
}