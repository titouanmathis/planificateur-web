<template>
	<div id="app" class="row h-100p">
		<div class="col col--36e h-100p">
			<form @submit.prevent="onSubmit" class="h-100p d-f fxd-c ai-s">
				<div class="row h-100p d-f">
					<div class="col col--18e d-f fxd-c">
						<b>Élèves</b>
						<form-textarea id="students"></form-textarea>
					</div>
					<div class="col col--18e d-f fxd-c">
						<b>Dates</b>
            <form-textarea id="dates"></form-textarea>
						<!-- <form-date id="dates"></form-date> -->
					</div>
				</div>
				<div class="row pdt-2e">
					<div class="col col--9e m-0">
						<button class="w-100p" type="submit"><span>Planifier</span></button>
					</div>
					<div class="col col--9e m-0">
						<button class="w-100p" @click="emptyCache" type="submit"><span>Effacer</span></button>
					</div>
				</div>
			</form>
		</div>
		<div class="results col h-100p">
			<scroller class="h-100p">
				<div class="row flex flex--wrap pdt-2e">
					<p v-for="(result, index) of results" class="results__item col col--18e" v-bind:key="index">
						<b class="results__date">{{ result.date }}</b>
						<ul class="results__students" v-if="result.students">
							<li v-for="student in result.students">{{ student }}</li>
						</ul>
						<i v-if="!result.students">Tout le monde est casé !</i>
					</p>
				</div>
			</scroller>
		</div>
	</div>
</template>

<script>
	import store from './store'
	import moment from 'moment'
	import FormTextarea from './components/FormTextarea'
	import FormDate from './components/FormDate'
	import Scroller from './components/Scroller'

	export default {
		name: 'app',
		computed: {
			students() {
				return store.state.students
			},
			dates() {
				return store.state.dates
			},
			results() {
				return store.state.results
			}
		},
		components: {
			FormTextarea,
			FormDate,
			Scroller
		},
		created() {
			store.commit('getResults')
		},
		methods: {
			onSubmit() {
				store.commit('getResults')
			},
			emptyCache() {
				store.commit('emptyCache')
			}
		}
	}
</script>

<style lang="scss">
	$out-expo: cubic-bezier(0.190, 1.000, 0.220, 1.000);

	/* Reset */
	html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;box-sizing:border-box;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

	* {
		box-sizing: border-box;
	}

	::selection {
		text-shadow: none;
		color: #fff;
		background: #3b99fc;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	body {
		padding: 2em;
		font: 400 1em/2 -apple-system, BlinkMacSystemFont, "Roboto", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
		color: #333;
	}

	input,
	button,
	textarea {
		font: inherit;
	}

	button {
		display: inline-block;
		padding: 0.5em 1.5em;
		color: #fff;
		background: #222;
		border: 0;
		-webkit-appearance: none;
		-webkit-user-select: none;

		&:hover {
			background: #111;
		}

		&:focus {
			outline: 2px solid -webkit-focus-ring-color;
		}

		&:active {
			span {
				transform: translate(0, 1px);
			}
		}

		span {
			display: inline-block;
		}
	}

	p,
	ul,
	figure {
		margin: 2em auto;
	}

	b {
		display: block;
		font-weight: 700;
	}

	i {
		color: #999;
	}

	.row {
		margin-right: -1em;
		margin-left: -1em;

		&:after {
			content: "";
			clear: both;
			display: block;
		}
	}

	.flex {
		display: flex;
	}

	.flex--wrap {
		flex-wrap: wrap;
	}

	.col {
		float: left;
		margin-left: 0;
		margin-right: 0;
		padding: 0 1em;
	}

	.col--36e {
		width: 36em;
	}

	.col--14e {
		width: 14em;
	}

	.col--18e {
		width: 18em;
	}

	.col--9e {
		width: 9em;
	}

	.w-100p {
		width: 100%;
	}

	.h-100p {
		height: 100%;
	}

	.mxh-100p {
		max-height: 100%;
	}

	.m-0 {
		margin: 0;
	}

	.pdt-2e {
		padding-top: 2em;
	}

	.d-f {
		display: flex;
	}

	.ai-s {
		align-items: stretch;
	}

	.fxd-c {
		flex-direction: column;
	}

	.results {
		position: absolute;
		top: 0;
		left: 40em;
		right: -1em;
		float: none;
		margin: 0;
		// padding: 2em;
	}

	.results__item,
	.results__students {
		margin-top: 0;
	}

	.results__item {
		margin-bottom: 4em;
	}

	.results__date {
		text-transform: capitalize;
	}

	.results__students {
		margin-bottom: 0;
	}
</style>
