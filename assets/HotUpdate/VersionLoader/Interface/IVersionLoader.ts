import { Version } from "../../Version";

export abstract class IVersionLoader 
{
    abstract Load(callback: (local: Version, remote: Version) => void): void;
}