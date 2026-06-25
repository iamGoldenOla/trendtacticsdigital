"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Head from 'next/head';
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  cta?: string;
}

const faqData = [
  {
    question: "What are your pricing options?",
    answer:
      "We offer flexible pricing models including project-based pricing, monthly retainers, and performance-based packages. Our rates start from $500/hour for consulting and vary based on project scope. Contact us for a custom quote.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! We work with clients globally and have experience serving businesses in various time zones. We use modern collaboration tools to ensure smooth communication regardless of location.",
  },
  {
    question: "What makes your AI solutions different?",
    answer:
      "Our AI solutions are custom-built for each business, not generic templates. We combine cutting-edge AI technology with deep marketing expertise to create intelligent systems that actually improve your business processes and ROI.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track key performance indicators (KPIs) specific to your goals, including traffic growth, conversion rates, lead generation, revenue impact, and ROI. You'll receive regular reports and insights to see your progress.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Absolutely! We offer ongoing support, maintenance, and optimization services. Many clients choose our monthly retainer packages for continuous improvement and support.",
  },
  {
    question: "Can I see examples of your work?",
    answer:
      'Yes! Check out our <a href="/portfolio" class="text-primary underline">portfolio page</a> to see case studies and examples of our work. We\'re proud of our track record and happy to share specific examples relevant to your industry.',
  },
];

const ContactPage = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [aiSubjectLoading, setAiSubjectLoading] = useState(false);
  const [aiMsgLoading, setAiMsgLoading] = useState(false);
  const [aiThankYou, setAiThankYou] = useState("");
  const [aiSentiment, setAiSentiment] = useState("");
  const [rssPosts, setRssPosts] = useState<BlogPost[]>([]);
  const [rssError, setRssError] = useState("");

  // RSS Feed fetch
  useEffect(() => {
    fetch("/data/blog-posts.json")
      .then((res) => res.json())
      .then((data) => setRssPosts(data.posts?.slice(0, 5) || []))
      .catch(() => setRssError("Unable to load latest posts."));
  }, []);

  // AI-powered subject suggestion (mocked)
  const handleAiSubject = () => {
    setAiSubjectLoading(true);
    setTimeout(() => {
      setSubject(
        name && message
          ? `Inquiry from ${name}`
          : "General Inquiry"
      );
      setAiSubjectLoading(false);
    }, 1000);
  };

  // AI-powered message suggestion (mocked)
  const handleAiMsg = () => {
    setAiMsgLoading(true);
    setTimeout(() => {
      setMessage(
        name && subject
          ? `Hello, my name is ${name}. I would like to discuss: ${subject}`
          : "Hello, I have a question."
      );
      setAiMsgLoading(false);
    }, 1000);
  };

  // AI-powered sentiment analysis (mocked)
  const handleSentiment = () => {
    if (message.length < 10) {
      setAiSentiment("");
      return;
    }
    setAiSentiment("Analyzing sentiment...");
    setTimeout(() => {
      setAiSentiment(
        message.toLowerCase().includes("urgent")
          ? "AI Sentiment: Urgent (contains the word 'urgent')"
          : "AI Sentiment: Positive"
      );
    }, 1000);
  };

  // AI-powered thank you message (mocked)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'form_submit', {
        event_category: 'Form',
        event_label: 'Contact Form',
        page_location: window.location.pathname
      });
    }
    setAiThankYou("Generating personalized thank you...");

    const payload = {
      name,
      email,
      phone,
      company,
      service: subject,
      message,
      page_source: typeof window !== 'undefined' ? window.location.href : '/contact'
    };

    // 1. Send Activepieces Webhook POST
    try {
      await fetch('https://activepieces.trendtacticsdigital.com/api/v1/webhooks/FLOW_4_WEBHOOK_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (apErr) {
      const err = apErr as Error;
      console.warn('Activepieces webhook failed:', err.message);
    }

    // 2. Send LMS Backend POST (for email notification)
    try {
      await fetch('/api/leads/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          service: subject,
          message
        })
      });
    } catch (lmsErr) {
      const err = lmsErr as Error;
      console.warn('LMS Backend lead post failed:', err.message);
    }

    // 3. Register client on TrendyAI backend & trigger agent routing
    try {
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const backendURL = isLocalhost ? 'http://localhost:3000' : 'https://api.trendtacticsdigital.com';

      const clientPayload = {
        name,
        email,
        company: company || subject,
        phone,
        status: 'active',
        metadata: {
          subject,
          message
        }
      };

      const clientResponse = await fetch(`${backendURL}/api/v1/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientPayload)
      });

      if (clientResponse.ok) {
        const clientResult = await clientResponse.json();
        const clientId = clientResult.data && clientResult.data.id;

        if (clientId) {
          await fetch(`${backendURL}/api/agent/route`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: `Client: ${name}\nSubject: ${subject}\nMessage: ${message}`,
              client_id: clientId
            })
          });
        }
      }
    } catch (backendErr) {
      const err = backendErr as Error;
      console.warn('TrendyAI backend registration failed:', err.message);
    }

    setTimeout(() => {
      setAiThankYou(
        `Thank you, ${name || "friend"}, for reaching out! We appreciate your message and will get back to you soon. <div class='text-xs text-gray-400 mt-2'>Powered by GPT-4.1 nano (mocked)</div>`
      );
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "url": "https://trendtacticsdigital.com/contact",
          "name": "Contact Us - Trendtactics Digital",
          "description": "Contact Trendtactics Digital for digital marketing, web design, AI solutions, and growth strategy consultations.",
          "publisher": {
            "@type": "Organization",
            "name": "Trendtactics Digital",
            "logo": {
              "@type": "ImageObject",
              "url": "https://trendtacticsdigital.com/images/og-image.jpg"
            }
          }
        }`}} />
      </Head>
      <div className="bg-white min-h-screen flex flex-col">
        <main className="flex-1">
          {/* Contact Form Section */}
          <motion.section
            className="py-12 glass-bg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-4 max-w-3xl">
              <h1 className="text-3xl font-bold mb-2 text-center">Contact Us</h1>
              <p className="mb-8 text-center text-gray-600">
                Have a question or want to start a project? Fill out the form below and our team will get back to you promptly.
              </p>
              <motion.form
                className="space-y-4 glass-card shadow-lg p-6"
                onSubmit={handleSubmit}
                id="contactForm"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div>
                  <label className="block font-medium">Name</label>
                  <input
                    id="contactName"
                    type="text"
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border rounded px-3 py-2 mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium">Company Name</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 mt-1"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full border rounded px-3 py-2 mt-1"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block font-medium">Subject</label>
                    <input
                      id="contactSubject"
                      type="text"
                      className="w-full border rounded px-3 py-2 mt-1"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    id="aiSubjectSuggest"
                    className="btn-tool"
                    onClick={handleAiSubject}
                    disabled={aiSubjectLoading}
                  >
                    {aiSubjectLoading ? "..." : "AI Suggest"}
                  </button>
                </div>
                <div>
                  <label className="block font-medium">Message</label>
                  <textarea
                    className="w-full border rounded px-3 py-2 mt-1"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      className="btn-tool"
                      onClick={handleAiMsg}
                      disabled={aiMsgLoading}
                    >
                      {aiMsgLoading ? "..." : "AI Write"}
                    </button>
                    <button
                      type="button"
                      className="btn-tool"
                      onClick={handleSentiment}
                    >
                      Analyze Tone
                    </button>
                  </div>
                  {aiSentiment && <div className="text-xs text-gray-500 mt-1">{aiSentiment}</div>}
                </div>
                <button type="submit" className="btn-tool w-full">Send Message</button>
                {aiThankYou && (
                  <div className="mt-4 text-green-600" dangerouslySetInnerHTML={{ __html: aiThankYou }} />
                )}
              </motion.form>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqData.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    className="glass-card shadow p-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(10,30,63,0.18)" }}
                  >
                    <div className="font-semibold mb-1">{faq.question}</div>
                    <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Ebook Promo Section */}
          <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100 border-t">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <h2 className="text-2xl font-bold mb-2">Discover My Premium Ebooks for Business Growth!</h2>
              <p className="mb-4">
                Visit the <Link href="/shop" className="text-primary underline">Author Shop</Link> to buy now and unlock your success! <span className="text-xl">🔥</span>
              </p>
              <Link href="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded font-semibold text-lg shadow">
                Shop Ebooks Now
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-primary text-white text-center border-t">
            <div className="container mx-auto px-4 max-w-2xl">
              <h2 className="text-2xl font-bold mb-2">Ready to Start Your Project?</h2>
              <p className="mb-6">
                Join hundreds of businesses that have transformed their digital presence with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contactForm" className="bg-white text-primary px-6 py-3 rounded font-semibold border border-white hover:bg-gray-100 transition">Start Your Project</a>
                <Link href="/portfolio" className="bg-transparent border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-primary transition">View Our Work</Link>
              </div>
            </div>
          </section>

          {/* RSS Feed Section */}
          <section className="py-12 bg-gray-50 border-t">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Latest Blog Posts</h2>
              {rssError ? (
                <div className="text-center text-red-500">{rssError}</div>
              ) : (
                <div className="space-y-4">
                  {rssPosts.map((post: BlogPost) => (
                    <div key={post.id} className="flex gap-4 bg-white rounded shadow p-4 items-center">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded">
                          <span className="text-3xl">📰</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1">
                          <Link href={`/blog-post?id=${post.id}`}>{post.title}</Link>
                        </h4>
                        <p className="text-gray-600 text-sm mb-1">{post.excerpt}</p>
                        <div className="flex gap-4 text-xs text-gray-400">
                          <span>📅 {new Date(post.date || '').toLocaleDateString()}</span>
                          <span>✍️ {post.author}</span>
                          <span>⏱️ {post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage; 