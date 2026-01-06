import { CheerioAPI } from "cheerio";
import { JsonNode } from "./interfaces";
declare function extractHTMLData2($: CheerioAPI): {
    head: JsonNode;
    body: JsonNode;
    map: string[];
};
export default extractHTMLData2;
