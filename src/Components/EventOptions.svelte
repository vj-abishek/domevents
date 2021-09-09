<script>
    import {target} from '../Store/store';
    const handleChange = (e) => {
        const svg = document.querySelector('svg');
        svg.style.display = 'none';
        svg.innerHTML = '';
        target.update((rest) => ({
            ...rest,
            target: e.target.value
        }))
    }

    const handleCheckBox = (e) => {
        target.update((rest) => ({
            ...rest,
            bubble: e.target.checked
        }))
    }
</script>

<div class="options">
  <h3 class="heading">EVENT</h3>
  <div class="option_content">
    <div class="flex">
      <label for="event-panel-event-target">
        <h3 class="font-size">TARGET</h3>
      </label>
      <select on:change={handleChange} id="event-panel-event-target">
        <option value="parent">parent</option>
        <option value="child">child</option>
        <option selected value="first grandchild">first grandchild</option>
        <option value="second grandchild">second grandchild</option>
      </select>
      <h3 class="font-size">OPTIONS</h3>
      <div class="checkbox">
        <input
          type="checkbox"
          id="event-panel-event-bubbles"
          checked
          on:change="{handleCheckBox}"
          style="margin: 0;margin-right: 10px"
        />
        <label style="margin-right: 5px;" for="event-panel-event-bubbles">Bubbles</label>
        <span data-tiny-icon="true" style="--local-background:var(--color-light-purple);" class="bubbleContainer">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.0964 0.393273C5.60408 -0.114408 6.42719 -0.114408 6.93488 0.393273L11.6068 5.06515C12.1144 5.57283 12.1144 6.39594 11.6068 6.90363C11.0991 7.41131 10.276 7.41131 9.76827 6.90363L7.31564 4.45099V10.7188C7.31564 11.4367 6.73361 12.0188 6.01564 12.0188C5.29767 12.0188 4.71564 11.4367 4.71564 10.7188V4.45099L2.263 6.90363C1.75532 7.41131 0.932205 7.41131 0.424523 6.90363C-0.0831582 6.39594 -0.0831582 5.57283 0.424523 5.06515L5.0964 0.393273Z" fill="var(--color-light-white)"></path>
            </svg>
        </span>
      </div>
    </div>
  </div>
</div>

<style>
  .options {
    --local-border: var(--border-width) solid var(--color-light-navy);
    border: var(--local-border);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-on-yellow);
    overflow: hidden;
  }

  .heading {
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
    background-color: var(--color-dark-ruby);
  }
  .option_content {
    background: var(--color-light-white);
    padding: var(--grid);
  }

  .flex {
    display: flex;
    flex-direction: column;
  }

  .checkbox {
      display: flex;
      align-items: center;
  }

  .bubbleContainer {
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: var(--local-background);
    border-radius: calc(var(--border-radius) / 4);
    height: var(--grid-double);
    width: var(--grid-double);
  }

  .font-size {
      font-size: 1rem;
  }
  select, option{
      text-transform: uppercase;
  }
</style>
