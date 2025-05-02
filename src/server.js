import express from 'express';
import cors from 'cors';
import path from 'path';
import { configViewEngine} from './config/viewEngine.js';
import {} from 'dotenv/config'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST_NAME || 'localhost';

const START_SERVER = () => {

    app.use(cors());
    app.use(express.json());
    // app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));

    configViewEngine(app); // Gọi hàm cấu hình view engine EJS
    
    app.get('/', (req, res) => {
        res.render("test.ejs");
    });
    
    app.listen(PORT, HOSTNAME,  () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
};

START_SERVER();

