// var app = new Vue({
//     el: '#app',
//     data:{
//         message:'hi hello hru'
//         // console.log(message)
//     }
// });
// app.message = 'am naveen';
// var app1 = new Vue({
//     el:'#app1',
//     data:{
//         message:'shoe me'
//     }
// });
// var app2 = new Vue({
//     el: '#app2',
//     data:{
//         seen:true
//     }
// });
// //app2.seen = false;

// var app3 = new Vue({
//     el : '#app3',
//     data:{
//         todos:[
//             {text: 'one'},
//             {text: 'two'},
//             {text:'three'}
//         ]
//     }
// });
// app3.todos.push({text: 'four'});

// var app4 = new Vue({
//     el: '#app4',
//     data: {
//         message:'change the text'
//     },
//     methods:{
//         btnClickFn: function(){
//             this.message = this.message.split('').join('*vdsh*');
//         }
//     }
// });
// var app5 = new Vue({
//     el: '#app5',
//     data:{
//         message:'hi hello'
//     }
// });

// Vue.component('todo-item', {
//     template: '<li>This is a todo</li>'
// });
// var app7 = new Vue({
//     el:'#app7'
// });

// Vue.component('todo-list',{
//     props:['todo'],
//     template:'<li>{{todo.text}}</li>'
// });
// var app6 = new Vue({
//     el:'#app6',
//     data:{
//         items:[
//             {id:0, text:"one"},
//             {id:1, text:'two'},
//             {id:2, text:'three'},
//         ]
//     }
// });

// var app8 = new Vue({
//     el:'#app8',
//     data:{
//         count: 0
//     },
//     methods:{
//         reduceCount: function(){
//             this.count --;
//         },
//         increaseCount: function(){
//             this.count ++;
//         }
//     },
//     computed:{
//         isEvenNumber(){
//             return this.count % 2 === 0;
//         }
//     }
// });



new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: null,
        from:'EUR',
        to: 'USD',
        result:0,
        loading: false
    },
    mounted(){
       this.getCurrencies(); 
    },
    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return (Number(this.amount) * this.result).toFixed(3);
        },
        disabled(){
            return this.amount == 0 || !this.amount || this.loading;
        }
    },
    
    methods:{
        getCurrencies(){
            const currencies = localStorage.getItem('currencies');
            if(currencies){
                this.currencies=JSON.parse(currencies);
                return;
            }
               
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=sample-api-key').then(response => {
                console.log(response.data.results);
                this.currencies = response.data.results; 
                localStorage.setItem('currencies', JSON.stringify(response.data.results)); 
            })
        },
        convertCurrencies(){
            const key = `${this.from}_${this.to}`;
            this.loading = true;
            axios.get('https://free.currconv.com/api/v7/convert?q='+key+'&compact=ultra&apiKey=aef21d94c9301bb125b6').then(response=> {
                console.log(response);
                this.result = response.data[key];
                this.loading = false;
            })
        }
    },

    watch: {
       from(){
           this.result = 0;
       },
       to(){
            this.result = 0;
        } 
    }
})

