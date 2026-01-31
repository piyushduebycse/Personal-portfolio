import { Code2, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Process', href: '#process' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'What I Can Do',
      links: [
        { name: 'Web Development', href: '#' },
        { name: 'Mobile Apps', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Consulting', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'GitHub', href: 'https://github.com/piyushduebycse' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/piyush-d-78b430313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { name: 'Twitter', href: 'https://twitter.com/piyushdubeycse' },
        { name: 'Email', href: 'mailto:piyushdubeycse@gmail.com' },
      ],
    },
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 group mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-red-600 rounded-lg transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <Code2 className="relative z-10 w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl tracking-wider text-white group-hover:text-red-500 transition-colors">
                PORTFOLIO
              </span>
            </a>
            <p className="text-white/60 text-sm max-w-sm mb-6">
              Computer Science Engineering student passionate about building innovative
              digital solutions and creating impactful user experiences.
            </p>
            <button
              onClick={handleScrollTop}
              className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="text-sm">Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-display text-lg text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white/60 hover:text-red-500 text-sm transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Piyush Dubey
            </p>
            <p className="text-white/40 text-sm">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
