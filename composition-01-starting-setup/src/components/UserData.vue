<template>
    <div>
        <h2>{{ userName }}</h2>
        <h2>{{ user.age }}</h2>
    </div>
</template>

<script setup>

import { computed, defineProps, inject } from 'vue';

const props = defineProps({
    firstName: String,
    lastName: String
})

const user = inject('user');

const userName = computed(() => {
    return props.firstName + ' ' + props.lastName;
})
// computed: {
//     userName(){
//         return this.firstName + ' ' + this.lastName;
//     }
// }

</script>

<style scoped></style>