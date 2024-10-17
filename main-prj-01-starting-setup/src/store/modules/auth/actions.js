let timer;
export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if(expiresIn<0){
            return ;
        }
        timer = setTimeout(()=>{
            context.dispatch('autoLogout');
        },expiresIn);
        if (token && userId) {
            // login user automatically
            context.commit('setUser', {
                token,
                userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null
        });
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACUNewagg_EMEoj-q0yysuWFZV9cMZOQE';
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACUNewagg_EMEoj-q0yysuWFZV9cMZOQE'
        }
        const response = await fetch(url, {
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

        // const expiresIn = +responseData.expiresIn * 1000;
        const expiresIn = 500000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('autoLogout')
        }, expiresIn);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        });
    },
    autoLogout(context){
        context.dispatch('logout');
        context.dispatch('setAutoLogout');
    },
}