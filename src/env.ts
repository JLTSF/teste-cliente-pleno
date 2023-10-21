import { config } from "dotenv";

config();

const PORT = process.env.PORT || 8000;
const ENVIRONMENT = process.env.ENVIRONMENT || "development";
const APP_VERSION = process.env.npm_package_version || "0.0.1";

export default { PORT, ENVIRONMENT, APP_VERSION };
