import { Provider } from "../providers/provider"

export type T_Options = {
    provider: Provider,
    root?: string,
    buildDir?: string,
}

export type T_ProviderOptions = Record<string, string | {
    [key: string] : string
}>