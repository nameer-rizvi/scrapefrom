declare function logger(enabled: boolean | undefined, processName: string, configName: string): (message: string, method?: "info" | "error") => void;
export default logger;
