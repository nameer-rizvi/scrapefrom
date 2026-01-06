import "cross-fetch/polyfill";
import { Config } from "./interfaces";
declare function scrapefrom(...inputs: unknown[]): Promise<Config | Config[]>;
export = scrapefrom;
