import {readdirSync} from "fs";

const readModules = async () => {
    try {
        // @ts-ignore
        return readdirSync('./src/controller', { recursive: true });
    } catch (err) {
        console.error(err);
    }
}

export const Modules = async () => {
    // const api_version = version.api_version;
    const controllersArray: Array<any> = [];
    const modules: any = await readModules();

    modules.forEach(item => {
        if (!item.toString().includes("Controller.ts")){
            return
        } else {
            const route: string = item.toString().replace("Controller.ts", "").toLowerCase();
            controllersArray.push(route);
        }
    })
    return controllersArray;
};
