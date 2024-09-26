const app = Vue.createApp({
    data() {
        return {
            isDetailsVisible: true,
            friends: [
                {
                    id: 'Mukul',
                    name: 'Mukul Upadhyaya',
                    phone: '09639136578',
                    email: 'mukulfb49@gmail.com',
                },
                {
                    id: 'Nitish',
                    name: 'Nitish Sharma',
                    phone: '09639136578',
                    email: 'nitishsharma9@gmail.com',
                }
            ],
        }

    },
})
app.component('friend-contact', {
    template: `
    <li>
          <h2>{{friend.name}}</h2>
          <button @click="toggleDetails()">{{isDetailsVisible ? 'Hide' : 'Show' }} Details </button>
          <ul v-if="isDetailsVisible">
            <li><strong>Phone:</strong> {{friend.phone}}</li>
            <li><strong>Email:</strong> {{friend.email}}</li>
          </ul>
    </li>
    `,
    data() {
        return {
            isDetailsVisible: false,
            friend: {
                id: 'Mukul',
                name: 'Mukul Upadhyaya',
                phone: '09639136578',
                email: 'mukulfb49@gmail.com',
            },
        }
    },
    methods: {
        toggleDetails() {
            this.isDetailsVisible = !this.isDetailsVisible;
        }
    },
})
app.mount('#app');