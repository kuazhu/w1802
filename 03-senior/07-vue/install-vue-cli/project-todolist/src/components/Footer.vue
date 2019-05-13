<template>
	<div class="Footer">
		<input type="checkbox" v-model="allDone">
		<span>{{totalDone}}/{{total}}</span>
		<button @click="handleDelAllDone">删除所有完成的任务</button>
	</div>
</template>
<script>
	export default {
		props:{
			todos:Array,
			selectAllTodo:Function,
			delAllDoneTodo:Function
		},
		name:'Footer',
		computed:{
			total(){
				return this.todos.length
			},
			totalDone(){
				return this.todos.reduce((total,item)=>{
					if(item.done){
						total++
					}
					return total
				},0)
				
			},
			allDone:{
				get(){
					return (this.total == this.totalDone) && (this.total != 0)
				},
				set(value){
					this.selectAllTodo(value)
				}
			}
		},
		methods:{
			handleDelAllDone(){
				if(window.confirm('您确定要删除所有完成的任务吗?')){
					this.delAllDoneTodo()
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