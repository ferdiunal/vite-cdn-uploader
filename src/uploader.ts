import fs from "node:fs"
import path from "node:path"
import * as progress from "cli-progress"
import { I_Options } from "./interfaces";

export class Uploader {

    private readonly bar: progress.GenericBar

    constructor(
        private readonly options: I_Options
    ) {
        this.bar = new progress.SingleBar({}, progress.Presets.shades_classic);
    }

    private files(directoryPath: string): string[] {
        let allFiles: string[] = [];

        const filesAndDirectories = fs.readdirSync(directoryPath, { withFileTypes: true });
        
        filesAndDirectories.forEach((item) => {
            const fullPath = path.join(directoryPath, item.name);
            if (item.isFile()) {
                allFiles.push(fullPath);
            } else if (item.isDirectory()) {
                allFiles = allFiles.concat(this.files(fullPath));
            }
        });

        return allFiles;
    }


    async upload() {
        const files = this.files(
            this.options.buildDir as string
        )

        this.bar.start(
            files.length,
            0
        )

        let process = 0

        for await (const file of files) {
        
            await this.options.provider.upload(
                fs.readFileSync(file),
                file
            )
        
            this.bar.update(process + 1)
        }

        this.bar.stop()

    }

}