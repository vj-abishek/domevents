<script>
    import init from '../helpers/SvgAnimation';
    import {target} from '../Store/store';

    const handleClick = () => {
        const svg = document.querySelector('svg');
        svg.style.display = 'none';
        init($target)
    }

    const handleRest = () => {
        target.set({
            target: 'first grandchild',
            bubble: true,
            events: [],
        })
        const event = new Event('resetSvg');
        window.dispatchEvent(event);
    }

</script>
<div class="Panel">
    <button on:click="{handleClick}" style="--local-icon-color:var(--color-light-green);" class="PrimaryButton">
        <div style="--local-inline-spacing:var(--grid-half);--local-inline-display:inline-flex;--local-inline-justify:center;--local-inline-grow:1" class="css-1p3t9rg-Inline">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.48 4.48 0 10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10ZM8.8 6.1C8.47 5.85 8 6.09 8 6.5V13.5C8 13.91 8.47 14.15 8.8 13.9L13.47 10.4C13.74 10.2 13.74 9.8 13.47 9.6L8.8 6.1Z" fill="var(--color-light-navy)"></path>
            </svg>
            <span>Dispatch</span>
        </div>
    </button>
    <button on:click="{handleRest}" style="--local-icon-color:var(--color-light-green);" class="PrimaryButton">
        <div style="--local-inline-spacing:var(--grid-half);--local-inline-display:inline-flex;--local-inline-justify:center;--local-inline-grow:1" class="css-1p3t9rg-Inline">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            <span>Reset</span>
        </div>
    </button>
</div>

<style>
    .Panel {
        --local-border: var(--border-width) solid var(--color-light-navy);
        border: var(--local-border);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-on-yellow);
        overflow: hidden;
        background: var(--color-light-white);
        display: flex;
        width: 412px;
        margin: 0 auto;
        padding-left: 10px;
        padding-right: 10px;
        height: 52px;
        column-gap: var(--grid);
        grid-template-columns: 1fr repeat(4, min-content) 1fr;
        align-items: center;
        justify-content: space-between;
    }
    .PrimaryButton {
        border-radius: var(--border-radius);
        background: var(--color-light-grey);
        display: flex;
        align-items: center;
        padding: var(--grid-half);
        width: calc(14 * var(--grid));
        transition: background var(--timing-fast);
    }

    .css-1p3t9rg-Inline {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        padding-left: 5px;
    }
    .css-1p3t9rg-Inline span {
        padding-left: 10px;
    }
</style>