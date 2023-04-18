import type { Plugin} from 'vite';
import path from "node:path"
import * as dotenv from "dotenv"
import { I_Options } from './interfaces';
import { Uploader } from './uploader';
import  * as providers from "./providers"

dotenv.config()

export const cdnUploaderPlugin = (options: I_Options): Plugin => {
    return {
        name: 'cdn-uploader',

        apply: (_, env): boolean => env.command === "build",

        configResolved(config) {
            options.root = options.root || config.root
            options.buildDir = options.buildDir || path.join(config.root, config.build.outDir)
        },

        closeBundle() {
            return (new Uploader(options)).upload()
        },

    }

}


export { cdnUploaderPlugin as default,  providers}