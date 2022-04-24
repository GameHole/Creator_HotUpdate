import FTP  from "ftp-ts"
export class UploadHelper
{    
    static UploadDirectroy(url: string, dir: string): void
    {
        FTP.connect({ host: this.getAddress(url), port: 21 }).then((c) =>
        {
            // c.put('foo.txt', 'foo.remote-copy.txt');
            console.log("aaa");
            c.end();
        });
    }

    private static getAddress(url: string):string
    {
        let index = url.indexOf("//");
        url = url.substring(index + 1, url.length - 1);
        index = url.indexOf("/");
        if (index > 0)
            url = url.substring(0, index - 1);
        return url;
    }
}