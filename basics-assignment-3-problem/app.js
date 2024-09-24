const app = Vue.createApp({
    data() {
        return {
            Num: 0,
            Text: "Not there yet",
        };
    },
    watch: {
        Num() {
            const that = this;
            setTimeout(() => {
                that.Num = 0;
            }, 5000);
        }
    },
    computed: {
        result(){
            if (this.Num > 37) {
                return "Too much!"
            }
            else if (this.Num === 37) {
                return this.Num;
            }
            else {
                return "Not there yet"
            }
        }
    },
    methods: {
        addNum(value) {
            this.Num = this.Num + value; 
        }
    }
});

app.mount('#assignment');