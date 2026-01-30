"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Scroll reveal hook
function useScrollReveal(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Stagger children animation wrapper
function StaggerReveal({ 
  children, 
  className = "", 
  staggerDelay = 0.1 
}: { 
  children: React.ReactNode; 
  className?: string; 
  staggerDelay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) 
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}s`,
              }}
            >
              {child}
            </div>
          ))
        : <div style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>{children}</div>
      }
    </div>
  );
}

// Animated logo with elegant motion
function Logo({ size = "md", light = false }: { size?: "sm" | "md" | "lg"; light?: boolean }) {
  const sizes = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-28 h-28" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-2xl" };
  const color = light ? "border-primary-foreground/30" : "border-primary/30";
  const textColor = light ? "text-primary-foreground" : "text-primary";

  return (
    <div className={`relative ${sizes[size]} flex items-center justify-center`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={`${light ? "text-primary-foreground/20" : "text-primary/20"}`}
          style={{ animation: "rotate 25s linear infinite" }}
        />
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="8 4"
          className={`${light ? "text-primary-foreground/40" : "text-primary/40"}`}
          style={{ animation: "rotate 18s linear infinite reverse" }}
        />
        <circle
          cx="50" cy="50" r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={`${light ? "text-primary-foreground/30" : "text-primary/30"}`}
          style={{ animation: "rotate 12s linear infinite" }}
        />
      </svg>
      <span className={`font-serif font-semibold ${textSizes[size]} ${textColor} relative z-10`}>AGH</span>
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Navigation
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#philosophy", label: "Philosophy" },
    { href: "#exhibition", label: "Exhibition" },
    { href: "#gallery", label: "Gallery" },
    { href: "#connect", label: "Connect" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/90 backdrop-blur-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Logo size="sm" />
          <span className={`font-serif text-lg transition-colors duration-300 hidden sm:block ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            African-Georgian House
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-all duration-300 relative group ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 w-0 group-hover:w-full ${scrolled ? "bg-primary" : "bg-primary-foreground"}`} />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-primary-foreground"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-primary-foreground"} ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled ? "bg-foreground" : "bg-primary-foreground"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-80" : "max-h-0"}`}>
        <nav className="flex flex-col p-6 gap-4 bg-background/95 backdrop-blur-lg">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-foreground text-lg">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Hero with integrated intro animation
function Hero() {
  const [stage, setStage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cultural-bridge.jpg"
          alt="African Georgian cultural heritage"
          fill
          priority
          className="object-cover transition-all duration-[2s] ease-out"
          style={{
            opacity: stage >= 2 ? 0.4 : 0,
            transform: stage >= 2 ? "scale(1)" : "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div
          className="mb-10 flex justify-center"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? "scale(1)" : "scale(0.8)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Logo size="lg" light />
        </div>

        {/* Title */}
        <h1 className="font-serif text-primary-foreground leading-tight mb-6">
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            style={{
              opacity: stage >= 2 ? 1 : 0,
              transform: stage >= 2 ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            African-Georgian
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2"
            style={{
              opacity: stage >= 2 ? 1 : 0,
              transform: stage >= 2 ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            House
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          The factual exhibition of art
        </p>
        
        <p
          className="text-base text-primary-foreground/60 max-w-xl mx-auto mb-12"
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Unleashing an effective legacy across generations
        </p>

        {/* Scroll indicator */}
        <a
          href="#philosophy"
          className="inline-flex flex-col items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors group"
          style={{
            opacity: stage >= 4 ? 1 : 0,
            transition: "all 1s ease 0.5s",
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">Discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/40 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-8 bg-primary-foreground/80 animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}

// Philosophy section
function Philosophy() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="philosophy" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-6 block">(Philosophy)</span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-8 text-balance">
              Where Souls Speak Through Art
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                To unleash an effective legacy with other generations and not let the ones who came before them fade, 
                but to burn in the souls of each spectator of each masterpiece.
              </p>
              <p>
                We release the souls of unspoken pain to people. We manifest the uniqueness between art and daily life, 
                enabling souls to view the deeper meaning of each piece.
              </p>
              <p className="text-foreground font-medium">
                Not only do we showcase, but we invite you to feel the true meaning behind each work drawn by the artists.
              </p>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div className="aspect-[4/5] relative overflow-hidden group">
              <Image
                src="/images/african-art.jpg"
                alt="African art exhibition"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary/20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Purpose quote section
function Purpose() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-32 px-6 lg:px-12 bg-primary text-primary-foreground overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto text-center">
        <span
          className="text-xs tracking-[0.3em] uppercase opacity-60 mb-8 block"
          style={{
            opacity: isVisible ? 0.6 : 0,
            transition: "opacity 1s ease",
          }}
        >
          (Our Purpose)
        </span>
        <blockquote
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug text-balance"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          &ldquo;To not let the ones who came before us fade, but to burn eternally in the souls of each spectator.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

// Audience section
function Audience() {
  const audiences = [
    { num: "01", title: "Upcoming Artists", desc: "Minds seeking inspiration and mentorship" },
    { num: "02", title: "Art Lovers", desc: "Those who feel the pulse of creativity" },
    { num: "03", title: "The Masters", desc: "Creators whose legacy we preserve" },
  ];

  return (
    <section className="py-32 px-6 lg:px-12 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <StaggerReveal className="text-center mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">(For Whom We Create)</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground">Our Audience</h2>
        </StaggerReveal>

        <div className="grid sm:grid-cols-3 gap-12">
          {audiences.map((item, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div
                key={item.num}
                ref={ref}
                className="text-center group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
                }}
              >
                <span className="font-serif text-7xl sm:text-8xl text-primary/10 group-hover:text-primary/25 transition-colors duration-500 block">
                  {item.num}
                </span>
                <h3 className="font-serif text-2xl text-foreground mt-2 mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Exhibition section
function Exhibition() {
  const items = [
    { title: "African Safaris", desc: "Journey through Uganda and Kenya", image: "/images/african-safari.jpg" },
    { title: "Handicrafts", desc: "Traditional artisanal works", image: "/images/african-handicrafts.jpg" },
    { title: "Georgian Crafts", desc: "Ancient techniques, contemporary expression", image: "/images/georgian-crafts.jpg" },
    { title: "African Coffee", desc: "Premium single-origin beans", image: "/images/african-coffee.jpg" },
  ];

  return (
    <section id="exhibition" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <StaggerReveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">(Exhibition)</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground">Our Collections</h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Discover the intersection of two rich cultures through our curated exhibitions.
          </p>
        </StaggerReveal>

        <div className="grid sm:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <article
                key={item.title}
                ref={ref}
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(50px)",
                  transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 2) * 0.15}s`,
                }}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-background mb-2">{item.title}</h3>
                  <p className="text-background/70">{item.desc}</p>
                </div>
                {/* Animated line on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-500" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Gallery horizontal scroll
function Gallery() {
  const images = [
    "/images/african-art.jpg",
    "/images/african-handicrafts.jpg",
    "/images/georgian-crafts.jpg",
    "/images/african-safari.jpg",
    "/images/african-coffee.jpg",
    "/images/hero-cultural-bridge.jpg",
  ];

  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section id="gallery" className="py-32 overflow-hidden bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <StaggerReveal>
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">(Gallery)</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground">Visual Journey</h2>
        </StaggerReveal>
      </div>

      <div
        ref={ref}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s ease 0.3s",
        }}
      >
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {[...images, ...images].map((src, i) => (
            <div key={i} className="relative flex-shrink-0 w-72 sm:w-80 aspect-[3/4] overflow-hidden group">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Gallery ${(i % images.length) + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
}

// Contact section
function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="connect" className="py-32 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">(Connect)</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-12 max-w-md leading-relaxed">
              Whether you are an artist, collector, or cultural enthusiast, your journey with African-Georgian House begins here.
            </p>

            <div className="space-y-8">
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Address</p>
                <p className="text-foreground group-hover:text-primary transition-colors">Guram Panjikidze N3, Tbilisi, Georgia</p>
              </div>
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Phone</p>
                <a href="tel:+995592063906" className="text-foreground hover:text-primary transition-colors">+995 592 06 39 06</a>
              </div>
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Email</p>
                <a href="mailto:Africangeorgianhouse@gmail.com" className="text-foreground hover:text-primary transition-colors">
                  Africangeorgianhouse@gmail.com
                </a>
              </div>
              <div className="group">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">WhatsApp</p>
                <a href="https://wa.me/995592063906" className="text-foreground hover:text-primary transition-colors">+995 592 06 39 06</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(30px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-300 group"
              >
                Send Message
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="font-serif text-xl text-foreground">African-Georgian House</span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Bridging cultures through art and legacy
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919-.058 2.281-.069 1.689-.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://wa.me/995592063906" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">2025 African-Georgian House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <Hero />
      <Philosophy />
      <Purpose />
      <Audience />
      <Exhibition />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
