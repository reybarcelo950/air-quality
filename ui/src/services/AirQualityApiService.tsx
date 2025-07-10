import {AxiosResponse} from "axios";
import ApiClientService from "./ApiClientService";

const path = '/air-quality';

class AirQualityApiService {
    getPath(concat: string | null) {
        return path + (concat || '');
    }

    handleResponse = (promise: Promise<AxiosResponse>): Promise<any> => {
        return promise.then(({data}) => data);
    };

    getSummaryMetrics = (config?: any): Promise<any> => {
        return this.handleResponse(ApiClientService.get(this.getPath(`/summary?from=${config.from}&to=${config.to}&operator=${config.operator}`), config));
    }

    getTimeLineMetrics = (config?: any): Promise<any> => {
        return this.handleResponse(ApiClientService.get(this.getPath(`/timeline/${config?.parameter}?from=${config.from}&to=${config.to}&interval=${config.interval}`), config));
    }

    getMetrics = (config?: any): Promise<any> => {
        return this.handleResponse(ApiClientService.get(this.getPath(`/range?from=${config.from}&to=${config.to}`), config));
    }
}

export default new AirQualityApiService();
