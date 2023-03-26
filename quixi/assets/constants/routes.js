const BASE_URL = 'http://ea37-2402-d000-a400-4f8a-c16c-689f-25d7-b675.in.ngrok.io/api';

export const USER_ROUTES = {
    SIGNUP: `${BASE_URL}/users/signup`,
    LOGIN: `${BASE_URL}/users/login`,
    FIND: `${BASE_URL}/users`,
    UPDATE: (id) => `${BASE_URL}/users/${id}`,
    DELETE: (id) => `${BASE_URL}/users/${id}`,
    VALIDATE: `${BASE_URL}/users/validate`
};

export const GROUP_ROUTES = {
    CREATE: `${BASE_URL}/groups`,
    FIND: `${BASE_URL}/groups`,
    UPDATE: (id) => `${BASE_URL}/groups/${id}`,
    DELETE: (id) => `${BASE_URL}/groups/${id}`,
};

export const EXPENSE_ROUTES = {
    CREATE: `${BASE_URL}/expense`,
    FIND_ALL: `${BASE_URL}/expense`,
    FIND_BY_ID: (id) => `${BASE_URL}/expense/${id}`,
    UPDATE_BY_ID: (id) => `${BASE_URL}/expense/${id}`,
    DELETE_BY_ID: (id) => `${BASE_URL}/expense/${id}`,
    TRANSACTION: {
        CREATE: (id) => `${BASE_URL}/expense/${id}/transaction`,
        FIND_ALL: (id) => `${BASE_URL}/expense/${id}/transaction`,
        FIND_BY_ID: (id, transactionId) => `${BASE_URL}/expense/${id}/transaction/${transactionId}`,
        UPDATE_BY_ID: (id, transactionId) => `${BASE_URL}/expense/${id}/transaction/${transactionId}`,
        DELETE_BY_ID: (id, transactionId) => `${BASE_URL}/expense/${id}/transaction/${transactionId}`,
    },
};