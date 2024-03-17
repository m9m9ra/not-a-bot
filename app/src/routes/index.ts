import {NextFunction, Request, Response} from "express";
import * as express from "express";
import {Modules} from "../utils/Modules";
const router = express.Router();

const Router = async () => {
    const modules = await Modules();


    modules.forEach(item => {
        (router as any).all(`/${item}`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`indexAction`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
        (router as any).all(`/${item}/:action`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`${req.params.action}Action`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        });
        (router as any).all(`/${item}/:action/:param`, (req: Request, res: Response, next: NextFunction) => {
            const controller = new(require(`./../controller/${item}Controller.ts`).default);
            const result = controller[`${req.params.action}Action`](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    });

    router.all("/admin", (req: Request, res: Response, next: NextFunction) => {
        const controller = new(require(`./../controller/admin/indexController.ts`).default);
        const result = controller[`indexAction`](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
};

Router();

module.exports = router;
