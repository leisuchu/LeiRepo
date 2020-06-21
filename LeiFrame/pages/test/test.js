(function(){
    const ready = function(el,data){
        return {
            el,
            data:{
                name:'name'
            },
            mounted() {
                this.getTest();
                // console.log('name: ',this.name);
                
            },
            methods: {
                getTest(){
                    this.name = 'test Page'
                }
            }
        }
    }
    return {
        ready
    }
})()