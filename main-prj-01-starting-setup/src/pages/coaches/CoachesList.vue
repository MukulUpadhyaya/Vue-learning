<template>
    <section>
        FILTER
    </section>
    <section>
        <div class='controls'>
            <button>Refresh</button>
            <router-link to="./register">Register as Coach</router-link>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in filteredCoaches" 
            :key="coach.id" 
            :id="coach.id" 
            :first-name="coach.firstName"
            :last-name="coach.lastName" 
            :rate="coach.hourlyRate" 
            :areas="coach.areas"
            >
        </coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
    </section>
</template>

<script>
import coachItem from '../../components/coaches/coachItem.vue';
export default {
    components: {
        coachItem
    },
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        }

    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
