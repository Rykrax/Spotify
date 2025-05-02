import express from 'express';
import cors from 'cors';
import path from 'path';
import { configViewEngine} from './config/viewEngine.js';
import {} from 'dotenv/config'
import { fileURLToPath } from 'url';
import { CONNECT_DB} from './model/mongodb.js';
import webRouter from './routes/web.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST_NAME || 'localhost';

const START_SERVER = () => {
    console.log("Bắt đầu khởi động server trong server.js...")

    // Khai báo router
    app.use('/', webRouter); // Sử dụng router web
    app.use('/api', apiRouter); // Sử dụng router api
    app.use(cors());
    app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
    console.log("check >>", path.join(__dirname, '..'))
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

    configViewEngine(app); // Gọi hàm cấu hình view engine EJS

    
    app.listen(PORT, HOSTNAME,  () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
};

console.log("Bắt đầu kết nối MongoDB trong server.js...")
CONNECT_DB()
    .then(() => { console.log("MongoDB kết nối thành công trong server.js.") })
    .then(START_SERVER())