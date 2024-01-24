import { getSubstring } from "./utils";
import Moment from "./moment";

export default function (name: string) {
    let newName = name;
    const dateVars = getSubstring(name, "{", "}");
    dateVars.forEach((el) => {
        newName = name.replace(`{${el}}`, Moment.parse(el));
    });
    return newName;
}
