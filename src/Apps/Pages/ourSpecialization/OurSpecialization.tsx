import { motion } from "framer-motion";

const specializations = [
    "Structural Steel",
    "Pipe Welding",
    "Aluminum Fab",
    "Roll Cages",
    "Exhaust Systems",
    "Custom Gates",
    "Equipment Repair",
    "Stainless TIG",
    "Trailer Builds",
    "Ornamental Iron",
    "Pressure Vessels",
    "Agricultural Fab",
];




export default function WeldingSpecializations() {
    return (
        <section
            style={{
                background: "#0a0a0a",
                padding: "80px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500&display=swap');

        .spec-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          background: #111;
          border: 1px solid #1e1e1e;
          cursor: default;
          transition: border-color 0.25s, background 0.25s;
          overflow: hidden;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .spec-item:hover {
          border-color: #e05a00;
          background: #161616;
        }
        .spec-item:hover .spec-number {
          color: #e05a0033;
        }
        .spec-item:hover .spec-label {
          color: #fff;
        }
        .spec-item:hover .spec-dot {
          background: #e05a00;
          box-shadow: 0 0 8px #e05a00;
        }
        .spec-item:hover .spec-slash {
          opacity: 1;
        }
        .spec-dot {
          width: 6px;
          height: 6px;
          background: #333;
          flex-shrink: 0;
          transition: background 0.25s, box-shadow 0.25s;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
        .spec-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #555;
          transition: color 0.25s;
          line-height: 1;
        }
        .spec-number {
          position: absolute;
          right: 10px;
          bottom: 4px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: transparent;
          transition: color 0.25s;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }
        .spec-slash {
          position: absolute;
          top: 0; left: 0;
          width: 3px;
          height: 100%;
          background: #e05a00;
          box-shadow: 0 0 10px #e05a00;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .header-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e05a00, transparent);
          opacity: 0.4;
          margin: 0 auto 48px;
          max-width: 600px;
        }
      `}</style>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", marginBottom: "48px" }}
                >
                    <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: "#e05a00",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "12px",
                    }}>
                        Areas of Expertise
                    </span>
                    <h3 style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(36px, 5vw, 56px)",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: "#f0f0f0",
                        margin: 0,
                        lineHeight: 1,
                    }}>
                        Our{" "}
                        <span style={{
                            color: "transparent",
                            WebkitTextStroke: "2px #e05a00",
                        }}>
                            Specializations
                        </span>
                    </h3>
                </motion.div>

                <div className="header-rule" />

                {/* Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
                    gap: "2px",
                }}>
                    {specializations.map((item, i) => (
                        <motion.div
                            key={i}
                            className="spec-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                            viewport={{ once: true }}
                        >
                            <div className="spec-slash" />
                            <div className="spec-dot" />
                            <span className="spec-label">{item}</span>
                            <span className="spec-number">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom count bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                        marginTop: "2px",
                        padding: "16px 24px",
                        background: "#111",
                        border: "1px solid #1e1e1e",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#e05a00",
                        textTransform: "uppercase",
                    }}>
                        {specializations.length} Specializations
                    </span>
                    <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
                    <span style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: "12px",
                        color: "#444",
                        letterSpacing: "0.05em",
                    }}>
                        Don't see yours? Ask us.
                    </span>
                </motion.div>
            </div>
        </section>
    );
}


// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const specializations = [
//   { label: "Structural Steel", icon: "⬡" },
//   { label: "Pipe Welding", icon: "⬤" },
//   { label: "Aluminum Fab", icon: "◈" },
//   { label: "Roll Cages", icon: "⬟" },
//   { label: "Exhaust Systems", icon: "◉" },
//   { label: "Custom Gates", icon: "⬢" },
//   { label: "Equipment Repair", icon: "◆" },
//   { label: "Stainless TIG", icon: "⬡" },
//   { label: "Trailer Builds", icon: "◈" },
//   { label: "Ornamental Iron", icon: "⬤" },
//   { label: "Pressure Vessels", icon: "⬟" },
//   { label: "Agricultural Fab", icon: "◉" },
// ];

// function SparkBurst({ x, y, onDone }) {
//   const particles = Array.from({ length: 12 }, (_, i) => ({
//     angle: (i / 12) * 360 + Math.random() * 15,
//     dist: 20 + Math.random() * 45,
//     size: 1.5 + Math.random() * 3,
//     dur: 0.3 + Math.random() * 0.35,
//     color: i % 3 === 0 ? "#ffb347" : i % 3 === 1 ? "#e05a00" : "#ff6a00",
//   }));

//   useEffect(() => {
//     const t = setTimeout(onDone, 900);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div style={{ position: "fixed", left: x, top: y, pointerEvents: "none", zIndex: 9999 }}>
//       {particles.map((p, i) => {
//         const rad = (p.angle * Math.PI) / 180;
//         return (
//           <motion.div
//             key={i}
//             initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
//             animate={{
//               x: Math.cos(rad) * p.dist,
//               y: Math.sin(rad) * p.dist,
//               opacity: 0,
//               scale: 0,
//             }}
//             transition={{ duration: p.dur, ease: "easeOut" }}
//             style={{
//               position: "absolute",
//               width: p.size,
//               height: p.size,
//               borderRadius: "50%",
//               background: p.color,
//               boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
//               transform: "translate(-50%,-50%)",
//             }}
//           />
//         );
//       })}
//       {/* Central flash */}
//       <motion.div
//         initial={{ scale: 0, opacity: 1 }}
//         animate={{ scale: 3, opacity: 0 }}
//         transition={{ duration: 0.25 }}
//         style={{
//           position: "absolute",
//           width: 16,
//           height: 16,
//           borderRadius: "50%",
//           background: "radial-gradient(circle, #fff 0%, #ffb347 40%, transparent 70%)",
//           transform: "translate(-50%,-50%)",
//         }}
//       />
//     </div>
//   );
// }

// export default function WeldingSpecializations() {
//   const [selected, setSelected] = useState(new Set());
//   const [sparks, setSparks] = useState([]);
//   const [flashing, setFlashing] = useState(null);

//   const handleTap = (index, e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const id = Date.now() + Math.random();
//     setSparks((s) => [...s, { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }]);
//     setFlashing(index);
//     setTimeout(() => setFlashing(null), 300);
//     setSelected((prev) => {
//       const next = new Set(prev);
//       next.has(index) ? next.delete(index) : next.add(index);
//       return next;
//     });
//   };

//   const removeSpark = (id) => setSparks((s) => s.filter((sp) => sp.id !== id));

//   const row1 = specializations.slice(0, 6);
//   const row2 = specializations.slice(6);

//   return (
//     <section style={{
//       background: "#080808",
//       padding: "72px 0 0",
//       position: "relative",
//       overflow: "hidden",
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

//         .spec-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 16px 22px;
//           border-right: 1px solid #181818;
//           background: #0c0c0c;
//           cursor: pointer;
//           position: relative;
//           overflow: hidden;
//           user-select: none;
//           -webkit-tap-highlight-color: transparent;
//           min-width: 158px;
//           justify-content: flex-start;
//           transition: background 0.25s;
//           flex-shrink: 0;
//         }
//         .spec-pill::after {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, #e05a0018 0%, transparent 55%);
//           opacity: 0;
//           transition: opacity 0.3s;
//         }
//         .spec-pill.on { background: #130900; }
//         .spec-pill.on::after { opacity: 1; }
//         .spec-pill.flash { background: #2a1000 !important; }

//         .pill-icon {
//           font-size: 11px;
//           color: #2a2a2a;
//           line-height: 1;
//           flex-shrink: 0;
//           transition: color 0.25s, text-shadow 0.25s;
//         }
//         .spec-pill.on .pill-icon {
//           color: #e05a00;
//           text-shadow: 0 0 10px #e05a00aa;
//         }
//         .pill-label {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 13.5px;
//           font-weight: 800;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: #3a3a3a;
//           transition: color 0.25s;
//           white-space: nowrap;
//           line-height: 1;
//           position: relative;
//           z-index: 1;
//         }
//         .spec-pill.on .pill-label { color: #f0f0f0; }

//         .pill-underline {
//           position: absolute;
//           bottom: 0; left: 0;
//           height: 2px; width: 0;
//           background: #e05a00;
//           box-shadow: 0 0 8px #e05a00;
//           transition: width 0.35s ease;
//         }
//         .spec-pill.on .pill-underline { width: 100%; }

//         /* Left accent bar */
//         .pill-bar {
//           position: absolute;
//           top: 0; left: 0;
//           width: 2px; height: 100%;
//           background: #e05a00;
//           box-shadow: 0 0 10px #e05a00;
//           transform: scaleY(0);
//           transform-origin: top;
//           transition: transform 0.25s ease;
//         }
//         .spec-pill.on .pill-bar { transform: scaleY(1); }

//         /* Scroll areas */
//         .scroll-row {
//           overflow-x: auto;
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//           position: relative;
//         }
//         .scroll-row::-webkit-scrollbar { display: none; }

//         .fade-l {
//           position: absolute; left: 0; top: 0; bottom: 0;
//           width: 32px;
//           background: linear-gradient(90deg, #080808, transparent);
//           pointer-events: none; z-index: 2;
//         }
//         .fade-r {
//           position: absolute; right: 0; top: 0; bottom: 0;
//           width: 32px;
//           background: linear-gradient(-90deg, #080808, transparent);
//           pointer-events: none; z-index: 2;
//         }

//         /* Weld bead track */
//         .bead-track {
//           display: flex;
//           gap: 5px;
//           align-items: center;
//         }
//         .bead {
//           width: 9px;
//           height: 9px;
//           border-radius: 50%;
//           background: #181818;
//           border: 1px solid #222;
//           transition: background 0.2s, box-shadow 0.2s, border-color 0.2s;
//           flex-shrink: 0;
//         }
//         .bead.lit {
//           background: #e05a00;
//           border-color: #e05a00;
//           box-shadow: 0 0 8px #e05a00cc;
//         }

//         /* summary chips */
//         .chip {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           padding: 4px 9px;
//           background: #1a0800;
//           border: 1px solid #e05a00;
//           color: #e05a00;
//         }

//         /* bg grid texture */
//         .grid-bg {
//           position: absolute; inset: 0;
//           opacity: 0.018;
//           background-image:
//             repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 56px),
//             repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 56px);
//           pointer-events: none;
//         }

//         /* pulse animation for live dot */
//         @keyframes pulse {
//           0%,100% { opacity:1; transform:scale(1); }
//           50% { opacity:0.3; transform:scale(0.55); }
//         }
//         .live-dot {
//           width: 7px; height: 7px;
//           border-radius: 50%;
//           background: #e05a00;
//           box-shadow: 0 0 7px #e05a00;
//           animation: pulse 1.6s ease-in-out infinite;
//           flex-shrink: 0;
//         }

//         /* quote button */
//         .quote-btn {
//           font-family: 'Barlow Condensed', sans-serif;
//           font-size: 13px;
//           font-weight: 900;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           padding: 12px 22px;
//           background: #e05a00;
//           color: #000;
//           border: none;
//           cursor: pointer;
//           white-space: nowrap;
//           flex-shrink: 0;
//           transition: opacity 0.2s, transform 0.1s;
//           clip-path: polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px));
//         }
//         .quote-btn:active { opacity: 0.8; transform: scale(0.97); }

//         @keyframes flashIn {
//           0%   { background: #2a1000; }
//           100% { background: #130900; }
//         }
//         .spec-pill.on.flash { animation: flashIn 0.3s ease-out forwards; }
//       `}</style>

//       {/* Spark bursts portal */}
//       {sparks.map((s) => (
//         <SparkBurst key={s.id} x={s.x} y={s.y} onDone={() => removeSpark(s.id)} />
//       ))}

//       <div className="grid-bg" />

//       {/* ── Header ── */}
//       <div style={{ padding: "0 24px 36px", maxWidth: 1200, margin: "0 auto" }}>
//         <motion.div
//           initial={{ opacity: 0, y: 22 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Eyebrow */}
//           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
//             <div className="live-dot" />
//             <span style={{
//               fontFamily: "'Barlow Condensed',sans-serif",
//               fontSize: 11,
//               fontWeight: 700,
//               letterSpacing: "0.25em",
//               textTransform: "uppercase",
//               color: "#e05a00",
//             }}>What We Know</span>
//           </div>

//           {/* Title */}
//           <h2 style={{
//             fontFamily: "'Barlow Condensed',sans-serif",
//             fontSize: "clamp(46px,11vw,80px)",
//             fontWeight: 900,
//             textTransform: "uppercase",
//             letterSpacing: "0.02em",
//             lineHeight: 0.92,
//             margin: "0 0 20px",
//             color: "#f0f0f0",
//           }}>
//             Our{" "}
//             <span style={{
//               color: "transparent",
//               WebkitTextStroke: "2px #e05a00",
//               display: "inline-block",
//             }}>Craft</span>
//           </h2>

//           {/* Bead track — lights up as you select */}
//           <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
//             <div className="bead-track">
//               {specializations.map((_, i) => (
//                 <div
//                   key={i}
//                   className={`bead ${selected.has(i) ? "lit" : ""}`}
//                   onClick={(e) => {
//                     // find pill and trigger same logic
//                     const el = document.querySelector(`[data-spec="${i}"]`);
//                     if (el) handleTap(i, { currentTarget: el });
//                   }}
//                 />
//               ))}
//             </div>
//             <span style={{
//               fontFamily: "'Barlow',sans-serif",
//               fontSize: 12,
//               color: "#2e2e2e",
//               letterSpacing: "0.1em",
//               textTransform: "uppercase",
//             }}>
//               {selected.size} / {specializations.length} selected
//             </span>
//           </div>

//           {/* Swipe hint */}
//           <div style={{
//             marginTop: 12,
//             display: "flex",
//             alignItems: "center",
//             gap: 7,
//             fontFamily: "'Barlow',sans-serif",
//             fontSize: 11,
//             color: "#2a2a2a",
//             letterSpacing: "0.1em",
//             textTransform: "uppercase",
//           }}>
//             <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
//               <path d="M1 5h14M10 1l4 4-4 4" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             tap to select · swipe to explore
//           </div>
//         </motion.div>
//       </div>

//       {/* ── Row 1 ── */}
//       <motion.div
//         initial={{ opacity: 0, x: -16 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.45, delay: 0.1 }}
//         style={{ position: "relative", borderTop: "1px solid #181818", borderBottom: "1px solid #181818" }}
//       >
//         <div className="scroll-row">
//           <div className="fade-l" /><div className="fade-r" />
//           <div style={{ display: "flex" }}>
//             {row1.map((item, i) => (
//               <div
//                 key={i}
//                 data-spec={i}
//                 className={`spec-pill ${selected.has(i) ? "on" : ""} ${flashing === i ? "flash" : ""}`}
//                 onClick={(e) => handleTap(i, e)}
//               >
//                 <div className="pill-bar" />
//                 <span className="pill-icon">{item.icon}</span>
//                 <span className="pill-label">{item.label}</span>
//                 <div className="pill-underline" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       {/* ── Row 2 — offset ── */}
//       <motion.div
//         initial={{ opacity: 0, x: 16 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.45, delay: 0.2 }}
//         style={{ position: "relative", borderBottom: "1px solid #181818" }}
//       >
//         <div className="scroll-row">
//           <div className="fade-l" /><div className="fade-r" />
//           <div style={{ display: "flex", paddingLeft: 79 }}>
//             {row2.map((item, i) => {
//               const idx = i + 6;
//               return (
//                 <div
//                   key={idx}
//                   data-spec={idx}
//                   className={`spec-pill ${selected.has(idx) ? "on" : ""} ${flashing === idx ? "flash" : ""}`}
//                   onClick={(e) => handleTap(idx, e)}
//                 >
//                   <div className="pill-bar" />
//                   <span className="pill-icon">{item.icon}</span>
//                   <span className="pill-label">{item.label}</span>
//                   <div className="pill-underline" />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </motion.div>

//       {/* ── Bottom bar ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.4, delay: 0.35 }}
//         style={{
//           background: "#0c0c0c",
//           borderBottom: "1px solid #181818",
//           padding: "16px 24px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 12,
//           minHeight: 56,
//           flexWrap: "wrap",
//         }}
//       >
//         <AnimatePresence mode="wait">
//           {selected.size === 0 ? (
//             <motion.p
//               key="hint"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               style={{
//                 fontFamily: "'Barlow Condensed',sans-serif",
//                 fontSize: 13,
//                 fontWeight: 700,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 color: "#2e2e2e",
//                 margin: 0,
//               }}
//             >
//               Tap a specialization above
//             </motion.p>
//           ) : (
//             <motion.div
//               key="chips"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}
//             >
//               {[...selected].map((i) => (
//                 <span key={i} className="chip">{specializations[i].label}</span>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {selected.size > 0 && (
//             <motion.button
//               initial={{ opacity: 0, scale: 0.85 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.85 }}
//               className="quote-btn"
//             >
//               Get Quote →
//             </motion.button>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Footer note */}
//       <div style={{ padding: "14px 24px 28px", maxWidth: 1200, margin: "0 auto" }}>
//         <p style={{
//           fontFamily: "'Barlow',sans-serif",
//           fontSize: 12,
//           color: "#222",
//           margin: 0,
//           letterSpacing: "0.06em",
//         }}>
//           Don't see what you need? We probably do it — just ask.
//         </p>
//       </div>
//     </section>
//   );
// }