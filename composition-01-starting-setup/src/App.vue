<template>
  <section class="container">
    <user-data :first-name="firstName" :last-name="lastName" ></user-data>
    <button @click="setNewAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model="firstName"/>
      <input type="text" placeholder="Last Name" ref="lastNameInput"/>
      <button @click="setLastName">Set Last Name</button>
    </div>
  </section>
</template>

<script setup>
import { provide } from 'vue';
import { reactive, ref, computed, watch } from 'vue';
import UserData from './components/UserData.vue';

const firstName = ref('');
const lastName = ref('');
const lastNameInput = ref(null);

const user = reactive({
  name: 'Mukul',
  age: 24
})

provide('user',user);
// setTimeout(function () {
//   user.name = 'Shubham';
//   user.age = 30;
// }, 2000);

const uName = computed(()=>{
  return firstName.value + ' ' + lastName.value;
})

watch([uName, ()=>user.age],function(newValues, oldValues){
  console.log('old name: ' + oldValues[0]);
  console.log('new name: ' + newValues[0]);
  console.log('old age: ' + oldValues[1]);
  console.log('new age: ' + newValues[1]);
  
}, { deep: true })

// function setFirstName(event){
//    firstName.value=event.target.value;
// }

// function setLastName(event){
//   lastName.value=event.target.value;
// }

function setNewAge(){
  user.age = 30;
}

function setLastName(){
  lastName.value=lastNameInput.value.value;
}

</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>