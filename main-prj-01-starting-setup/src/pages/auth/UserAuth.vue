<template>
    <div>
        <base-dialog
			:show="!!error"
			title="An error occurred"
			@close="handleError"
		>
			{{ error }}
		</base-dialog>
		<base-dialog :show="isLoading" title="Authenticating..." fixed>
			<base-spinner></base-spinner>
		</base-dialog>
        <base-card>
        <form @submit.prevent="submitForm">
					<div class="form-control">
						<transition name="title-fade" mode="out-in">
							<h2 v-if="mode === 'login'">Login</h2>
							<h2 v-else>Signup</h2>
						</transition>
					</div>
					<div class="form-control">
						<label for="email">Email</label>
						<input type="email" id="email" v-model.trim="email" />
					</div>
					<div class="form-control">
						<label for="password">Password</label>
						<input
							type="password"
							id="password"
							v-model.trim="password"
						/>
					</div>
					<p v-if="!formIsValid">
						Please enter a valid email and password (must be at
						least 6 characters long
					</p>
					<div class="actions">
                        <transition name="btn-fade" mode="out-in">
							<base-button v-if="mode === 'signup'"
								>Signup</base-button
							>
							<base-button
								type="button"
								mode="flat"
								@click="switchAuthMode"
								v-else
								>Signup instead</base-button
							>
						</transition>
						<transition name="btn-fade" mode="out-in">
							<base-button v-if="mode === 'login'"
								>Login</base-button
							>
							<base-button
								type="button"
								mode="flat"
								@click="switchAuthMode"
								v-else
								>Login instead</base-button
							>
						</transition>
						
					</div>
				</form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'Signup';
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? 'Signup instead' : 'Login instead';
        },
    },
    methods: {
        async submitForm() {
            this.formIsValid = true;
            this.isLoading = true;

            if (!this.validateEmail(this.email) || this.isEmpty(this.message)) {
                this.formIsValid = false;
                return;
            }
            const actionPayload = {
                email: this.email,
                password: this.password,
            };
            try {
                if (this.mode === 'login') {
                    await this.$store.dispatch('login', actionPayload)
                }
                else {
                    await this.$store.dispatch('signup', actionPayload);
                }
                const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message || 'Failed to authenticate, try later.';
                this.isLoading = false;
                throw error;
            }

            this.isLoading = false;
           
        },
        validateEmail(email) {
            const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            return regex.test(email);
        },
        isEmpty(value) {
            return value === '';
        },
        handleError() {
			this.error = null;
		},
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login';
        },
    }
}
</script>

<style scoped>
.row {
    margin-top: 6.4rem;
}

.card {
    margin-top: 5rem;
}

.form-control {
    margin: 1.6rem 0;
}

h2 {
    font-family: var(--font-display);
    font-weight: normal;
    text-align: center;
    font-size: 2.4rem;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.4rem;
}

input,
textarea {
    display: block;
    width: 100%;
    border: 0.2rem solid #ccc;
    font: inherit;
    padding: 0.2em 0.4em;
    border-radius: 0.8rem;
}

input:focus,
textarea:focus {
    background-color: var(--pink-2);
    outline: none;
    border-color: var(--purple-3);
}

input[type='checkbox'] {
    display: inline-block;
    width: auto;
    border: none;
    transform: scale(1.2);
}

h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

button[type='button'] {
    order: -1;
}

.actions {
    margin-top: 2.4rem;
    display: flex;
    gap: 1.6rem;
    justify-content: flex-end;
}

p {
    margin-top: 0.2em;
    margin-bottom: 1.6rem;
    font-size: 1.4rem;
}

.title-fade-enter-from {
    opacity: 0;
    transform: translateX(-40px);
}

.title-fade-leave-to {
    opacity: 0;
    transform: translateX(40px);
}

.title-fade-enter-active {
    transition: all 300ms ease-out 100ms;
}

.title-fade-leave-active {
    transition: all 300ms ease-in;
}

.btn-fade-enter-from {
    opacity: 0;
    transform: translateX(-40px);
}

.btn-fade-leave-to {
    opacity: 0;
}

.btn-fade-enter-active {
    transition: all 300ms ease-out;
}

.btn-fade-leave-active {
    transition: all 300ms ease-in;
}
</style>