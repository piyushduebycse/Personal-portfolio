import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from 'react-parallax-tilt';
import Marquee from 'react-fast-marquee';
import { ExternalLink, Github, Layers, Sparkles, ArrowRight } from 'lucide-react';
import { id } from 'date-fns/locale';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Chatbot',
    description: 'An intelligent conversational AI built with Python and TensorFlow, featuring natural language processing and context-aware responses.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    tags: ['Python', 'TensorFlow', 'NLP', 'React'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Shopify devlopment full customize',
    image: 'Nosugar.png',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Phonepe PG'],
    github: 'https://github.com', // Add your actual GitHub repo URL here
    demo: 'https://thenosugarstore.com/',
    featured: true,
  },
  {
    id: 3,
    title: 'Data Visualization Dashboard',
    description: 'Interactive analytics dashboard with real-time data streaming and customizable visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['D3.js', 'React', 'WebSocket', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  {
    id: 4,
    title: 'Cloud File Manager',
    description: 'Secure cloud storage solution with file encryption, sharing capabilities, and version control.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    tags: ['AWS', 'Node.js', 'React', 'Docker'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
  },
  //{ 
    //id: 5,
    //title: 'Mobile Fitness App',
    //description: 'Cross-platform fitness tracking app with workout plans, progress tracking, and social features.',
    //image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
    //tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    //github: 'https://github.com',
    //demo: 'https://demo.com',
    //featured: false,
  //},
  {
    id: 6,
    title: 'Blockchain Voting System',
    description: 'Decentralized voting platform ensuring transparency and security using smart contracts.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
  },
];

// 3D Project Card Component
function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt
      tiltMaxAngleX={0}
      tiltMaxAngleY={0}
      perspective={1000}
      glareEnable={false}
      glareMaxOpacity={0.3}
      //glareColor="#9f96f3ff"
      glarePosition="all"
      scale={1.02}
      transitionSpeed={2000}
      className={`project-card relative group ${project.featured ? 'md:col-span-2 md:row-span-2' : ''} h-full`}
    >
      <div className="relative h-full glass rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-colors duration-300">
        {/* Image */}
        <div className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-48'}`}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" /> */}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-600/90 rounded-full">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium">Featured</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black/80 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`font-display text-white mb-2 ${project.featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-full border border-red-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Border Glow Effect */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-red-500/0 transition-all duration-300 pointer-events-none group-hover:border-red-500/50 group-hover:shadow-glow-red"
        />
      </div>
    </Tilt>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'featured', 'web', 'mobile', 'ai'];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    if (filter === 'web') return project.tags.some((t) => ['React', 'Next.js', 'Node.js'].includes(t));
    if (filter === 'mobile') return project.tags.includes('React Native');
    if (filter === 'ai') return project.tags.includes('Python') || project.tags.includes('TensorFlow');
    return true;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.portfolio-header > *',
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

      // Projects grid animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
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
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="portfolio-header text-center mb-12">
          <span className="text-red-500 font-medium tracking-[0.2em] text-sm">MY WORK</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-white">
            FEATURED <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development,
            machine learning, and cloud technologies.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === f
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Display */}
        <div className="projects-display">
          {/* Mobile Marquee */}
          <div className="md:hidden -mx-4 sm:-mx-6 lg:-mx-8">
            <Marquee
              gradient={false}
              speed={40}
              pauseOnHover={false}
              className="py-4"
            >
              <div className="flex gap-6 pl-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="w-[85vw] sm:w-[500px] h-[400px]">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid projects-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white hover:bg-red-600/20 transition-all duration-300 group"
          >
            <Layers className="w-5 h-5" />
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
