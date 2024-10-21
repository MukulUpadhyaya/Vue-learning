<template>
    <div>
        <h2>{{ userName }}</h2>
        <h2>{{ user.age }}</h2>
    </div>
</template>

<script setup>

import { computed, defineProps, inject, 
    onBeforeMount, onMounted,
    onBeforeUpdate, onUpdated,
    onBeforeUnmount, onUnmounted, 

 } from 'vue';

const props = defineProps({
    firstName: String,
    lastName: String
})

const user = inject('user');

const userName = computed(() => {
    return props.firstName + ' ' + props.lastName;
})

onBeforeMount(()=>{
    console.log('onBeforeMount');
})

onMounted(()=>{
    console.log('onMounted');
})

onBeforeUpdate(()=>{
    console.log('onBeforeUpdate');
})

onUpdated(()=>{
    console.log('onUpdated');
})

onBeforeUnmount(()=>{
    console.log('onBeforeUnmount');
})

onUnmounted(()=>{
    console.log('onUnmounted');
})
// computed: {
//     userName(){
//         return this.firstName + ' ' + this.lastName;
//     }
// }

</script>

<style scoped></style>