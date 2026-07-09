'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
    return (
        <main className="overflow-x-hidden relative w-full">
            <section className="relative w-full min-h-[100svh] flex flex-col justify-center px-6 md:px-12">
                {/* Content */}
                <div className="relative z-10 max-w-[1400px] mx-auto w-full py-32 md:py-40 flex flex-col justify-center min-h-[100svh]">
                    <div className="max-w-3xl text-left">
                        <span className="border border-brand-blue/30 text-sky-200 bg-brand-blue/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] uppercase font-mono font-semibold tracking-wider mb-6 inline-block">
                            Contract Development & Manufacturing Organization
                        </span>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-medium tracking-tight text-white drop-shadow-md leading-[1.05] mt-4">
                            Integrated Solutions for Biologics Development
                            <span className="block text-brand-blue font-normal mt-2 text-xl sm:text-2xl lg:text-3xl drop-shadow">
                                Accelerating Clinical FIH Trials
                            </span>
                        </h1>
                        
                        <p className="text-sm sm:text-base text-neutral-200/90 font-normal mt-6 max-w-xl leading-relaxed drop-shadow-sm">
                            Serving as a dedicated global partner for biologics drug development, cGMP manufacturing, and IND-enabling clinical trial batches.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-full pl-6 pr-4 text-sm font-semibold uppercase tracking-wider font-mono bg-gradient-to-b from-brand-blue to-sky-500 hover:from-brand-blue-hover hover:to-sky-600 border border-brand-blue/20 text-white shadow-sm hover:shadow transition-all cursor-pointer">
                                <Link href="/contact">
                                    <span className="text-nowrap">Get in touch</span>
                                    <ChevronRight className="ml-1 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                key={2}
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-full px-6 text-sm font-semibold uppercase tracking-wider font-mono border-white/30 text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                                <Link href="#modalities">
                                    <span className="text-nowrap">View Modalities</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ── Full-screen Background Video ── */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {/* Raw video */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        src="/videos/dna-video-2.mp4">
                    </video>

                    {/* Dark base layer so text is always readable */}
                    <div className="absolute inset-0 bg-neutral-950/35 pointer-events-none" />

                    {/* Logo-color dual-tone overlay:
                        Left: amber/orange (#EA6C00 — logo warm triangle)
                        Right: sky blue (#0074C3 — logo cool triangle)
                        'overlay' blend mode punches through video color more strongly */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(115deg, rgba(234,108,0,0.55) 0%, rgba(234,108,0,0.15) 40%, rgba(0,116,195,0.15) 60%, rgba(0,116,195,0.50) 100%)',
                            mixBlendMode: 'overlay',
                        }}
                    />

                    {/* Subtle vignette around edges for depth */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
                        }}
                    />
                </div>
            </section>

            {/* Logo Cloud Slider */}
            <section className="bg-background py-8 border-y border-brand-blue/10 mt-6">
                <div className="group relative m-auto max-w-[1400px] px-6">
                    <div className="flex flex-col items-center md:flex-row gap-6">
                        <div className="md:max-w-44 md:border-r md:border-neutral-200 md:pr-6 flex-shrink-0">
                            <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest text-center md:text-left">Powering key pipelines</p>
                        </div>
                        <div className="relative py-2 md:w-[calc(100%-11rem)] overflow-hidden w-full">
                            <InfiniteSlider
                                duration={45}
                                gap={96}>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Roche</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Novartis</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Amgen</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Biogen</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Lonza</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Sanofi</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Boehringer</span>
                                </div>
                                <div className="flex items-center justify-center h-10 px-4">
                                    <span className="font-serif text-lg font-semibold text-neutral-400 tracking-tight select-none">Pfizer</span>
                                </div>
                            </InfiniteSlider>

                            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20 pointer-events-none z-10"></div>
                            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20 pointer-events-none z-10"></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
