<script>
    import EventOptions from  '../Components/EventOptions.svelte';
    import EventListener from './EventListener.svelte';
</script>
<div class="events">
    <EventOptions/>
    <EventListener/>
</div>

<style>
    .events {
        --local-stack-spacing: var(--grid-double);
        --local-stack-align: stretch;
        display: fl ex;
        flex-direction: column;
        align-items: var(--local-stack-align);
}
</style>