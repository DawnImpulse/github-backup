import { Zip } from "zip-lib";

/**
 * compress provided paths
 * @param path of the output
 * @param name of the archive
 */
export default function (path: string, name: string): Promise<void> {
    const zip = new Zip();
    zip.addFolder(path + `/${name}`);
    return zip.archive(`${path}/${name}.zip`);
}
