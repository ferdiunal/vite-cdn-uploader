import fs from "node:fs"
import path from "node:path"
import { I_Options } from "./interfaces";

export class Uploader {

    constructor(
        private readonly options: I_Options
    ) { }

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

        console.log(files)
        // let process = 0;


        // for await (const file of files) {
        
        //     await this.options.provider.upload(
        //         fs.readFileSync(file),
        //         file
        //     )
        
        //     process++

        // }

    }

}