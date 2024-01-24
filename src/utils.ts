/**
 * get chars between given string with multiple occurrence
 * @param str
 * @param char1
 * @param char2
 */
export function getSubstring(str: string, char1: string, char2: string) {
    const split = str.split(char1);
    const result: string[] = [];
    split.forEach((el: string) => {
        const indexOfChar2 = el.indexOf(char2);
        if (indexOfChar2 != -1) result.push(el.substring(0, indexOfChar2));
    });

    return result;
}
