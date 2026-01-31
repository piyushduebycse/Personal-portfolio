import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MapPin, Mail, Phone, Github, Linkedin, Twitter, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS Configuration - Replace these with your actual credentials from EmailJS dashboard
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.contact-header > *',
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

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        '.info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Grid perspective animation
      gsap.fromTo(
        '.perspective-grid',
        { opacity: 0, rotateX: 45 },
        {
          opacity: 1,
          rotateX: 60,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
        throw new Error('EmailJS credentials are not configured. Please check your .env.local file.');
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Piyush', // Your name
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setError('Failed to send message. Please try again or contact me directly at piyushdubeycse@gmail.com');

      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Delhi, India' },
    { icon: Mail, label: 'Email', value: 'piyushdubeycse@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9088298463' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/piyushduebycse', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/piyush-d-78b430313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/piyushdubeycse', label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
        <div
          className="perspective-grid absolute inset-0 opacity-20"
          style={{
            transform: 'rotateX(60deg)',
            transformOrigin: 'center top',
            backgroundImage: `
              linear-gradient(rgba(242, 120, 6, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 10, 10, 0.9) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            height: '200%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <span className="text-red-500 font-medium tracking-[0.2em] text-sm">GET IN TOUCH</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl text-white">
            LET&apos;S <span className="gradient-text">CONNECT</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate?
            I&apos;d love to hear from you.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="info-cards space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="info-card group flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center group-hover:bg-red-600/30 transition-colors">
                    <info.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-display text-xl text-white mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-lg flex items-center justify-center hover:bg-red-600/20 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70 group-hover:text-red-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass-red rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-3 h-3">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                  <div className="relative w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <span className="text-green-400 font-medium">Available for Work</span>
              </div>
              <p className="text-white/60 text-sm">
                I&apos;m currently open to freelance projects and full-time opportunities.
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3" style={{ perspective: '1000px' }}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact-form relative glass rounded-2xl p-6 sm:p-8 hover:bg-white/[0.03] transition-colors"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-white/40 text-sm font-mono">contact_form.exe</span>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-display text-2xl text-white mb-2">$ system: Signal received.</h3>
                  <p className="text-white/60">Thank you for reaching out. I&apos;ll get back to you soon.Piyush Dubey</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-white/60 text-sm mb-2 font-mono">
                      <span className="text-red-500">$</span> name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-mono ${focusedField === 'name'
                        ? 'border-red-500 shadow-glow-red'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <label className="block text-white/60 text-sm mb-2 font-mono">
                      <span className="text-red-500">$</span> subject:
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-mono ${focusedField === 'subject'
                        ? 'border-red-500 shadow-glow-red'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                      placeholder="Enter the subject..."
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-white/60 text-sm mb-2 font-mono">
                      <span className="text-red-500">$</span> email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-mono ${focusedField === 'email'
                        ? 'border-red-500 shadow-glow-red'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                      placeholder="Enter your email..."
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-white/60 text-sm mb-2 font-mono">
                      <span className="text-red-500">$</span> message:
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-300 font-mono resize-none ${focusedField === 'message'
                        ? 'border-red-500 shadow-glow-red'
                        : 'border-white/10 hover:border-white/20'
                        }`}
                      placeholder="Type your message here..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </div>
              )}

              {/* Decorative Corner */}
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-red-500/50 rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-red-500/50 rounded-bl-lg" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
