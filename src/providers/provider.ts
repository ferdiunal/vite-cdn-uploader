import { T_ProviderOptions } from "../types";

export abstract class Provider {

    abstract config(): T_ProviderOptions;

    abstract upload(file: Buffer | string, filePath: string): Promise<void>;

}