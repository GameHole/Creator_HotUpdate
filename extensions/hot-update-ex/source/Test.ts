import { FileHelper } from "./Helper/FileHelper";
import { pathToFileURL } from 'url';
import * as fs from 'fs';
import { url } from "inspector";
function test()
{
    FileHelper.DeleteDirectory("./TestDirectorty1");
}
test();