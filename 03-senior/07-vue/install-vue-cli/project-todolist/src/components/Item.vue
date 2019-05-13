<template>
	<div class="Item">
		<input type="checkbox">
		<span>吃饭</span>
		<button>删除</button>
	</div>
</template>
<script>
	export default {
		name:'Item'
	}
</script>
<style scoped>
	.Item{
		width: 100%;
		line-height: 40px;
		border: 1px dashed #ccc;
	}
	.Item input{
		float: left;
		margin-top: 14px;
		margin-right: 10px;
	}
	.Item button{
		float: right;
		margin-top: 14px;
	}	
</style>