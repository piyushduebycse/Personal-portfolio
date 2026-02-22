import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { SiReact, SiThreedotjs, SiTailwindcss, SiMeta, SiShopify, SiVite, SiFigma } from '@icons-pack/react-simple-icons';
import Marquee from 'react-fast-marquee';
import { AuroraBackground } from '@/components/ui/aurora-background';

const TechLogos = () => {
  return (
    <div className="mt-8 flex flex-col items-center w-full max-w-[90vw] md:max-w-2xl mx-auto">
      <div className="mb-4 text-sm tracking-[0.2em] font-bold uppercase">
        <span className="text-red-600">Hands</span> <span className="text-foreground">On</span>
      </div>
      <div className="w-full px-4 py-4 rounded-2xl bg-foreground/5 backdrop-blur-[5px] border border-foreground/10 shadow-[0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] opacity-80 dark:opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
        <Marquee gradient={false} speed={40} pauseOnHover={true}>
          <div className="flex items-center gap-12 pr-12">
            {[
              { Icon: SiReact, color: '#61DAFB' },
              { Icon: SiThreedotjs, color: 'var(--foreground)' },
              { Icon: SiTailwindcss, color: '#06B6D4' },
              { Icon: SiMeta, color: '#0668E1' },
              { Icon: SiShopify, color: '#95BF47' },
              { Icon: SiVite, color: '#646CFF' },
              { Icon: SiFigma, color: '#F24E1E' },
            ].map(({ Icon, color }, index) => (
              <Icon
                key={index}
                className="hover:text-[var(--hover-color)] cursor-help transition-colors text-foreground"
                style={{ '--hover-color': color === 'var(--foreground)' ? 'currentColor' : color } as React.CSSProperties}
                size={28}
              />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.hero-title-char',
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.03,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.8 }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
      );

      // Social icons
      gsap.fromTo(
        '.social-icon',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          delay: 1.2,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'PIYUSH DUBEY';
  const subtitleText = '';

  return (
    <AuroraBackground className="!h-auto !min-h-screen">
      <div id="hero" ref={heroRef} className="relative z-10 w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Pre-title */}
          <div className="mb-4 overflow-hidden">
            <p className="text-red-500 font-medium tracking-[0.3em] text-sm sm:text-base animate-fade-in">
              HELLO, I&apos;M A CSE STUDENT
            </p>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-none mb-2 perspective-1000"
          >
            <span className="block overflow-hidden">
              {titleText.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-title-char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden gradient-text">
              {subtitleText.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-title-char inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            Building the digital future, one line of code at a time.
            <br />
            Passionate about{' '}
            <span className="text-red-500 font-medium">AI</span>,{' '}
            <span className="text-red-500 font-medium">Web Development</span>, and{' '}
            <span className="text-red-500 font-medium">Problem Solving</span>.
          </p>

          {/* Tech Logos */}
          <TechLogos />

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 bg-red-600 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-glow-red-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 glass dark:glass text-foreground font-medium rounded-full hover:bg-foreground/5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex items-center justify-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/piyushduebycse', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/piyush-d-78b430313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:piyushdubeycse@gmail.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon group relative w-12 h-12 flex items-center justify-center glass rounded-full hover:bg-red-600/20 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group"
        >
          <span className="text-xs tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
          </div>
        </button>

        {/* Side Decorations */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
          <span className="text-xs text-muted-foreground/30 tracking-wider rotate-180 [writing-mode:vertical-lr]">
            CSE STUDENT
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
        </div>

        {/* Side Decorations */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
          <span className="text-xs text-muted-foreground/30 tracking-wider [writing-mode:vertical-lr]">
            PORTFOLIO 2026
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
        </div>
      </div>
    </AuroraBackground>
  );
}
