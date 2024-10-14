<template>
	<section class="row">
		<base-card mode="shadow" color="color">
			<h2>Register as a coach now!</h2>
			<coachForm @save-data="saveData"></coachForm>
		</base-card>
	</section>
</template>
<script>
import coachForm from '../../components/coaches/coachForm.vue';
    export default {
        components:{
            coachForm
        },
        methods: {
            saveData(data){
                this.$store.dispatch('coaches/registerCoach',data);
                this.$router.replace('/coaches');
            }
        }
    }
</script>

<style scoped>

</style>