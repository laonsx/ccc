/**
 *
 * Created by 硕洁 on 2018/7/30.
 */

class ZipRes {

    private static config: JSZip;


    public static initialze(): void {
        cc.loader.load("", function (err, tex) {

            ZipRes.config = new JSZip(tex)
        })
    }

    public static getProto(): string { return ZipRes.config.file("common.proto").asText(); }

    public static getConfig(_key: string): any {return JSON.parse(ZipRes.config.file(_key).asText());}

    public constructor() {
    }
}