<template>
	<div class="Footer">
		<input type="checkbox" v-model="allDone">
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelAllDone">删除所有完成的任务</button>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'Footer',
		computed:{
			...mapGetters([
				'total',
				'totalDone',
			]),
			allDone:{
				get(){
					return this.$store.getters.allDone
				},
				set(value){
					//this.selectAllTodo(value)
					this.$store.dispatch('selectAllTodo',value)
				}
			}
		},
		methods:{
			handleDelAllDone(){
				if(window.confirm('您确定要删除所有完成的任务吗?')){
					// this.delAllDoneTodo()
					this.$store.dispatch('delAllDoneTodo')
				}
			}
		}
	}
</script>
<style scoped>
	.Footer{
		width: 100%;
		line-height: 40px;
		margin-top: 20px;
	}
	.Footer input{
		float: left;
		margin-top: 14px;
		margin-right: 10px;
	}
	.Footer button{
		float: right;
		margin-top: 14px;
	}		
</style>