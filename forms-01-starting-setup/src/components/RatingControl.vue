<template>
    <ul>
        <li :class="{active:modelValue === 'Poor'}"><button type="button" @click="activateButton('Poor')">Poor</button></li>
        <li :class="{active:modelValue === 'Average'}"><button type="button" @click="activateButton('Average')">Average</button></li>
        <li :class="{active:modelValue === 'Great'}"><button type="button" @click="activateButton('Great')">Great</button></li>
    </ul>
</template>

<script>
    export default {
        props:['modelValue'],
        emits:['update:modelValue'],
        methods:{
            activateButton(option){
                this.$emit('update:modelValue', option);
            }
        }
    }
</script>

<style scoped>
.active {
	border-color: blueviolet;
}

.active button {
	color: blueviolet;
}

ul {
	list-style: none;
	margin: 0.5rem 0;
	padding: 0;
	display: flex;
}

li {
	margin: 0 1rem;
	border: 2px solid gray;
	padding: 1rem;
	display: flex;
	align-items: center;
}

button {
	font: inherit;
	border: none;
	background: transparent;
	cursor: pointer;
}
</style>