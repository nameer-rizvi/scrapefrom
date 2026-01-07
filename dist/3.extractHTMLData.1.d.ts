import { Config } from "./interfaces";
import { CheerioAPI, Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
declare function extractHTMLData1(config: Partial<Config>, $: CheerioAPI, parent?: Cheerio<AnyNode>): Record<string, any>;
export default extractHTMLData1;
