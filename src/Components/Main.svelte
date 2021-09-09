<script>
    import Visualizer from '../Components/Visualizer.svelte';
    import Panel from '../Components/Panel.svelte';
</script>

<div class="main">
    <Panel />
    <Visualizer />
</div>

<style>
    .main {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>