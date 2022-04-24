
import { BuildHook, IBuildResult, IBuildTaskOption } from '../@types';
import { HotFileGenrator } from './CustomPostProcesser/HotFileGenrator';
import { InjectJs } from './CustomPostProcesser/InjectJs';
import { PlatformDecrator } from './CustomPostProcesser/PlatformDecrator';

import { IPostProcesser } from './PostProcess/IPostProcesser';


var processers: Array<IPostProcesser> = [
    new PlatformDecrator(new InjectJs()), new PlatformDecrator(new HotFileGenrator())
];
export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function() {
   
    // console.log("aa",resourcesPath);
};

export const onBeforeBuild: BuildHook.onAfterBuild = async function(options) {
    // console.warn("- onBeforeBuild")
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function(options, result) {
    // console.warn("- onBeforeCompressSettings")
  
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function(options, result) {
    // console.warn("- onAfterCompressSettings")
};

export const onAfterBuild: BuildHook.onAfterBuild = async function (options, result:IBuildResult)
{
    // console.warn("- onAfterBuild",Editor.Project.path);
    let project = Editor.Project.path;
    let buildPath = result.dest;
    processers.forEach(v => v.Run(project, buildPath,options));
};

export const unload: BuildHook.unload = async function() {
    // console.log("- unload")
};

