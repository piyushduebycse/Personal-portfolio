import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Palette, Code2, TestTube, ArrowRight, Zap, type LucideIcon } from 'lucide-react';
import { CardSpotlight } from '@/components/ui/card-spotlight';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Research & Analysis',
    description: 'Understanding the problem space and defining clear objectives.',
    icon: Search,
    details: ['Market Research', 'User Interviews', 'Competitive Analysis', 'Requirements Gathering'],
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Creating intuitive interfaces and seamless user experiences.',
    icon: Palette,
    details: ['Wireframing', 'UI/UX Design', 'Interactive Prototypes', 'Design Systems'],
  },
  {
    number: '03',
    title: 'Development',
    description: 'Building robust, scalable solutions with clean code.',
    icon: Code2,
    details: ['Frontend Development', 'Backend Architecture', 'API Integration', 'Database Design'],
  },
  {
    number: '04',
    title: 'Testing & Deployment',
    description: 'Ensuring quality and delivering a polished product.',
    icon: TestTube,
    details: ['Unit Testing', 'Integration Testing', 'CI/CD Pipeline', 'Performance Optimization'],
  },
];

// Process Step Card Component
function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`process-card relative ${index % 2 === 0 ? 'lg:ml-auto lg:mr-[50%]' : 'lg:mr-auto lg:ml-[50%]'}`}
    >
      <CardSpotlight className="glass p-6 sm:p-8 hover:bg-white/[0.05] transition-all duration-500 group bg-transparent border-white/10" color="rgba(239, 68, 68, 0.2)">
        {/* Step Number */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-glow-red z-10">
          <span className="font-display text-xl text-white">{step.number}</span>
        </div>

        {/* Content */}
        <div className="ml-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
              <step.icon className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-display text-2xl text-white">{step.title}</h3>
          </div>

          <p className="text-white/60 mb-6">{step.description}</p>

          {/* Details List */}
          <ul className="space-y-2">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                <ArrowRight className="w-4 h-4 text-red-500" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </CardSpotlight>

      {/* Connector Dot */}
      <div
        className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full shadow-glow-red ${index % 2 === 0 ? '-right-[calc(50%+8px)]' : '-left-[calc(50%+8px)]'
          }`}
      >
        <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-50" />
      </div>
    </div>
  );
}

export default function WorkingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.process-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }

      // Process cards animation
      gsap.fromTo(
        '.process-card',
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.process-timeline',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating particles
      gsap.to('.floating-particle', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="process-header text-center mb-16">
          <span className="text-red-500 font-medium tracking-[0.2em] text-sm">HOW I WORK</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-white">
            MY <span className="gradient-text">PROCESS</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            A structured approach to delivering high-quality solutions,
            from initial research to final deployment.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
        </div>

        {/* Process Timeline */}
        <div className="process-timeline relative">
          {/* SVG Path - Desktop Only */}
          <svg
            className="hidden lg:block absolute left-1/2 top-0 h-full w-4 -translate-x-1/2"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ff0000" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 8 0 L 8 100%"
              stroke="url(#pathGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Center Line - Visual Only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-600/0 via-red-600/30 to-red-600/0 -translate-x-1/2" />

          {/* Process Steps */}
          <div className="space-y-12 lg:space-y-24">
            {processSteps.map((step, index) => (
              <ProcessCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 glass rounded-full px-6 py-3">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="text-white/80">Ready to bring your ideas to life?</span>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-red-500 hover:text-red-400 font-medium flex items-center gap-1 transition-colors"
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}