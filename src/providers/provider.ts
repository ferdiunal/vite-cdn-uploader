import { ReadStream } from "node:fs";
import { T_ProviderOptions } from "../types";

export abstract class Provider {

    abstract config(): T_ProviderOptions;

    abstract upload(file: Buffer | ReadStream | string, filePath: string): Promise<void>;

}