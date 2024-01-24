import moment from "moment";

export default class Moment {
    /**
     * parse date based on given format
     * @param format
     * @param utc
     */
    static parse(format: string, utc: boolean = false): string {
        let mnt = moment();
        return utc ? mnt.format(format) : moment().utc().format(format);
    }
}
