<script setup lang="ts">
import type { ServiceUiVariant } from "~/utils/serviceUiVariant";

const props = withDefaults(
  defineProps<{
    variant: ServiceUiVariant;
    active?: boolean;
  }>(),
  { active: false },
);
</script>

<template>
  <div
    class="ui-stage"
    :class="{ on: active }"
    :data-variant="variant"
    aria-hidden="true"
  >
    <!-- Web design: site chrome + section swap -->
    <div v-if="variant === 'web' || variant === 'design'" class="frame browser">
      <div class="chrome">
        <span /><span /><span />
        <div class="url" />
      </div>
      <div class="nav">
        <i class="nav-item on" /><i class="nav-item" /><i class="nav-item" />
      </div>
      <div class="hero-block">
        <div class="line w60" />
        <div class="line w40" />
        <div class="btn-ghost" />
      </div>
      <div class="cards">
        <div class="card c1" /><div class="card c2" /><div class="card c3" />
      </div>
    </div>

    <!-- Branding: identity tiles -->
    <div v-else-if="variant === 'brand'" class="frame brand">
      <div class="mark" />
      <div class="type-stack">
        <div class="line w70" /><div class="line w45" /><div class="line w55" />
      </div>
      <div class="swatches">
        <i /><i /><i /><i />
      </div>
      <div class="apps">
        <div class="app-tile t1" /><div class="app-tile t2" />
      </div>
    </div>

    <!-- Development: assembling blocks -->
    <div v-else-if="variant === 'dev'" class="frame code">
      <div class="sidebar">
        <i /><i /><i class="on" /><i />
      </div>
      <div class="editor">
        <div class="row r1" /><div class="row r2" /><div class="row r3" />
        <div class="row r4" /><div class="comp" />
      </div>
      <div class="preview">
        <div class="p-bar" /><div class="p-body" />
      </div>
    </div>

    <!-- Apps: layered phones — back larger & fully readable -->
    <div v-else-if="variant === 'apps'" class="frame phones">
      <div class="phone back">
        <div class="p-header" />
        <div class="p-list" />
        <div class="p-row" /><div class="p-row short" />
      </div>
      <div class="phone front">
        <div class="p-header" />
        <div class="p-cta" />
        <div class="p-cards"><i /><i /></div>
      </div>
    </div>

    <!-- Ecommerce: product + cart state -->
    <div v-else-if="variant === 'commerce'" class="frame shop">
      <div class="product">
        <div class="thumb" /><div class="line w50" /><div class="line w30" />
        <div class="price" /><div class="add" />
      </div>
      <div class="cart">
        <div class="cart-title" />
        <div class="cart-row" /><div class="cart-row dim" />
        <div class="checkout" />
      </div>
    </div>

    <!-- SEO: calm metrics -->
    <div v-else-if="variant === 'seo'" class="frame dash">
      <div class="metric m1"><div class="bar" /><div class="val" /></div>
      <div class="metric m2"><div class="bar" /><div class="val" /></div>
      <div class="metric m3"><div class="bar" /><div class="val" /></div>
      <div class="chart">
        <span /><span /><span /><span /><span /><span />
      </div>
    </div>

    <!-- Marketing: campaign panel -->
    <div v-else-if="variant === 'marketing'" class="frame campaign">
      <div class="channel on" /><div class="channel" /><div class="channel" />
      <div class="spark">
        <i /><i /><i /><i /><i />
      </div>
      <div class="kpi"><div class="line w40" /><div class="num" /></div>
    </div>

    <!-- AI: calm chat / assist -->
    <div v-else-if="variant === 'ai'" class="frame ai">
      <div class="bubble a" /><div class="bubble b" /><div class="bubble c" />
      <div class="input">
        <div class="field" /><div class="send" />
      </div>
    </div>

    <!-- Automation: node flow -->
    <div v-else-if="variant === 'auto'" class="frame flow">
      <svg class="wires" viewBox="0 0 200 140" preserveAspectRatio="none">
        <path class="wire w1" d="M40 40 H100 V70 H160" />
        <path class="wire w2" d="M40 100 H100 V70" />
      </svg>
      <div class="node n1" /><div class="node n2" /><div class="node n3" />
    </div>

    <!-- Migration: layered systems -->
    <div v-else-if="variant === 'migrate'" class="frame layers">
      <div class="layer L1" /><div class="layer L2" /><div class="layer L3" />
      <div class="arrow" />
    </div>

    <!-- MVP: wire → UI -->
    <div v-else-if="variant === 'mvp'" class="frame mvp">
      <div class="wireframe">
        <div class="box" /><div class="box short" /><div class="box" />
      </div>
      <div class="ui-build">
        <div class="line w55" /><div class="btn-ghost" /><div class="card" />
      </div>
    </div>

    <!-- Default -->
    <div v-else class="frame browser">
      <div class="chrome"><span /><span /><span /><div class="url" /></div>
      <div class="hero-block">
        <div class="line w60" /><div class="line w40" /><div class="btn-ghost" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-stage {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: clamp(0.85rem, 3vw, 1.75rem);
  pointer-events: none;
  border-radius: 0;
  overflow: hidden;
  container-type: size;
  --calm: 12s;
  --calm-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --panel: color-mix(in srgb, var(--color-surface-2) 88%, var(--fg) 4%);
  --ink: color-mix(in srgb, var(--fg) 55%, transparent);
  --ink-soft: color-mix(in srgb, var(--fg) 22%, transparent);
  --accent: color-mix(in srgb, var(--color-brand) 70%, white 10%);
}
.frame {
  /* Fit both axes so tall demos never crop inside short reel visuals */
  width: min(100%, 34rem, calc(100cqh * 16 / 11));
  max-height: 100%;
  aspect-ratio: 16 / 11;
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: 0 18px 50px color-mix(in srgb, #000 28%, transparent);
  position: relative;
  overflow: hidden;
  opacity: 0.72;
  transform: translateY(10px);
  transition:
    opacity 0.9s var(--calm-ease),
    transform 1.1s var(--calm-ease);
  box-sizing: border-box;
}
.ui-stage.on .frame {
  opacity: 1;
  transform: translateY(0);
}

/* Shared atoms */
.line {
  height: 0.45rem;
  border-radius: 0;
  background: var(--ink-soft);
}
.w30 { width: 30%; } .w40 { width: 40%; } .w45 { width: 45%; }
.w50 { width: 50%; } .w55 { width: 55%; } .w60 { width: 60%; } .w70 { width: 70%; }
.btn-ghost {
  width: 4.5rem;
  height: 1.35rem;
  margin-top: 0.75rem;
  border: 1px solid var(--ink-soft);
  background: color-mix(in srgb, var(--accent) 18%, transparent);
}

/* Browser / web */
.browser { display: grid; grid-template-rows: auto auto 1fr auto; gap: 0.65rem; padding: 0.65rem; }
.chrome { display: flex; align-items: center; gap: 0.35rem; }
.chrome span {
  width: 0.45rem; height: 0.45rem; background: var(--ink-soft);
}
.url {
  flex: 1; height: 0.85rem; margin-left: 0.5rem;
  background: color-mix(in srgb, var(--fg) 8%, transparent);
}
.nav { display: flex; gap: 0.55rem; }
.nav-item {
  width: 2.4rem; height: 0.35rem; background: var(--ink-soft); display: block;
}
.nav-item.on { background: var(--accent); width: 2.8rem; }
.ui-stage.on .nav-item {
  animation: nav-shift var(--calm) var(--calm-ease) infinite;
}
.ui-stage.on .nav-item:nth-child(2) { animation-delay: -4s; }
.ui-stage.on .nav-item:nth-child(3) { animation-delay: -8s; }
@keyframes nav-shift {
  0%, 28% { opacity: 0.45; background: var(--ink-soft); }
  33%, 61% { opacity: 1; background: var(--accent); }
  66%, 100% { opacity: 0.45; background: var(--ink-soft); }
}
.hero-block { display: grid; gap: 0.45rem; padding: 0.35rem 0 0.5rem; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.45rem; }
.card {
  height: 3.2rem; background: color-mix(in srgb, var(--fg) 7%, transparent);
  border: 1px solid var(--line);
  opacity: 0.55;
}
.ui-stage.on .card {
  animation: card-rise 10s var(--calm-ease) infinite;
}
.ui-stage.on .c2 { animation-delay: 1.2s; }
.ui-stage.on .c3 { animation-delay: 2.4s; }
@keyframes card-rise {
  0%, 100% { opacity: 0.45; transform: translateY(4px); }
  40%, 60% { opacity: 1; transform: translateY(0); }
}

/* Brand */
.brand { padding: 1.1rem; display: grid; gap: 0.9rem; align-content: start; }
.mark {
  width: 2.4rem; height: 2.4rem;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 40%, #fff));
  opacity: 0.9;
}
.ui-stage.on .mark {
  animation: mark-breathe 14s var(--calm-ease) infinite;
}
@keyframes mark-breathe {
  0%, 100% { opacity: 0.75; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.03); }
}
.type-stack { display: grid; gap: 0.4rem; }
.swatches { display: flex; gap: 0.4rem; }
.swatches i {
  width: 1.35rem; height: 1.35rem; display: block;
  background: var(--ink-soft);
}
.swatches i:nth-child(1) { background: var(--accent); }
.swatches i:nth-child(2) { background: color-mix(in srgb, var(--accent) 55%, #fff); }
.apps { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.25rem; }
.app-tile {
  height: 3.5rem; border: 1px solid var(--line);
  background: color-mix(in srgb, var(--fg) 6%, transparent);
}
.ui-stage.on .t1 { animation: tile-fade 11s var(--calm-ease) infinite; }
.ui-stage.on .t2 { animation: tile-fade 11s var(--calm-ease) infinite 2.5s; }
@keyframes tile-fade {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Dev — same outer frame size as other variants (aspect from .frame; never height:100% on .frame.code) */
.frame.code {
  display: grid;
  grid-template-columns: 2.2rem 1fr 1fr;
  gap: 0;
  align-items: stretch;
  /* height comes from .frame aspect-ratio — do not set height:100% here */
}
.sidebar {
  border-right: 1px solid var(--line);
  padding: 0.55rem 0.35rem;
  display: grid; gap: 0.4rem; align-content: start;
  min-height: 0;
}
.sidebar i {
  height: 0.45rem; background: var(--ink-soft); display: block;
}
.sidebar i.on { background: var(--accent); }
.editor,
.preview {
  padding: 0.65rem;
  display: grid;
  gap: 0.35rem;
  align-content: start;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.preview {
  border-left: 1px solid var(--line);
}
.row { height: 0.4rem; background: var(--ink-soft); width: 85%; opacity: 0.5; }
.row.r2 { width: 70%; } .row.r3 { width: 78%; } .row.r4 { width: 52%; }
.comp {
  margin-top: 0.45rem;
  height: clamp(1.6rem, 22%, 2.4rem);
  border: 1px dashed var(--ink-soft);
  opacity: 0.35;
}
.ui-stage.on .comp {
  animation: assemble 13s var(--calm-ease) infinite;
}
@keyframes assemble {
  0%, 15% { opacity: 0.2; transform: translateY(4px); border-style: dashed; }
  40%, 70% { opacity: 1; transform: translateY(0); border-style: solid; background: color-mix(in srgb, var(--accent) 12%, transparent); }
  100% { opacity: 0.35; transform: translateY(2px); border-style: dashed; }
}
.p-bar { height: 0.55rem; background: var(--ink-soft); }
.p-body {
  height: clamp(2.5rem, 48%, 4.5rem);
  background: color-mix(in srgb, var(--fg) 6%, transparent);
}

/* Apps — same outer size as other frames; phones compose inside */
.frame.phones {
  /* keep shared .frame width + 16/11 aspect — never height:100% on the frame */
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, var(--panel) 35%, transparent);
  border-color: color-mix(in srgb, var(--line) 55%, transparent);
}
.phone {
  position: absolute;
  aspect-ratio: 9 / 16;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--color-surface) 92%, #000);
  padding: clamp(0.4rem, 1.2cqw, 0.65rem);
  box-sizing: border-box;
  display: grid;
  align-content: start;
  gap: 0.35rem;
  overflow: hidden;
  height: auto;
}
.phone.back {
  /* Primary device — height-driven so it never crops in short frames */
  height: 78%;
  width: auto;
  max-width: 62%;
  aspect-ratio: 9 / 16;
  left: 6%;
  top: 10%;
  opacity: 1;
  z-index: 1;
  box-shadow: 0 16px 40px color-mix(in srgb, #000 36%, transparent);
  transform: rotate(-2.5deg);
  border-color: color-mix(in srgb, var(--fg) 28%, var(--line));
  background: color-mix(in srgb, var(--color-surface) 88%, var(--fg) 4%);
}
.phone.front {
  /* Accent device — ~half the back, only covers a corner */
  height: 42%;
  width: auto;
  max-width: 24%;
  aspect-ratio: 9 / 16;
  left: 66%;
  top: 42%;
  opacity: 1;
  z-index: 2;
  box-shadow: 0 18px 42px color-mix(in srgb, #000 42%, transparent);
  transform: rotate(6deg);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
}
.p-header { height: 0.45rem; width: 55%; background: var(--ink-soft); }
.p-list {
  min-height: 36%;
  height: 40%;
  background: color-mix(in srgb, var(--fg) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--fg) 6%, transparent);
}
.p-row {
  height: 0.5rem;
  width: 78%;
  background: var(--ink-soft);
  opacity: 0.75;
}
.p-row.short { width: 52%; }
.p-cta {
  height: 0.9rem;
  background: color-mix(in srgb, var(--accent) 35%, transparent);
}
.p-cards { display: grid; gap: 0.28rem; }
.p-cards i {
  height: 1rem;
  display: block;
  background: color-mix(in srgb, var(--fg) 8%, transparent);
}
.ui-stage.on .phone.back {
  animation: phone-back 16s var(--calm-ease) infinite;
}
.ui-stage.on .phone.front {
  animation: phone-front 14s var(--calm-ease) infinite;
}
@keyframes phone-back {
  0%, 100% { transform: rotate(-2.5deg) translate(0, 0); }
  50% { transform: rotate(-1.5deg) translate(1px, -2px); }
}
@keyframes phone-front {
  0%, 100% { transform: rotate(6deg) translate(0, 0); }
  50% { transform: rotate(5deg) translate(-1px, -3px); }
}

/* Shop */
.shop {
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 0.65rem; padding: 0.75rem;
}
.product, .cart { display: grid; gap: 0.4rem; align-content: start; }
.thumb { aspect-ratio: 4/3; background: color-mix(in srgb, var(--fg) 8%, transparent); }
.price { width: 2.5rem; height: 0.55rem; background: var(--accent); opacity: 0.65; }
.add {
  width: 5rem; height: 1.25rem; margin-top: 0.25rem;
  background: color-mix(in srgb, var(--accent) 28%, transparent);
  border: 1px solid var(--ink-soft);
}
.ui-stage.on .add { animation: add-pulse 10s var(--calm-ease) infinite; }
@keyframes add-pulse {
  0%, 70%, 100% { opacity: 0.65; }
  78%, 88% { opacity: 1; background: color-mix(in srgb, var(--accent) 45%, transparent); }
}
.cart-title { height: 0.45rem; width: 40%; background: var(--ink-soft); }
.cart-row { height: 1.5rem; background: color-mix(in srgb, var(--fg) 6%, transparent); }
.cart-row.dim { opacity: 0.4; }
.checkout { height: 1.2rem; margin-top: 0.35rem; background: color-mix(in srgb, var(--accent) 22%, transparent); }

/* SEO dash */
.dash { padding: 0.75rem; display: grid; gap: 0.55rem; }
.metric { display: grid; grid-template-columns: 1fr auto; gap: 0.45rem; align-items: center; }
.metric .bar {
  height: 0.35rem; background: color-mix(in srgb, var(--fg) 10%, transparent);
  position: relative; overflow: hidden;
}
.metric .bar::after {
  content: ""; position: absolute; inset: 0 auto 0 0; width: 45%;
  background: var(--accent); opacity: 0.7;
}
.ui-stage.on .m1 .bar::after { animation: bar-grow 12s var(--calm-ease) infinite; width: 0; }
.ui-stage.on .m2 .bar::after { animation: bar-grow 12s var(--calm-ease) infinite 0.8s; width: 0; }
.ui-stage.on .m3 .bar::after { animation: bar-grow 12s var(--calm-ease) infinite 1.6s; width: 0; }
@keyframes bar-grow {
  0% { width: 18%; opacity: 0.4; }
  45%, 70% { width: 72%; opacity: 0.85; }
  100% { width: 55%; opacity: 0.55; }
}
.val { width: 1.6rem; height: 0.45rem; background: var(--ink-soft); }
.chart {
  display: flex; align-items: flex-end; gap: 0.35rem; height: 3.5rem; margin-top: 0.25rem;
}
.chart span {
  flex: 1; background: color-mix(in srgb, var(--accent) 35%, transparent);
  height: 40%;
}
.ui-stage.on .chart span:nth-child(1) { animation: col 11s var(--calm-ease) infinite; }
.ui-stage.on .chart span:nth-child(2) { animation: col 11s var(--calm-ease) infinite 0.3s; }
.ui-stage.on .chart span:nth-child(3) { animation: col 11s var(--calm-ease) infinite 0.6s; }
.ui-stage.on .chart span:nth-child(4) { animation: col 11s var(--calm-ease) infinite 0.9s; }
.ui-stage.on .chart span:nth-child(5) { animation: col 11s var(--calm-ease) infinite 1.2s; }
.ui-stage.on .chart span:nth-child(6) { animation: col 11s var(--calm-ease) infinite 1.5s; }
@keyframes col {
  0%, 100% { height: 28%; opacity: 0.45; }
  50% { height: 78%; opacity: 0.9; }
}

/* Marketing */
.campaign { padding: 0.85rem; display: grid; gap: 0.55rem; }
.channel {
  height: 1.5rem; border: 1px solid var(--line);
  background: color-mix(in srgb, var(--fg) 5%, transparent);
}
.channel.on { border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); background: color-mix(in srgb, var(--accent) 12%, transparent); }
.ui-stage.on .channel {
  animation: channel-on 13s var(--calm-ease) infinite;
}
.ui-stage.on .channel:nth-child(2) { animation-delay: 4s; }
.ui-stage.on .channel:nth-child(3) { animation-delay: 8s; }
@keyframes channel-on {
  0%, 25% { opacity: 0.45; }
  30%, 55% { opacity: 1; border-color: color-mix(in srgb, var(--accent) 45%, var(--line)); }
  60%, 100% { opacity: 0.45; }
}
.spark { display: flex; align-items: flex-end; gap: 0.3rem; height: 2.4rem; }
.spark i {
  flex: 1; height: 35%; display: block;
  background: color-mix(in srgb, var(--accent) 40%, transparent);
}
.kpi { display: grid; gap: 0.35rem; margin-top: 0.25rem; }
.num { width: 3rem; height: 0.85rem; background: var(--accent); opacity: 0.55; }

/* AI */
.ai { padding: 0.85rem; display: grid; gap: 0.45rem; align-content: end; }
.bubble {
  height: 1.5rem; max-width: 70%;
  background: color-mix(in srgb, var(--fg) 8%, transparent);
  border: 1px solid var(--line);
}
.bubble.a { width: 55%; }
.bubble.b { width: 70%; margin-left: auto; background: color-mix(in srgb, var(--accent) 14%, transparent); }
.bubble.c { width: 48%; opacity: 0.55; }
.ui-stage.on .bubble.c {
  animation: type-in 10s var(--calm-ease) infinite;
}
@keyframes type-in {
  0%, 20% { opacity: 0; transform: translateY(6px); width: 20%; }
  40%, 75% { opacity: 1; transform: translateY(0); width: 48%; }
  100% { opacity: 0.5; }
}
.input { display: grid; grid-template-columns: 1fr auto; gap: 0.4rem; margin-top: 0.35rem; }
.field { height: 1.35rem; border: 1px solid var(--line); background: color-mix(in srgb, var(--fg) 4%, transparent); }
.send { width: 1.8rem; height: 1.35rem; background: color-mix(in srgb, var(--accent) 40%, transparent); }

/* Automation */
.flow { position: relative; }
.wires { position: absolute; inset: 12% 8%; width: 84%; height: 76%; opacity: 0.55; }
.wire {
  fill: none; stroke: color-mix(in srgb, var(--accent) 55%, transparent);
  stroke-width: 1.5; stroke-dasharray: 120; stroke-dashoffset: 120;
}
.ui-stage.on .wire {
  animation: draw-wire 14s var(--calm-ease) infinite;
}
.ui-stage.on .w2 { animation-delay: 1.5s; }
@keyframes draw-wire {
  0% { stroke-dashoffset: 120; opacity: 0.25; }
  40%, 70% { stroke-dashoffset: 0; opacity: 0.85; }
  100% { stroke-dashoffset: 0; opacity: 0.4; }
}
.node {
  position: absolute; width: 2.4rem; height: 2.4rem;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--color-surface) 80%, var(--accent) 8%);
}
.n1 { left: 12%; top: 22%; }
.n2 { left: 44%; top: 42%; }
.n3 { right: 12%; top: 42%; }
.ui-stage.on .n2 { animation: node-on 14s var(--calm-ease) infinite 2s; }
.ui-stage.on .n3 { animation: node-on 14s var(--calm-ease) infinite 4s; }
@keyframes node-on {
  0%, 25% { border-color: var(--line); }
  40%, 70% { border-color: var(--accent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent); }
  100% { border-color: var(--line); }
}

/* Migration */
.layers { padding: 1rem; display: grid; place-items: center; }
.layer {
  width: 70%; height: 1.8rem; margin: 0.25rem 0;
  border: 1px solid var(--line);
  background: color-mix(in srgb, var(--fg) 6%, transparent);
}
.L1 { width: 78%; opacity: 0.45; }
.L2 { width: 70%; }
.L3 { width: 62%; background: color-mix(in srgb, var(--accent) 12%, transparent); }
.ui-stage.on .L3 {
  animation: layer-shift 12s var(--calm-ease) infinite;
}
@keyframes layer-shift {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(-6px); opacity: 1; }
}
.arrow {
  width: 0; height: 0; margin-top: 0.35rem;
  border-left: 0.4rem solid transparent;
  border-right: 0.4rem solid transparent;
  border-top: 0.5rem solid var(--ink-soft);
}

/* MVP */
.mvp {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.55rem; padding: 0.75rem;
}
.wireframe, .ui-build { display: grid; gap: 0.4rem; align-content: start; }
.box {
  height: 2rem; border: 1px dashed var(--ink-soft);
  background: transparent;
}
.box.short { height: 1.2rem; width: 70%; }
.ui-stage.on .ui-build {
  animation: mvp-reveal 12s var(--calm-ease) infinite;
}
@keyframes mvp-reveal {
  0%, 20% { opacity: 0.25; }
  45%, 75% { opacity: 1; }
  100% { opacity: 0.55; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-stage.on .frame,
  .ui-stage.on :is(.nav-item, .card, .mark, .comp, .phone, .add, .bar, .chart span, .channel, .bubble, .wire, .node, .layer, .ui-build, .t1, .t2) {
    animation: none !important;
  }
  .ui-stage .frame {
    opacity: 1;
    transform: none;
  }
}
</style>
