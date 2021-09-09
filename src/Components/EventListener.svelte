<script>
    import {currentEventTarget, target} from '../Store/store'

    const handleInputChange =  (e) => {
        const filtered = $target.events.filter((tar) => !(tar.phase === $currentEventTarget.target));
        const modified = {
            phase: $currentEventTarget.target,
            properties: {
                stopPropagation: e.target.checked
            }
        }
        target.update((t) => ({
            ...t,
            events: [...filtered, modified]
        }))
    }

    const handleDelete = () => {
        target.update((t) => ({
                ...t,
                events: t.events?.filter((fi) => !(fi.phase === $currentEventTarget.target))
            }))
    }
</script>

{#if $currentEventTarget.target && $target.events.length > 0}
    <div class="eventListener">
        <h3>event listener</h3>
        <div class="content">
            <div class="cTarget">Target: <b>{$currentEventTarget.target}</b></div>
            <div class="title">Side effects</div>

            <!-- <div class="align-items">
                <input id="stop-propogation-immediate" type="checkbox"/>
                <label for="stop-propogation-immediate">Stop immediate propagation</label>
            </div> -->
            <div class="align-items">
                <input on:change="{handleInputChange}" id="stop-propogation-check" type="checkbox" checked={$target.events.filter((tar) => (tar.phase === $currentEventTarget.target && tar.properties.stopPropagation === true)).length > 0}/>
                <label for="stop-propogation-check">Stop propagation</label>
            </div>

            <button type="button" on:click="{handleDelete}" style="--local-text-button-color-dark:var(--color-dark-ruby); --local-text-button-color-light:var(--color-light-ruby);">Delete</button>
        </div>
    </div>
{/if}

<style>
    .eventListener {
        --local-border: var(--border-width) solid var(--color-light-navy);
        border: var(--local-border);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-on-yellow);
        overflow: hidden;
        margin-top: 2rem;
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
        background: var(--color-light-blue);
    }
    .content {
        background: var(--color-light-white);
        padding: var(--grid);
        height: 100%;
    }

    .title {
        text-transform: uppercase;
        font-weight: 800;
        font-size: 16px;
        padding-left: 5px;
        letter-spacing: 0.05em;
    }

    button {
        padding: var(--grid-half) var(--grid);
        border: var(--border-width) solid var(--local-text-button-color-dark);
        border-radius: var(--border-radius);
        transition: background-color var(--timing-fast),border-color var(--timing-fast);
        background-color: var(--local-text-button-color-light);
        color: var(--color-light-white);
        user-select: none;
        font-size: inherit;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: default;
        width: 100%;
    }

    .align-items {
        display: flex;
        align-items: center;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    input {
        margin: 0;
    }

    .align-items label {
        margin-left: 10px;
    }

    .cTarget{
        margin: 6px 0 6px 5px
    }
</style>