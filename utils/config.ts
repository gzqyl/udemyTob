import { createContext } from "react";

type ConfigType = {
    dev: boolean
}

const ConfigContext = createContext<ConfigType | null>(null)

const Config = {
    context: ConfigContext,
    value: {
        dev: false
    }
}

export default Config