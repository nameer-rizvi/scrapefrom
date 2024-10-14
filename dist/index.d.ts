import "cross-fetch/polyfill";
import { Config, Result } from "./interfaces";
declare function scrapefrom(...inputs: Config[] | Config[][] | string[] | string[][] | any[] | any[][]): Promise<Result | Result[]>;
export = scrapefrom;
