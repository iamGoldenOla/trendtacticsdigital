"use client";
import Link from "next/link";
import { FaRocket, FaBrain, FaUsers, FaChartLine, FaClock, FaShieldAlt, FaBriefcase, FaStar, FaAward, FaBullhorn, FaSearch, FaCrown, FaShoppingCart, FaEdit, FaChevronUp } from "react-icons/fa";
import ReasonCard from "../../components/ReasonCard";
import ServiceCard from "../../components/ServiceCard";
import TestimonialCard from "../../components/TestimonialCard";
import { useState, useEffect, useRef } from "react";
import testimonials from "../../data/testimonials.json";
import services from "../../data/services.json";
import React from "react";

const serviceIcons: Record<string, React.ReactNode> = {
  FaRocket: <FaRocket className="text-cyan-500" />,
  FaBullhorn: <FaBullhorn className="text-cyan-500" />,
  FaSearch: <FaSearch className="text-cyan-500" />,
  FaCrown: <FaCrown className="text-cyan-500" />,
  FaShoppingCart: <FaShoppingCart className="text-cyan-500" />,
  FaEdit: <FaEdit className="text-cyan-500" />,
};

export default function HomePage() {
  // Scroll-to-top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Set client-side flag and initialize perView
  useEffect(() => {
    setIsClient(true);
    const updatePerView = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    updatePerView();
    window.addEventListener('resize', updatePerView);
    return () => window.removeEventListener('resize', updatePerView);
  }, []);

  // Calculate total slides only after perView is set
  const totalSlides = isClient ? Math.ceil(testimonials.length / perView) : 1;

  // Auto-play
  useEffect(() => {
    if (!isClient) return;
    
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.ceil(testimonials.length / perView));
    }, 7000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [perView, isClient]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((prev) => (prev + 1) % totalSlides);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section — full-bleed, sits under the fixed nav */}
      <section className="hero-section relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden -mt-16 md:-mt-20">
        {/* Video / Image Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/Trendtactics-digital-promo.jpg"
          >
            <source src="/images/Trendtactics-digital-promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="text-white drop-shadow-lg">
              We Engineer{' '}
            </span>
            <span className="bg-gradient-to-r from-[#00FFFF] to-[#0047FF] bg-clip-text text-transparent">
              Digital Growth
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl text-white/90 leading-relaxed px-2">
            Unlock strategy, creativity, and AI power — all in one studio. Transform your business with data-driven digital marketing that delivers real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full hover:bg-[#40E0D0] transition-all duration-300 shadow-lg hover:shadow-cyan-400/40 text-base sm:text-lg text-center"
            >
              Explore Services
            </Link>
            <Link
              href="/portfolio"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0A1E3F] transition-all duration-300 text-base sm:text-lg text-center"
            >
              View Our Work
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 sm:py-10 bg-gray-50 dark:bg-[#0A1E3F]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm font-semibold mb-4 text-gray-500 dark:text-white/50 uppercase tracking-widest">
            Trusted by leading brands
          </p>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" id="brands-grid">
              {/* TODO: Dynamically load brands from JSON or static list */}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="side-accent absolute left-0 top-0 h-full w-1.5 sm:w-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-lg hidden md:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#0A1E3F] dark:text-white">
              Why Choose Trendtactics Digital?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              We don&apos;t just deliver results — we engineer sustainable growth through strategic innovation and proven methodologies.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <ReasonCard icon={<FaRocket className="text-cyan-500" />} title="Proven Results" description="We've helped 500+ businesses achieve an average of 300% ROI increase and 200% traffic growth within 6 months." />
            <ReasonCard icon={<FaBrain className="text-cyan-500" />} title="AI-Powered Strategy" description="Leverage cutting-edge AI tools and data analytics to make informed decisions and optimize campaigns in real-time." />
            <ReasonCard icon={<FaUsers className="text-cyan-500" />} title="Expert Team" description="Our certified professionals bring 10+ years of experience in digital marketing, SEO, and growth hacking." />
            <ReasonCard icon={<FaChartLine className="text-cyan-500" />} title="Transparent Reporting" description="Get detailed monthly reports with actionable insights, performance metrics, and growth recommendations." />
            <ReasonCard icon={<FaClock className="text-cyan-500" />} title="Fast Implementation" description="See results within 30 days with our rapid deployment strategies and optimized workflows." />
            <ReasonCard icon={<FaShieldAlt className="text-cyan-500" />} title="Risk-Free Guarantee" description="100% satisfaction guarantee with performance-based pricing and no long-term contracts required." />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-[#0A1E3F]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#0A1E3F] dark:text-white">
              Our Services
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions designed to accelerate your business growth and maximize ROI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.title + idx}
                icon={serviceIcons[service.icon]}
                title={service.title}
                description={service.description}
                price={service.price}
                duration={service.duration}
                link={service.link}
                linkText={service.linkText}
              />
            ))}
          </div>
          {/* SVG Divider */}
          <div className="w-full overflow-hidden mt-8 sm:mt-12">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12">
              <path d="M0,40 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z" fill="#00FFFF" fillOpacity="0.12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Scrolling Trust Bar */}
      <div className="scrolling-trust-bar bg-[#0A1E3F] text-white py-3 sm:py-4 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-flex items-center">
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaBriefcase className="mr-2 text-[#00FFFF]" />500+ Projects Delivered
          </span>
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaStar className="mr-2 text-[#00FFFF]" />98% Client Satisfaction
          </span>
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaAward className="mr-2 text-[#00FFFF]" />10+ Years Experience
          </span>
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaBriefcase className="mr-2 text-[#00FFFF]" />500+ Projects Delivered
          </span>
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaStar className="mr-2 text-[#00FFFF]" />98% Client Satisfaction
          </span>
          <span className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base">
            <FaAward className="mr-2 text-[#00FFFF]" />10+ Years Experience
          </span>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#0A1E3F] dark:text-white">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experience with Trendtactics Digital.
            </p>
          </div>
          <div className="testimonials-container relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {isClient && Array.from({ length: totalSlides }).map((_, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="flex gap-4 sm:gap-6 lg:gap-8 min-w-full px-1"
                    style={{ minWidth: '100%' }}
                  >
                    {testimonials.slice(slideIdx * perView, (slideIdx + 1) * perView).map((t, idx) => (
                      <TestimonialCard key={t.authorName + idx} {...t} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel controls */}
            {isClient && (
              <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={prev}
                  className="p-2 sm:p-3 rounded-full bg-[#0A1E3F]/10 hover:bg-[#00FFFF] hover:text-[#0A1E3F] text-[#0A1E3F] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <FaChevronUp className="rotate-[-90deg] w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-0.5 transition-all ${
                      current === idx ? 'bg-[#00FFFF] scale-125' : 'bg-gray-300 dark:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial slide ${idx + 1}`}
                  />
                ))}
                <button
                  onClick={next}
                  className="p-2 sm:p-3 rounded-full bg-[#0A1E3F]/10 hover:bg-[#00FFFF] hover:text-[#0A1E3F] text-[#0A1E3F] transition-colors"
                  aria-label="Next testimonial"
                >
                  <FaChevronUp className="rotate-90 w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#0A1E3F] via-[#0A1E3F] to-[#0047FF] text-white text-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#00FFFF]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-36 sm:w-56 h-36 sm:h-56 bg-[#00FFFF]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-white/80 max-w-xl mx-auto">
            Let&apos;s discuss how we can help you achieve your digital marketing goals and drive real business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#00FFFF] text-[#0A1E3F] font-semibold rounded-full hover:bg-[#40E0D0] transition-all duration-300 shadow-lg hover:shadow-cyan-400/40 text-base sm:text-lg"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/quiz"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0A1E3F] transition-all duration-300 text-base sm:text-lg"
            >
              Take Growth Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Ebook Promo Marquee */}
      <div className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-[#0A1E3F] py-2.5 sm:py-3 font-semibold text-center text-sm sm:text-base overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-marquee">
          🔥 Discover my premium ebooks for business growth! Visit the <Link href="/shop" className="underline font-bold hover:text-[#0047FF]">Author Shop</Link> to buy now and unlock your success! 🔥
        </span>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-[#00FFFF] text-[#0A1E3F] p-3 sm:p-4 rounded-full shadow-lg cursor-pointer hover:bg-[#40E0D0] transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <FaChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </>
  );
}
