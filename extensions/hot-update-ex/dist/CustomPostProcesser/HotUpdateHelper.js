"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotUpdateHelper = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
class Manifest {
    constructor() {
        this.packageUrl = 'http://localhost/tutorial-hot-update/remote-assets/';
        this.remoteManifestUrl = 'http://localhost/tutorial-hot-update/remote-assets/project.manifest';
        this.remoteVersionUrl = 'http://localhost/tutorial-hot-update/remote-assets/version.manifest';
        this.version = '1.0.0';
        this.assets = {};
        this.searchPaths = [];
    }
}
class HotUpdateHelper {
    static GenrateHotUpdateFiles(url, version, buildPath, destPath) {
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
    static readDir(srcPath, dir, obj) {
        var stat = fs.statSync(dir);
        if (!stat.isDirectory()) {
            return;
        }
        var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
        for (var i = 0; i < subpaths.length; ++i) {
            if (subpaths[i][0] === '.') {
                continue;
            }
            subpath = path.join(dir, subpaths[i]);
            stat = fs.statSync(subpath);
            if (stat.isDirectory()) {
                this.readDir(srcPath, subpath, obj);
            }
            else if (stat.isFile()) {
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
                if (compressed) {
                    obj[relative].compressed = true;
                }
            }
        }
    }
    static mkdirSync(path) {
        try {
            fs.mkdirSync(path);
        }
        catch (e) {
            if (e.code != 'EEXIST')
                throw e;
        }
    }
}
exports.HotUpdateHelper = HotUpdateHelper;
