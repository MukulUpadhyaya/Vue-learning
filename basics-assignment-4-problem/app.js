const app = Vue.createApp({
    data() {
        return {
            inputClass: null,
            paragraphVisible: true,
            inputColor:''
        }
    },
    computed: {
        paraClasses(){
            return {
                user1:this.inputClass==='user1',
                user2:this.inputClass==='user2',
                hidden:!this.paragraphVisible,
                visible:this.paragraphVisible,
            }
        }
    },
    methods: {
        toggleBtn() {
            this.paragraphVisible=!this.paragraphVisible;
        }
    }
});

app.mount('#assignment');