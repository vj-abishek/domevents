<details>
  <summary>Event</summary>
  <p>
    An event is a message that is dispatched to event target's. There are many
    categories of events including user events such as 'click' and system events
    such as 'DOMContentLoaded'.
  </p>
</details>
<details>
  <summary>Event Target</summary>
  <p>
    An event target is any object that implements the EventTarget interface (eg
    window, Element and XMLHttpRequest) An event target can be the target of
    events and can have event listeners added and removed from them.
  </p>
</details>
<details>
  <summary>Phase</summary>
  <div class="accordion-content" aria-hidden="false">
    When an <strong>event target</strong> participates in a
    <a
      href="https://dom.spec.whatwg.org/#concept-tree"
      rel="noopener noreferrer"
      target="_blank"
    >
      tree
      <span aria-label="tree emoji" role="presentation">🌲</span>
    </a>
    the event flows through the tree in three phases:
    <ol>
      <li>
        <span
          data-tiny-icon="true"
          style="--local-background:var(--color-light-green)"
          class="css-19l50ux-TinyIcon"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.92357 11.6194C6.4135 12.1269 5.5865 12.1269 5.07643 11.6194L0.382553 6.95C-0.127519 6.44258 -0.127519 5.61989 0.382553 5.11248C0.892626 4.60506 1.71962 4.60506 2.22969 5.11247L4.69388 7.56383L4.69388 1.29932C4.69388 0.581728 5.27865 5.03606e-07 6 4.40544e-07C6.72135 3.77481e-07 7.30612 0.581728 7.30612 1.29932L7.30612 7.56383L9.77031 5.11247C10.2804 4.60506 11.1074 4.60506 11.6174 5.11247C12.1275 5.61989 12.1275 6.44258 11.6174 6.94999L6.92357 11.6194Z"
              fill="var(--color-light-white)"
            /></svg
          ></span
        > <strong>Capture</strong> listeners are called on the way <em>down</em>
        from the <em>root</em> to the <strong>target</strong>
      </li>
      <li>
        <span
          data-tiny-icon="true"
          style="--local-background:var(--color-dark-yellow)"
          class="css-19l50ux-TinyIcon"
          ><svg
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
            /><circle
              cx="6"
              cy="6"
              r="2"
              fill="var(--color-light-white)"
            /></svg
          ></span
        > <strong>Target</strong> listeners are attached to the
        <strong>target</strong>
        and they are called as the event passes through the
        <strong>target</strong>
      </li>
      <li>
        <div
          style="--local-stack-spacing:var(--grid);--local-stack-align:stretch"
          class="css-1mti1te-Stack"
        >
          <div>
            <span
              data-tiny-icon="true"
              style="--local-background:var(--color-light-purple)"
              class="css-19l50ux-TinyIcon"
              ><svg
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
            </span>
            <strong>Bubble</strong>
            listeners are called on the way <em>up</em> from the
            <strong>target</strong>
            towards the <em>root</em>.
          </div>
          <div>
            The bubble phase will only occur if <code>event.bubbles</code> is
            <code>true</code>
          </div>
        </div>
      </li>
    </ol>
  </div>
</details>
<details>
    <summary>Event listener</summary>
    <div>
        <p>An event listener is a piece of code that you can register to be executed in response to a particular type of event.</p>
        <code><div>el.addEventListener(</div><div class="css-gb28m7-LegendPanel">'click', listener</div><div>);</div></code>
    </div>
</details>
<details>
    <summary>Listener Options</summary>
    <div class="accordion-content">
        <p>When binding an event listener there are three options that can be applied</p>
        <h5>1. CAPTURE</h5>
        <p>Setting the capture flag controls whether an event listener is called in the  Capture phase or  Bubble phase</p>
        <code><div>el.addEventListener(type, fn,</div><div><div>// capture listener</div><div><strong>&#123; capture: true &#125;</strong></div><br><div>// bubble listener</div><div><strong>&#123; capture: false &#125;</strong></div></div><div>)</div></code>
        <h5>2. ONCE</h5>
        <p>Setting the once flag to true causes the event listener to be automatically removed after a single call</p>
        <code><div>el.addEventListener(type, fn,</div><div >&#123; once: true &#125;</div><div>)</div></code>
    </div>
</details>
<details>
    <summary>Listener effect</summary>
    <div class="accordion-content">
        <p>In addition to its own processing, an event listener can perform up to two side effects:</p>
        <h5>1. PREVENTING BEHAVIOUR</h5>
        <p>Cancels an event and prevents the default browser behaviour associated with an event</p>
        <code>event.preventDefault()</code>
        <h5>2. STOP AN EVENT</h5>
        <p>Will stop the event once it has finished processing all of the event listeners on the current event target in the current event phase</p>
        <code>event.stopPropagation()</code>
    </div>
</details>

<style>
  details {
    color: var(--color-dark-navy);
    background: var(--color-light-grey);

    border-radius: var(--border-width);
    text-align: left;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  details summary {
    padding: 10px;
    cursor: pointer;
  }

  details p, .accordion-content{
    padding: 0 5px 6px 6px;
  }

  li span {
      background-color: var(--local-background);
  }
  ol {
      margin-left: 20px;
      padding:0
  }

  code div {
      padding-left: 10px;
  }
</style>
