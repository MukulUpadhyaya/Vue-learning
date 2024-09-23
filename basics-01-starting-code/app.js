const app = Vue.createApp({
    data() {
        return {
            courseGoal: "Whohoo!",
            vueLink: 'https://vuejs.org/',
            courseGoalA: "Finish the course and learn Vue!",
            courseGoalB: "Master Vue and build amazing apps!"
        };
    },
    methods: {
        outputGoals(){
            const randomNum = Math.random();
            if(randomNum<0.5){
                return this.courseGoalA;
            }
            else{
                return this.courseGoalB;
            }
        }
    }
});

app.mount('#user-goal')
