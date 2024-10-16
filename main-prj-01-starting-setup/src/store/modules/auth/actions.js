export default {
    async login(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACUNewagg_EMEoj-q0yysuWFZV9cMZOQE', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(response.message || 'Failed to authenticate');
            console.log(error);
            throw error;
        }
        context.commit('setUser', responseData)
    },
    async signup(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACUNewagg_EMEoj-q0yysuWFZV9cMZOQE', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(response.message || 'Failed to authenticate');
            console.log(error);
            throw error;
        }
        context.commit('setUser', responseData)
    },
    logout(context) {
        context.commit('setUser', {
            idToken: null,
            localId: null,
            expiresIn: null
        })
    }
}