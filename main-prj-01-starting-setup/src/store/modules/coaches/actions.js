export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };
        const response = await fetch(`https://vue-http-demo-50f89-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        })
        if (!response.ok) {
            //error
        }
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(`https://vue-http-demo-50f89-default-rtdb.firebaseio.com/coaches.json`);
        const coachesData = await response.json();

        if (!response.ok) {
            const error = new error(response.message || 'Failed to fetch');
            throw error;
        }

        const coaches = [];
        for (const key in coachesData) {
            const coach = {
                id: key,
                firstName: coachesData[key].firstName,
                lastName: coachesData[key].lastName,
                description: coachesData[key].description,
                hourlyRate: coachesData[key].hourlyRate,
                areas: coachesData[key].areas
            };
            coaches.push(coach);

            context.commit('setCoaches', coaches);
            context.commit('setFetchTimeStamp');
        }
    }
}