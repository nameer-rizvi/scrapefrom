import { Config } from "./interfaces";
import * as cheerio from "cheerio";
declare function extractHTMLData1(config: Partial<Config>, $: cheerio.CheerioAPI): Record<string, any>;
export default extractHTMLData1;
