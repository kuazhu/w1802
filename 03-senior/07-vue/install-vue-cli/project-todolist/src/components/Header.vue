<template>
	<div class="Header">
		<input 
			type="text"
			placeholder="请输入任务,按回车提交" 
		>
	</div>
</template>
<script>
	export default {
		name:'Header'
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