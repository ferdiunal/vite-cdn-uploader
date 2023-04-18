import type { Plugin} from 'vite';
import path from "node:path"
import { I_Options } from './interfaces';
import { Uploader } from './uploader';


export const cdnUploaderPlugin = (options: I_Options): Plugin => {
    return {
        name: 'cdn-uploader',

        apply: (_, env): boolean => env.command === "build",

        configResolved(config) {
            options.root = config.root
            options.buildDir = path.join(config.root, config.build.outDir)
        },

        closeBundle() {
            return (new Uploader(options)).upload()
        },

    }

}