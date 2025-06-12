<script lang="ts">
  import NumberFlow, { NumberFlowGroup } from "@number-flow/svelte";
  import { onMount } from "svelte";

  const toState = (date: Date) => {
    return {
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
    };
  };

  const initial = toState(new Date());

  let h = $state(initial.h);
  let m = $state(initial.m);
  let s = $state(initial.s);

  onMount(() => {
    const callback = () => {
      const date = new Date();
      date.setMilliseconds(date.getMilliseconds() + 250);
      const next = toState(date);
      if (next.h !== h) h = next.h;
      if (next.m !== m) m = next.m;
      if (next.s !== s) s = next.s;

      requestAnimationFrame(callback);
    };

    callback();
  });

  const format = { minimumIntegerDigits: 2 };
  const digits = { 1: { max: 5 } };
  const separator = ":";
</script>

<main>
  <div class="lines">
    <div class="line line-h" style:top="var(--offset)"></div>
    <div class="line line-h" style:bottom="var(--offset)"></div>
    <div class="line line-v" style:left="var(--offset)"></div>
    <div class="line line-v" style:right="var(--offset)"></div>
  </div>
  <div>
    <NumberFlowGroup>
      <div class="group">
        <NumberFlow trend={1} value={h} {format} />
        <NumberFlow trend={1} value={m} {digits} {format} prefix={separator} suffix={separator} />
        <NumberFlow trend={1} value={s} {digits} {format} />
      </div>
    </NumberFlowGroup>
  </div>
</main>

<style>
  main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
    font-variant-numeric: tabular-nums;
  }

  .lines {
    position: absolute;
    inset: 0;
    --offset: clamp(1rem, 5dvw, 4rem);
  }

  .line {
    position: absolute;
    background-color: var(--xn-6);
  }

  .line-h {
    left: 0;
    width: 100%;
    height: 1px;
  }

  .line-v {
    top: 0;
    width: 1px;
    height: 100%;
  }

  .group {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(4rem, 20dvw, 20rem);
  }
</style>
