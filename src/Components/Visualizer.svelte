<script>
    import { onDestroy, onMount } from 'svelte';
    import { target, currentEventTarget } from '../Store/store';

    let unsubscribe;
    let parent = null;
    let parentHeaderCapture;
    let parentHeaderBubble;
    let child;
    let childHeaderCapture;
    let childHeaderBubble;
    let firstGrantChild;
    let secondGrandChild;
    let secondGrandChildCapture;
    let secondGrandChildBubble;

    const handleSubscribe = (tar) => {
        if(tar.target === 'parent'){
            parent.classList.remove('normal');
            parent.classList.add('targetActive');
            parentHeaderCapture.style='--local-background: var(--color-dark-yellow);'
            parentHeaderBubble.style='--local-background: var(--color-dark-yellow)';

            child.classList.add('disabled');
        }else if(tar.target === 'child'){
            parent.classList.remove('targetActive');
            parent.classList.add('normal');
            parentHeaderCapture.style='--local-background: var(--color-light-green);'
            parentHeaderBubble.style='--local-background: var(--color-light-purple)';

            child.classList.remove('disabled');

            child.classList.remove('normal');
            child.classList.add('targetActive');
            childHeaderCapture.style='--local-background: var(--color-dark-yellow);'
            childHeaderBubble.style='--local-background: var(--color-dark-yellow)';

            firstGrantChild.classList.add('disabled');
            secondGrandChild.classList.add('disabled');
        }else if(tar.target === 'first grandchild'){
            // reset
            child.classList.remove('targetActive');
            parent.classList.remove('targetActive');
            child.classList.add('normal');
            parent.classList.add('normal');
            parentHeaderCapture.style='--local-background: var(--color-light-green);'
            parentHeaderBubble.style='--local-background: var(--color-light-purple)';
            childHeaderCapture.style='--local-background: var(--color-light-green);'
            childHeaderBubble.style='--local-background: var(--color-light-purple)';

            // set
            firstGrantChild.classList.remove('disabled');
            child.classList.remove('disabled');
            firstGrantChild.classList.remove('normal');
            firstGrantChild.classList.add('targetActive');
            secondGrandChild.classList.add('disabled');
        }
        else if(tar.target === 'second grandchild'){
            // reset
            parent.classList.remove('targetActive');
            child.classList.remove('targetActive');
            child.classList.remove('disabled');
            child.classList.add('normal');
            parent.classList.add('normal');
            parentHeaderCapture.style='--local-background: var(--color-light-green);'
            parentHeaderBubble.style='--local-background: var(--color-light-purple)';
            childHeaderCapture.style='--local-background: var(--color-light-green);'
            childHeaderBubble.style='--local-background: var(--color-light-purple)';

            firstGrantChild.classList.remove('targetActive');
            firstGrantChild.classList.add('disabled');

            // set
            secondGrandChild.classList.remove('disabled');
            secondGrandChild.classList.remove('normal');
            secondGrandChild.classList.add('targetActive');
            secondGrandChildCapture.style='--local-background: var(--color-dark-yellow);'
            secondGrandChildBubble.style='--local-background: var(--color-dark-yellow)';

        }
    }

    const checkPhase = (phase) => $target.events.some((r) => r.phase === phase);

    const handleBtnClick = (e) => {
      const { phase, eventPhase } = e.target.dataset;
          if(phase){
              if(checkPhase(phase)) return;

              target.update((before) => ({
                ...before,
                events:  [...before.events, { phase, properties: { stopPropagation: false}}]
              }))

              currentEventTarget.update(() => ({
                target: phase
              }))

              console.log($target, $currentEventTarget)
        }

        if(eventPhase) {
            currentEventTarget.update(() => ({
              target: eventPhase
            }))
        }
    }

    onMount(() => {
        unsubscribe = target.subscribe(handleSubscribe);

        document.addEventListener('click', handleBtnClick);
    })

    onDestroy(() => {
        unsubscribe();
        document.removeEventListener('click', handleBtnClick);
    })
</script>

<div bind:this={parent} class="main">
  <div class="parent">
    <div class="css-94o9ye-Header">
      <div class="css-197k7no-HeaderPart">
        <div
            bind:this="{parentHeaderCapture}"
          class="css-iqte93-HeaderPhase"
        >
          <div
            style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
            class="css-1p3t9rg-Inline"
          >
            {#if $target.target === 'parent'}
                <span>Target</span>
            {:else}
                <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.92357 11.6194C6.4135 12.1269 5.5865 12.1269 5.07643 11.6194L0.382553 6.95C-0.127519 6.44258 -0.127519 5.61989 0.382553 5.11248C0.892626 4.60506 1.71962 4.60506 2.22969 5.11247L4.69388 7.56383L4.69388 1.29932C4.69388 0.581728 5.27865 5.03606e-07 6 4.40544e-07C6.72135 3.77481e-07 7.30612 0.581728 7.30612 1.29932L7.30612 7.56383L9.77031 5.11247C10.2804 4.60506 11.1074 4.60506 11.6174 5.11247C12.1275 5.61989 12.1275 6.44258 11.6174 6.94999L6.92357 11.6194Z"
                fill="var(--color-light-white)"
                /></svg>
                <span>Capture</span>
            {/if}
          </div>
        </div>
        <div class="css-xjyfv7-HeaderTrack" />
        <div
          style="--local-rtl:0;--local-ltr:1;--local-justify:flex-start"
          class="css-17264d9-HeaderListeners"
        >
          <div class="css-175hpmu-HeaderListeners">
            <div class="css-146lpiu-HeaderListeners" >
                {#if $target.events.some((r) => r.phase === 'parent-capture')}
                  <button aria-label="Select listener" data-event-phase="parent-capture" type="button" class="listeneresBtn"
                   style={$currentEventTarget.target === 'parent-capture' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                   <span class="css-5tpiub">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                    </span>
                  </button>
                {/if}
            </div>
            <button
              data-phase="parent-capture"
              aria-label="Add a event listener to the parent node on the Capture phase"
              style="--local-color:var(--color-light-green);"
              type="button"

              class="css-g9m8v5-IconButton"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                  fill="var(--color-light-navy)"
                /></svg
              ></button
            >
          </div>
        </div>
      </div>
      <div class="css-197k7no-HeaderPart">
        <div
          style="--local-rtl:1;--local-ltr:0;--local-justify:flex-end"
          class="css-17264d9-HeaderListeners"
        >
          <div class="css-175hpmu-HeaderListeners">
            <button
              data-phase="parent-bubble"
              aria-label="Add a event listener to the parent node on the Bubble phase"
              style="--local-color:var(--color-light-purple);"
              type="button"

              class="css-g9m8v5-IconButton"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                  fill="var(--color-light-navy)"
                /></svg
              ></button
            >
            <div class="css-146lpiu-HeaderListeners" >
              {#if $target.events.some((r) => r.phase === 'parent-bubble')}
                  <button aria-label="Select listener" data-event-phase="parent-bubble" type="button" class="listeneresBtn"
                   style={$currentEventTarget.target === 'parent-bubble' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                   <span class="css-5tpiub">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                    </span>
                  </button>
                {/if}
            </div>
          </div>
        </div>
        <div class="css-xjyfv7-HeaderTrack" />
        <div
            bind:this="{parentHeaderBubble}"
          class="css-iqte93-HeaderPhase"
        >
          <div
            style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
            class="css-1p3t9rg-Inline"
          >
            {#if $target.target === 'parent'}
                <span>Target</span>
            {:else}
                <span>Bubble</span>
                <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.0964 0.393273C5.60408 -0.114408 6.42719 -0.114408 6.93488 0.393273L11.6068 5.06515C12.1144 5.57283 12.1144 6.39594 11.6068 6.90363C11.0991 7.41131 10.276 7.41131 9.76827 6.90363L7.31564 4.45099V10.7188C7.31564 11.4367 6.73361 12.0188 6.01564 12.0188C5.29767 12.0188 4.71564 11.4367 4.71564 10.7188V4.45099L2.263 6.90363C1.75532 7.41131 0.932205 7.41131 0.424523 6.90363C-0.0831582 6.39594 -0.0831582 5.57283 0.424523 5.06515L5.0964 0.393273Z"
                fill="var(--color-light-white)"
                /></svg>
            {/if}
          </div>
        </div>
      </div>
      <div class="css-1e54vgb-BelowHeaderMarker" />
      <div class="css-1c0dhqq-BelowHeaderMarker" />
    </div>

    <div class="nextNode">
      <h3>PARENT</h3>

      <div
        data-do-not-unselect-on-click="true"
        bind:this="{child}"
        class="css-1glxn61-Node"
      >
        <div class="child parent">
          <div class="css-94o9ye-Header">
            <div class="css-197k7no-HeaderPart">
              <div
                bind:this="{childHeaderCapture}"
                class="css-iqte93-HeaderPhase"
              >
                <div
                  style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                  class="css-1p3t9rg-Inline"
                >
                    {#if $target.target === 'child'}
                        <span>Target</span>
                    {:else}
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.92357 11.6194C6.4135 12.1269 5.5865 12.1269 5.07643 11.6194L0.382553 6.95C-0.127519 6.44258 -0.127519 5.61989 0.382553 5.11248C0.892626 4.60506 1.71962 4.60506 2.22969 5.11247L4.69388 7.56383L4.69388 1.29932C4.69388 0.581728 5.27865 5.03606e-07 6 4.40544e-07C6.72135 3.77481e-07 7.30612 0.581728 7.30612 1.29932L7.30612 7.56383L9.77031 5.11247C10.2804 4.60506 11.1074 4.60506 11.6174 5.11247C12.1275 5.61989 12.1275 6.44258 11.6174 6.94999L6.92357 11.6194Z"
                            fill="var(--color-light-white)"
                            />
                        </svg>
                        <span>Capture</span>
                    {/if}
                </div>
              </div>
              <div class="css-xjyfv7-HeaderTrack" />
              <div
                style="--local-rtl:0;--local-ltr:1;--local-justify:flex-start"
                class="css-17264d9-HeaderListeners"
              >
                <div class="css-175hpmu-HeaderListeners">
                  <div class="css-146lpiu-HeaderListeners" >
                    {#if $target.events.some((r) => r.phase === 'child-capture')}
                        <button aria-label="Select listener" data-event-phase="child-capture" type="button" class="listeneresBtn"
                         style={$currentEventTarget.target === 'child-capture' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                         <span class="css-5tpiub">
                           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                          </span>
                        </button>
                      {/if}
                  </div>
                  <button
                    data-phase="child-capture"
                    aria-label="Add a event listener to the child node on the Capture phase"
                    style="--local-color:var(--color-light-green);"
                    type="button"

                    class="css-g9m8v5-IconButton"
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                        fill="var(--color-light-navy)"
                      /></svg
                    ></button
                  >
                </div>
              </div>
            </div>
            <div class="css-197k7no-HeaderPart">
              <div
                style="--local-rtl:1;--local-ltr:0;--local-justify:flex-end"
                class="css-17264d9-HeaderListeners"
              >
                <div class="css-175hpmu-HeaderListeners">
                  <button
                    data-phase="child-bubble"
                    aria-label="Add a event listener to the child node on the Bubble phase"
                    style="--local-color:var(--color-light-purple);"
                    type="button"

                    class="css-g9m8v5-IconButton"
                    ><svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                        fill="var(--color-light-navy)"
                      /></svg
                    ></button
                  >
                  <div class="css-146lpiu-HeaderListeners" >
                    {#if $target.events.some((r) => r.phase === 'child-bubble')}
                        <button aria-label="Select listener" data-event-phase="child-bubble" type="button" class="listeneresBtn"
                         style={$currentEventTarget.target === 'child-bubble' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                         <span class="css-5tpiub">
                           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                          </span>
                        </button>
                      {/if}
                  </div>
                </div>
              </div>
              <div class="css-xjyfv7-HeaderTrack" />
              <div
                bind:this="{childHeaderBubble}"
                class="css-iqte93-HeaderPhase"
              >
                <div
                  style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                  class="css-1p3t9rg-Inline"
                >
                    {#if $target.target === 'child'}
                        <span>Target</span>
                    {:else}
                        <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.0964 0.393273C5.60408 -0.114408 6.42719 -0.114408 6.93488 0.393273L11.6068 5.06515C12.1144 5.57283 12.1144 6.39594 11.6068 6.90363C11.0991 7.41131 10.276 7.41131 9.76827 6.90363L7.31564 4.45099V10.7188C7.31564 11.4367 6.73361 12.0188 6.01564 12.0188C5.29767 12.0188 4.71564 11.4367 4.71564 10.7188V4.45099L2.263 6.90363C1.75532 7.41131 0.932205 7.41131 0.424523 6.90363C-0.0831582 6.39594 -0.0831582 5.57283 0.424523 5.06515L5.0964 0.393273Z"
                        fill="var(--color-light-white)"
                        /></svg>
                        <span>Bubble</span>
                    {/if}
                </div>
              </div>
            </div>
            <div class="css-1e54vgb-BelowHeaderMarker" />
            <div class="css-1c0dhqq-BelowHeaderMarker" />
          </div>

          <div class="nextNode">
            <h3>CHILD</h3>

               <!-- First grandchild -->
               <div bind:this="{firstGrantChild}" class="css-n54jrb-Node parent">
                <div class="css-94o9ye-Header">
                  <div class="css-197k7no-HeaderPart">
                    <div
                      style="--local-background:var(--color-dark-yellow);"
                      class="css-iqte93-HeaderPhase"
                    >
                      <div
                        style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                        class="css-1p3t9rg-Inline"
                      >
                      {#if $target.target === 'first grandchild'}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6 9.75C8.07107 9.75 9.75 8.07107 9.75 6C9.75 3.92893 8.07107 2.25 6 2.25C3.92893 2.25 2.25 3.92893 2.25 6C2.25 8.07107 3.92893 9.75 6 9.75Z"
                          fill="var(--color-light-white)"
                        />
                        <circle
                          cx="6"
                          cy="6"
                          r="2"
                          fill="var(--color-light-white)"
                        />
                        </svg>
                        <span>Target</span>
                      {:else}
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6.92357 11.6194C6.4135 12.1269 5.5865 12.1269 5.07643 11.6194L0.382553 6.95C-0.127519 6.44258 -0.127519 5.61989 0.382553 5.11248C0.892626 4.60506 1.71962 4.60506 2.22969 5.11247L4.69388 7.56383L4.69388 1.29932C4.69388 0.581728 5.27865 5.03606e-07 6 4.40544e-07C6.72135 3.77481e-07 7.30612 0.581728 7.30612 1.29932L7.30612 7.56383L9.77031 5.11247C10.2804 4.60506 11.1074 4.60506 11.6174 5.11247C12.1275 5.61989 12.1275 6.44258 11.6174 6.94999L6.92357 11.6194Z"
                                fill="var(--color-light-white)"
                            /></svg>
                            <span>Capture</span>
                      {/if}
                      </div>
                    </div>
                    <div class="css-xjyfv7-HeaderTrack" />
                    <div
                      style="--local-rtl:0;--local-ltr:1;--local-justify:flex-start"
                      class="css-17264d9-HeaderListeners"
                    >
                      <div class="css-175hpmu-HeaderListeners">
                        <div class="css-146lpiu-HeaderListeners" >
                          {#if $target.events.some((r) => r.phase === 'FC-capture')}
                              <button aria-label="Select listener" data-event-phase="FC-capture" type="button" class="listeneresBtn"
                               style={$currentEventTarget.target === 'FC-capture' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                               <span class="css-5tpiub">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                                </span>
                              </button>
                            {/if}
                        </div>
                        <button
                          data-phase="FC-capture"
                          aria-label="Add a event listener to the first grandchild node on the Capture phase"
                          style="--local-color:var(--color-dark-yellow);"
                          type="button"

                          class="css-g9m8v5-IconButton"
                          ><svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                              fill="var(--color-light-navy)"
                            /></svg
                          ></button
                        >
                      </div>
                    </div>
                  </div>
                  <div class="css-197k7no-HeaderPart">
                    <div
                      style="--local-rtl:1;--local-ltr:0;--local-justify:flex-end"
                      class="css-17264d9-HeaderListeners"
                    >
                      <div class="css-175hpmu-HeaderListeners">
                        <button
                          data-phase="FC-bubble"
                          aria-label="Add a event listener to the first grandchild node on the Bubble phase"
                          style="--local-color:var(--color-dark-yellow);"
                          type="button"

                          class="css-g9m8v5-IconButton"
                          ><svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                              fill="var(--color-light-navy)"
                            /></svg
                          ></button
                        >
                        <div class="css-146lpiu-HeaderListeners" >
                          {#if $target.events.some((r) => r.phase === 'FC-bubble')}
                              <button aria-label="Select listener" data-event-phase="FC-bubble" type="button" class="listeneresBtn"
                               style={$currentEventTarget.target === 'FC-bubble' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                               <span class="css-5tpiub">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                                </span>
                              </button>
                            {/if}
                        </div>
                      </div>
                    </div>
                    <div class="css-xjyfv7-HeaderTrack" />
                    <div
                      style="--local-background:var(--color-dark-yellow);"
                      class="css-iqte93-HeaderPhase"
                    >
                      <div
                        style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                        class="css-1p3t9rg-Inline"
                      >
                      {#if $target.target === 'first grandchild'}
                        <span>Target</span>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM6 9.75C8.07107 9.75 9.75 8.07107 9.75 6C9.75 3.92893 8.07107 2.25 6 2.25C3.92893 2.25 2.25 3.92893 2.25 6C2.25 8.07107 3.92893 9.75 6 9.75Z"
                                fill="var(--color-light-white)"
                            />
                            <circle
                                cx="6"
                                cy="6"
                                r="2"
                                fill="var(--color-light-white)"/>
                        </svg>
                      {:else}
                        <span>Bubble</span>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.0964 0.393273C5.60408 -0.114408 6.42719 -0.114408 6.93488 0.393273L11.6068 5.06515C12.1144 5.57283 12.1144 6.39594 11.6068 6.90363C11.0991 7.41131 10.276 7.41131 9.76827 6.90363L7.31564 4.45099V10.7188C7.31564 11.4367 6.73361 12.0188 6.01564 12.0188C5.29767 12.0188 4.71564 11.4367 4.71564 10.7188V4.45099L2.263 6.90363C1.75532 7.41131 0.932205 7.41131 0.424523 6.90363C-0.0831582 6.39594 -0.0831582 5.57283 0.424523 5.06515L5.0964 0.393273Z"
                                fill="var(--color-light-white)"
                            />
                        </svg>
                      {/if}

                      </div>
                    </div>
                  </div>
                  <div class="css-1e54vgb-BelowHeaderMarker" />
                  <div class="css-1c0dhqq-BelowHeaderMarker" />
                </div>
                <div class="css-ukv87e-Node">
                  <h3 class="margin-top">first grandchild</h3>
                </div>
                <div
                  data-do-not-unselect-on-click="true"
                  style="margin: 0px; border: 0;--node-highlight-color:var(--color-dark-white); --node-border-color:var(--color-light-navy); --local-filter:grayscale(1); --local-margin:calc(var(--grid) * 4); --local-margin-bottom:var(--local-margin); --local-box-shadow:var(--shadow-on-white); --local-color: initial;"
                  class="css-1glxn61-Node"
                >
                </div>
              </div>

                <!-- Second grandchild -->
                <div bind:this="{secondGrandChild}" class="css-n54jrb-Node parent">
                    <div class="css-94o9ye-Header">
                    <div class="css-197k7no-HeaderPart">
                        <div
                        bind:this="{secondGrandChildCapture}"
                        class="css-iqte93-HeaderPhase"
                        >
                        <div
                            style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                            class="css-1p3t9rg-Inline"
                        >
                           {#if $target.target === 'second grandchild'}
                             <span>Target</span>
                            {:else}
                                <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.92357 11.6194C6.4135 12.1269 5.5865 12.1269 5.07643 11.6194L0.382553 6.95C-0.127519 6.44258 -0.127519 5.61989 0.382553 5.11248C0.892626 4.60506 1.71962 4.60506 2.22969 5.11247L4.69388 7.56383L4.69388 1.29932C4.69388 0.581728 5.27865 5.03606e-07 6 4.40544e-07C6.72135 3.77481e-07 7.30612 0.581728 7.30612 1.29932L7.30612 7.56383L9.77031 5.11247C10.2804 4.60506 11.1074 4.60506 11.6174 5.11247C12.1275 5.61989 12.1275 6.44258 11.6174 6.94999L6.92357 11.6194Z"
                                    fill="var(--color-light-white)"
                                /></svg>
                                <span>Capture</span>
                           {/if}
                        </div>
                        </div>
                        <div class="css-xjyfv7-HeaderTrack" />
                        <div
                        style="--local-rtl:0;--local-ltr:1;--local-justify:flex-start"
                        class="css-17264d9-HeaderListeners"
                        >
                        <div class="css-175hpmu-HeaderListeners">
                          <div class="css-146lpiu-HeaderListeners" >
                            {#if $target.events.some((r) => r.phase === 'SGC-capture')}
                                <button aria-label="Select listener" data-event-phase="SGC-capture" type="button" class="listeneresBtn"
                                 style={$currentEventTarget.target === 'SGC-capture' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                                 <span class="css-5tpiub">
                                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                                  </span>
                                </button>
                              {/if}
                          </div>
                            <button
                            data-phase="SGC-capture"
                            aria-label="Add a event listener to the second grandchild node on the Capture phase"
                            style="--local-color:var(--color-light-green);"
                            type="button"

                            class="css-g9m8v5-IconButton"
                            ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                                fill="var(--color-light-navy)"
                                /></svg
                            ></button
                            >
                        </div>
                        </div>
                    </div>
                    <div class="css-197k7no-HeaderPart">
                        <div
                        style="--local-rtl:1;--local-ltr:0;--local-justify:flex-end"
                        class="css-17264d9-HeaderListeners"
                        >
                        <div class="css-175hpmu-HeaderListeners">
                            <button
                            data-phase="SGC-bubble"
                            aria-label="Add a event listener to the second grandchild node on the Bubble phase"
                            style="--local-color:var(--color-light-purple);"
                            type="button"

                            class="css-g9m8v5-IconButton"
                            ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.2529 7.21311C12.0406 7.00078 11.7783 6.89461 11.466 6.89461H9.10539V4.53396C9.10539 4.2217 8.99922 3.95941 8.78689 3.74707C8.57455 3.53474 8.31226 3.42857 8 3.42857C7.68774 3.42857 7.42545 3.53474 7.21311 3.74707C7.00078 3.95941 6.89461 4.2217 6.89461 4.53396V6.89461H4.53396C4.2217 6.89461 3.95941 7.00078 3.74707 7.21311C3.53474 7.42545 3.42857 7.68774 3.42857 8C3.42857 8.31226 3.53474 8.5808 3.74707 8.80562C3.95941 9.01795 4.2217 9.12412 4.53396 9.12412H6.89461V11.466C6.89461 11.7783 7.00078 12.0406 7.21311 12.2529C7.42545 12.4653 7.68774 12.5714 8 12.5714C8.32475 12.5714 8.58704 12.4653 8.78689 12.2529C8.99922 12.0406 9.10539 11.7783 9.10539 11.466V9.12412H11.466C11.7783 9.12412 12.0406 9.01795 12.2529 8.80562C12.4653 8.5808 12.5714 8.31226 12.5714 8C12.5714 7.68774 12.4653 7.42545 12.2529 7.21311Z"
                                fill="var(--color-light-navy)"
                                /></svg
                            ></button>
                            <div class="css-146lpiu-HeaderListeners" >
                              {#if $target.events.some((r) => r.phase === 'SGC-bubble')}
                                  <button aria-label="Select listener" data-event-phase="SGC-bubble" type="button" class="listeneresBtn"
                                   style={$currentEventTarget.target === 'SGC-bubble' ? "--local-listener-box-shadow:0px 0px 0px var(--grid-half) var(--color-light-white), 0px 0px 0px calc(var(--grid-half) + var(--grid-half)) var(--color-light-blue);" : ""}>
                                   <span class="css-5tpiub">
                                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="css-1cgedf"><circle cx="8" cy="8" r="8" fill="var(--color-dark-teal)"></circle></svg>
                                    </span>
                                  </button>
                                {/if}
                            </div>
                        </div>
                        </div>
                        <div class="css-xjyfv7-HeaderTrack" />
                        <div
                        bind:this="{secondGrandChildBubble}"
                        class="css-iqte93-HeaderPhase"
                        >
                        <div
                            style="--local-inline-spacing:var(--grid-half);--local-inline-display:flex;--local-inline-justify:flex-start;--local-inline-grow:0"
                            class="css-1p3t9rg-Inline"
                        >
                            {#if $target.target === 'second grandchild'}
                                 <span>Target</span>
                            {:else}
                                <span>Bubble</span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    ><path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.0964 0.393273C5.60408 -0.114408 6.42719 -0.114408 6.93488 0.393273L11.6068 5.06515C12.1144 5.57283 12.1144 6.39594 11.6068 6.90363C11.0991 7.41131 10.276 7.41131 9.76827 6.90363L7.31564 4.45099V10.7188C7.31564 11.4367 6.73361 12.0188 6.01564 12.0188C5.29767 12.0188 4.71564 11.4367 4.71564 10.7188V4.45099L2.263 6.90363C1.75532 7.41131 0.932205 7.41131 0.424523 6.90363C-0.0831582 6.39594 -0.0831582 5.57283 0.424523 5.06515L5.0964 0.393273Z"
                                        fill="var(--color-light-white)"/>
                                </svg>

                            {/if}
                        </div>
                        </div>
                    </div>
                    <div class="css-1e54vgb-BelowHeaderMarker" />
                    <div class="css-1c0dhqq-BelowHeaderMarker" />
                    </div>
                    <div class="css-ukv87e-Node">
                    <h3 class="margin-top">
                        second grandchild
                    </h3>
                    </div>
                </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    background-color: var(--color-light-white);
    border-width: var(--border-width);
    border-style: solid;
    -webkit-transition: border-color var(--timing-slow);
    transition: border-color var(--timing-slow);
    border-color: var(--node-border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom: var(--local-margin-bottom);
    box-shadow: var(--local-box-shadow);
    width: 716px;
    height: 492px;
  }

  .parent {
    -webkit-filter: var(--local-filter);
    filter: var(--local-filter);
    -webkit-transition: filter var(--timing-fast);
    transition: filter var(--timing-fast);
  }

  .css-94o9ye-Header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(1, var(--node-header-height));
    --header-line-opacity: 0.5;
    -webkit-transition: background-color var(--timing-slow);
    transition: background-color var(--timing-slow);
    background-color: var(--node-highlight-color);
    position: relative;
  }
  .css-197k7no-HeaderPart {
    display: flex;
  }

  .css-iqte93-HeaderPhase {
    background: var(--local-background);
    color: var(--color-light-white);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: var(--node-phase-width);
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .css-1p3t9rg-Inline {
    --local-inline-spacing: var(--grid-half);
    --local-inline-display: flex;
    --local-inline-justify: flex-start;
    --local-inline-grow: 0;
    display: var(--local-inline-display);
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: var(--local-inline-grow);
    -webkit-flex-grow: var(--local-inline-grow);
    -ms-flex-positive: var(--local-inline-grow);
    flex-grow: var(--local-inline-grow);
    -webkit-box-pack: var(--local-inline-justify);
    -ms-flex-pack: var(--local-inline-justify);
    -webkit-justify-content: var(--local-inline-justify);
    justify-content: var(--local-inline-justify);
  }

  .css-xjyfv7-HeaderTrack {
    width: var(--node-track-width);
    opacity: var(--header-line-opacity);
    background-color: white;
    border-bottom: var(--border-width) solid transparent;
  }

  .css-17264d9-HeaderListeners {
    --local-rtl: 0;
    --local-ltr: 1;
    --local-justify: flex-start;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    background-color: inherit;
    --local-slim-width: calc(var(--border-width) / 2);
    border-style: solid;
    border-color: rgba(255, 255, 255, var(--header-line-opacity));
    border-top-width: 0;
    border-bottom-width: var(--border-width);
    border-left-width: calc(var(--local-rtl) * var(--local-slim-width));
    border-right-width: calc(var(--local-ltr) * var(--local-slim-width));
  }

  .css-175hpmu-HeaderListeners {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    background: var(--color-light-white);
    -webkit-align-items: stretch;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    padding-left: calc(var(--local-ltr) * var(--grid-half));
    padding-right: calc(var(--local-rtl) * var(--grid-half));
  }

  .css-146lpiu-HeaderListeners {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    margin-top: 3px;
    flex-grow: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: var(--local-justify);
    -ms-flex-pack: var(--local-justify);
    -webkit-justify-content: var(--local-justify);
    justify-content: var(--local-justify);
  }

  .css-g9m8v5-IconButton {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: calc(var(--grid) * 4);
    opacity: 1;
    -webkit-transition: opacity var(--timing-fast);
    transition: opacity var(--timing-fast);
  }
  .css-g9m8v5-IconButton path {
    fill: var(--local-color);
  }

  .nextNode {
    text-align: center;
    padding: var(--grid-double) calc(var(--grid) * 4) 0;
  }

  .nextNode h3 {
    text-transform: uppercase;
    margin-bottom: var(--grid-double);
    padding: 0 var(--grid-half);
    color: var(--local-color);
  }

  .css-1glxn61-Node {
    background-color: var(--color-light-white);
    border-width: var(--border-width);
    border-style: solid;
    -webkit-transition: border-color var(--timing-slow);
    transition: border-color var(--timing-slow);
    border-color: var(--node-border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom: var(--local-margin-bottom);
    box-shadow: var(--local-box-shadow);
  }

  svg {
    margin-right: 2px;
    margin-left: 2px;
  }

  h3 {
    font-size: 1rem;
    text-transform: uppercase;
  }

  .css-n54jrb-Node {
    background-color: var(--color-light-white);
    border-width: var(--border-width);
    border-style: solid;
    -webkit-transition: border-color var(--timing-slow);
    transition: border-color var(--timing-slow);
    border-color: var(--node-border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom: var(--local-margin-bottom);
    box-shadow: var(--local-box-shadow);
    }
    .margin-top {
        margin-top: 15px;
    }

    button svg, button span svg, button span {
      pointer-events: none;
    }

  .listeneresBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    vertical-align: middle;
    padding: 0 var(--grid-half);
    opacity: 1;
    transition: opacity var(--timing-fast);
  }

  .listeneresBtn svg {
    --listener-shadow: var(--local-listener-box-shadow);
    height: var(--grid-double);
    border-radius: 200px;
    position: relative;
    box-shadow: var(--listener-shadow, 0 0 transparent);
  }
</style>
