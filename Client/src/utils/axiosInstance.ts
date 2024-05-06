import axios from 'axios';

// const PROVINCES_BASE_URL = 'https://provinces.open-api.vn/api/';

const BACKEND_BASE_URL = 'https://microsoft-translator-text.p.rapidapi.com/translate';

export const host = BACKEND_BASE_URL;

// Tạo một instance Axios với cấu hình mặc định
export const axiosTranslate = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu là 10 giây
  headers: {
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': 'f24a9aa32amshe18739d657c56dap160202jsn8478bbea099b',
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    'Content-Type': 'application/json',
  }
});

