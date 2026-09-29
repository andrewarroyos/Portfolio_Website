(() => {
  const track = document.querySelector('#project-track');
  if (!track) return;
  const cards = [...track.querySelectorAll('.project')];
  const carousel = track.closest('.project-carousel');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const count = carousel.querySelector('.carousel-count');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let pointer = null;
  let suppressClick = false;
  let frame = 0;

  function positions() {
    const left = track.getBoundingClientRect().left;
    const max = track.scrollWidth - track.clientWidth;
    return cards.map(card => Math.max(0, Math.min(max,
      card.getBoundingClientRect().left - left + track.scrollLeft - 6)));
  }
  function update() {
    const stops = positions();
    active = stops.reduce((best, value, i) =>
      Math.abs(value - track.scrollLeft) < Math.abs(stops[best] - track.scrollLeft) ? i : best, 0);
    const label = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (count.textContent !== label) count.textContent = label;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function go(index) {
    const bounded = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({left: positions()[bounded], behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }
  prev.addEventListener('click', () => go(active - 1));
  next.addEventListener('click', () => go(active + 1));
  track.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
  }, {passive: true});
  track.addEventListener('keydown', event => {
    const targets = {ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: cards.length - 1};
    if (!(event.key in targets)) return;
    event.preventDefault();
    go(targets[event.key]);
  });
  track.addEventListener('pointerdown', event => {
    // Touch keeps native horizontal swiping and vertical page scrolling.
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('.project-body')) return;
    suppressClick = false;
    pointer = {id: event.pointerId, x: event.clientX, left: track.scrollLeft, dragging: false};
  });
  track.addEventListener('pointermove', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const delta = event.clientX - pointer.x;
    if (!pointer.dragging && Math.abs(delta) > 7) {
      pointer.dragging = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }
    if (!pointer.dragging) return;
    event.preventDefault();
    track.scrollLeft = pointer.left - delta;
  });
  function finish(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dragged = pointer.dragging;
    suppressClick = dragged;
    pointer = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    if (dragged) { update(); go(active); }
  }
  track.addEventListener('pointerup', finish);
  track.addEventListener('pointercancel', finish);
  track.addEventListener('lostpointercapture', finish);
  track.addEventListener('pointerleave', event => { if (pointer && !pointer.dragging) finish(event); });
  track.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }
  }, true);
  // Retain one expanded project even in browsers without details[name] support.
  cards.forEach(card => card.addEventListener('toggle', () => {
    if (card.open) cards.forEach(other => { if (other !== card) other.open = false; });
  }));
  function revealLinkedProject() {
    const card = cards.find(card => `#${card.id}` === location.hash);
    if (card) { card.open = true; go(cards.indexOf(card)); }
  }
  window.addEventListener('hashchange', revealLinkedProject);
  new ResizeObserver(update).observe(track);
  carousel.querySelector('.carousel-controls').hidden = false;
  update();
  revealLinkedProject();
})();
