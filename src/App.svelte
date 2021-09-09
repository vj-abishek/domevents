<script>
	import Legend from './Components/Legend.svelte';
	import Main from './Components/Main.svelte';
	import Events from './Components/Events.svelte';
</script>

<main>
	<Legend/>
	<Main/>
	<Events/>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: var(--sidebar-width) 720px var(--sidebar-width);
		-webkit-column-gap: calc(var(--grid) * 4);
		column-gap: calc(var(--grid) * 4);
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content;
		margin: 0 auto;
		padding: var(--grid-double);
		min-height: 100vh;
	}
</style>