<template>
    <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>
            {{ error }}
        </p>
    </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Request received</h2>
            </header>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasRequests && !isLoading">
                <requests-item v-for="req in receivedRequests" :key=req.id :email="req.userEmail"
                    :message="req.message"></requests-item>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
    </div>
</template>

<script>
import RequestsItem from '../../components/requests/requestsItem.vue';
export default {
    components: {
        RequestsItem
    },
    data() {
        return { isLoading: false }
    },
    created(){
        this.loadRequests();
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/fetchRequests');
            }
            catch (error) {
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    }
}
</script>

<style scoped>
section:first-of-type {
    margin-top: 3.2rem;
}

header {
    text-align: center;
}

ul {
    list-style: none;
    max-width: 40rem;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 1.6rem;
}

h2 {
    font-size: 2.4rem;
    font-family: var(--font-display);
    font-weight: normal;
    margin-bottom: 1em;
}

h3 {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
}

.current {
    color: var(--purple-2);
    margin-bottom: 2.4rem;
}

.controls {
    display: flex;
    justify-content: center;
}
</style>