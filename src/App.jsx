/*
Lens Bros | VEYNEM — Single Page Portfolio (with Custom Camera Cursor)
Stack: React (single-file), Tailwind CSS, GSAP (ScrollTrigger + cursor animation)
- Mobile responsive
- Real, working demo images (Unsplash)
- Custom camera cursor with hover/tap states + shutter click animation
- Smooth section reveals + grid stagger

Tip: Replace image URLs with your own later. All animations work without additional config.
*/

import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CameraIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);



export default function LensBrosPortfolio() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const cursorRef = useRef(null);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    // ===== Custom cursor (desktop / pointer: fine) =====
    const mm = window.matchMedia('(pointer: fine)');
    let moveHandler, downHandler, upHandler;

    if (mm.matches && cursorRef.current && rootRef.current) {
      const cursor = cursorRef.current;
      const root = rootRef.current;
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.9 });

      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });

      moveHandler = (e) => {
        const { clientX, clientY } = e;
        xTo(clientX);
        yTo(clientY);
      };
      root.addEventListener('mousemove', moveHandler);

      // Hover states for interactive elements
      const hoverables = root.querySelectorAll('a, button, input, textarea, [data-cursor]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const mode = el.getAttribute('data-cursor') || 'tap';
          if (mode === 'view') {
            gsap.to(cursor, { scale: 1.25, backgroundColor: 'rgba(251, 191, 36, 0.15)', borderColor: 'rgb(245, 158, 11)', duration: 0.2 });
            gsap.to(cursor.querySelector('.cursor-icon'), { rotate: 8, duration: 0.2 });
          } else {
            gsap.to(cursor, { scale: 1.15, backgroundColor: 'rgba(15, 23, 42, 0.08)', borderColor: 'rgb(71, 85, 105)', duration: 0.2 });
            gsap.to(cursor.querySelector('.cursor-icon'), { rotate: 0, duration: 0.2 });
          }
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 0.95, backgroundColor: 'rgba(255,255,255,0.5)', borderColor: 'rgba(15,23,42,0.2)', duration: 0.25 });
          gsap.to(cursor.querySelector('.cursor-icon'), { rotate: 0, duration: 0.25 });
        });
      });

      // Shutter click feedback
      downHandler = () => {
        gsap.to(cursor, { scale: 0.8, duration: 0.08 });
        const ring = cursor.querySelector('.cursor-ring');
        gsap.fromTo(
          ring,
          { scale: 0.8, opacity: 0.9 },
          { scale: 1.5, opacity: 0, duration: 0.35, ease: 'power2.out' }
        );
      };
      upHandler = () => gsap.to(cursor, { scale: 1.0, duration: 0.12 });

      root.addEventListener('mousedown', downHandler);
      root.addEventListener('mouseup', upHandler);
    }

    // ===== Hero intro =====
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current?.querySelectorAll('.hero-item') || [], {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Reveal sections on scroll
      revealRefs.current.forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.05 * i,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        });
      });

      // Portfolio grid stagger
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scale: 0.98,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' }
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      if (rootRef.current) {
        if (moveHandler) rootRef.current.removeEventListener('mousemove', moveHandler);
        if (downHandler) rootRef.current.removeEventListener('mousedown', downHandler);
        if (upHandler) rootRef.current.removeEventListener('mouseup', upHandler);
      }
    };
  }, []);

  // ===== Demo images (Unsplash) — replace later =====
  const portfolio = [
    // Weddings
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1600&auto=format&fit=crop&q=80',
    // Events
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517456793572-9c6465d2a1f2?w=1600&auto=format&fit=crop&q=80',
    // Brands / Products
    'https://images.unsplash.com/photo-1520975698511-1c2f3b4e6f0b?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515165562835-c3b8c16df4a2?w=1600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=1600&auto=format&fit=crop&q=80'
  ];
/* honey madarchod tu bnega photographer lawda mera  */
  return (
    <div ref={rootRef} className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-white text-slate-900 selection:bg-amber-200/60">
      {/* CUSTOM CURSOR (desktop only) */}
      <div
        ref={cursorRef}
        aria-hidden
        className="hidden md:flex fixed z-[100] top-0 left-0 w-8 h-8 rounded-full border border-slate-300/50 bg-white/60 backdrop-blur cursor-none pointer-events-none items-center justify-center drop-shadow-sm"
      >
        <div className="cursor-ring absolute inset-0 rounded-full border border-amber-500/60" />
        <CameraIcon className="cursor-icon w-4 h-4 text-slate-700" />
      </div>

      {/* NAV */}
      <nav className="fixed w-full z-40 backdrop-blur bg-white/60 border-b border-white/30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-extrabold tracking-tight text-amber-600">Lens Bros</div>
            <div className="text-sm text-slate-700">| VEYNEM</div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#portfolio" className="hover:text-amber-600" data-cursor="tap">Portfolio</a>
            <a href="#services" className="hover:text-amber-600" data-cursor="tap">Services</a>
            <a href="#about" className="hover:text-amber-600" data-cursor="tap">About</a>
            <a href="#contact" className="hover:text-amber-600 font-semibold" data-cursor="tap">Book</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header ref={heroRef} className="pt-28 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="hero-item text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Lens Bros — <span className="text-amber-600">Photography</span> & <span className="text-amber-500">Videography</span>
            </h1>
            <p className="hero-item text-lg text-slate-700 max-w-xl">Weddings • Events • Brands. Capturing moments with cinematic storytelling and vibrant edits. Based in Delhi — DM to book.</p>

            <div className="hero-item flex flex-wrap gap-4 items-center">
              <a href="mailto:lensbross@gmail.com" className="inline-flex items-center gap-3 bg-amber-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition" data-cursor="tap">Book Now</a>
              <a href="https://instagram.com/editsbywaynem" target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-amber-600" data-cursor="tap">@editsbywaynem</a>
              <a href="https://instagram.com/vey9x" target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-amber-600" data-cursor="tap">@vey9x</a>
            </div>
{/* baap ne kiya hai kbhi code  */}
            <div className="hero-item mt-1 text-sm text-slate-500">📍 Delhi • 🎬 Weddings | Events | Brands</div>

            <div className="hero-item mt-6 flex gap-3">
              <a href="#portfolio" className="px-4 py-2 border border-amber-200 rounded-full text-amber-600 hover:bg-amber-50" data-cursor="tap">View Work</a>
              <a href="#contact" className="px-4 py-2 bg-white/70 border border-white rounded-full shadow-sm" data-cursor="tap">Get an Estimate</a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
              <img src={portfolio[0]} alt="hero" className="w-full h-96 object-cover" data-cursor="view" />
            </div>

            <div className="absolute -bottom-8 -left-6 w-44 md:w-52 rounded-2xl overflow-hidden shadow-lg border border-white">
              <img src={portfolio[1]} alt="side" className="w-full h-36 md:h-40 object-cover" data-cursor="view" />
            </div>

            <div className="absolute -top-6 -right-6 w-32 md:w-40 rounded-2xl overflow-hidden shadow-lg border border-white">
              <img src={portfolio[2]} alt="side2" className="w-full h-32 md:h-40 object-cover" data-cursor="view" />
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={addToRefs} className="mb-6">
            <h2 className="text-3xl font-bold">What we do</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">Cinematic wedding films, event coverage, and brand storytelling with a light and vibrant aesthetic. We handle pre-production, shooting, editing and deliverables.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div ref={addToRefs} className="p-6 rounded-2xl bg-white shadow hover:shadow-xl transition" data-cursor="tap">
              <h3 className="font-semibold text-lg">Weddings</h3>
              <p className="text-sm text-slate-600 mt-3">Full day coverage, cinematic highlight reels, social cuts and raw footage options.</p>
            </div>
            <div ref={addToRefs} className="p-6 rounded-2xl bg-white shadow hover:shadow-xl transition" data-cursor="tap">
              <h3 className="font-semibold text-lg">Events</h3>
              <p className="text-sm text-slate-600 mt-3">Conferences, concerts, private parties — coverage tailored to the vibe.</p>
            </div>
            <div ref={addToRefs} className="p-6 rounded-2xl bg-white shadow hover:shadow-xl transition" data-cursor="tap">
              <h3 className="font-semibold text-lg">Brands</h3>
              <p className="text-sm text-slate-600 mt-3">Product shoots, brand films and social media content packages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-12 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={addToRefs} className="mb-6">
            <h2 className="text-3xl font-bold">Selected Work</h2>
            <p className="text-slate-600 mt-2 max-w-2xl">A mix of wedding highlights, event storytelling, and brand visuals. Click any image to view full resolution.</p>
          </div>

          <div ref={gridRef} className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.map((img, idx) => (
              <a key={img} href={img} target="_blank" rel="noreferrer" className="group rounded-xl overflow-hidden relative" data-cursor="view">
                <img src={img} alt={`portfolio-${idx}`} className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <div className="text-white">
                    <div className="text-sm font-semibold">Lens Bros</div>
                    <div className="text-xs mt-1">Photography • Videography</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section id="about" className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div ref={addToRefs}>
            <h2 className="text-3xl font-bold">About Lens Bros</h2>
            <p className="text-slate-600 mt-3">We are a duo based in Delhi blending cinematic camera work with vibrant color grading. We value emotion, timing, and craft — every shoot is an opportunity to tell a story.</p>

            <ul className="mt-4 text-slate-600 space-y-2">
              <li>🎥 Cinematic storytelling</li>
              <li>📸 Editorial & candid photography</li>
              <li>🕒 Timely delivery & quick social cuts</li>
            </ul>
{/* lund bnega tumse yeh sb  */}
            <div className="mt-6 flex gap-3">
              <a href="mailto:lensbross@gmail.com" className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium" data-cursor="tap">Email Us</a>
              <a href="https://instagram.com/editsbywaynem" target="_blank" rel="noreferrer" className="px-4 py-2 border rounded-lg" data-cursor="tap">Instagram</a>
            </div>
          </div>

          <div ref={addToRefs} className="rounded-2xl overflow-hidden shadow-lg">
            <img src={portfolio[3]} alt="about" className="w-full h-96 object-cover" data-cursor="view" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">Loved by clients</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-amber-50 shadow" data-cursor="tap">
              <p className="text-slate-700">"Cinematic, professional and so easy to work with — delivered beyond expectations."</p>
              <div className="mt-4 text-sm text-slate-600">— Client, Wedding</div>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50 shadow" data-cursor="tap">
              <p className="text-slate-700">"Fast edits and a beautiful color grade. Our brand film looks amazing."</p>
              <div className="mt-4 text-sm text-slate-600">— Brand Manager</div>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50 shadow" data-cursor="tap">
              <p className="text-slate-700">"Highly recommended for events. Captured the vibe perfectly."</p>
              <div className="mt-4 text-sm text-slate-600">— Event Organizer</div>
            </div>
          </div>
        </div>
      </section>
{/* nhi hoga tumse bsdk  */}
      {/* CONTACT / BOOK */}
      <section id="contact" className="py-12 bg-amber-100">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">Ready to book?</h3>
            <p className="text-slate-700 mt-2">Tell us about your project — date, location, and the vibe you want. We’ll get back with availability & a package estimate.</p>

            <div className="mt-6 space-y-3">
              <a href="mailto:lensbross@gmail.com?subject=Booking%20Inquiry" className="block px-5 py-3 bg-amber-600 text-white rounded-lg font-medium" data-cursor="tap">Email lensbross@gmail.com</a>
              <a href="https://instagram.com/editsbywaynem" target="_blank" rel="noreferrer" className="block px-5 py-3 border rounded-lg text-center" data-cursor="tap">Message on Instagram</a>
            </div>

            <div className="mt-6 text-sm text-slate-600">Available: Delhi | DM to Book • Response within 48 hours</div>
          </div>

          <form className="bg-white p-6 rounded-2xl shadow" onSubmit={(e)=>{e.preventDefault(); alert('Thanks! Email lensbross@gmail.com with details or DM on Instagram.')}}>
            <div className="grid grid-cols-1 gap-4">
              <input required placeholder="Your name" className="px-4 py-3 border rounded-lg" data-cursor="tap" />
              <input required type="email" placeholder="Email" className="px-4 py-3 border rounded-lg" data-cursor="tap" />
              <input placeholder="Phone (optional)" className="px-4 py-3 border rounded-lg" data-cursor="tap" />
              <input placeholder="Event date" onFocus={(e)=>e.target.type='date'} className="px-4 py-3 border rounded-lg" data-cursor="tap" />
              <textarea placeholder="Tell us about the shoot (location, vibe)" className="px-4 py-3 border rounded-lg min-h-[120px]" data-cursor="tap"></textarea>
              <button className="px-4 py-3 bg-amber-600 text-white rounded-lg font-medium" data-cursor="tap">Send Inquiry</button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} Lens Bros — VEYNEM</div>
          <div className="flex items-center gap-4">
            <a href="mailto:lensbross@gmail.com" className="text-sm hover:text-amber-600" data-cursor="tap">lensbross@gmail.com</a>
            <a href="https://instagram.com/editsbywaynem" target="_blank" rel="noreferrer" className="text-sm hover:text-amber-600" data-cursor="tap">@editsbywaynem</a>
            <a href="https://instagram.com/vey9x" target="_blank" rel="noreferrer" className="text-sm hover:text-amber-600" data-cursor="tap">@vey9x</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
