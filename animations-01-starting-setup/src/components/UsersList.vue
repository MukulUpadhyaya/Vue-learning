<template>
    <transition-group tag="ul" name="user-list">
        <li v-for="user in users" :key="user" @click="removeUser(user)">{{ user }}</li>
    </transition-group>
    <div>
        <input type="text" ref="userInput"/>
        <button @click="addUser">Add User</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: ['Max', 'Manu', 'Julie', 'Angela', 'Micheal'],
        };
    },
    methods: {
		removeUser(user) {
			this.users = this.users.filter((usr) => usr !== user);
		},
		addUser() {
			const user = this.$refs.userInput.value;
			this.users.unshift(user);
			this.$refs.userInput.value = '';
		},
	},
}
</script>

<style scoped>
ul {
	list-style: none;
	margin: 1rem 0;
	padding: 0;
	margin-bottom: 2rem;
}

li {
	border: 1px solid #ccc;
	padding: 1rem;
	display: block;
	font-weight: bold;
	text-align: center;
	cursor: crosshair;
	transition: all 100ms;
}

.user-list-enter-from {
	transform: translateX(-100px) scale(0.75);
	opacity: 0;
}

.user-list-enter-active {
	transition: 500ms all ease-in;
}

.user-list-enter-to {
}

.user-list-leave-from {
}

.user-list-leave-active {
	transition: 500ms all ease-out;
	position: absolute; /* moramo dodat kako bi radio move transition nakon deletanja li elementa */
}

.user-list-leave-to {
	transform: translateX(50px);
	opacity: 0;
}

.user-list-move {
	transition: transform 800ms ease;
}

</style>