import { Config, JsonNode } from "./interfaces";
declare function extractHTMLData2(config: Config): {
    head: JsonNode;
    body: JsonNode;
    map: string[];
};
export default extractHTMLData2;
