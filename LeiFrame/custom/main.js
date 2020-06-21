require.config({
    baseUrl:'../'
})
define(function (require) {
    var Vue = require('lib/vue.js');
    var router = require('custom/router');
    var lei = {
        router
    }
    window.lei = lei;

    var vm = new Vue({
        el:'#_root',
        data:{},
        mounted() {
            console.log('root: ',this)
        },
    });
});