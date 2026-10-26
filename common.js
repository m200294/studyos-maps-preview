// Shared shell for the preview pages: brand bar, style tabs that keep the subject and topic,
// subject/topic pickers, and the side panel a click fills in (the app would open the tutor here).
(function () {
  const STYLES = [
    { file: "outline.html", name: "Outline", short: "Outline", group: "Text", hint: "A fold-out list. The arrow beside a concept opens its details." },
    { file: "cards.html", name: "Cards", short: "Cards", group: "Text", hint: "One card per subtopic, concepts as chips. A chip marked + opens its details." },
    { file: "markmap.html", name: "Tree map", short: "Tree", group: "Map", hint: "The small circles fold and unfold branches. Drag to move; scroll or pinch to zoom." },
    { file: "jsmind.html", name: "Box map", short: "Box", group: "Map", hint: "The small circles fold and unfold branches. Drag to move around; scroll or pinch to zoom." },
    { file: "radial.html", name: "Radial map", short: "Radial", group: "Map", hint: "Topic in the middle, subtopics around it, concepts on the outer ring. A hollow dot opens details. Drag to move; scroll or pinch to zoom." },
  ];
  const KIND = { topic: "Topic", subtopic: "Subtopic", concept: "Concept", detail: "Detail" };
  const ICON = {
    prev: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    next: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"/></svg>',
    chevron: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>',
  };
  const params = new URLSearchParams(location.search);
  const slugs = Object.keys(window.MAPS);
  const slug = params.get("s") && Object.prototype.hasOwnProperty.call(window.MAPS, params.get("s")) ? params.get("s") : slugs[0];
  const topics = window.MAPS[slug].topics;
  const requestedTopic = Number(params.get("t") || 0);
  const topicIndex = Number.isInteger(requestedTopic) ? Math.max(0, Math.min(requestedTopic, topics.length - 1)) : 0;
  let selectionOrigin = null;
  let dismissCoach = () => {};
  const here = location.pathname.split("/").pop();
  const parents = new Map();
  (function walk(n, p) { parents.set(n.id, p); n.children.forEach((c) => walk(c, n)); })(topics[topicIndex], null);

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const query = (s, t) => `?s=${encodeURIComponent(s)}&t=${t}`;

  function header() {
    const style = STYLES.find((s) => s.file === here) || STYLES[0];
    document.title = `${style.name} · ${window.MAPS[slug].subject} · StudyOS preview`;
    const bar = document.createElement("header");
    bar.className = "bar";
    const tabs = ["Text", "Map"].map((g) => `<div class="group" role="group" aria-label="${g} views"><span class="glabel">${g}</span>${STYLES.filter((s) => s.group === g)
      .map((s) => `<a class="tab${s.file === here ? " on" : ""}"${s.file === here ? ' aria-current="page"' : ""} href="${s.file}${query(slug, topicIndex)}"><span class="long">${s.name}</span><span class="short">${s.short}</span></a>`).join("")}</div>`).join("");
    bar.innerHTML = `
      <div class="row1"><a class="brand" href="index.html" title="Back to the start page">StudyOS <span>preview</span></a><nav class="tabs" aria-label="View style">${tabs}</nav></div>
      <div class="row2">
        <label class="pick"><span>Subject</span><select id="pick-subject"></select></label>
        <label class="pick grow"><span>Topic</span><select id="pick-topic"></select></label>
        <span class="step">
          <button id="prev" class="icon" aria-label="Previous topic" title="Previous topic (←)">${ICON.prev}</button>
          <span class="count">${topicIndex + 1} of ${topics.length}</span>
          <button id="next" class="icon" aria-label="Next topic" title="Next topic (→)">${ICON.next}</button>
        </span>
      </div>`;
    document.body.prepend(bar);
    const ps = bar.querySelector("#pick-subject");
    for (const s of slugs) {
      const option = new Option(window.MAPS[s].subject + (s === "five-rings" ? " 🔥" : ""), s, false, s === slug);
      if (s === "five-rings") option.className = "fire-option";
      ps.add(option);
    }
    if (slug === "five-rings") {
      const pick = ps.closest(".pick");
      pick.classList.add("fire");
    }
    const pt = bar.querySelector("#pick-topic");
    topics.forEach((t, i) => pt.add(new Option(t.name, i, false, i === topicIndex)));
    ps.onchange = () => go(ps.value, 0);
    pt.onchange = () => go(slug, Number(pt.value));
    const prev = bar.querySelector("#prev"), next = bar.querySelector("#next");
    prev.disabled = topicIndex === 0;
    next.disabled = topicIndex === topics.length - 1;
    prev.onclick = () => go(slug, topicIndex - 1);
    next.onclick = () => go(slug, topicIndex + 1);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closePanel(); return; }
      if (e.defaultPrevented || e.target.closest("input, select, textarea") || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowLeft" && !prev.disabled) go(slug, topicIndex - 1);
      if (e.key === "ArrowRight" && !next.disabled) go(slug, topicIndex + 1);
    });
    coach(bar);

    const panel = document.querySelector("aside.chat");
    panel.className = "panel";
    panel.setAttribute("aria-label", "Selected item");
    panel.innerHTML = `
      <div id="status" class="empty" aria-live="polite">
        <p class="kind">Nothing selected yet</p>
        <p>Click any name to see what it is, where it sits and what's under it.</p>
      </div>
      <div class="howto"><h3>Using this view</h3><p>${style.hint}</p><p>The arrows beside the topic name, or ← → on your keyboard, step through the topics.</p></div>
      <p class="aside">In the real app, clicking opens a tutor chat about that item, right here beside the map.</p>`;
  }

  // One-time, two-step hint on a visitor's first study view: first the subject picker, then the topic picker.
  function coach(bar) {
    const KEY = "studyos-preview-coach-seen";
    const stores = ["localStorage", "sessionStorage"];
    const seen = stores.some((name) => {
      try { return !!window[name].getItem(KEY); } catch (e) { return false; }
    });
    if (seen) return;
    const row = bar.querySelector(".row2");
    const steps = [
      { targets: [bar.querySelector("#pick-subject")], text: "You can switch subjects from here.", button: "Next" },
      { targets: [bar.querySelector("#pick-topic"), ...bar.querySelectorAll(".step button.icon")], text: "A subject can have several topics. Change them here, or step through them with the arrows.", button: "Got it" },
    ];
    const tip = document.createElement("div");
    tip.className = "coach";
    tip.setAttribute("role", "region");
    tip.setAttribute("aria-label", "Getting started tips");
    tip.innerHTML = `<div role="status" aria-live="polite" aria-atomic="true"><p id="coach-step" class="coach-step"></p><p id="coach-text" class="coach-text"></p></div><button class="coach-ok" aria-describedby="coach-step coach-text"></button>`;
    bar.append(tip);
    bar.classList.add("coaching");
    let step = -1, done = false;
    const place = () => {
      if (done || step < 0) return;
      bar.style.setProperty("--coach-height", `${tip.offsetHeight}px`);
      const anchor = steps[step].targets[0].getBoundingClientRect(), box = bar.getBoundingClientRect();
      const left = Math.max(12, Math.min(anchor.left - box.left, box.width - tip.offsetWidth - 12));
      tip.style.left = `${left}px`;
      tip.style.setProperty("--arrow", `${Math.min(tip.offsetWidth - 20, Math.max(16, anchor.left - box.left - left + 28))}px`);
    };
    const show = (i) => {
      if (step >= 0) steps[step].targets.forEach((t) => t.classList.remove("coach-target"));
      step = i;
      tip.querySelector(".coach-step").textContent = `Tip ${i + 1} of ${steps.length}`;
      tip.querySelector(".coach-text").textContent = steps[i].text;
      tip.querySelector(".coach-ok").textContent = steps[i].button;
      steps[i].targets.forEach((t) => { t.classList.remove("coach-target"); void t.offsetWidth; t.classList.add("coach-target"); });
      place();
    };
    const dismiss = () => {
      if (done) return;
      done = true;
      for (const name of stores) {
        try { window[name].setItem(KEY, "1"); } catch (e) { /* browser may block storage */ }
      }
      if (tip.contains(document.activeElement)) steps[step].targets[0].focus({ preventScroll: true });
      bar.classList.remove("coaching");
      tip.inert = true;
      tip.setAttribute("aria-hidden", "true");
      tip.style.pointerEvents = "none";
      observer.disconnect();
      steps[step].targets.forEach((t) => t.classList.remove("coach-target"));
      tip.classList.add("leaving");
      setTimeout(() => tip.remove(), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300);
    };
    dismissCoach = dismiss;
    const observer = new ResizeObserver(place);
    observer.observe(tip);
    tip.querySelector(".coach-ok").onclick = () => (step < steps.length - 1 ? show(step + 1) : dismiss());
    row.addEventListener("pointerdown", dismiss, { once: true });
    row.addEventListener("change", dismiss, { once: true });
    bar.addEventListener("click", (e) => { if (e.target.closest("a")) dismiss(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") dismiss(); });
    window.addEventListener("resize", () => !done && place());
    show(0);
  }

  function go(s, t) {
    dismissCoach();
    location.search = query(s, t);
  }

  function topic() {
    return topics[topicIndex];
  }

  function closePanel() {
    if (!document.body.classList.contains("picked")) return;
    document.body.classList.remove("picked");
    if (selectionOrigin && selectionOrigin.isConnected) selectionOrigin.focus({ preventScroll: true });
  }

  // Give the existing name/branch controls native-button keyboard behaviour.
  function accessible(element, label) {
    element.tabIndex = 0;
    element.setAttribute("role", "button");
    element.setAttribute("aria-label", label);
    element.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); e.stopPropagation();
        element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    };
  }

  function zoomControls(zoomIn, zoomOut) {
    const tools = document.querySelector(".tools");
    for (const [id, label, path, action] of [
      ["zoom-in", "Zoom in", "M8 3v10M3 8h10", zoomIn],
      ["zoom-out", "Zoom out", "M3 8h10", zoomOut],
    ]) {
      const button = document.createElement("button");
      button.id = id; button.className = "zoom";
      button.setAttribute("aria-label", label); button.title = label;
      button.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${path}"/></svg>`;
      button.onclick = action; tools.append(button);
    }
  }

  function ask(node) {
    if (!node) return;
    dismissCoach();
    if (!document.body.classList.contains("picked")) selectionOrigin = document.activeElement;
    const path = [];
    for (let p = parents.get(node.id); p; p = parents.get(p.id)) path.unshift(p);
    const status = document.getElementById("status");
    status.className = "";
    status.innerHTML = `
      <button class="close icon" aria-label="Close">${ICON.close}</button>
      ${path.length ? `<p class="path">${path.map((p) => `<button data-id="${p.id}">${esc(p.name)}</button>`).join('<span aria-hidden="true">/</span>')}</p>` : ""}
      <p class="kind k-${node.kind}">${KIND[node.kind] || node.kind}</p>
      <h2 tabindex="-1">${esc(node.name)}</h2>
      ${node.line ? `<p class="line">${esc(node.line)}</p>` : `<div class="soon"><p class="soon-h">In the app</p><p>A short, plain-English explanation of <b>${esc(node.name)}</b> appears here, so you get the gist before you study it. Still unclear? Ask the tutor right from this panel.</p></div>`}
      ${node.children.length ? `<p class="inside">Inside (${node.children.length})</p><ul class="kids">${node.children.map((c) => `<li><button data-id="${c.id}">${esc(c.name)}</button></li>`).join("")}</ul>` : ""}
      <p class="ask-tutor" role="note"><span class="fake-btn">Ask the tutor about this</span><span class="soon-note">Coming in the app</span></p>`;
    const byId = new Map([...path, ...node.children].map((n) => [String(n.id), n]));
    status.querySelectorAll("button[data-id]").forEach((b) => (b.onclick = () => ask(byId.get(b.dataset.id))));
    status.querySelector(".close").onclick = (e) => { e.stopPropagation(); closePanel(); };
    void status.offsetWidth;
    status.classList.add("flash");
    document.body.classList.add("picked");
    const panel = document.querySelector(".panel");
    panel.classList.add("has-selection");
    panel.scrollTop = 0;
    status.querySelector("h2").focus({ preventScroll: true });
  }

  function count(node) {
    return 1 + node.children.reduce((n, c) => n + count(c), 0);
  }

  window.MapPage = { header, topic, ask, count, accessible, zoomControls, STYLES, ICON };
})();
