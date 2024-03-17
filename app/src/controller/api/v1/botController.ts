import {NextFunction, Request, Response} from "express";


export default class BotController {


    constructor() {
    }

    public indexAction = async (request: Request, response: Response, next: NextFunction) => {
        response.json(`any`);

    }

}
