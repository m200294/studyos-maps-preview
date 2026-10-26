// Shared shell for the preview pages: brand bar, style tabs that keep the subject and topic,
// subject/topic pickers, and the side panel a click fills in (the app would open the tutor here).
(function () {
  const STYLES = [
    { file: "cards.html", name: "Cards", short: "Cards", group: "Text", hint: "One card per subtopic, concepts as chips. A chip marked + opens its details." },
    { file: "outline.html", name: "Outline", short: "Outline", group: "Text", hint: "A fold-out list. The arrow beside a concept opens its details." },
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
      <div class="row1"><a class="brand" href="index.html" title="Back to the start page" aria-label="StudyOS preview, back to the start page">StudyOS <span>preview</span></a><nav class="tabs" aria-label="View style">${tabs}</nav></div>
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
      const option = new Option(window.MAPS[s].subject, s, false, s === slug);
      // The current subject shows in the closed menu but is left out of the open list.
      if (s === slug) option.hidden = true;
      if (s === "five-rings") {
        // Browsers with customisable menus (newer Chrome) show the ring in the open list; others read only the text.
        option.className = "five";
        option.textContent = "";
        option.insertAdjacentHTML("beforeend", ring(false));
        const label = document.createElement("span");
        label.className = "five-label";
        label.textContent = window.MAPS[s].subject;
        option.append(label);
      }
      ps.add(option);
    }
    if (slug === "five-rings") {
      const pick = ps.closest(".pick");
      pick.classList.add("fire");
      ps.insertAdjacentHTML("beforebegin", ring(false));
    }
    // Customisable menus: show the chosen subject through <selectedcontent> so long names can be shortened with "…".
    if (CSS.supports && CSS.supports("appearance", "base-select")) ps.insertAdjacentHTML("afterbegin", "<button><selectedcontent></selectedcontent></button>");
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

  // The Book of Five Rings emblem (after Sol's "five arcs" reference): one ring, five sharp elemental arcs in
  // chapter order, each glowing in its own colour and rhythm. "full" adds the chapter cycle.
  let ringCount = 0;
  function ring(full) {
    const id = `rf${++ringCount}`;
    const P = (r, a) => [50 + r * Math.sin(a * Math.PI / 180), 50 - r * Math.cos(a * Math.PI / 180)].map((v) => v.toFixed(2));
    const tri = (t, c, w, h) => Math.max(0, h * (1 - Math.abs(t - c) / w)); // a sharp peak
    const lean = (t, c, w, h) => { const d = t < c ? (c - t) / (w * 1.8) : (t - c) / (w * 0.5); return d < 1 ? h * (1 - d) ** 1.4 : 0; };
    // Each element: angles, half-width profile and an outer-edge lift, both over t in 0..1 along the arc.
    // Each element: angles, a thickness profile and an outer-edge lift over t in 0..1; the inner edge stays a clean circle.
    const shapes = {
      earth: [-72, -30, (t) => 12, (t) => Math.max(tri(t, 0.2, 0.12, 2.5), tri(t, 0.48, 0.14, 4), tri(t, 0.78, 0.12, 2.5))],
      water: [-116, -76, (t) => 12 * Math.min(1, 0.45 + t * 1.6), (t) => Math.max(lean(t, 0.38, 0.16, 4.5), lean(t, 0.8, 0.13, 3.5))],
      wind: [-145, -120, (t) => 4 + 8 * Math.sin(Math.PI * t) ** 0.8, (t) => lean(t, 0.65, 0.2, 2.5)],
      void: [112, 210, (t) => 3 + 10 * Math.min(1, Math.sin(Math.PI * t) * 2.2) ** 0.7, () => 0],
      fire: [-26, 108, (t) => 12 * Math.min(1, 0.55 + t * 4), (t) => Math.max(...[[0.12, 11], [0.3, 15], [0.5, 11], [0.68, 9], [0.86, 6.5], [0.97, 3]].map(([c, h]) => lean(t, c, 0.09, h)))],
    };
    const shape = ([a0, a1, thick, lift], rIn = 30, scale = 1) => {
      const outer = [], inner = [];
      for (let i = 0; i <= 72; i++) {
        const t = i / 72, a = a0 + (a1 - a0) * t;
        outer.push(P(rIn + thick(t) * scale + lift(t) * scale, a));
        inner.push(P(rIn, a));
      }
      return `M${outer.map((p) => p.join(" ")).join("L")}L${inner.reverse().map((p) => p.join(" ")).join("L")}Z`;
    };
    const core = shape([-20, 98, (t) => 3 * Math.min(1, t * 6, (1 - t) * 6), (t) => shapes.fire[3](0.04 + t * 0.85) * 0.55], 37);
    const order = ["earth", "water", "fire", "wind", "void"];
    const glow = order.map((k) => `<g class="glow-wrap gw-${k}"><path class="glow glow-${k}" d="${shape(shapes[k])}" filter="url(#${id})"/></g>`).join("");
    const body = order.map((k) => `<path class="el el-${k}" d="${shape(shapes[k])}"/>`).join("");
    return `<svg class="ring${full ? " ring-full" : ""}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${full ? 3 : 2.2}"/></filter></defs>
      ${glow}${body}<path class="el fire-core" d="${core}"/></svg>`;
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

  // Map views: a full-screen toggle (the browser's own full screen where allowed, otherwise the map fills the window).
  function fullScreen() {
    const button = document.getElementById("full");
    if (!button) return;
    const open = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6V3h3M10 3h3v3M13 10v3h-3M6 13H3v-3"/></svg>';
    const close = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3v3H3M13 6h-3V3M10 13v-3h3M3 10h3v3"/></svg>';
    const set = (on) => {
      document.body.classList.toggle("full-map", on);
      button.innerHTML = on ? close : open;
      button.setAttribute("aria-label", on ? "Exit full screen" : "Full screen");
      button.title = button.getAttribute("aria-label");
      window.dispatchEvent(new Event("resize"));
    };
    button.onclick = () => {
      const on = !document.body.classList.contains("full-map");
      set(on);
      const root = document.documentElement;
      try {
        if (on && root.requestFullscreen) root.requestFullscreen().catch(() => {});
        else if (!on && document.fullscreenElement) document.exitFullscreen();
      } catch (e) { /* the window-filling mode still works */ }
    };
    document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && document.body.classList.contains("full-map")) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("full-map") && !document.fullscreenElement) set(false); });
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

  window.MapPage = { fullScreen, ring, header, topic, ask, count, accessible, zoomControls, STYLES, ICON };
})();
