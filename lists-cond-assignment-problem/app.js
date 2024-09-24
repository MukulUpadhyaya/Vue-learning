const app = Vue.createApp({
    data() {
        return {
            Tasks: [],
            enteredTask: '',
            isVisible: true
        }
    },
    computed: {
        paraClasses() {
            return {
                user1: this.inputClass === 'user1',
                user2: this.inputClass === 'user2',
                hidden: !this.paragraphVisible,
                visible: this.paragraphVisible,
            }
        }
    },
    computed: {
        buttonCaption() {
            return this.isVisible ? "Hide" : "Show";
        }
    },
    methods: {
        addTask() {
            this.Tasks.push(this.enteredTask);
        },
        toggleBtn() {
            this.isVisible = !this.isVisible;
        }
    }
});

app.mount('#assignment');