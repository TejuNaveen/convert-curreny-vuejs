
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

