'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative w-full border-b border-neutral-100 overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/videos/herodnavideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-32 lg:py-40 flex items-center min-h-[70vh]">
                {/* Left: Text */}
                <div className="text-left max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.08]">
                        Biologics Development and Manufacturing
                        <span className="block text-black text-2xl sm:text-3xl lg:text-4xl font-medium mt-3">
                            From Cell Line to Clinical Supply.
                        </span>
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
                            className="h-12 rounded-[10px] px-6 text-sm font-semibold uppercase tracking-wider border-black text-black bg-transparent hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                            <Link href="/services/cell-line">
                                <span className="text-nowrap">Explore Services</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
