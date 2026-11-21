'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface HeroSectionProps {
    heading?: string;
    subtitle?: string;
    description?: string;
    videoSrc?: string;
    primaryCta?: { text: string; link: string };
    secondaryCta?: { text: string; link: string };
}

export function HeroSection({
    heading = 'Biologics Development and Manufacturing.',
    subtitle = 'From Gene to Clinic.',
    description = 'Lambda CDMO provides integrated development, analytical characterization, and GMP manufacturing services, supporting biopharmaceutical innovators from early-stage development through clinical supply.',
    videoSrc = '/videos/newhero.mp4',
    primaryCta = { text: 'Get in touch', link: '/contact' },
    secondaryCta = { text: 'Explore Services', link: '/services/cell-line' }
}: HeroSectionProps = {}) {
    return (
        <section className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 min-h-[auto] md:min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex flex-col justify-center">
            <div className="relative w-full max-w-[1700px] mx-auto rounded-[10px] overflow-hidden border border-neutral-200 shadow-sm min-h-[520px] sm:min-h-[580px] md:min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-120px)] flex items-center bg-brand-navy">
                {/* Background Video confined within container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <video
                        key={videoSrc || '/videos/newhero.mp4'}
                        src={videoSrc || '/videos/newhero.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover object-center md:object-center"
                    />
                    {/* Left-side blurry overlay: gradual decrease to half width (50%) - desktop only to preserve mobile clarity */}
                    <div
                        className="absolute inset-0 pointer-events-none hidden md:block"
                        style={{
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 50%)',
                            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 22%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0) 50%)',
                        }}
                    />
                    {/* Left-side dark gradient scrim: gradual decrease to half width (50%) */}
                    <div
                        className="absolute inset-0 pointer-events-none hidden md:block"
                        style={{
                            background: 'linear-gradient(to right, rgba(15, 34, 49, 0.95) 0%, rgba(15, 34, 49, 0.85) 22%, rgba(15, 34, 49, 0.5) 36%, rgba(15, 34, 49, 0.15) 45%, rgba(15, 34, 49, 0) 50%)',
                        }}
                    />
                    {/* Mobile scrim: balanced vertical-horizontal gradient so video is fully visible */}
                    <div
                        className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-t from-brand-navy/95 via-brand-navy/70 to-brand-navy/35"
                    />
                </div>

                <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-28 flex items-center">
                    {/* Left: Text */}
                    <div className="text-left max-w-2xl">
                        <h1 className="text-[30px] sm:text-[44px] lg:text-[58px] font-normal tracking-tight text-white leading-[1.12] drop-shadow-sm">
                            {heading}
                            {subtitle && (
                                <span className="block text-white/95 text-xl sm:text-2xl lg:text-3xl font-light mt-3 sm:mt-5">
                                    {subtitle}
                                </span>
                            )}
                        </h1>

                        <p className="text-[14px] sm:text-[16px] lg:text-[17px] text-neutral-100 font-normal mt-6 sm:mt-8 max-w-xl leading-relaxed drop-shadow-sm">
                            {description}
                        </p>

                        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-start gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-[10px] pl-6 pr-4 text-sm font-semibold uppercase tracking-wider bg-brand-yellow hover:bg-brand-yellow-hover text-black shadow-md hover:shadow-lg transition-all cursor-pointer">
                                <Link href={primaryCta?.link || '/contact'}>
                                    <span className="text-nowrap">{primaryCta?.text || 'Get in touch'}</span>
                                    <ChevronRight className="ml-1 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-[10px] px-6 text-sm font-semibold uppercase tracking-wider border-white/80 text-white bg-white/10 backdrop-blur-md hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all cursor-pointer">
                                <Link href={secondaryCta?.link || '/services/cell-line'}>
                                    <span className="text-nowrap">{secondaryCta?.text || 'Explore Services'}</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
