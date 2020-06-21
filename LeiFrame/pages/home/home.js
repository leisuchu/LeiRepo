(function(){
    const ready = function(el,data){
        console.log('args: ',arguments);
        
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
                    this.name = 'home Page'
                }
            }
        }
    }
    return {
        ready
    }
})()