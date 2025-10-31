import axios from "axios";
import envConstant from "../utils/envConstant";

export const api = axios.create({
    baseURL: envConstant.API_URL,
    timeout: 5000,
    // TODO agregar el token que se envia en el header aca ("header: ...")
});