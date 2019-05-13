<!--1.页面-->
<template>
	<div class="App" id='app'>
		<!--2.3使用组件-->
		<Logo />
		<Message msg="您好" />
	</div>
</template>
<!--2.逻辑-->
<script>
	//2.1 引入组件
	import Logo from './components/Logo.vue'
	import Message from './components/Message.vue'

	export default {
		name:'App',
		//2.2 注册组件
		components:{
			Logo,
			Message
		}
	}
</script>
<!--3.样式-->
<style>

</style>