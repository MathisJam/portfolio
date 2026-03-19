"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { languages, tools } from "@/lib/data";

const GREEN = "#5cf964";
const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

const ctfs = [
    {
        name: "Hackday ESIEE",
        images: ["/images/HackdayESIEE.png"],
    },
    {
        name: "AWS x SANS",
        images: ["/images/AWSxSANS.png"],
    },
];

export default function Skills() {
    const [activeCTF, setActiveCTF] = useState<null | typeof ctfs[number]>(null);

    return (
        <>
            <section
                id="skills"
                className="relative h-screen w-full flex items-center overflow-hidden"
                style={{ scrollSnapAlign: "start", backgroundColor: "#050505" }}
            >

                <div className="w-full px-8 md:px-16 flex flex-col gap-10 md:gap-14">

                    {/* Title — centered */}
                    <p
                        className="text-sm md:text-base tracking-[0.3em] uppercase font-medium text-center"
                        style={{ color: GREEN }}
                    >
                        Compétences
                    </p>

                    {/* Languages */}
                    <div className="flex flex-col gap-4">
                        <p
                            className="text-[10px] tracking-[0.35em] uppercase font-medium"
                            style={{ color: GREEN }}
                        >
                            Langages
                        </p>
                        <motion.div
                            className="flex flex-wrap justify-end gap-x-12 gap-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                        >
                            {languages.map((lang) => (
                                <motion.span
                                    key={lang.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                                    }}
                                    className="text-xl md:text-2xl font-[family-name:var(--font-holtwood)]"
                                    style={{ color: "#fff" }}
                                >
                                    {lang.name}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="w-full h-px origin-right"
                        style={{ backgroundColor: GREEN, opacity: 0.7 }}
                    />

                    {/* Tools */}
                    <div className="flex flex-col gap-4">
                        <p
                            className="text-[10px] tracking-[0.35em] uppercase font-medium"
                            style={{ color: GREEN }}
                        >
                            Outils & logiciels
                        </p>
                        <motion.div
                            className="flex flex-wrap justify-end gap-x-12 gap-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                        >
                            {tools.map((tool) => (
                                <motion.span
                                    key={tool.name}
                                    variants={{
                                        hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                                    }}
                                    className="text-xl md:text-2xl font-[family-name:var(--font-holtwood)]"
                                    style={{ color: "#fff" }}
                                >
                                    {tool.name}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="w-full h-px origin-right"
                        style={{ backgroundColor: GREEN, opacity: 0.7 }}
                    />

                    {/* CTFs */}
                    <div className="flex flex-col items-center gap-4">
                        <p
                            className="text-sm md:text-base tracking-[0.3em] uppercase font-medium text-center"
                            style={{ color: GREEN }}
                        >
                            CTF réalisés
                        </p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {ctfs.map((ctf) => (
                                <motion.button
                                    key={ctf.name}
                                    onClick={() => setActiveCTF(ctf)}
                                    variants={{
                                        hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
                                        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
                                    }}
                                    className="text-xl md:text-2xl font-[family-name:var(--font-holtwood)] cursor-pointer"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "underline",
                                        textUnderlineOffset: "6px",
                                        textDecorationThickness: "1px",
                                        textDecorationColor: `${GREEN}66`,
                                    }}
                                    whileHover={{
                                        textDecorationColor: GREEN,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {ctf.name}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Image overlay */}
            <AnimatePresence>
                {activeCTF && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveCTF(null)}
                    >
                        <motion.div
                            className="relative flex flex-col items-center gap-6 px-6 max-w-4xl w-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Title */}
                            <p
                                className="text-lg md:text-xl tracking-[0.2em] uppercase font-medium"
                                style={{ color: GREEN }}
                            >
                                {activeCTF.name}
                            </p>

                            {/* Images */}
                            <div className={`flex ${activeCTF.images.length > 1 ? "flex-col md:flex-row" : ""} gap-4 w-full justify-center`}>
                                {activeCTF.images.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`${activeCTF.name} ${i + 1}`}
                                        className="rounded-sm max-h-[70vh] object-contain"
                                        style={{
                                            maxWidth: activeCTF.images.length > 1 ? "48%" : "100%",
                                            border: `1px solid ${GREEN}33`,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Close hint */}
                            <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                                Cliquer pour fermer
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
