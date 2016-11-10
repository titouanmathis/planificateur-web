<template>
	<div class="scroller d-f">
		<div class="scroller__inner w-100p mxh-100p">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'scroller'
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	@import '../assets/scss/mixins';

	.scroller {
		position: relative;
	}

	.scroller__inner {
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;

		@include scrollbar
	}
</style>
