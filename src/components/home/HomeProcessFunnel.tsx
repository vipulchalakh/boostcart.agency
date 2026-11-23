"use client";

import { useEffect, useRef, useState } from "react";
import { funnelSteps as STEPS } from "@content/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const N = STEPS.length;
/** Scroll distance per step, in viewport heights. */
const STEP_VH = 70;
const STICKY_TOP = "6.5rem";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Homepage "How we work": a 3D funnel that fills tier by tier as you scroll, with the step copy beside it. */
export function HomeProcessFunnel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fwrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capTopRef = useRef<HTMLDivElement>(null);
  const capLoopRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  const [shown, setShown] = useState(0);
  const [out, setOut] = useState(false);
  const [noGl, setNoGl] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const canvas = canvasRef.current!, fwrap = fwrapRef.current!, track = trackRef.current!, stage = stageRef.current!;
      const labs = labRefs.current, capTop = capTopRef.current!, capLoop = capLoopRef.current!, hint = hintRef.current!;
      const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        setNoGl(true);
        return;
      }
      renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
      renderer.setClearColor(0x000000, 0);
      renderer.localClippingEnabled = true;

      /* ---------- scene ---------- */
      const HT = 6, R0 = 2.4, R1 = 1.07, CONE = 0.75, GAPH = 0.05, YTOP = HT / 2, RADIAL = 80;
      const rAt = (t: number) => (t >= CONE ? R1 : R0 - (R0 - R1) * (t / CONE)); // straight cone, then a cylindrical stem
      const yAt = (t: number) => YTOP - HT * t;
      const STOPS = ([[0, "#d6168c"], [0.38, "#ff5fb8"], [0.72, "#ffb4dc"], [1, "#f4ff6a"]] as const).map(([o, c]) => [o, new THREE.Color(c)] as const);
      const gradCol = (t: number) => {
        for (let i = 1; i < STOPS.length; i++) {
          if (t <= STOPS[i][0]) {
            const k = (t - STOPS[i - 1][0]) / (STOPS[i][0] - STOPS[i - 1][0]);
            return STOPS[i - 1][1].clone().lerp(STOPS[i][1], k);
          }
        }
        return STOPS[STOPS.length - 1][1].clone();
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      // three r155+ uses physical light units; × PI keeps the look of the original concept.
      scene.add(new THREE.AmbientLight(0xffffff, 0.82 * Math.PI));
      const key = new THREE.DirectionalLight(0xffffff, 0.65 * Math.PI);
      key.position.set(4, 7, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0xff5fb8, 0.5 * Math.PI, 30, 1);
      rim.position.set(-6, 1, 5);
      scene.add(rim);

      type Tier = { yT: number; h: number; yc: number; plane: InstanceType<typeof THREE.Plane>; fillMat: InstanceType<typeof THREE.MeshStandardMaterial>; ringMat: InstanceType<typeof THREE.MeshBasicMaterial> };
      const TIER: Tier[] = [];
      const shells: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < N; i++) {
        const a = i / N, b = (i + 1) / N, ta = a + GAPH / 2 / HT, tb = b - GAPH / 2 / HT;
        const yT = yAt(ta), yB = yAt(tb), h = yT - yB, yc = (yT + yB) / 2, rT = rAt(ta), rB = rAt(tb);
        // glass shell (the empty funnel)
        const shellMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, roughness: 0.25, metalness: 0, side: THREE.DoubleSide, depthWrite: false });
        const shell = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, RADIAL, 1, true), shellMat);
        shell.position.y = yc;
        shell.renderOrder = 2;
        shell.userData.i = i;
        scene.add(shell);
        shells.push(shell);
        // gradient "liquid" that pours in from the top as you scroll
        const fg = new THREE.CylinderGeometry(rT * 0.985, rB * 0.985, h, RADIAL, 1, true);
        const cT = gradCol(ta), cB = gradCol(tb), cols: number[] = [], cnt = fg.attributes.position.count, half = cnt / 2;
        for (let v = 0; v < cnt; v++) {
          const c = v < half ? cT : cB;
          cols.push(c.r, c.g, c.b);
        }
        fg.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -yT);
        const fillMat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.4, metalness: 0.05, emissive: 0xd6168c, emissiveIntensity: 0, clippingPlanes: [plane] });
        const fill = new THREE.Mesh(fg, fillMat);
        fill.position.y = yc;
        fill.renderOrder = 1;
        scene.add(fill);
        // rings that outline the tier
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xcfcfd8 });
        const mk = (r: number, y: number) => {
          const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.014, 6, RADIAL * 1.4), ringMat);
          m.rotation.x = Math.PI / 2;
          m.position.y = y;
          m.renderOrder = 3;
          scene.add(m);
        };
        mk(rT, yT);
        mk(rB, yB);
        TIER.push({ yT, h, yc, plane, fillMat, ringMat });
      }
      // big rim at the mouth + opening at the end of the stem
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xc9c9d3, roughness: 0.3 });
      const mouth = new THREE.Mesh(new THREE.TorusGeometry(R0, 0.035, 10, 160), rimMat);
      mouth.rotation.x = Math.PI / 2;
      mouth.position.y = YTOP + 0.02;
      scene.add(mouth);
      const spout = new THREE.Mesh(new THREE.TorusGeometry(R1, 0.03, 10, 100), rimMat);
      spout.rotation.x = Math.PI / 2;
      spout.position.y = yAt(1) - 0.02;
      scene.add(spout);

      // audit scan ring
      const scan = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 6, 100), new THREE.MeshBasicMaterial({ color: 0xd6168c, transparent: true, opacity: 0.9 }));
      scan.rotation.x = Math.PI / 2;
      scan.visible = false;
      scene.add(scan);

      // compounding loop: arc from the stem back to the mouth
      const loopCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -3.2, 0), new THREE.Vector3(-2.0, -3.75, 0), new THREE.Vector3(-3.5, -1.7, 0),
        new THREE.Vector3(-3.75, 1.4, 0), new THREE.Vector3(-2.9, 3.3, 0), new THREE.Vector3(-1.5, 3.75, 0),
      ]);
      const loopGeo = new THREE.TubeGeometry(loopCurve, 160, 0.022, 8, false);
      const loopIdx = loopGeo.index!.count;
      const loopMat = new THREE.MeshBasicMaterial({ color: 0xd6168c });
      scene.add(new THREE.Mesh(loopGeo, loopMat));
      loopGeo.setDrawRange(0, 0);
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 14), loopMat);
      arrow.position.copy(loopCurve.getPoint(1));
      arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), loopCurve.getTangent(1).normalize());
      arrow.visible = false;
      scene.add(arrow);

      /* ---------- sizing ---------- */
      let VWpx = 1, VHpx = 1, D = 16.5;
      const resize = () => {
        VWpx = fwrap.clientWidth || 1;
        VHpx = fwrap.clientHeight || 1;
        renderer.setSize(VWpx, VHpx, false);
        camera.aspect = VWpx / VHpx;
        camera.updateProjectionMatrix();
        const tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        D = Math.max(16.5, 7.4 / (2 * tanH * camera.aspect));
        const fs = clamp(VHpx * 0.027, 11, 18);
        labs.forEach((l) => l && (l.style.fontSize = `${fs}px`));
      };
      const ro = new ResizeObserver(resize);
      ro.observe(fwrap);

      /* ---------- step copy ---------- */
      let cur = 0, tmr = 0;
      const setStep = (i: number) => {
        if (i === cur) return;
        cur = i;
        clearTimeout(tmr);
        if (RM) { setShown(i); return; }
        setOut(true);
        tmr = window.setTimeout(() => { setShown(i); setOut(false); }, 190);
      };

      /* ---------- scroll ---------- */
      const stickyTop = () => parseFloat(getComputedStyle(stage).top) || 0;
      const total = () => track.offsetHeight - stage.offsetHeight;
      const scrollYFor = (p: number) => track.getBoundingClientRect().top + scrollY - stickyTop() + p * total();
      let pT = 0;
      const readScroll = () => {
        const tt = total();
        pT = tt > 0 ? clamp((stickyTop() - track.getBoundingClientRect().top) / tt) : 0;
      };
      addEventListener("scroll", readScroll, { passive: true });
      addEventListener("resize", readScroll);
      readScroll();
      let pS = pT;

      /* ---------- drag to tilt, click a tier to jump ---------- */
      let yawOff = 0, pitchOff = 0, moved = 0;
      let drag: { x: number; y: number; yaw: number; pitch: number } | null = null;
      const onDown = (e: PointerEvent) => {
        drag = { x: e.clientX, y: e.clientY, yaw: yawOff, pitch: pitchOff };
        moved = 0;
        canvas.style.cursor = "grabbing";
        canvas.setPointerCapture(e.pointerId);
      };
      const onMove = (e: PointerEvent) => {
        if (!drag) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        moved = Math.max(moved, Math.hypot(dx, dy));
        yawOff = clamp(drag.yaw - dx * 0.004, -0.9, 0.9);
        pitchOff = clamp(drag.pitch + dy * 0.12, -12, 22);
      };
      const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
      const onUp = (e: PointerEvent) => {
        canvas.style.cursor = "grab";
        if (drag && moved < 5) {
          const r = canvas.getBoundingClientRect();
          mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
          ray.setFromCamera(mouse, camera);
          const hit = ray.intersectObjects(shells)[0];
          if (hit) {
            scrollTo({ top: scrollYFor((hit.object.userData.i + 0.5) / N), behavior: RM ? "auto" : "smooth" });
          }
        }
        drag = null;
      };
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);

      /* ---------- main loop (runs only while the section is on screen) ---------- */
      let time = 0, last = performance.now(), raf = 0, visible = false;
      const v3 = new THREE.Vector3(), TX = -0.5;
      const toScreen = (x: number, y: number, z: number) => {
        v3.set(x, y, z).project(camera);
        return [(v3.x * 0.5 + 0.5) * VWpx, (-v3.y * 0.5 + 0.5) * VHpx];
      };
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        time += dt;
        pS += (pT - pS) * (1 - Math.exp(-dt * 7));
        const x = pS * N, idx = Math.min(N - 1, Math.floor(pT * N)), idxS = Math.min(N - 1, Math.floor(x));
        setStep(idx);
        hint.style.opacity = pT > 0.015 ? "0" : "1";
        if (!drag) {
          yawOff *= Math.exp(-dt * 1.6);
          pitchOff *= Math.exp(-dt * 1.6);
        }

        // camera: starts high (looking into the funnel), settles lower as it fills
        const el = THREE.MathUtils.degToRad(lerp(26, 13, pS) + pitchOff);
        const az = (RM ? 0 : Math.sin(time * 0.45) * 0.12) + yawOff;
        camera.position.set(TX + D * Math.sin(az) * Math.cos(el), D * Math.sin(el), D * Math.cos(az) * Math.cos(el));
        camera.lookAt(TX, 0, 0);
        camera.updateMatrixWorld();

        for (let i = 0; i < N; i++) {
          const T = TIER[i], f = clamp(x - i), on = i === idxS && x > 0.02;
          T.plane.constant = -(T.yT - f * T.h);
          T.fillMat.emissiveIntensity = on ? 0.28 : 0;
          T.ringMat.color.set(on ? 0xd6168c : 0xcfcfd8);
          const lab = labs[i];
          if (lab) {
            const r = rAt((i + 0.5) / N), p = toScreen(r * Math.sin(az), T.yc, r * Math.cos(az));
            lab.style.transform = `translate(${p[0].toFixed(1)}px,${p[1].toFixed(1)}px) translate(-50%,-50%)`;
            lab.style.color = f > 0.5 ? (i < 3 ? "#fff" : "#3a1030") : i === idxS ? "var(--ink)" : "";
            lab.style.textShadow = f > 0.5 ? "none" : "";
          }
        }
        // audit scan
        if (idx === 0 && pT > 0) {
          const t = (time * 0.32) % 1;
          scan.visible = true;
          scan.position.y = yAt(t);
          scan.scale.setScalar(rAt(t) + 0.03);
        } else scan.visible = false;
        // loop back to the top
        const lp = clamp(x - (N - 1));
        loopGeo.setDrawRange(0, Math.floor((lp * loopIdx) / 48) * 48);
        arrow.visible = lp > 0.97;
        capLoop.style.opacity = lp > 0.5 ? "1" : "0";

        let p = toScreen(0, YTOP + 0.7, 0);
        capTop.style.transform = `translate(${p[0]}px,${p[1]}px) translate(-50%,-50%)`;
        p = toScreen(-3.95, 0, 0);
        capLoop.style.transform = `translate(${p[0]}px,${p[1]}px) translate(-50%,-50%) rotate(180deg)`;

        renderer.render(scene, camera);
        raf = visible ? requestAnimationFrame(frame) : 0;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(stage);
      resize();
      renderer.render(scene, camera);

      cleanup = () => {
        cancelAnimationFrame(raf);
        clearTimeout(tmr);
        io.disconnect();
        ro.disconnect();
        removeEventListener("scroll", readScroll);
        removeEventListener("resize", readScroll);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          if (m.geometry) m.geometry.dispose();
          if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => mt.dispose());
        });
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const s = STEPS[shown];

  return (
    <section aria-labelledby="process-title" className="bg-ink-02 py-[var(--section-y)]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="process-title" className="h2 mt-4">From audit to compounding growth</h2>
          <p className="lead mt-4">Eight steps that turn organic demand into orders, then feed every result back into the next cycle.</p>
        </Reveal>

        {/* Full step list for screen readers and search engines; the visual below is scroll-driven. */}
        <ol className={cn(noGl ? "mt-10 grid gap-3 md:grid-cols-2" : "sr-only")}>
          {STEPS.map((st, i) => (
            <li key={st.name} className={cn(noGl && "rounded-xl border border-ink-05 bg-white p-5")}>
              <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                <span className="mr-2 font-mono text-xs text-accent-strong">0{i + 1}</span>
                {st.name}
              </h3>
              <p className="mt-2 font-medium text-ink">{st.tagline}</p>
              <p className="mt-2 text-ink-68">{st.body}</p>
              <p className="mt-2 text-sm text-ink-68">Instead of {st.old.toLowerCase()}: {st.ours.toLowerCase()}.</p>
              <p className="mt-2 text-sm text-ink-68">You get: {st.outputs.join(", ")}.</p>
            </li>
          ))}
        </ol>
      </div>

      {!noGl && (
        <div ref={trackRef} aria-hidden className="relative mt-6" style={{ height: `calc(100svh - 7.5rem + ${N * STEP_VH}svh)` }}>
          <div
            ref={stageRef}
            className="container-x sticky flex min-h-[520px] flex-col"
            style={{ top: STICKY_TOP, height: "calc(100svh - 7.5rem)" }}
          >
            <div className="relative grid min-h-0 flex-1 grid-rows-[44%_1fr] gap-2 lg:grid-cols-[54%_1fr] lg:grid-rows-1 lg:gap-0">
              {/* Funnel */}
              <div ref={fwrapRef} className="relative h-full min-h-0">
                <canvas ref={canvasRef} className="absolute inset-0 block size-full cursor-grab touch-pan-y" />
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {STEPS.map((st, i) => (
                    <div
                      key={st.name}
                      ref={(el) => { labRefs.current[i] = el; }}
                      className="absolute left-0 top-0 whitespace-nowrap font-sans text-[17px] font-bold tracking-[-0.02em] text-[#8a8a96] transition-colors duration-300 will-change-transform [text-shadow:0_0_6px_rgb(255_255_255/.9),0_0_2px_rgb(255_255_255/.9)]"
                    >
                      {st.name}
                    </div>
                  ))}
                  <div ref={capTopRef} className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10.5px] font-medium tracking-[0.14em] text-[#8a8a94] will-change-transform">ORGANIC DEMAND</div>
                  <div ref={capLoopRef} className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.16em] text-accent-strong opacity-0 transition-opacity duration-400 will-change-transform [writing-mode:vertical-rl]">EVERY CYCLE STARTS WITH BETTER DATA</div>
                </div>
              </div>

              <div className="absolute bottom-3 right-0 z-[5] flex items-center gap-2.5 max-lg:hidden">
                <span ref={hintRef} className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-[#8a8a94] transition-opacity duration-300">SCROLL &darr; &nbsp; DRAG TO TILT</span>
              </div>

              {/* Step copy */}
              <div className="relative z-[3] flex min-h-0 flex-col lg:justify-center lg:pl-8">
                <div className={cn("transition-[opacity,transform] duration-200 motion-reduce:transition-none", out && "translate-y-3.5 opacity-0")}>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-strong">
                    Step {shown + 1} of {N} · {s.name}
                  </p>
                  <p className="mt-3 max-w-[20ch] font-serif text-[21px] font-medium leading-[1.2] tracking-[-0.01em] text-ink lg:text-[clamp(24px,2.6vw,34px)]">{s.tagline}</p>
                  <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.65] text-ink-68 lg:mt-4 lg:text-[clamp(14px,1.15vw,15.5px)]">{s.body}</p>
                  <div className="mt-3 max-w-[46ch] text-[12.5px] leading-[1.5] text-ink lg:mt-[18px] lg:text-[13.5px]">
                    <small className="mb-[7px] block font-mono text-[10px] font-medium leading-none tracking-[0.14em] text-accent-strong">THE DIFFERENCE</small>
                    <s className="text-ink-50 decoration-accent">{s.old}</s> &rarr; <b className="font-semibold">{s.ours}</b>
                  </div>
                  <p className="mt-3 font-mono text-[10.5px] font-medium leading-none tracking-[0.14em] text-ink-68 lg:mt-5">YOU GET</p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {s.outputs.map((o) => (
                      <li key={o} className="rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-medium text-accent-strong lg:px-[13px] lg:py-2 lg:text-[13px]">{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
