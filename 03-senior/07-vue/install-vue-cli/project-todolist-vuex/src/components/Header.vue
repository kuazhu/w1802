<template>
	<div class="Header">
		<input 
			type="text"
			placeholder="请输入任务,按回车提交" 
			v-model="task"
			@keyup.enter="handleAdd" 
		>
	</div>
</template>
<script>
	export default {
		name:'Header',
		props:{
			addTodo:Function
		},
		data(){
			return {
				task:''
			}
		},
		methods:{
			handleAdd(){
				//1.判断数据
				const task = this.task.trim();
				if(!task){
					alert('任务不能为空');
					return;
				}
				//2.生成todo对象
				const todo = {
					task,
					done:false
				}
				//3.插入到数组
				this.addTodo(todo)
				//4.情况输入框
				this.task = '';
			}
		}
	}
</script>
<style scoped>
	.Header input{
		width: 100%;
		height: 30px;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.Header{

		margin-bottom: 10px;
	}
</style>