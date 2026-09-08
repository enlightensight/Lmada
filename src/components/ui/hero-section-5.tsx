'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-6 sm:pt-8 pb-4">
            <div className="relative w-full max-w-[1700px] mx-auto rounded-[10px] overflow-hidden border border-neutral-200 shadow-sm min-h-[60vh] lg:min-h-[70vh] flex items-center bg-brand-navy">
                {/* Background Video confined within container */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/videos/newhero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[65%_center] md:object-center"
                    />
                    {/* Dark gradient scrim on left for high contrast readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 sm:via-brand-navy/45 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 w-full px-8 sm:px-12 md:px-16 lg:px-20 py-16 md:py-24 lg:py-28 flex items-center">
                    {/* Left: Text */}
                    <div className="text-left max-w-2xl">
                        <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-semibold tracking-tight text-white leading-[1.12] drop-shadow-sm">
                            Biologics Development and Manufacturing
                            <span className="block text-white/95 text-2xl sm:text-3xl lg:text-4xl font-medium mt-5 sm:mt-6">
                                From Cell Line to Clinical Supply.
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-neutral-100 font-normal mt-8 sm:mt-10 max-w-xl leading-relaxed drop-shadow-sm">
                            Supporting biopharmaceutical companies with integrated biologics development, analytical characterization, GMP manufacturing, and clinical development solutions to accelerate the journey from molecule to market.
                        </p>

                        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-start gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-[10px] pl-6 pr-4 text-sm font-semibold uppercase tracking-wider bg-brand-yellow hover:bg-brand-yellow-hover text-black shadow-md hover:shadow-lg transition-all cursor-pointer">
                                <Link href="/contact">
                                    <span className="text-nowrap">Get in touch</span>
                                    <ChevronRight className="ml-1 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-[10px] px-6 text-sm font-semibold uppercase tracking-wider border-white/80 text-white bg-white/10 backdrop-blur-md hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                                <Link href="/services/cell-line">
                                    <span className="text-nowrap">Explore Services</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
