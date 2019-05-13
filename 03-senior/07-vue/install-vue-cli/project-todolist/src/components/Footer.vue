<template>
	<div class="Footer">
		<input type="checkbox">
		<span>1/5</span>
		<button>删除所有完成的任务</button>
	</div>
</template>
<script>
	export default {
		name:'Footer'
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