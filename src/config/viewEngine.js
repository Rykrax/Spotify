import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configViewEngine = (app) => {
    app.set('views', path.join('./src/', 'views')); // Đường dẫn đến thư mục chứa các file EJS
    app.set('view engine', 'ejs'); // Sử dụng EJS làm view engine
};
