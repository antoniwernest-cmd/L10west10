"use strict";

const $ = (id) => document.getElementById(id);
const LIMIT = 4;
const SLOT_COUNT = 3;
const storageKey = "candy-word-machine-v1";
const ids = challenges.map((challenge) => challenge.id);
const candies = [...document.querySelectorAll("[data-candy]")];
const states = new Map();
let order = ids.slice();
let index = 0;
let selected = null;
let drag = null;

function shuffled(values) {
  const copy = values.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function restore() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch { return; }
  if (Array.isArray(saved?.order) && saved.order.length === ids.length &&
      new Set(saved.order).size === ids.length && saved.order.every((id) => ids.includes(id))) {
    order = saved.order;
  }
  if (Number.isInteger(saved?.index) && saved.index >= 0 && saved.index < order.length) index = saved.index;
  for (const question of challenges) {
    const record = saved?.states?.[question.id];
    if (!record || !Array.isArray(record.words) || record.words.length !== SLOT_COUNT) continue;
    const used = record.words.filter((word) => word !== null);
    if (used.some((word) => !question.answers.includes(word)) || new Set(used).size !== used.length) continue;
    if (!Number.isInteger(record.tries) || record.tries < used.length) continue;
    states.set(question.id, { words: record.words.slice(), tries: Math.min(record.tries, LIMIT) });
  }
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ order, index, states: Object.fromEntries(states) }));
  } catch {}
}

const emptyBoard = () => ({ words: Array(SLOT_COUNT).fill(null), tries: 0 });
const question = () => challenges[order[index]];
function state() {
  const id = question().id;
  if (!states.has(id)) states.set(id, emptyBoard());
  return states.get(id);
}
const complete = (board) => board.words.every((word) => word !== null);
const isOver = (board) => board.tries === LIMIT || complete(board);
const wordFor = (tile) => question().left + tile + question().right;
const tileOrder = challenges.map((challenge) => shuffled(challenge.tiles));

function say(text, kind = "") {
  $("feedback").textContent = text;
  $("feedback").dataset.kind = kind;
}

function status() {
  if (complete(state())) return ["You made all three words!", "correct"];
  if (state().tries === LIMIT) return ["Out of tries. Reset this page to try again.", "wrong"];
  return ["Find three tiles that make real words.", ""];
}

function wordPart(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function makeWord(placed, slot) {
  const row = document.createElement("div");
  row.className = "word";
  const pad = document.createElement("button");
  pad.type = "button";
  pad.className = placed === null ? "pad" : "pad filled";
  pad.dataset.slot = String(slot);
  pad.textContent = placed ?? "___";
  pad.disabled = placed !== null || isOver(state());
  pad.setAttribute("aria-label", placed === null
    ? `Word ${slot + 1}: ${question().left} blank ${question().right}`
    : wordFor(placed));
  pad.addEventListener("click", () => {
    if (selected !== null) tryTile(selected, slot, document.activeElement === pad);
    else say("Pick a tile first, or drag one here.");
  });
  row.append(wordPart(question().left), pad, wordPart(question().right));
  return row;
}

function updateTiles() {
  const board = state();
  for (const button of $("bank").children) {
    const used = board.words.includes(button.textContent);
    button.disabled = used || isOver(board);
    button.classList.toggle("used", used);
    button.setAttribute("aria-pressed", String(selected === button.textContent));
  }
}

function pickTile(value) {
  if (isOver(state()) || state().words.includes(value)) return;
  selected = selected === value ? null : value;
  updateTiles();
  if (selected) say(`“${value}” picked. Tap a blank to try it.`);
  else say("Drag a tile into a blank.");
}

function landingPad(event) {
  const pad = document.elementFromPoint(event.clientX, event.clientY)?.closest("#words .pad");
  return pad && !pad.disabled ? pad : null;
}

function clearDrag() {
  if (!drag) return;
  drag.ghost?.remove();
  drag.target?.classList.remove("ready");
  drag = null;
}

function startDrag(event) {
  const tile = event.currentTarget;
  tile.dataset.dragged = "false";
  if (drag || tile.disabled || event.button !== 0 || !event.isPrimary) return;
  tile.setPointerCapture(event.pointerId);
  drag = { pointer: event.pointerId, value: tile.textContent, tile, x: event.clientX, y: event.clientY,
    ghost: null, target: null };
}

function moveDrag(event) {
  if (drag?.pointer !== event.pointerId) return;
  if (!drag.ghost && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 7) return;
  if (!drag.ghost) {
    const { width, height } = drag.tile.getBoundingClientRect();
    drag.ghost = document.createElement("div");
    drag.ghost.className = "drag-ghost";
    drag.ghost.textContent = drag.value;
    drag.ghost.setAttribute("aria-hidden", "true");
    drag.ghost.style.width = width + "px";
    drag.ghost.style.height = height + "px";
    drag.ghost.style.fontSize = getComputedStyle(drag.tile).fontSize;
    document.body.append(drag.ghost);
  }
  drag.ghost.style.left = event.clientX + "px";
  drag.ghost.style.top = event.clientY + "px";
  const target = landingPad(event);
  if (target !== drag.target) {
    drag.target?.classList.remove("ready");
    target?.classList.add("ready");
    drag.target = target;
  }
}

function finishDrag(event) {
  if (drag?.pointer !== event.pointerId) return;
  const target = drag.ghost ? landingPad(event) : null;
  const value = drag.value;
  drag.tile.dataset.dragged = String(Boolean(drag.ghost));
  clearDrag();
  if (target) tryTile(value, Number(target.dataset.slot));
}

function makeTile(value) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "tile";
  button.textContent = value;
  button.addEventListener("pointerdown", startDrag);
  button.addEventListener("pointermove", moveDrag);
  button.addEventListener("pointerup", finishDrag);
  button.addEventListener("pointercancel", clearDrag);
  button.addEventListener("lostpointercapture", clearDrag);
  button.addEventListener("click", (event) => {
    if (button.dataset.dragged !== "true" || event.detail === 0) pickTile(value);
  });
  return button;
}

function updateMachine(animate = false) {
  const left = LIMIT - state().tries;
  $("left").textContent = left;
  $("tries").setAttribute("aria-label", `${left} ${left === 1 ? "try" : "tries"} left`);
  $("tries").lastChild.textContent = left === 1 ? " try left" : " tries left";
  candies.forEach((candy, i) => candy.classList.toggle("used", i >= left));
  const dispensed = $("dispensed");
  dispensed.classList.remove("pulse");
  if (animate) {
    dispensed.setAttribute("color", candies[left].getAttribute("color"));
    void dispensed.getBoundingClientRect();
    dispensed.classList.add("pulse");
  }
}

function render(message = null, kind = "", animate = false) {
  clearDrag();
  selected = null;
  const board = state();
  $("question").value = String(index);
  $("challenge").textContent = question().instruction;
  $("words").replaceChildren(...board.words.map(makeWord));
  $("bank").replaceChildren(...tileOrder[question().id].map(makeTile));
  updateTiles();
  updateMachine(animate);
  const solved = [...states.values()].filter(complete).length;
  $("progress").textContent = `Question ${index + 1} of ${order.length} · ${solved} solved`;
  $("back").disabled = index === 0;
  $("next").disabled = !complete(board) || index === order.length - 1;
  $("next").textContent = index === order.length - 1 ? "Last question" : "Next question →";
  const [defaultMessage, defaultKind] = status();
  say(message ?? defaultMessage, message === null ? defaultKind : kind);
}

function tryTile(value, slot, moveFocus = false) {
  const board = state();
  if (isOver(board) || board.words[slot] !== null || board.words.includes(value) || !question().tiles.includes(value)) return;
  board.tries++;
  const correct = question().answers.includes(value);
  if (correct) board.words[slot] = value;
  save();
  if (isOver(board)) render(null, "", true);
  else render(correct ? `✓ You made ${wordFor(value)}!` : "That tile doesn’t fit. One candy used.", correct ? "correct" : "wrong", true);
  if (!correct) $("words").querySelector(`[data-slot="${slot}"]`).classList.add("miss");
  if (moveFocus) ($("bank").querySelector("button:enabled") ?? ($("next").disabled ? $("reset") : $("next"))).focus();
}

function goTo(next) {
  index = next;
  save();
  render();
}

function bindControl(button, action) {
  let handledTouch = false;
  button.addEventListener("pointerdown", () => { handledTouch = false; });
  // Keep a touch control responsive on the first tap after a drag.
  button.addEventListener("pointerup", (event) => {
    if (event.pointerType !== "touch" || !event.isPrimary || button.disabled ||
        !button.contains(document.elementFromPoint(event.clientX, event.clientY))) return;
    handledTouch = true;
    action();
  });
  button.addEventListener("click", (event) => {
    if (!handledTouch || event.detail === 0) action();
  });
}

restore();
ids.forEach((_, i) => $("question").append(new Option(String(i + 1), i)));
$("question").addEventListener("change", () => goTo(Number($("question").value)));
bindControl($("back"), () => { if (index > 0) goTo(index - 1); });
bindControl($("next"), () => {
  if (complete(state()) && index < order.length - 1) goTo(index + 1);
});
bindControl($("reset"), () => {
  states.set(question().id, emptyBoard());
  save();
  render(`Page reset. You have ${LIMIT} tries.`);
});
bindControl($("shuffle"), () => {
  const current = question().id;
  order = shuffled(ids);
  const first = order.findIndex((id) => id !== current && (!states.has(id) || !complete(states.get(id))));
  const pivot = first < 0 ? order.findIndex((id) => id !== current) : first;
  order = order.slice(pivot).concat(order.slice(0, pivot));
  index = 0;
  save();
  render("Questions shuffled. Find three words!");
});
render();
