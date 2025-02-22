import Vue from 'vue';
import axios from "axios";
import i18n from '@/locale'; // Internationalization
import store from '@/store'; // Internationalization
import Router from "@/router";

const serverAddress = process.env.VUE_APP_SERVER_ADDRESS;

Vue.prototype.serverAddress = serverAddress;
let lastRequest;

function preparseAuthorization(req) {
    req.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization');
    req.headers.sessionId = store.getters.sessionId;
}

Vue.prototype.baseUrl = serverAddress + '/api/admin';
axios.defaults.baseURL = Vue.prototype.baseUrl;
axios.interceptors.request.use(async (req) => {
    if (req.loader !== false) {
        Vue.prototype.showLoader()
    }
    lastRequest = req;
    preparseAuthorization(req);
    return req;
});
axios.interceptors.response.use(async (response) => {
    Vue.prototype.hideLoader();
    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.toast != false) {

            Vue.prototype.$toast.success(i18n.t('ui.deleteItemSuccess'));
        }
    }
    return response.data;
}, async error => {
    Vue.prototype.hideLoader();
    if (!error.response) {
        Vue.swal.fire({
            title: i18n.t('ui.error'),
            html: 'دسترسی به شبکه وجود ندارد!',
            icon: 'error',
            allowOutsideClick: false,
            confirmButtonText: 'تلاش مجدد',

        }).then(res => {
            preparseAuthorization(error.config)
            axios.request(error.config)
        });
        return;
    }

    if (lastRequest.method.toString() === 'delete') {
        if (lastRequest.errorToastMessage != false) {
            Vue.prototype.$toast.error(i18n.t('ui.deleteItemFailed'));
        }
    }
    const errorObject = error.response.data;
    const statusCode = error.response.status;
    let message = '';
    switch (statusCode) {
        case 400: {
            message = errorObject.message;
            break;
        }
        case 401: {
            localStorage.removeItem('Authorization');
            if (Router.currentRoute.fullPath !== '/Login') {
                await Router.push('/Login');
            }
            message = errorObject.message;
            if (['TOKEN_EXPIRED'].includes(errorObject.error)) {
                lastRequest.errorModal = false;
            }
            break;
        }
        case 404: {
            lastRequest.errorModal = false;

            break;
        }
        case 500: {
            message = i18n.t('errors.serverError');
            break;
        }
        default: {
            if (Array.isArray(errorObject.message)) {
                errorObject.message.map((f) => {
                    message += f + `<br>`;
                });
            } else {
                message = errorObject.message;
            }
            if (lastRequest.errorModal !== undefined && lastRequest.errorModal !== false) {
                Vue.swal.fire({
                    title: i18n.t('ui.error'), html: message, icon: 'error'
                });
            }
            break;
        }
    }
    if (lastRequest.errorModal != false) {
        Vue.swal.fire({
            title: i18n.t('ui.error'), html: message, icon: 'error'
        });
    }

    return Promise.reject(error);
});
Vue.prototype.http = axios;


Vue.mixin({
    methods: {
        httpGet: (requestUrl, successCallback, errorCallback) => {
            axios.get(requestUrl).then(response => {
                successCallback(response);
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        },
        httpPut: (requestUrl, body, successCallback, errorCallback) => {
            axios.put(requestUrl, body).then(response => {
                successCallback(response);
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        },
        httpPost: (requestUrl, body, successCallback, errorCallback) => {
            axios.post(requestUrl, body).then(response => {
                successCallback(response);
            }).catch(error => {
                if (errorCallback) {
                    errorCallback(error)
                }
            })
        },

        httpDelete: (requestUrl, successCallback, errorCallback) => {
            const item = Vue.prototype.deleteModal.show();
            item.then(res => {
                if (res == false)
                    return;
                Vue.prototype.http.delete(requestUrl).then(response => {
                    successCallback(response);
                }).catch(error => {
                    if (errorCallback) {
                        errorCallback(error)
                    }
                })
            })
        }

    }
})
