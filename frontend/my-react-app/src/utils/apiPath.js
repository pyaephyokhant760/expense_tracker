export const BASE_API_URL = 'https://localhost:8000/';

const API_PATHS = {
    AUTH : {
        LOGIN: '/api/users/login/',
        REGISTER: '/api/users/register/',
        LOGOUT: '/api/users/me',
    },
    DASHBOARD : {
        GET_DATA : '/api/dashboard/',
    },
    INCOME : {
        ADD_INCOME : '/api/income/create/',
        GET_INCOME : '/api/income/',
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}/`,
        DOWNLOAD_INCOME : '/api/income/downloadExcel/',
        
    },
    EXPENSE : {
        ADD_EXPENSE : '/api/expense/create/',
        GET_EXPENSE : '/api/expense/',
        DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}/`,
        DOWNLOAD_EXPENSE : '/api/expense/downloadExcel/',
    },
    IMAGE : {
        UPLOAD_IMAGE : '/uploads',
    }

};