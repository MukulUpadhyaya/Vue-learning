<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences">Load Submitted Experiences</base-button>
      </div>
      <h4 v-if="isLoading">Loading...</h4>
			<h4 v-else-if="!isLoading && error">{{ error }}</h4>
			<h4 v-else-if="!isLoading && results?.length === 0">
				No stored experiences found. Start adding some survey results
				first.
			</h4>
      <ul v-else>
        <survey-result v-for="result in results" :key="result.id" :name="result.name"
          :rating="result.rating"></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error:null,
    }
  },
  mounted() {
    this.loadExperiences();
  },
  methods: {
    loadExperiences() {
      this.isLoading = true;
      this.error=null;
      fetch('https://vue-http-demo-50f89-default-rtdb.firebaseio.com/surveys.json').then(
        (response) => {
          this.isLoading = false;
          if (response.ok) {
            return response.json()
          }
        }
      ).then(
        (data) => {
          const results = [];
          for (const id in data) {
            const { name, rating } = data[id];
            results.unshift({
              id,
              name,
              rating,
            });
          }

          this.results = results;
        }).catch((error)=>{
          console.log(error);
          this.isLoading = false;
          this.error='Failed to fetch data - please try again later';
        })
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>