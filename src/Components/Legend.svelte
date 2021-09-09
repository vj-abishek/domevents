<script>
import Accordian from "./Accordian.svelte";

</script>
<div class="legend">
    <h3>LEGEND</h3>
    <div class="content">
        <Accordian/>
    </div>
</div>

<style>
    .legend {
        --local-border: var(--border-width) solid var(--color-light-navy);
        border: var(--local-border);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-on-yellow);
        overflow: hidden;
        height: max-content;
    }

    h3 {
        margin:0;
        border-bottom: var(--local-border);
        color: var(--color-light-white);
        line-height: 1;
        font-size: 18px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: default;
        cursor: default;
        height: calc(var(--grid) * 6);
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--color-light-navy);
    }
    .content {
        background: var(--color-light-white);
        padding: var(--grid);
        height: 100%;
    }
</style>