import "cross-fetch/polyfill";
import { Config } from "./interfaces";
declare function scrapefrom(...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]): Promise<Config | Config[]>;
export = scrapefrom;
