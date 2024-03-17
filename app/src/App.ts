import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
const Router = require("./routes/index");
import { User } from "./entity/User";
import * as cors from "cors";
import {AppDataSource} from "./config/data-source";
import {TelegramBot} from "./utils/TelegramBot";
import * as path from "path";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    // setup express app here
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors());

    const TGBOT = new TelegramBot();

    // todo - Routers
    app.use('/', Router);

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    console.log("Express server has started on port 3000. Open http://localhost:3000");

}).catch(error => console.log(error))
