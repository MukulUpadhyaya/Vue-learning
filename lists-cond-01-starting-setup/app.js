const app = Vue.createApp({
  data() {
    return {
      goals: [],
      enteredGoal:'',
    };
  },
  methods: {
    addGoals(){
      this.goals.push(this.enteredGoal)
    },
    removeGoals(idx){
      this.goals.splice(idx, 1);
    }
  }
});

app.mount('#user-goals');
