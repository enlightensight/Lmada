'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative w-full bg-white border-b border-neutral-100 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Text */}
                <div className="text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.08]">
                        Biologics Development and Manufacturing
                    </h1>

                    <p className="text-sm sm:text-base text-neutral-600 font-normal mt-6 max-w-xl leading-relaxed">
                        Integrated development, analytical characterization, and GMP manufacturing services for biologics, supporting innovators and biosimilar developers from early development through clinical manufacturing.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 rounded-[10px] pl-6 pr-4 text-sm font-semibold uppercase tracking-wider bg-brand-yellow hover:bg-brand-yellow-hover text-black shadow-sm hover:shadow transition-all cursor-pointer">
                            <Link href="/contact">
                                <span className="text-nowrap">Get in touch</span>
                                <ChevronRight className="ml-1 w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-[10px] px-6 text-sm font-semibold uppercase tracking-wider border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white transition-all cursor-pointer">
                            <Link href="/services/cell-line">
                                <span className="text-nowrap">Explore Services</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Right: Video */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 rounded-[10px]">
                    <video
                        src="/videos/DNAROTATION.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Bottom Colored Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-neutral-100">
                <div className="bg-brand-blue text-white py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                    Full-service CRO
                </div>
                <div className="bg-brand-yellow text-black py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                    Therapeutic Expertise
                </div>
                <div className="bg-brand-blue text-white py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                    Global Reach
                </div>
                <div className="bg-brand-yellow text-black py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                    Regulatory Excellence
                </div>
            </div>
        </section>
    )
}
