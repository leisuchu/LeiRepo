define(function(require,exports,modules) {
    var routeTable = require('custom/routetable/router.table.js');
    var Vue = require('lib/vue.js');
    var config = require('custom/config.js');
    var vueInstanceMap = {};
    var history = [];
    var to = function(target,data,origin){
        // 记录历史信息
        router(target,data,origin);
    }
    /**
     * 路由原函数
     * @param {*} target 目的路由
     * @param {*} data 路由传递的数据
     * @param {*} origin 被替换的
     */
    var router = function(target,data,originId) {
        if(!routeTable[target])console.error('[路由表错误]'+target+'不存在！');
        const htmlPath = '../pages/' + target + '/' + target + '.html';
        const cssPath = '../pages/' + target + '/' + target + '.css';
        const jsPath = '../pages/' + target + '/' + target + '.js';

        let htmlContent = '';

        // 读取三个文件
        readFileAsText(htmlPath).then(
            (res) => {
                // 读取vue组件模板
                htmlContent = res.textContent;
                return readFileAsText(jsPath);
            }
        ).then(
            (res) => {
                // 技术不够，没找到可以动态加载js模块的方法
                var pageJs = eval(res.textContent);
                var root = {};
                var routeId = '';
                // -------------清除旧数据-------------
                if(originId){
                    routeId = originId;
                }else{
                    routeId = config.defaultRoot
                }
                let rootVue = vueInstanceMap[routeId]//取到vue实例
                if(rootVue){
                    // 记录历史记录
                    root = rootVue.$el;
                    history.push({page:root.id.substring(5),data:rootVue._data});
                    // 清除html内容
                    root.innerHTML = '';                
                    // 销毁vue实例
                    rootVue.$destroy();
                }else{
                    root = document.getElementById(config.defaultRoot);
                }
                // -------------清除旧数据-------------

                var div = document.createElement('div');
                div.setAttribute('style','width:100%;height:100%');
                var css = document.createElement('link');
                css.setAttribute('rel', 'stylesheet');
                css.setAttribute('href', cssPath);

                div.id = 'page_' + target
                div.innerHTML = htmlContent;
                root.appendChild(div);
                root.appendChild(css);

                // 创建vue实例
                var routeVue = new Vue(pageJs.ready('#' + div.id,data));
                // 保存实例
                vueInstanceMap[routeVue.$el.parentElement.id] = routeVue
            }
        );
    };
    // 实现纯js读取文件为字符串
    var readFileAsText = (filepath) => {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("get", filepath, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve({ textContent: xhr.responseText });
                } else if (xhr.status == 404) {
                    reject({ msg: xhr.status });
                }
            }
        });
    }

    return {
        to
    }
    
    
});