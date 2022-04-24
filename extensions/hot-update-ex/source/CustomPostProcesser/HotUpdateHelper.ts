import * as fs from 'fs';
import * as path from "path";
import * as crypto from 'crypto';

class Manifest
{
    packageUrl = 'http://localhost/tutorial-hot-update/remote-assets/';
    remoteManifestUrl = 'http://localhost/tutorial-hot-update/remote-assets/project.manifest';
    remoteVersionUrl = 'http://localhost/tutorial-hot-update/remote-assets/version.manifest';
    version = '1.0.0';
    assets = {};
    searchPaths = [];
}
export class HotUpdateHelper
{
    static GenrateHotUpdateFiles(url:string, version:string, buildPath:string, destPath:string):void
    {
        let manifest = new Manifest();
        manifest.packageUrl = url;
        manifest.remoteManifestUrl = url + '/project.manifest';
        manifest.remoteVersionUrl = url + '/version.manifest';
        manifest.version = version;
        buildPath = path.join(buildPath, "assets");
        this.readDir(buildPath, path.join(buildPath, 'src'), manifest.assets);
        this.readDir(buildPath, path.join(buildPath, 'assets'), manifest.assets);
        this.readDir(buildPath, path.join(buildPath, 'jsb-adapter'), manifest.assets);

        let destManifest = path.join(destPath, 'project.manifest');
        let destVersion = path.join(destPath, 'version.manifest');

        this.mkdirSync(destPath);

        fs.writeFileSync(destManifest, JSON.stringify(manifest));

        delete manifest.assets;
        delete manifest.searchPaths;
        fs.writeFileSync(destVersion, JSON.stringify(manifest));
    }

    private static readDir(srcPath, dir, obj)
    {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory())
        {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
        for (var i = 0; i < subpaths.length; ++i)
        {
            if (subpaths[i][0] === '.')
            {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory())
            {
                this.readDir(srcPath, subpath, obj);
            }
            else if (stat.isFile())
            {
                // Size in Bytes
                size = stat['size'];
                md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
                compressed = path.extname(subpath).toLowerCase() === '.zip';

                relative = path.relative(srcPath, subpath);
                relative = relative.replace(/\\/g, '/');
                relative = encodeURI(relative);
                obj[relative] = {
                    'size': size,
                    'md5': md5
                };
                if (compressed)
                {
                    obj[relative].compressed = true;
                }
            }
        }
    }

    private static mkdirSync(path)
    {
        try
        {
            fs.mkdirSync(path);
        } catch (e)
        {
            if (e.code != 'EEXIST') throw e;
        }
    }
}


