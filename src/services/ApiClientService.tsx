import axios, {AxiosInstance, AxiosResponse} from 'axios';

const TIMEOUT: number = 1000000;

export const isNetworkError = (error: any) => {
    return !error.response && !error.status;
};

export const getResponseError = (error: any) => {
    if (error?.response) {
        if (typeof error?.response?.data === 'object') {
            return error?.response?.data;
        } else if (typeof error?.response?.data === 'string') {
            return {
                status: error?.response.status,
                message: error?.response.statusText || error?.response?.data,
            };
        }
    }
    return error;
};

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL

class ApiClientService {
    private readonly service: AxiosInstance;
    private errorCallbacks: Array<(error: any) => void> = [];
    private readonly API_URL: string;

    constructor() {
        const API_URL = BASE_URL || 'http://localhost:8080';
        this.service = axios.create({
            baseURL: API_URL,
        });
        this.API_URL = API_URL;
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service.interceptors.request.use(this.onRequestSuccess, this.handleError);
    }

    onError(callback: (error: any) => void) {
        if (!this.errorCallbacks.some((func) => func === callback)) {
            this.errorCallbacks.push(callback);
        }

        return () => {
            this.errorCallbacks = this.errorCallbacks.filter((func) => func !== callback);
        };
    }

    private notifyError(error: any) {
        this.errorCallbacks.forEach((callback) => {
            callback?.(error);
        });
    }

    onRequestSuccess = (config: any) => {
        config.headers = {
            'Content-Type': 'application/json',
            accept: 'application/json',
            ...config.headers,
        };
        config.timeout = config.timeout || TIMEOUT;
        if (!config.url?.startsWith('http')) {
            config.url = `${this.API_URL.replace(/\/$/, '')}${config.url ?? ''}`;
        }
        return config;
    };

    handleSuccess(response: AxiosResponse) {
        return response;
    }

    handleError = async (err: any) => {
        let error = err;
        if (isNetworkError(error)) {
            error = {networkError: true, message: 'Network error', reference: '000'};
        }
        const dataError = getResponseError(error);
        dataError.status = dataError.status || error.response?.status;

        this.notifyError(dataError);
        return await Promise.reject(dataError);
    };

    request(config: any): Promise<AxiosResponse> {
        return this.service.request(config);
    }

    get(url: string, config?: any): Promise<AxiosResponse> {
        return this.service.get(url, config);
    }
}

export default new ApiClientService(); // making it singleton
