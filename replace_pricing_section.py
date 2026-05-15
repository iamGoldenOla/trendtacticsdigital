filepath = "pricing.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find the start and end markers
start_marker = "<!-- Compare Packages Table -->"
end_marker = "<!-- Get a Quote Form -->"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: Could not find markers. start={start_idx}, end={end_idx}")
    exit(1)

new_section = '''<!-- Interactive Pricing Cards -->
                <div class="rc-section" id="pricing-cards">

                  <!-- Currency Toggle -->
                  <div class="rc-currency-toggle-wrap">
                    <span class="rc-currency-label active" id="rc-label-ngn">&#8358; NGN</span>
                    <label class="rc-toggle-switch" aria-label="Switch currency">
                      <input type="checkbox" id="rc-currency-toggle">
                      <span class="rc-toggle-slider"></span>
                    </label>
                    <span class="rc-currency-label" id="rc-label-usd">$ USD</span>
                  </div>

                  <!-- Section 01: Corporate Website -->
                  <div class="rc-section-header">
                    <span class="rc-section-num">01</span>
                    <div>
                      <div class="rc-section-label">Service Category</div>
                      <div class="rc-section-title">Business / Corporate Website</div>
                    </div>
                    <div class="rc-section-line"></div>
                  </div>

                  <div class="rc-card-grid">
                    <div class="rc-card">
                      <div class="rc-card-tier">Tier 01 &mdash; Basic</div>
                      <div class="rc-card-name">Static Website</div>
                      <div class="rc-card-desc">Perfect for small businesses needing a solid online presence</div>
                      <div class="rc-price-block">
                        <div class="rc-price-label">Starting From</div>
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;200,000</span>
                          <span class="price-usd" style="display:none;">$130</span>
                        </div>
                        <div class="rc-price-hosting price-ngn">With Domain &amp; Hosting: <strong>&#8358;300,000</strong></div>
                        <div class="rc-price-hosting price-usd" style="display:none;">With Domain &amp; Hosting: <strong>$200</strong></div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>Up to 5 pages</li>
                        <li>Mobile responsive design</li>
                        <li>Contact form integration</li>
                        <li>Social media links</li>
                        <li>Basic SEO setup</li>
                        <li>3 months support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>

                    <div class="rc-card rc-card-featured">
                      <div class="rc-card-badge">Most Popular</div>
                      <div class="rc-card-tier">Tier 02 &mdash; Standard</div>
                      <div class="rc-card-name">Dynamic Website</div>
                      <div class="rc-card-desc">For growing businesses ready to scale their online presence</div>
                      <div class="rc-price-block">
                        <div class="rc-price-label">Starting From</div>
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;500,000</span>
                          <span class="price-usd" style="display:none;">$320</span>
                        </div>
                        <div class="rc-price-hosting price-ngn">With Domain &amp; Hosting: <strong>&#8358;600,000</strong></div>
                        <div class="rc-price-hosting price-usd" style="display:none;">With Domain &amp; Hosting: <strong>$390</strong></div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>Everything in Basic, plus:</li>
                        <li>10+ pages</li>
                        <li>CMS / admin dashboard</li>
                        <li>Blog &amp; news section</li>
                        <li>Advanced forms &amp; validation</li>
                        <li>Analytics integration</li>
                        <li>6 months support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>

                    <div class="rc-card">
                      <div class="rc-card-tier">Tier 03 &mdash; Premium</div>
                      <div class="rc-card-name">Advanced Platform</div>
                      <div class="rc-card-desc">For serious brands, organisations &amp; complex platforms</div>
                      <div class="rc-price-block">
                        <div class="rc-price-label">Starting From</div>
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;1,200,000</span>
                          <span class="price-usd" style="display:none;">$770</span>
                        </div>
                        <div class="rc-price-hosting price-ngn">With Domain &amp; Hosting: <strong>&#8358;1,300,000</strong></div>
                        <div class="rc-price-hosting price-usd" style="display:none;">With Domain &amp; Hosting: <strong>$840</strong></div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>Everything in Standard, plus:</li>
                        <li>User login &amp; client portal</li>
                        <li>Custom dashboard features</li>
                        <li>Automation-ready structure</li>
                        <li>Advanced security features</li>
                        <li>Priority response</li>
                        <li>12 months support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>
                  </div>

                  <!-- Section 02: Other Web Packages -->
                  <div class="rc-section-header">
                    <span class="rc-section-num">02</span>
                    <div>
                      <div class="rc-section-label">Service Category</div>
                      <div class="rc-section-title">Other Web Packages</div>
                    </div>
                    <div class="rc-section-line"></div>
                  </div>

                  <div class="rc-package-list">
                    <div class="rc-pkg-row">
                      <div class="rc-pkg-info">
                        <div class="rc-pkg-name">Landing Page</div>
                        <div class="rc-pkg-note">High-converting single-page sites</div>
                      </div>
                      <div class="rc-pkg-price-wrap">
                        <div class="rc-pkg-price price-ngn">&#8358;150,000</div>
                        <div class="rc-pkg-price price-usd" style="display:none;">$97</div>
                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;250,000</div>
                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $162</div>
                      </div>
                    </div>
                    <div class="rc-pkg-row">
                      <div class="rc-pkg-info">
                        <div class="rc-pkg-name">Portfolio / Personal Website</div>
                        <div class="rc-pkg-note">Showcase your work and identity</div>
                      </div>
                      <div class="rc-pkg-price-wrap">
                        <div class="rc-pkg-price price-ngn">&#8358;400,000</div>
                        <div class="rc-pkg-price price-usd" style="display:none;">$258</div>
                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;500,000</div>
                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $323</div>
                      </div>
                    </div>
                    <div class="rc-pkg-row">
                      <div class="rc-pkg-info">
                        <div class="rc-pkg-name">E-Commerce Website</div>
                        <div class="rc-pkg-note">Full online store with payments &amp; inventory</div>
                      </div>
                      <div class="rc-pkg-price-wrap">
                        <div class="rc-pkg-price price-ngn">&#8358;2,000,000</div>
                        <div class="rc-pkg-price price-usd" style="display:none;">$1,290</div>
                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;2,100,000</div>
                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $1,355</div>
                      </div>
                    </div>
                    <div class="rc-pkg-row">
                      <div class="rc-pkg-info">
                        <div class="rc-pkg-name">LMS &mdash; E-Learning Platform</div>
                        <div class="rc-pkg-note">Courses, students &amp; certifications</div>
                      </div>
                      <div class="rc-pkg-price-wrap">
                        <div class="rc-pkg-price price-ngn">&#8358;2,500,000</div>
                        <div class="rc-pkg-price price-usd" style="display:none;">$1,613</div>
                        <div class="rc-pkg-hosting price-ngn">With Domain &amp; Hosting: &#8358;2,600,000</div>
                        <div class="rc-pkg-hosting price-usd" style="display:none;">With Domain &amp; Hosting: $1,677</div>
                      </div>
                    </div>
                  </div>

                  <!-- Section 03: App Development -->
                  <div class="rc-section-header">
                    <span class="rc-section-num">03</span>
                    <div>
                      <div class="rc-section-label">Service Category</div>
                      <div class="rc-section-title">Mobile App Development</div>
                    </div>
                    <div class="rc-section-line"></div>
                  </div>

                  <div class="rc-card-grid">
                    <div class="rc-card">
                      <div class="rc-card-tier">Tier 01</div>
                      <div class="rc-card-name">Basic App</div>
                      <div class="rc-card-desc">Android or iOS app for startups and small businesses</div>
                      <div class="rc-price-block">
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;1,000,000</span>
                          <span class="price-usd" style="display:none;">$645</span>
                        </div>
                        <div class="rc-price-hosting">/project</div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>Android or iOS app</li>
                        <li>Basic UI/UX design</li>
                        <li>Push notifications</li>
                        <li>API integration</li>
                        <li>App store submission</li>
                        <li>3 months support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>

                    <div class="rc-card rc-card-featured">
                      <div class="rc-card-badge">Most Popular</div>
                      <div class="rc-card-tier">Tier 02</div>
                      <div class="rc-card-name">Professional</div>
                      <div class="rc-card-desc">iOS &amp; Android cross-platform with advanced features</div>
                      <div class="rc-price-block">
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;2,000,000</span>
                          <span class="price-usd" style="display:none;">$1,290</span>
                        </div>
                        <div class="rc-price-hosting">/project</div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>iOS &amp; Android (hybrid or native)</li>
                        <li>Advanced UI/UX design</li>
                        <li>Payment integration</li>
                        <li>Realtime chat &amp; notifications</li>
                        <li>Performance analytics</li>
                        <li>App store optimisation</li>
                        <li>6 months support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>

                    <div class="rc-card">
                      <div class="rc-card-tier">Tier 03</div>
                      <div class="rc-card-name">Advanced Enterprise</div>
                      <div class="rc-card-desc">Multi-platform, custom backend &amp; enterprise-grade</div>
                      <div class="rc-price-block">
                        <div class="rc-price-amount">
                          <span class="price-ngn">&#8358;4,000,000</span>
                          <span class="price-usd" style="display:none;">$2,581</span>
                        </div>
                        <div class="rc-price-hosting">/project</div>
                      </div>
                      <ul class="rc-feature-list">
                        <li>Multi-platform: iOS, Android, Desktop</li>
                        <li>Custom backend/API development</li>
                        <li>DevOps &amp; CI/CD setup</li>
                        <li>Advanced integrations</li>
                        <li>Security audits</li>
                        <li>Dedicated project manager</li>
                        <li>12 months priority support</li>
                      </ul>
                      <a href="contact" class="rc-card-btn">Get Started</a>
                    </div>
                  </div>

                  <!-- Domain & Hosting -->
                  <div class="rc-section-header">
                    <span class="rc-section-num">04</span>
                    <div>
                      <div class="rc-section-label">Add-On</div>
                      <div class="rc-section-title">Domain &amp; Hosting</div>
                    </div>
                    <div class="rc-section-line"></div>
                  </div>
                  <div class="rc-hosting-box">
                    <div class="rc-hosting-info">
                      <div class="rc-hosting-title">Standard Hosting Package</div>
                      <div class="rc-hosting-sub">Yearly &middot; Capped Price</div>
                      <div class="rc-hosting-feats">
                        <span>Domain Registration</span>
                        <span>Secure Hosting</span>
                        <span>Basic Setup</span>
                      </div>
                    </div>
                    <div class="rc-hosting-price-wrap">
                      <div class="rc-hosting-price price-ngn">&#8358;100,000</div>
                      <div class="rc-hosting-price price-usd" style="display:none;">$65</div>
                      <div class="rc-hosting-price-sub">Per year</div>
                    </div>
                  </div>

                  <!-- Note -->
                  <div class="rc-note-box">
                    <p><strong>Prices are starting points.</strong> Final cost depends on features and complexity.</p>
                    <p><strong>Domain &amp; hosting</strong> are included only where stated.</p>
                    <p>A <strong>full custom quote</strong> is provided after your free consultation session.</p>
                  </div>

                </div>
                <!-- End Interactive Pricing Cards -->

                '''

# Replace from start of "<!-- Compare Packages Table -->" to just before "<!-- Get a Quote Form -->"
content = content[:start_idx] + new_section + content[end_idx:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Replaced rate card section.")
