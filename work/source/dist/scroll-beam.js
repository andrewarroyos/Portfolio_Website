(() => {
  const canvas = document.querySelector('.scroll-beam');
  const shell = document.querySelector('.page-shell');
  const context = canvas?.getContext('2d');
  if (!context || !shell) return;

  // Project sidebar text onto the rail, leaving a clean break around each block.
  const blockers = [...document.querySelectorAll('.eyebrow, .section-label > *, .footer-mark')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let width = 0;
  let height = 0;
  let scale = 0;

  function draw() {
    frame = 0;
    const nextWidth = innerWidth;
    const nextHeight = innerHeight;
    const nextScale = Math.min(devicePixelRatio || 1, 2);
    if (width !== nextWidth || height !== nextHeight || scale !== nextScale) {
      width = nextWidth;
      height = nextHeight;
      scale = nextScale;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
    }
    context.clearRect(0, 0, width, height);

    const shellRect = shell.getBoundingClientRect();
    const x = Math.max(7, shellRect.left - (width <= 540 ? 12 : 24));
    const start = Math.max(0, document.querySelector('.site-header').getBoundingClientRect().bottom + 24);
    const end = Math.min(height, shellRect.bottom - 24);
    const tip = height / 2;
    const gaps = blockers.map(element => {
      const rect = element.getBoundingClientRect();
      return [rect.top - 12, rect.bottom + 12];
    }).sort((a, b) => a[0] - b[0]);
    const segments = [];
    let cursor = start;
    for (const [top, bottom] of gaps) {
      if (bottom <= cursor || top >= end) continue;
      if (top > cursor) segments.push([cursor, Math.min(top, end)]);
      cursor = Math.max(cursor, bottom);
    }
    if (cursor < end) segments.push([cursor, end]);

    const spectrum = context.createLinearGradient(0, 0, 0, height);
    spectrum.addColorStop(0, '#7768ff');
    spectrum.addColorStop(.32, '#8aa7ff');
    spectrum.addColorStop(.5, '#75edff');
    spectrum.addColorStop(1, '#7768ff');
    function stroke(top, bottom, color, thickness, glow = 0) {
      if (bottom <= top) return;
      context.beginPath();
      context.moveTo(x, top);
      context.lineTo(x, bottom);
      context.lineWidth = thickness;
      context.lineCap = 'butt';
      context.strokeStyle = color;
      context.shadowColor = '#719fff';
      context.shadowBlur = glow;
      context.stroke();
      context.shadowBlur = 0;
    }
    for (const [top, bottom] of segments) {
      // Clip the bloom too: light never bridges the text interruptions.
      context.save();
      context.beginPath();
      context.rect(0, top, width, bottom - top);
      context.clip();
      stroke(top, bottom, '#202838', 2);
      const litEnd = Math.min(bottom, tip);
      stroke(top, litEnd, spectrum, 3, reducedMotion.matches ? 0 : 12);
      stroke(top, litEnd, '#d9f8ff', 1);
      if (tip >= top && tip < bottom) {
        stroke(Math.max(top, tip - 9), tip, '#efffff', 3, reducedMotion.matches ? 0 : 16);
      }
      context.restore();
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(draw);
  }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  document.addEventListener('toggle', schedule, true);
  reducedMotion.addEventListener('change', schedule);
  new ResizeObserver(schedule).observe(shell);
  document.fonts.ready.then(schedule);
  schedule();
})();
