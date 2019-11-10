import { Toast } from '@ant-design/react-native';

// const baseUrl = "https://blackpanther.timesapi.com:8443/"
const baseUrl = 'https://devbp.timesapi.com:8443/';
export default class requestApi {
	/**
	 * 普通的get请求 
	 * @param {*} url 地址
	 * @param {*} params  参数
     * @param {*} headers 自定义请求头
	 * @param {*} callback  成功后的回调
	 * @param {*} errCallback 失败后的回调 
	 */
    static get(url, params, headers, callback, errCallback) {
        let paramsArray = [];
        if (params) {
            // 拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }


        fetch(url.indexOf('http') === -1 ? baseUrl + url : url, {
            method: 'GET',
            headers: {
                ...headers,
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => {
            if (response.ok) {// 如果相应码为200
                return response.json(); // 字符串转换为json对象
            }
        }).then(json => {
            if (json.data) {
                if (json.code == 200) {
                    callback(json.data);
                } else {
                    Toast.offline(json.message);
                }
            } else {
                callback(json);
            }
        }).catch(error => {
            console.log("netword error", error);
            errCallback && errCallback();
        });
    };

	/**
	 * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
	 * @param {*} url 
	 * @param {*} params 
	 * @param {*} callback 
	 * @param {*} errCallback 
	 */
    static post(url, params, headers, callback, errCallback) {
        fetch(url.indexOf('http') === -1 ? baseUrl + url : url, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // key-value形式
            },
            body: params
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(json => {
            if (json.code == 200) {
                callback(json.data);
            } else {
                Toast.offline(json.message);
            }
        }).catch(error => {
            console.log("netword error", error);
            errCallback && errCallback();
        });
    };

	/**
		* post json形式  header为'Content-Type': 'application/json'
		* @param {*} url 
		* @param {*} params 
		* @param {*} callback 
		* @param {*} errCallback 
		*/
    static postJson(url, params, headers, callback, errCallback) {
        fetch(url.indexOf('http') === -1 ? baseUrl + url : url, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(params)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(json => {
            if (json.data) {
                if (json.code == 200) {
                    callback(json.data);
                } else {
                    Toast.offline(json.message);
                }
            } else {
                callback(json);
            }
        }).catch(error => {
            console.log("netword error", error);
            errCallback && errCallback();
        });
    };
} 