import { S3 } from "aws-sdk"
import { T_ProviderOptions } from "../types";
import { Provider } from "./provider";

export class AwsS3Provider implements Provider {
    private readonly s3: S3;
    private readonly bucket: string;

    constructor() {
        const config = this.config() as S3.Types.ClientConfiguration
        this.s3 = new S3({
            accessKeyId: String(config.credentials?.accessKeyId),
            secretAccessKey: String(config.credentials?.secretAccessKey),
            region: String(config.region)
        })

        this.bucket = process.env.AWS_BUCKET as string
    }

    config(): T_ProviderOptions {
        return {
            credentials: {
                accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
                secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
            },
            region: String(process.env.AWS_DEFAULT_REGION)
        };
    }

    async upload(file: string | Buffer, filePath: string): Promise<void> {
        try {
            const params = {
                Bucket: this.bucket,
                Key: filePath,
                Body: file
            };

            await this.s3.upload(params).promise()
        } catch (e) {
            await Promise.reject(e)
        }
    }

}