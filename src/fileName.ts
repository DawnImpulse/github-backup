import { getSubstring } from "./utils";
import Moment from "./moment";

/**
 * generate filename while parsing timestamp
 * @param name
 * @param utc
 */
export default function (name: string, utc: boolean) {
    let newName = name;
    const dateVars = getSubstring(name, "{", "}");
    dateVars.forEach((el) => {
        newName = name.replace(`{${el}}`, Moment.parse(el, utc));
    });
    return newName;
}
