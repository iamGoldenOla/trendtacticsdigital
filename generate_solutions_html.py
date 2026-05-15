import re

def create_website_solutions():
    with open('index.html', 'r', encoding='utf-8') as f:
        index_content = f.read()
        
    nav_match = re.search(r'<nav id="navigation" class="navbar">.*?</nav>', index_content, re.DOTALL)
    footer_match = re.search(r'<footer class="footer site-footer">.*?</footer>', index_content, re.DOTALL)
    
    if not nav_match or not footer_match:
        print("Could not find nav or footer")
        return
        
    nav_html = nav_match.group(0)
    footer_html = footer_match.group(0)
    
    html_skeleton = f"""<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Website Solutions Guide — Trendtactics Digital</title>
  <meta name="description" content="Find the right website for your brand or business. We help businesses choose and build the right digital solution for growth.">
  <link rel="stylesheet" href="/styles/main.css?v=1772546233">
  <link rel="stylesheet" href="/styles/website-solutions.css?v=1772546233">
  <!-- Supabase CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="/js/supabase-utils.js"></script>
  <link rel="icon" type="image/png" href="/img/Trendtactics_digital_favicon.png">
  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body class="solutions-page dark-mode">

  {nav_html}

  <main id="solutions-main">
    <!-- HERO SECTION -->
    <section class="solutions-hero" id="hero">
      <div class="solutions-container">
        <div class="hero-content">
          <h1 class="hero-title">Find the Right Website for Your Brand or Business</h1>
          <p class="hero-subtitle">We help businesses, creators, schools, organizations, and brands choose and build the right digital solution for growth.</p>
          <div class="hero-actions">
            <a href="#solutions-grid" class="btn-premium">Explore Website Solutions</a>
            <a href="#project-form" class="btn-outline">Start Your Project</a>
          </div>
        </div>
        
        <div class="hero-stats">
          <div class="stat-card">
            <h3>500+</h3>
            <p>Websites Built</p>
          </div>
          <div class="stat-card">
            <h3>99%</h3>
            <p>Client Satisfaction</p>
          </div>
          <div class="stat-card">
            <h3>24+</h3>
            <p>Industries Served</p>
          </div>
          <div class="stat-card">
            <h3>100%</h3>
            <p>AI-Powered Solutions</p>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO SECTION -->
    <section class="solutions-intro" id="intro">
      <div class="solutions-container">
        <div class="intro-grid">
          <div class="intro-text">
            <h2>Why Strategy Comes Before Design</h2>
            <p>Not all websites are built for the same goals. Choosing the wrong website structure can severely limit your growth, hurt your SEO, and waste your budget.</p>
            <p>We build enterprise-grade infrastructure tailored exactly to how your specific business operates.</p>
          </div>
          <div class="intro-cards">
            <div class="icard">
              <i data-lucide="target"></i>
              <h4>Strategic Alignment</h4>
              <p>Your website must match your specific business model.</p>
            </div>
            <div class="icard">
              <i data-lucide="zap"></i>
              <h4>Performance First</h4>
              <p>Speed, security, and scalability built in from day one.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WEBSITE TYPES GRID -->
    <section class="solutions-grid-section" id="solutions-grid">
      <div class="solutions-container">
        <h2 class="section-title">Select Your Digital Solution</h2>
        <p class="section-subtitle">Choose the architecture that fits your exact business needs.</p>
        
        <div class="solutions-grid">
          <!-- Will be populated by JS or static HTML -->
        </div>
      </div>
    </section>

    <!-- FEATURE COMPARISON TABLE -->
    <section class="solutions-comparison" id="comparison">
      <div class="solutions-container">
        <h2 class="section-title">Feature Comparison</h2>
        <div class="table-responsive">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Website Type</th>
                <th>Booking System</th>
                <th>Payments</th>
                <th>Dashboard</th>
                <th>Blog</th>
                <th>AI Features</th>
                <th>Membership</th>
                <th>E-Commerce</th>
                <th>SEO Optimization</th>
                <th>Mobile Optimization</th>
              </tr>
            </thead>
            <tbody id="comparison-body">
              <!-- JS Populated -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- READINESS CHECKLIST -->
    <section class="solutions-checklist" id="checklist">
      <div class="solutions-container">
        <h2 class="section-title">What You Need Before We Start</h2>
        <div class="checklist-grid">
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>Logo & Branding</h4><p>High-res logo, brand colors, fonts.</p></div></div>
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>About Information</h4><p>Company history, mission, vision.</p></div></div>
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>Services/Products</h4><p>Clear list of offerings and pricing.</p></div></div>
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>Media Assets</h4><p>Professional photos and videos.</p></div></div>
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>Domain & Hosting</h4><p>We can help set this up if needed.</p></div></div>
          <div class="check-item"><i data-lucide="check-circle"></i> <div><h4>Contact Details</h4><p>Emails, phone numbers, addresses.</p></div></div>
        </div>
      </div>
    </section>

    <!-- PROCESS TIMELINE -->
    <section class="solutions-timeline" id="timeline">
      <div class="solutions-container">
        <h2 class="section-title">Our Development Process</h2>
        <div class="timeline">
          <div class="timeline-step"><span>1</span> <h4>Discovery</h4></div>
          <div class="timeline-step"><span>2</span> <h4>Strategy</h4></div>
          <div class="timeline-step"><span>3</span> <h4>Planning</h4></div>
          <div class="timeline-step"><span>4</span> <h4>UI/UX Design</h4></div>
          <div class="timeline-step"><span>5</span> <h4>Development</h4></div>
          <div class="timeline-step"><span>6</span> <h4>Testing</h4></div>
          <div class="timeline-step"><span>7</span> <h4>Launch</h4></div>
          <div class="timeline-step"><span>8</span> <h4>Support & Growth</h4></div>
        </div>
      </div>
    </section>

    <!-- DOWNLOAD GUIDE -->
    <section class="solutions-download" id="download">
      <div class="solutions-container text-center">
        <h2>Want to read this later?</h2>
        <p>Download our comprehensive Website Solutions Guide PDF.</p>
        <button class="btn-outline mt-4" onclick="alert('Guide downloading...')"><i data-lucide="download"></i> Download Full Guide</button>
      </div>
    </section>

    <!-- MULTI-STEP PROJECT FORM -->
    <section class="solutions-form-section" id="project-form">
      <div class="solutions-container">
        <div class="form-wrapper">
          <h2 class="section-title text-center">Start Your Project</h2>
          <p class="section-subtitle text-center">Tell us exactly what you need.</p>
          
          <form id="projectInquiryForm" class="multi-step-form">
            <!-- Progress Bar -->
            <div class="form-progress">
              <div class="progress-bar" id="progressBar"></div>
            </div>
            
            <!-- Step 1 -->
            <div class="form-step active" data-step="1">
              <h3>1. Basic Information</h3>
              <div class="input-group">
                <label>Full Name</label>
                <input type="text" name="fullName" required>
              </div>
              <div class="input-group">
                <label>Business Name</label>
                <input type="text" name="businessName" required>
              </div>
              <div class="input-group">
                <label>Email Address</label>
                <input type="email" name="email" required>
              </div>
              <div class="input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" required>
              </div>
              <div class="input-group">
                <label>WhatsApp Number</label>
                <input type="tel" name="whatsapp">
              </div>
              <button type="button" class="btn-premium next-step">Next Step</button>
            </div>
            
            <!-- Step 2 -->
            <div class="form-step" data-step="2">
              <h3>2. Website Selection & Features</h3>
              <div class="input-group">
                <label>Website Type (Select one or more)</label>
                <div class="checkbox-grid" id="websiteTypeCheckboxes">
                  <!-- Generated by JS -->
                </div>
              </div>
              <div class="input-group">
                <label>Desired Features</label>
                <div class="checkbox-grid">
                  <label><input type="checkbox" name="features" value="Booking System"> Booking System</label>
                  <label><input type="checkbox" name="features" value="Payment Integration"> Payment Integration</label>
                  <label><input type="checkbox" name="features" value="Student Dashboard"> Student Dashboard</label>
                  <label><input type="checkbox" name="features" value="AI Chatbot"> AI Chatbot</label>
                  <label><input type="checkbox" name="features" value="Membership System"> Membership System</label>
                  <label><input type="checkbox" name="features" value="Blog/News"> Blog/News</label>
                  <label><input type="checkbox" name="features" value="E-commerce"> E-commerce</label>
                  <label><input type="checkbox" name="features" value="Analytics Dashboard"> Analytics Dashboard</label>
                  <label><input type="checkbox" name="features" value="Client Portal"> Client Portal</label>
                  <label><input type="checkbox" name="features" value="Automation Systems"> Automation Systems</label>
                  <label><input type="checkbox" name="features" value="Multi-language Support"> Multi-language Support</label>
                </div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 3 -->
            <div class="form-step" data-step="3">
              <h3>3. Project Goals</h3>
              <div class="input-group">
                <label>What are you trying to achieve with this website?</label>
                <textarea name="projectGoals" rows="4" required></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 4 -->
            <div class="form-step" data-step="4">
              <h3>4. Branding Status</h3>
              <div class="radio-group-container">
                <label>Do you already have a logo?</label>
                <div class="radio-options"><label><input type="radio" name="hasLogo" value="Yes"> Yes</label><label><input type="radio" name="hasLogo" value="No"> No</label></div>
              </div>
              <div class="radio-group-container">
                <label>Brand colors?</label>
                <div class="radio-options"><label><input type="radio" name="hasColors" value="Yes"> Yes</label><label><input type="radio" name="hasColors" value="No"> No</label></div>
              </div>
              <div class="radio-group-container">
                <label>Existing website?</label>
                <div class="radio-options"><label><input type="radio" name="hasWebsite" value="Yes"> Yes</label><label><input type="radio" name="hasWebsite" value="No"> No</label></div>
              </div>
              <div class="radio-group-container">
                <label>Domain name?</label>
                <div class="radio-options"><label><input type="radio" name="hasDomain" value="Yes"> Yes</label><label><input type="radio" name="hasDomain" value="No"> No</label></div>
              </div>
              <div class="radio-group-container">
                <label>Hosting?</label>
                <div class="radio-options"><label><input type="radio" name="hasHosting" value="Yes"> Yes</label><label><input type="radio" name="hasHosting" value="No"> No</label></div>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 5 -->
            <div class="form-step" data-step="5">
              <h3>5. Budget Range</h3>
              <div class="radio-grid">
                <label class="budget-card"><input type="radio" name="budget" value="Starter"> <div class="b-content"><h4>Starter</h4><p>Essential features to get your brand online.</p></div></label>
                <label class="budget-card"><input type="radio" name="budget" value="Growth"> <div class="b-content"><h4>Growth</h4><p>Advanced features for expanding businesses.</p></div></label>
                <label class="budget-card"><input type="radio" name="budget" value="Premium"> <div class="b-content"><h4>Premium</h4><p>High-end custom architecture.</p></div></label>
                <label class="budget-card"><input type="radio" name="budget" value="Enterprise"> <div class="b-content"><h4>Enterprise</h4><p>Complex applications and scalable systems.</p></div></label>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 6 -->
            <div class="form-step" data-step="6">
              <h3>6. Timeline</h3>
              <div class="radio-grid">
                <label class="budget-card"><input type="radio" name="timeline" value="Urgent"> <div class="b-content"><h4>Urgent</h4><p>ASAP (Rush fee may apply)</p></div></label>
                <label class="budget-card"><input type="radio" name="timeline" value="2-4 Weeks"> <div class="b-content"><h4>2-4 Weeks</h4><p>Standard turnaround</p></div></label>
                <label class="budget-card"><input type="radio" name="timeline" value="1-2 Months"> <div class="b-content"><h4>1-2 Months</h4><p>For complex builds</p></div></label>
                <label class="budget-card"><input type="radio" name="timeline" value="Flexible"> <div class="b-content"><h4>Flexible</h4><p>No strict deadline</p></div></label>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 7 -->
            <div class="form-step" data-step="7">
              <h3>7. Inspiration & References</h3>
              <div class="input-group">
                <label>Paste links to websites you like</label>
                <textarea name="inspirationLinks" rows="3"></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="button" class="btn-premium next-step">Next Step</button>
              </div>
            </div>
            
            <!-- Step 8 -->
            <div class="form-step" data-step="8">
              <h3>8. File Upload & Submit</h3>
              <div class="input-group file-upload-group">
                <label>Upload logos, brand assets, or documents (Optional)</label>
                <div class="file-drop-area" id="fileDropArea">
                  <i data-lucide="upload-cloud"></i>
                  <p>Drag & drop files here or click to browse</p>
                  <input type="file" id="projectFiles" multiple hidden>
                </div>
                <div id="fileList" class="file-list"></div>
              </div>
              
              <div id="form-error" class="error-message"></div>
              <div id="form-success" class="success-message" style="display:none;">Your project inquiry has been submitted successfully! We will contact you soon.</div>
              
              <div class="form-actions">
                <button type="button" class="btn-outline prev-step">Back</button>
                <button type="submit" class="btn-premium submit-btn" id="submitBtn">Submit Project Request <i data-lucide="arrow-right"></i></button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  </main>

  {footer_html}

  <script src="/js/website-solutions.js"></script>
  <script>
    lucide.createIcons();
  </script>
</body>
</html>"""
    
    with open('website-solutions.html', 'w', encoding='utf-8') as f:
        f.write(html_skeleton)
    print("Created website-solutions.html")

if __name__ == '__main__':
    create_website_solutions()
