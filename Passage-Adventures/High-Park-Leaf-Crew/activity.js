"use strict";

const $ = (id) => document.getElementById(id);
const storageKey = "passage-high-park-leaf-crew-v1";
const steps = [...document.querySelectorAll("[data-step]")];
const tracks = Object.fromEntries(Object.entries(stories).map(([key, entries]) => [
  key,
  entries.flatMap((chapter, chapterIndex) => chapter.tasks.map((task) => ({ chapterIndex, task })))
]));
const scoreKey = (chapterIndex, taskId) => `${chapterIndex}:${taskId}`;
const rates = [...$("speed").options].map((option) => option.value);
const params = new URLSearchParams(location.search);
const synth = window.speechSynthesis;
let saved = {};
try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}

const validLevel = (value) => Object.hasOwn(stories, value);
let requestedLevel = params.get("level");
if (params.get("from") === "passages" && !validLevel(requestedLevel)) {
  try { requestedLevel = JSON.parse(localStorage.getItem("passage-index-selection-v1"))?.level; } catch {}
}
let level = validLevel(requestedLevel) ? requestedLevel
  : validLevel(saved.level) ? saved.level : "Pre-A";
let position = 0;
let selected = null;
let summary = false;
let readingPage = 0;
let readingPages = [];
let voiceOn = true;
let rate = rates.includes(saved.rate) ? saved.rate : "1";
const fontSlider = $("font-size");
const fontPreferenceKey = storageKey + "-font-size";
const defaultFontSize = fontSlider.defaultValue;
try { fontSlider.value = localStorage.getItem(fontPreferenceKey) ?? defaultFontSize; } catch {}
let speaking = false;
let utterance = null;
let drag = null;
let skipPointerClick = false;
function loadScore(key) {
  const entries = Array.isArray(saved.scores?.[key]) ? saved.scores[key] : [];
  const valid = new Set(tracks[key].map((entry) => scoreKey(entry.chapterIndex, entry.task.id)));
  if (saved.version === 3) return new Set(entries.filter((entry) => valid.has(entry)));
  const originalIds = ["story", "word", "check"];
  const migrated = entries.filter((entry) => Number.isInteger(entry) && entry >= 0).map((entry) => {
    const offset = saved.version === 2 ? entry : entry + originalIds.length;
    return scoreKey(Math.floor(offset / originalIds.length), originalIds[offset % originalIds.length]);
  });
  return new Set(migrated.filter((entry) => valid.has(entry)));
}

const scores = Object.fromEntries(Object.keys(stories).map((key) => [key, loadScore(key)]));
const responses = Object.fromEntries(Object.entries(tracks).map(([key, entries]) => {
  const previous = saved.responses?.[key];
  const loaded = new Map();
  for (const { chapterIndex, task } of entries) {
    const id = scoreKey(chapterIndex, task.id);
    const answer = previous?.[id];
    const options = task.section === 0
      ? stories[key][chapterIndex].gaps.flatMap((gap) => gap.options) : task.options;
    if (options.includes(answer)) loaded.set(id, answer);
  }
  return [key, loaded];
}));

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({
      version: 3, level, rate, scores: Object.fromEntries(
        Object.entries(scores).map(([key, score]) => [key, [...score]])
      ),
      responses: Object.fromEntries(
        Object.entries(responses).map(([key, answers]) => [key, Object.fromEntries(answers)])
      ),
    }));
  } catch {}
}

function applyFontSize() {
  const percent = fontSlider.value + "%";
  document.documentElement.style.setProperty("--text-scale", Number(fontSlider.value) / 100);
  fontSlider.setAttribute("aria-valuetext", percent);
  $("font-value").value = percent;
  if (readingPages.length || $("choices").children.length) rebuildReading();
}

const chapterIndex = () => tracks[level][position].chapterIndex;
const chapter = () => stories[level][chapterIndex()];
const task = () => tracks[level][position].task;
const isStory = () => task().section === 0;
const taskCount = () => tracks[level].length;
const taskStart = (chapter, section = 0) => tracks[level].findIndex((entry) =>
  entry.chapterIndex === chapter && entry.task.section === section);
const gapText = (text) => text.replaceAll("_", "____");
const solved = () => scores[level].has(scoreKey(chapterIndex(), task().id));
const responseFor = (id) => responses[level].get(scoreKey(chapterIndex(), id));
const answered = (id) => scores[level].has(scoreKey(chapterIndex(), id)) || responseFor(id) !== undefined;
const answeredCount = () => new Set([...scores[level], ...responses[level].keys()]).size;
const readText = (text) => text.replaceAll("_", " … blank … ");
const storyText = () => formatPassage(chapter(), (_, i) => `{${i}}`);
const currentStoryPage = () => readingPages[readingPage] ?? storyText();
const gapNumbers = (text) => [...text.matchAll(/\{(\d+)\}/g)].map((match) => Number(match[1]));
const gapSolved = (gap) => scores[level].has(scoreKey(chapterIndex(), gap.id));
const pageGaps = () => gapNumbers(currentStoryPage()).map((index) => chapter().gaps[index]);

function message(text, result = "") {
  $("feedback").textContent = text;
  $("feedback").dataset.result = result;
}

function syncVoice() {
  $("voice").textContent = voiceOn ? "Voice on" : "Voice off";
  $("voice").setAttribute("aria-pressed", String(voiceOn));
  $("listen").disabled = !voiceOn || !synth;
  $("speed").disabled = !voiceOn || !synth;
  $("listen").textContent = speaking ? "■ Stop" : "▶ Listen";
  $("listen").setAttribute("aria-label", speaking ? "Stop read aloud" : "Listen to this activity");
}

function stopVoice() {
  utterance = null;
  speaking = false;
  synth?.cancel();
  syncVoice();
}

function listen() {
  if (!voiceOn || !synth) return;
  const current = task();
  let words;
  if (summary) words = "You can balance work and play. " + $("summary-line").textContent;
  else if (isStory()) words = currentStoryPage().replace(/\{(\d+)\}/g, (_, i) => {
    const gap = chapter().gaps[Number(i)];
    return gapSolved(gap) ? gap.options[0] : " … blank … ";
  });
  else if (current.kind === "choice" && passageIsOpen()) words = readText(readingPages[readingPage] ?? passageForCheck());
  else if (current.kind === "choice") {
    words = current.text + " " +
      [...$("choices").children].map((option) => option.textContent).join(". ");
  } else words = solved() ? current.text.replace("_", current.options[0]) : readText(current.text);

  stopVoice();
  const clip = new SpeechSynthesisUtterance(words);
  clip.lang = "en-CA";
  const voices = synth.getVoices();
  clip.voice = voices.find((voice) => voice.lang === "en-CA")
    || voices.find((voice) => voice.lang === "en-US" && voice.localService) || null;
  clip.rate = Number(rate);
  clip.onend = clip.onerror = (event) => {
    if (utterance !== clip) return;
    stopVoice();
    if (event.type === "error" && !summary) message("Read-aloud is unavailable on this device.");
  };
  utterance = clip;
  speaking = true;
  syncVoice();
  synth.speak(clip);
}

function passageForCheck() {
  return formatPassage(chapter(), (gap) => answered(gap.id) ? gap.options[0] : "_");
}

function storyNodes(text, makeGap) {
  return text.split(/\{(\d+)\}/).map((part, i) => i % 2 ? makeGap(Number(part)) : part);
}

function makeSlot(gapIndex = null) {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = "gap";
  const id = gapIndex === null ? task().id : chapter().gaps[gapIndex].id;
  const previous = responseFor(id);
  const label = gapIndex === null ? "blank" : `blank ${gapIndex + 1}`;
  slot.textContent = previous ?? "___";
  slot.classList.toggle("drop-retry", previous !== undefined);
  slot.setAttribute("aria-label", previous === undefined ? `Drop a tile on ${label}` : `${label} has ${previous}. Drop a new tile to try again.`);
  if (gapIndex !== null) slot.dataset.gap = String(gapIndex);
  slot.addEventListener("click", () => {
    if (selected !== null) placeTile(selected, slot);
  });
  return slot;
}

function filledWord(word) {
  const answer = document.createElement("span");
  answer.className = "filled-word";
  answer.textContent = word;
  return answer;
}

function renderPrompt() {
  const current = task();
  const prompt = $("prompt");
  if (isStory()) {
    prompt.replaceChildren(...storyNodes(currentStoryPage(), (i) => {
      const gap = chapter().gaps[i];
      return gapSolved(gap) ? filledWord(gap.options[0]) : makeSlot(i);
    }));
  } else if (current.kind === "choice") prompt.textContent = current.text;
  else {
    const [before, after] = current.text.split("_");
    prompt.replaceChildren(before, solved() ? filledWord(current.options[0]) : makeSlot(), after);
  }
}

function choose(value) {
  selected = value;
  updateChoices();
  message(task().kind === "drag"
    ? `“${value}” picked. Tap a blank or drag the tile.` : "Tap Check when you’re ready.");
}

function updateChoices() {
  const gaps = isStory() ? pageGaps() : [];
  const completedWords = new Set(gaps.filter(gapSolved).map((gap) => gap.options[0]));
  const availableWords = new Set(gaps.filter((gap) => !gapSolved(gap)).map((gap) => gap.options[0]));
  const complete = isStory() ? availableWords.size === 0 : solved();
  $("check").disabled = selected === null || complete || summary;
  for (const button of $("choices").children) {
    button.setAttribute("aria-pressed", String(button.textContent === selected));
    button.disabled = complete || (completedWords.has(button.textContent) && !availableWords.has(button.textContent));
  }
}

function placeTile(value, slot) {
  const gap = isStory() ? chapter().gaps[Number(slot.dataset.gap)] : task();
  const key = scoreKey(chapterIndex(), gap.id);
  if (scores[level].has(key)) return;
  selected = null;
  const moveFocus = document.activeElement === slot;
  const correct = value === gap.options[0];
  recordAnswer(key, value, correct);
  renderPrompt();
  updateChoices();
  updateTaskHeading();
  syncNavigation();
  message(correct ? `✓ “${value}” fits!` : "That tile isn’t a match. You can try again.", correct ? "correct" : "retry");
  if (moveFocus) ($("choices").querySelector("button:enabled") ?? $("next")).focus();
}

function recordAnswer(key, value, correct) {
  if (correct) {
    scores[level].add(key);
    responses[level].delete(key);
  } else responses[level].set(key, value);
  save();
  renderProgress();
}

function finishDrag() {
  if (!drag) return;
  drag.ghost?.remove();
  drag.target?.classList.remove("drop-ready");
  drag = null;
}

function startDrag(event) {
  skipPointerClick = false;
  const tile = event.currentTarget;
  if (drag || tile.disabled || event.button !== 0 || !event.isPrimary) return;
  tile.setPointerCapture(event.pointerId);
  const { width, height } = tile.getBoundingClientRect();
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, value: tile.textContent,
    width, height, fontSize: getComputedStyle(tile).fontSize, ghost: null, target: null };
}

function dragOverGap(event) {
  return document.elementFromPoint(event.clientX, event.clientY)?.closest("#prompt .gap");
}

function moveDrag(event) {
  if (drag?.id !== event.pointerId) return;
  if (!drag.ghost && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 7) return;
  if (!drag.ghost) {
    drag.ghost = document.createElement("div");
    drag.ghost.className = "drag-ghost";
    drag.ghost.textContent = drag.value;
    drag.ghost.style.width = drag.width + "px";
    drag.ghost.style.height = drag.height + "px";
    drag.ghost.style.fontSize = drag.fontSize;
    drag.ghost.setAttribute("aria-hidden", "true");
    document.body.append(drag.ghost);
  }
  drag.ghost.style.left = event.clientX + "px";
  drag.ghost.style.top = event.clientY + "px";
  const target = dragOverGap(event);
  if (target !== drag.target) {
    drag.target?.classList.remove("drop-ready");
    target?.classList.add("drop-ready");
    drag.target = target;
  }
}

function dropDrag(event) {
  if (drag?.id !== event.pointerId) return;
  skipPointerClick = Boolean(drag.ghost);
  const target = drag.ghost && dragOverGap(event);
  const value = drag.value;
  finishDrag();
  if (target) placeTile(value, target);
}

function orderedOptions(current, index) {
  const offset = (index * 5 + Math.floor(index / 4) + Object.keys(stories).indexOf(level) + 1) % current.options.length;
  return current.options.slice(offset).concat(current.options.slice(0, offset));
}

function renderChoices() {
  const current = task();
  const bank = $("choices");
  bank.classList.toggle("is-mc", current.kind === "choice");
  bank.classList.toggle("is-word-bank", current.kind === "drag");
  bank.setAttribute("aria-label", current.kind === "drag" ? "Draggable word bank" : "Answer options");
  const options = isStory() ? storyOptions(pageGaps(), readingPage) : orderedOptions(current, position);
  bank.replaceChildren(...options.map((value) => {
    const button = makeTile(value, current.kind === "drag");
    button.addEventListener("click", (event) => {
      if (!skipPointerClick || event.detail === 0) choose(value);
      skipPointerClick = false;
    });
    if (current.kind === "drag") {
      button.addEventListener("pointerdown", startDrag);
      button.addEventListener("pointermove", moveDrag);
      button.addEventListener("pointerup", dropDrag);
      button.addEventListener("pointercancel", finishDrag);
      button.addEventListener("lostpointercapture", finishDrag);
    }
    return button;
  }));
  updateChoices();
}

function makeTile(value, draggable = true) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = value;
  button.className = draggable ? "choice tile" : "choice";
  return button;
}

function storyOptions(gaps, page) {
  if (!gaps.length) return [];
  const correct = new Set(gaps.map((gap) => gap.options[0]));
  const distractors = new Set(gaps.flatMap((gap) => gap.options.slice(1)).filter((word) => !correct.has(word)));
  const options = [...correct, ...[...distractors].slice(0, 2)];
  // Use the same order for measuring a page and for displaying its tiles.
  let seed = (position + 1) * 101 + page + 1;
  for (let i = options.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function renderProgress() {
  $("progress").textContent = `${answeredCount()} of ${taskCount()} tried`;
}

function measureSlot() {
  const slot = document.createElement("span");
  slot.className = "gap";
  slot.textContent = "___";
  return slot;
}

function wordBankRuler(width) {
  const ruler = document.createElement("div");
  ruler.className = "choices is-word-bank measure-reading";
  ruler.style.width = width + "px";
  ruler.setAttribute("aria-hidden", "true");
  ruler.inert = true;
  document.body.append(ruler);
  return ruler;
}

function sizeLandingPads(ruler, options) {
  ruler.replaceChildren(...[...new Set(options)].map((option) => makeTile(option)));
  const rectangles = [...ruler.children].map((tile) => tile.getBoundingClientRect());
  const width = Math.max(...rectangles.map((rect) => rect.width)) + 16;
  const height = Math.max(...rectangles.map((rect) => rect.height)) + 8;
  document.documentElement.style.setProperty("--pad-width", Math.ceil(width) + "px");
  document.documentElement.style.setProperty("--pad-height", Math.ceil(height) + "px");
  document.documentElement.style.setProperty("--pad-font-size", getComputedStyle(ruler.firstElementChild).fontSize);
}

function paginate(text, className, height, width, measureAnswers) {
  const ruler = document.createElement("p");
  ruler.className = className + " measure-reading";
  ruler.style.width = width + "px";
  ruler.setAttribute("aria-hidden", "true");
  document.body.append(ruler);
  const words = text.match(/\S+\s*/g) ?? [];
  const pages = [];
  for (let start = 0; start < words.length;) {
    let low = start + 1;
    let high = words.length;
    let end = low;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2);
      const candidate = words.slice(start, middle).join("").trim();
      if (measureAnswers) ruler.replaceChildren(...storyNodes(candidate, measureSlot));
      else ruler.textContent = gapText(candidate);
      const available = height - (measureAnswers ? measureAnswers(gapNumbers(candidate), pages.length) : 0);
      if (ruler.offsetHeight <= available) {
        end = middle;
        low = middle + 1;
      } else high = middle - 1;
    }
    if (end < words.length) {
      const minimum = start + Math.ceil((end - start) * .7);
      for (let stop = end; stop >= minimum; stop--) {
        if (!/[.!?][”’"]?$/.test(words[stop - 1].trim())) continue;
        end = stop;
        break;
      }
    }
    pages.push(words.slice(start, end).join("").trim());
    start = end;
  }
  ruler.remove();
  return pages;
}

function rebuildReading(revealGap = false) {
  const content = $("question-content");
  if (summary || content.clientWidth === 0) return;
  const passage = passageIsOpen();
  let ruler;
  if (task().kind === "drag") {
    ruler = wordBankRuler(content.clientWidth);
    sizeLandingPads(ruler, isStory() ? chapter().gaps.flatMap((gap) => gap.options) : task().options);
  }
  if (isStory() || passage) {
    const gap = parseFloat(getComputedStyle(content).rowGap);
    const reserved = content.querySelector(".skill-line").offsetHeight + gap + 12;
    let measureAnswers;
    if (isStory()) {
      const messageSpace = parseFloat(getComputedStyle($("feedback")).lineHeight) * 3 + 2 * gap;
      const cache = new Map();
      measureAnswers = (indices, page) => {
        if (!indices.length) return 0;
        const key = page + ":" + indices.join(",");
        if (!cache.has(key)) {
          const options = storyOptions(indices.map((index) => chapter().gaps[index]), page);
          ruler.replaceChildren(...options.map((option) => makeTile(option)));
          cache.set(key, ruler.offsetHeight + messageSpace);
        }
        return cache.get(key);
      };
    }
    readingPages = paginate(passage ? passageForCheck() : storyText(),
      passage ? "reading-clue" : "prompt", content.clientHeight - reserved, content.clientWidth, measureAnswers);
  } else readingPages = [];
  ruler?.remove();
  const gapPage = revealGap && isStory() ? readingPages.findIndex((page) => gapNumbers(page).includes(task().gapIndex)) : -1;
  showReadingPage(gapPage >= 0 ? gapPage : Math.min(readingPage, Math.max(0, readingPages.length - 1)));
}

function prepareTask() {
  selected = solved() ? task().options[0] : responseFor(task().id) ?? null;
  if (isStory()) return;
  renderChoices();
  if (solved()) message("✓ You got it!", "correct");
  else if (answered(task().id)) message("Your answer is saved. Try again or go on.", "retry");
  else message(task().kind === "drag" ? "Drag a tile into the blank." : "Pick an answer and tap Check.");
}

function updateTaskHeading() {
  if (isStory()) {
    const gaps = chapter().gaps;
    const count = gaps.filter((gap) => answered(gap.id)).length;
    $("skill").textContent = pageGaps().length ? `Fill the blanks · ${count} of ${gaps.length} tried` : "Read the story";
    return;
  }
  const sectionTasks = chapter().tasks.filter((item) => item.section === task().section);
  const number = sectionTasks.indexOf(task()) + 1;
  $("skill").textContent = sectionTasks.length > 1 ? `Question ${number} of ${sectionTasks.length}` : task().skill;
}

function showReadingPage(page) {
  readingPage = page;
  const label = $("page-label");
  label.hidden = readingPages.length < 2;
  label.textContent = `Page ${page + 1} of ${readingPages.length}`;
  const visibleGaps = isStory() ? pageGaps() : [];
  if (isStory()) {
    selected = null;
    renderChoices();
    const tried = visibleGaps.length > 0 && visibleGaps.every((gap) => answered(gap.id));
    const complete = tried && visibleGaps.every(gapSolved);
    message(complete ? "✓ You filled every blank on this page!" : tried
      ? "You tried every blank. Try again or go on." : "Drop a tile into each blank to go on.", complete ? "correct" : "");
  }
  if (passageIsOpen()) $("reading-clue").textContent = gapText(readingPages[page] ?? passageForCheck());
  else renderPrompt();
  const hasGap = !isStory() || visibleGaps.length > 0;
  updateTaskHeading();
  $("choices").hidden = !hasGap;
  $("feedback").hidden = !hasGap;
  syncNavigation();
}

function earlierSectionsDone(section) {
  return chapter().tasks.every((item) => item.section >= section || answered(item.id));
}

function nextNeedsAnswer() {
  if (summary || passageIsOpen()) return false;
  if (isStory()) {
    const seen = readingPages.slice(0, readingPage + 1).flatMap(gapNumbers);
    return seen.some((index) => !answered(chapter().gaps[index].id));
  }
  const upToCurrent = chapter().tasks.slice(0, chapter().tasks.indexOf(task()) + 1);
  return upToCurrent.some((item) => !answered(item.id));
}

function syncNavigation() {
  const passage = passageIsOpen();
  const hasMoreText = readingPage < readingPages.length - 1;
  const upcoming = tracks[level][position + 1];
  let nextLabel = "Next →";
  if (!upcoming) nextLabel = "Finish";
  else if (upcoming.chapterIndex === chapterIndex() && upcoming.task.section === task().section) {
    nextLabel = "Next question →";
  }
  $("check").hidden = task().kind !== "choice" || passage || summary;
  $("back").disabled = chapterIndex() === 0 && isStory() && readingPage === 0 && !summary;
  $("next").hidden = summary;
  $("next").disabled = nextNeedsAnswer();
  $("next").title = $("next").disabled ? (isStory() ? "Try each blank before you go on." : "Try this activity before you go on.") : "";
  steps.forEach((button, section) => {
    button.disabled = !earlierSectionsDone(section);
    button.title = button.disabled ? "Try the earlier activities first." : "";
  });
  if (hasMoreText) $("next").textContent = "Next page →";
  else if (passage) $("next").textContent = "Back to question";
  else $("next").textContent = isStory() ? "Word work →" : nextLabel;
}

function passageIsOpen() {
  return $("question-content").dataset.passage === "true";
}

function setPassage(open) {
  $("question-content").dataset.passage = String(open);
  $("passage-toggle").setAttribute("aria-expanded", String(open));
  $("passage-toggle").textContent = open ? "Back to question" : "Read passage";
  readingPage = 0;
  readingPages = [];
}

function render(revealGap = false) {
  finishDrag();
  stopVoice();
  skipPointerClick = false;
  const scene = chapters[chapterIndex()];
  $("chapter-kicker").textContent = `CHAPTER ${chapterIndex() + 1} OF ${chapters.length}`;
  $("chapter-heading").textContent = scene.title;
  $("scene").src = "art/" + scene.image;
  $("scene").alt = scene.alt;
  $("scene-thumbnail").src = $("scene").src;
  $("scene-number").textContent = `CHAPTER ${chapterIndex() + 1} / ${chapters.length}`;
  $("scene-title").textContent = scene.title;
  $("chapter").value = String(chapterIndex());
  $("level").value = level;
  $("speed").value = rate;
  $("question-content").hidden = summary;
  $("summary").hidden = !summary;
  $("summary-line").textContent = `You tried ${answeredCount()} of ${taskCount()} activities and got ${scores[level].size} right. The crew kept their promise and made time for fun.`;
  steps.forEach((button, i) => button.setAttribute("aria-pressed", String(!summary && i === task().section)));
  $("reading-clue").hidden = task().kind !== "choice";
  $("passage-toggle").hidden = task().kind !== "choice";
  setPassage(false);
  $("reading-clue").textContent = gapText(passageForCheck());
  prepareTask();
  rebuildReading(revealGap);
  syncNavigation();
  renderProgress();
}

function goTo(index, revealGap = false) {
  summary = false;
  position = index;
  render(revealGap);
}

function check() {
  if (task().kind !== "choice" || selected === null || solved()) return;
  const correct = selected === task().options[0];
  recordAnswer(scoreKey(chapterIndex(), task().id), selected, correct);
  message((correct ? "✓ You got it!" : "Not quite.") + (task().clue ? " " + task().clue : ""), correct ? "correct" : "retry");
  updateChoices();
  syncNavigation();
  if (correct && !$("next").disabled) $("next").focus();
}

function buildWorksheet() {
  const scene = chapters[chapterIndex()];
  const sheet = $("worksheet");
  sheet.innerHTML = '<header><img alt=""><div><h1>High Park Leaf Crew</h1><p class="worksheet-meta"></p></div></header><p class="worksheet-passage"></p><div class="worksheet-tasks"></div>';
  sheet.querySelector(".worksheet-meta").textContent =
    `Nov 8 · Level ${level} · Chapter ${chapterIndex() + 1} · ${scene.title}`;
  const image = sheet.querySelector("img");
  image.src = "art/" + scene.image;
  image.alt = scene.alt;
  sheet.querySelector(".worksheet-passage").textContent = formatPassage(chapter(), (_, i) => `[${i + 1}] ____`);
  const questions = sheet.querySelector(".worksheet-tasks");
  const wordBank = document.createElement("p");
  wordBank.className = "worksheet-bank";
  wordBank.textContent = chapter().gaps.map((gap, i) =>
    `[${i + 1}] ${orderedOptions(gap, taskStart(chapterIndex()) + i).join(" / ")}`).join("     ");
  questions.append(wordBank);
  const responses = document.createElement("div");
  responses.className = "worksheet-responses";
  questions.append(responses);
  chapter().tasks.forEach((current, i) => {
    if (current.section === 0) return;
    const item = document.createElement("div");
    const prompt = document.createElement("strong");
    prompt.textContent = current.section === 1 ? `${current.skill} · ${gapText(current.text)}` : current.text;
    const options = document.createElement("p");
    const choices = orderedOptions(current, taskStart(chapterIndex()) + i);
    options.textContent = choices.map((choice, option) => `${"ABC"[option]}. ${choice}`).join("  ");
    item.append(prompt, options);
    responses.append(item);
  });
}

chapters.forEach((scene, i) => $("chapter").append(new Option(`${i + 1}. ${scene.title}`, i)));
$("chapter").addEventListener("change", () => goTo(taskStart(Number($("chapter").value))));
$("level").addEventListener("change", () => {
  const index = chapterIndex();
  level = $("level").value;
  save();
  goTo(taskStart(index));
});
function bindAdvance(button, action) {
  let handledTouch = false;
  button.addEventListener("pointerdown", () => { handledTouch = false; });
  // Chromium can swallow the first tap's click after a touch drag.
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

steps.forEach((button, i) => bindAdvance(button, () => {
  if (earlierSectionsDone(i)) goTo(taskStart(chapterIndex(), i));
}));
$("check").addEventListener("click", check);
function showPassage(open) {
  stopVoice();
  setPassage(open);
  rebuildReading();
}

$("back").addEventListener("click", () => {
  if (readingPage > 0 && !summary) {
    stopVoice();
    showReadingPage(readingPage - 1);
  } else if (passageIsOpen()) showPassage(false);
  else {
    const prior = isStory() ? taskStart(chapterIndex()) - 1 : position - 1;
    goTo(summary ? position : Math.max(0, prior), true);
  }
});
bindAdvance($("next"), () => {
  if (nextNeedsAnswer()) return;
  if (readingPage < readingPages.length - 1) {
    stopVoice();
    showReadingPage(readingPage + 1);
  } else if (passageIsOpen()) showPassage(false);
  else if (isStory()) goTo(taskStart(chapterIndex(), 1));
  else if (position < taskCount() - 1) goTo(position + 1);
  else {
    summary = true;
    render();
    $("review").focus();
  }
});
$("review").addEventListener("click", () => {
  const firstOpen = tracks[level].findIndex((entry) => !scores[level].has(scoreKey(entry.chapterIndex, entry.task.id)));
  goTo(Math.max(0, firstOpen), true);
});
$("listen").addEventListener("click", () => speaking ? stopVoice() : listen());
$("voice").addEventListener("click", () => {
  voiceOn = !voiceOn;
  stopVoice();
});
$("speed").addEventListener("change", () => {
  rate = $("speed").value;
  save();
  if (speaking) listen();
});
fontSlider.addEventListener("input", () => {
  applyFontSize();
  try { localStorage.setItem(fontPreferenceKey, fontSlider.value); } catch {}
});
window.addEventListener("storage", (event) => {
  if (event.key !== fontPreferenceKey && event.key !== null) return;
  fontSlider.value = event.newValue ?? defaultFontSize;
  applyFontSize();
});
function expandPicture() {
  const scene = chapters[chapterIndex()];
  $("expanded-title").textContent = scene.title;
  $("expanded-scene").src = $("scene").src;
  $("expanded-scene").alt = scene.alt;
  $("picture-dialog").showModal();
}
$("expand-picture").addEventListener("click", expandPicture);
$("expand-thumbnail").addEventListener("click", expandPicture);
$("passage-toggle").addEventListener("click", () => {
  showPassage(!passageIsOpen());
});
$("print").addEventListener("click", () => window.print());
window.addEventListener("beforeprint", buildWorksheet);
window.addEventListener("pagehide", stopVoice);
window.addEventListener("resize", () => rebuildReading());
applyFontSize();
render();
document.fonts.ready.then(() => rebuildReading());
