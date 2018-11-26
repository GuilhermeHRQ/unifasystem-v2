import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { ApiServiceRequest, ApiServiceRequestOptions } from './api-request';
import { ApiReponse } from './api-response';
import { UserService } from '../utils/user/user.service';

let API: {};
let OPTIONS: any;
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

@Injectable()
export class ApiService {
    constructor(public _http: HttpClient) {
    }

    /**
     * Atribui o valor dos métodos e dos headers no serviço
     * @param methods {object} - Métodos retornados da API
     * @param options {object} - Opções do menu
     * @return {void}
    **/
    set(methods, options) {
        API = methods;
        OPTIONS = options;
    }

    /**
     * Configura uma requisão através dos métodos retornados da API
     * @param api {string} - API que será chamada
     * @param funcionalidade {string} - Funcionalidade que será chamada
     * @param metodo {string} - Método que será chamado
     * @param options {object} - Opções adicionais para requisição
     * @return Function
     **/
    prep(api: string, funcionalidade?: string, metodo?: string, options: ApiServiceRequestOptions = {}) {
        if (api && !funcionalidade) {
            return API[api];
        }
        if (api && funcionalidade && !metodo) {
            return API[api][funcionalidade];
        }

        const method: any = API[api][funcionalidade][metodo];

        if (method) {
            // Retornando todas as APIs que tem url
            const option: any = OPTIONS.filter(item => {
                return item.url ? item.url.replace('/', '') : item.url === location.pathname.replace('/', '');
            });

            let idOption = '';
            // Encontrando a opção da página atual
            option.map(item => {
                if (location.pathname.substring(1).indexOf(item.url.substring(1)) !== -1) {
                    idOption = item.id;
                }
            });

            options.headers = {
                ...DEFAULT_HEADERS, ...options.headers, ...{
                    'Option': idOption,
                    'Authentication': UserService.getToken()
                }
            };

            return {
                call: this.request(method.method, method.url, options)
            };
        }

        throw { message: 'Método não encontrado' };
    }

    /**
     * Configura um requisição HTTP
     * @param method {string} - Tipo da requisição
     * @param url {string} - Url da API que será chamada
     * @param options {object} - Opções adicionais para requisição
     * Os parâmetros tipos reais dos parâmetros podem ser encontrados no arquivo irmão(api-request.ts)
     * @return function
     **/
    http(method: ApiServiceRequest['method'], url: ApiServiceRequest['url'], options: ApiServiceRequestOptions = {}) {
        return {
            call: this.request(method, url, options)
        };
    }

    /**
     * Efetua a requisição em uma API
     * @param method {string} - Tipo da requisição
     * @param url {string} - Url da API que será chamada
     * @param options {object} - Opções adicionais para requisição
     * @return function
     **/
    request(method: ApiServiceRequest['method'], url: ApiServiceRequest['url'], options: ApiServiceRequestOptions = {}) {
        return (data?: {}) => {
            if (data) {
                const paramsFormatted = this.formatParams(url, data);
                url = paramsFormatted.url;
                const methodFormatted: string = method.toUpperCase();

                if (methodFormatted === 'GET' || methodFormatted === 'DELETE') {
                    Object.keys(paramsFormatted.leftover).forEach(item => {
                        if(!paramsFormatted.leftover[item]) {
                            delete paramsFormatted.leftover[item];
                        }
                    });
                    options.params = paramsFormatted.leftover;
                } else {
                    options.body = paramsFormatted.leftover;
                }
            }

            // url = url.replace('18.188.151.183:1001', '192.168.10.197:4200');

            const params = new HttpParams({
                fromObject: options.params
            });

            const headers = { ...DEFAULT_HEADERS, ...options.headers };

            const httpOptions: any = {};

            Object.assign(httpOptions, options);
            httpOptions.headers = this.generateHeaders(headers);
            httpOptions.params = params;

            const request = new HttpRequest(method, url, httpOptions.body, httpOptions);

            return {
                subscribe: (next?, error?, complete?) => {
                    return this._http
                        .request(request)
                        .pipe(
                            map(res => ApiReponse.extractData(res, next, options.cleanResult)),
                            catchError(res => ApiReponse.handleError(res, error, options.cleanError)),
                            finalize(complete)
                        )
                        .subscribe();
                }
            };
        };

    }

    /**
     * Constroi os Headers de uma requisição
     * @param headers {object} - Headers a serem incluidos na requisição
     * @return {HttpHeaders}
     **/
    generateHeaders(headers) {
        let newHeaders = new HttpHeaders();
        Object.keys(headers).map(key => {
            newHeaders = newHeaders.set(key, headers[key]);
        });

        return newHeaders;
    }

    /**
     * Insere os parâmetros na url e retornando a url final e o restante dos valores
     * @param url {string} - Url a ser formatada
     * @param params - Parâmetros, Query Strings e Body da requisição
     * @return {object}
     **/
    formatParams(url, params) {
        const data = Object.assign({}, params);

        url = url.split('/');
        Object.keys(data).forEach(key => {
            const indexOf = url.indexOf(`:${key}`);
            if (indexOf !== -1) {
                url[indexOf] = data[key];
                delete data[key];
            }
        });

        return {
            url: url.join('/'),
            leftover: data
        };
    }
}

