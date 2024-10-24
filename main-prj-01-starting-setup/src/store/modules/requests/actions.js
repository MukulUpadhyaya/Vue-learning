export default {
    async contactCoach(context, payload) {
        const newRequest = {
            userEmail: payload.email,
			message: payload.message,
			timestamp: payload.timestamp
        };        
        //const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-50f89-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request');
            throw error;
        }
        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-http-demo-50f89-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
        const responseData = await response.json();
        
        if(!response.ok){
            const error=new Error(response.message || 'Failed to fetch');
            console.log(error);
            throw error;
        }
        

        const requests = [];
			for (const key in responseData) {
				const request = {
					id: key,
					coachId:coachId,
                    userEmail:responseData[key].userEmail,
                    message:responseData[key].message,
				};
				requests.push(request);

				context.commit('setRequests', requests);
                
			}
    }
}