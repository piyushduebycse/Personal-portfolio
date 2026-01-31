import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe, Cpu, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

// 3D Tilt Card Component
function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

const skills = [
  { name: 'React & Next.js', icon: Code, level: 60 },
  { name: 'Node.js & Express', icon: Database, level: 45 },
  { name: 'Python & ML', icon: Cpu, level: 50 },
  { name: 'Cloud & DevOps', icon: Globe, level: 45 },
];

const stats = [
  { value: '7.0', label: 'cGPA', icon: GraduationCap },
  { value: '5+', label: 'Projects', icon: Briefcase },
  { value: '0.5+', label: 'Years Exp', icon: Award },
  { value: '10+', label: 'Courses', icon: BookOpen },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8, rotateY: -30 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        '.about-content > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Skills animation
      gsap.fromTo(
        '.skill-bar',
        { width: 0 },
        {
          width: '100%',
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-500 font-medium tracking-[0.2em] text-sm">ABOUT ME</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-white">
            WHO <span className="gradient-text">I AM</span>
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="relative" style={{ perspective: '1000px' }}>
            <TiltCard className="relative">
              {/* Main Image Container */}
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-red-500/20 rounded-2xl" />
                <div className="absolute -inset-8 border border-red-500/10 rounded-3xl" />

                {/* Image */}
                <div className="relative w-full h-full rounded-xl overflow-hidden glass">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent" />
                  <img
                    src="profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Overlay Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="text-red-500 font-medium text-sm tracking-wider">CSE STUDENT</p>
                    <p className="text-white font-display text-2xl">Piyush Dubey</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 glass-red rounded-xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-display text-xl">1+</p>
                      <p className="text-white/60 text-xs">Years Coding</p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 border-t-2 border-l-2 border-red-500/30 rounded-tl-3xl" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b-2 border-r-2 border-red-500/30 rounded-br-3xl" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="about-content space-y-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-4">
                Passionate About Building{' '}
                <span className="text-red-500">Digital Experiences</span>
              </h3>
              <p className="text-white/70 leading-relaxed">
                I&apos;m a Computer Science Engineering student with a deep passion for creating
                innovative solutions that make a difference. My journey in tech started with a
                curiosity about how things work, which evolved into a career focused on building
                scalable, user-centric applications.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                With expertise in full-stack development, machine learning, and cloud technologies,
                I bring a holistic approach to every project. I believe in writing clean, maintainable
                code and creating intuitive user experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <TiltCard key={index} className="stat-card">
                  <div className="glass rounded-xl p-4 text-center hover:bg-white/5 transition-colors">
                    <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <p className="font-display text-2xl text-white">{stat.value}</p>
                    <p className="text-white/50 text-xs">{stat.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Skills */}
            <div className="skills-container space-y-4">
              <h4 className="font-display text-xl text-white mb-4">Technical Skills</h4>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-red-500" />
                      <span className="text-white/80 text-sm">{skill.name}</span>
                    </div>
                    <span className="text-red-500 text-sm font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
