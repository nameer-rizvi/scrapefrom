import { Config } from "./interfaces";
import { CheerioAPI } from "cheerio";
declare function extractHTMLData1(config: Partial<Config>, $: CheerioAPI): Record<string, any>;
export default extractHTMLData1;
