import { FileHelper } from "./Helper/FileHelper";
import { pathToFileURL } from 'url';
import * as fs from 'fs';
import { url } from "inspector";
import * as  ftp from "basic-ftp"
async function test()
{
    let c = new ftp.Client();
    c.ftp.verbose = true;
    await c.access({
        host: "121.40.88.3",
        user: "smzy",
        password: "smzy123!@#",
        secure: false
    });
    console.log(await c.list());
}
test();