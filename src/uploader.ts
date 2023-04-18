import fs from "node:fs"
import path from "node:path"
import * as progress from "cli-progress"
import { I_Options } from "./interfaces";

export class Uploader {
    constructor(
        private readonly options: I_Options
    ) {
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

    private getFilePath(filePath: string) {
        filePath = filePath.replace(
            this.options.root + "/",
            ""
        )

        if(this.options.prefixDir) {
            return path.join(
                this.options.prefixDir,
                filePath
            )
        }

        return filePath
    }

    private clearConsole() {
        process.stdout.write(
          process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
        );
      }

    async fileUpload(file: string) {
        const filePath = this.getFilePath(file)
        const fileStream = fs.createReadStream(file);
        const fileStats = fs.statSync(file);

        this.clearConsole()
        
        console.log(filePath + "\n")

        const bar = new progress.SingleBar({}, progress.Presets.shades_classic)

        bar
        bar.start(fileStats.size, 0);

        fileStream.on('data', (chunk) => {
            bar.increment(chunk.length);
        });

        try {
            await this.options.provider.upload(
                fileStream,
                filePath
            )   
        } catch (e) {
            console.error(e)
        } finally {
            bar.stop();
        }
    }

    async upload() {
        const files = this.files(
            this.options.buildDir as string
        )

        for await (const file of files) {
            await this.fileUpload(file)
        }

    }

}