const app = Vue.createApp({
  data() {
    return {
      counter: 110,
      name: "Mukul",
      confirmName: ""
    };
  },
  methods: {
    setName(event, secondArgument){
      this.name=event.target.value + " " + secondArgument;
    },
    confirmInput(){
      this.confirmName=this.name;
    },
    add(num){
      this.counter+=num;
    },
    reduce(num){
      this.counter-=num;
    },
    submitForm(){
      alert('Submitted!!');
    }
  }
});

app.mount('#events');
