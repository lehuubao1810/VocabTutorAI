import axios from "axios";

// const PROVINCES_BASE_URL = 'https://provinces.open-api.vn/api/';

const TRANSLATE_URL =
  "https://microsoft-translator-text.p.rapidapi.com/translate";

// export const host = TRANSLATE_URL;

// Tạo một instance Axios với cấu hình mặc định
export const axiosTranslate = axios.create({
  baseURL: TRANSLATE_URL,
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu là 10 giây
  headers: {
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": "f24a9aa32amshe18739d657c56dap160202jsn8478bbea099b",
    "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    "Content-Type": "application/json",
  },
});

const BACKEND_BASE_URL = {
  local: "http://localhost:5000",
  production: "https://vocabtutorai-be.onrender.com",
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL.production,
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu là 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});
