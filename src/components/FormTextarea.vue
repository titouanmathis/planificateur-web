<template>
	<scroller class="textarea">
		<textarea rows="1" :id="id" @keyup="saveValue" @paste="saveValue" @focusin="onFocusIn" @focusout="onFocusOut" :value="value.join('\n')"></textarea>
	</scroller>
</template>

<script>
	import Scroller from './Scroller'
	import autosize from 'autosize'
	import store from '../store'

	export default {
		name: 'form-textarea',
		components: {
			Scroller
		},
		props: {
			id: {
				type: String
			}
		},
		computed: {
			value() {
				return store.state[this.id]
			}
		},
		watch: {
			value() {
				// Use a setTimeout to
				// be sure that the value
				// has been updated
				setTimeout(() => {
					autosize.update(this.$el.querySelector('textarea'))
				}, 0);
			}
		},
		methods: {
			saveValue(e) {
				console.log('saveValue');
				setTimeout(() => {
					store.commit(`SAVE_${this.id.toUpperCase()}`, e.target.value.split('\n'))
				}, 0)
			},
			onFocusIn() {
				this.$el.classList.add('has-focus')
			},
			onFocusOut() {
				this.$el.classList.remove('has-focus')
			}
		},
		mounted() {
			autosize(this.$el.querySelector('textarea'))
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.textarea {

		&:before {
			content: "";
			z-index: 1;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			box-sizing: border-box;
			pointer-events: none;
		}

		&.has-focus {
			outline: 2px solid -webkit-focus-ring-color;

			&:before {
				border-color: lighten(blue, 20%);
			}
		}
	}

	textarea {
		display: block;
		width: 100%;
		min-height: 2em;
		padding: 0 0.5em;
		line-height: 2;
		resize: none;
		border: 0;
		background: linear-gradient(to bottom, white 0, white calc(2em - 1px), #ccc calc(2em - 1px), #ccc 2em, white 2em);
		background-repeat: repeat-y;
		background-size: 100% 2em;

		&:focus  {
			outline: 0;
		}
	}
</style>
