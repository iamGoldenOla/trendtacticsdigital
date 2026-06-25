document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Populate Website Types Grid & Comparison ---
  const websiteTypes = [
    { id: 'personal', title: 'Personal Brand Website', icon: 'user', bestFor: 'Coaches, MCs, Influencers, Speakers, Creators', complexity: 'Low', features: ['Booking System', 'Blog / CMS', 'CRM & Email Automation'] },
    { id: 'portfolio', title: 'Portfolio Website', icon: 'camera', bestFor: 'Designers, Developers, Photographers, Creatives', complexity: 'Low', features: ['Blog / CMS'] },
    { id: 'business', title: 'Business Website', icon: 'briefcase', bestFor: 'SMEs, Startups, Local businesses', complexity: 'Medium', features: ['Booking System', 'Blog / CMS', 'CRM & Email Automation'] },
    { id: 'corporate', title: 'Corporate Website', icon: 'building', bestFor: 'Companies, Agencies, Organizations', complexity: 'High', features: ['Blog / CMS', 'Client/Student Portal', 'CRM & Email Automation'] },
    { id: 'ecommerce', title: 'E-Commerce Website', icon: 'shopping-cart', bestFor: 'Online stores, Fashion brands, Retail', complexity: 'High', features: ['Payment Integration', 'Client/Student Portal', 'E-Commerce Shop', 'CRM & Email Automation'] },
    { id: 'lms', title: 'Educational / LMS', icon: 'graduation-cap', bestFor: 'Schools, Tutors, Academies, Learning platforms', complexity: 'Enterprise', features: ['Payment Integration', 'Client/Student Portal', 'Membership System', 'CRM & Email Automation'] },
    { id: 'membership', title: 'Membership Website', icon: 'users', bestFor: 'Private communities, Subscription platforms', complexity: 'High', features: ['Payment Integration', 'Client/Student Portal', 'Membership System', 'CRM & Email Automation'] },
    { id: 'event', title: 'Event Website', icon: 'calendar', bestFor: 'Conferences, Concerts, Weddings, Summits', complexity: 'Medium', features: ['Booking System', 'Payment Integration', 'CRM & Email Automation'] },
    { id: 'realestate', title: 'Real Estate Website', icon: 'home', bestFor: 'Realtors, Property agencies', complexity: 'High', features: ['Client/Student Portal', 'CRM & Email Automation'] },
    { id: 'saas', title: 'SaaS / AI Platform', icon: 'cpu', bestFor: 'Startups, AI products, Web apps', complexity: 'Enterprise', features: ['Payment Integration', 'Client/Student Portal', 'AI Chatbots', 'Membership System', 'CRM & Email Automation'] },
    { id: 'hybrid', title: 'Hybrid Website', icon: 'layers', bestFor: 'Personal brands with professional structure', complexity: 'Medium-High', features: ['Booking System', 'Payment Integration', 'Client/Student Portal', 'Blog / CMS', 'E-Commerce Shop', 'CRM & Email Automation'] }
  ];

  const functionalFeatures = [
    { name: 'Booking System', desc: 'Appointment scheduling, calendar sync, and automatic email/SMS reminders.' },
    { name: 'Payment Integration', desc: 'Accept online payments, set up checkout forms, and support multiple currencies.' },
    { name: 'Client/Student Portal', desc: 'Secure client dashboards, member login/register, and user profile management.' },
    { name: 'Blog / CMS', desc: 'Publish articles, company news, case studies, and manage content with a clean editor.' },
    { name: 'AI Chatbots', desc: 'Automate support conversations, qualify leads, and route inquiries to team members.' },
    { name: 'Membership System', desc: 'Gated content, subscription-based billing, and private member-only directories.' },
    { name: 'E-Commerce Shop', desc: 'Product listings, shopping cart, checkouts, coupon codes, and inventory management.' },
    { name: 'CRM & Email Automation', desc: 'Auto-responders, lead tracking, workflow automations, and newsletter campaigns.' },
    { name: 'Multi-language Support', desc: 'Offer your website in multiple languages with quick translations for global audiences.' }
  ];

  const gridContainer = document.querySelector('.solutions-grid');
  const checkboxContainer = document.getElementById('websiteTypeCheckboxes');
  const select1 = document.getElementById('compare-select-1');
  const select2 = document.getElementById('compare-select-2');
  const resultsContainer = document.getElementById('comparison-results-rows');
  const name1 = document.getElementById('compare-name-1');
  const name2 = document.getElementById('compare-name-2');

  websiteTypes.forEach(type => {
    // Populate Grid
    const card = document.createElement('div');
    card.className = 's-card';
    card.innerHTML = `
      <div class="s-card-icon"><i data-lucide="${type.icon}"></i></div>
      <h3>${type.title}</h3>
      <p><strong>Best for:</strong> ${type.bestFor}</p>
      <div class="s-card-tags">
        <span class="s-tag">Complexity: ${type.complexity}</span>
      </div>
      <div class="s-card-actions">
        <button class="btn-select" data-id="${type.id}">Select Solution</button>
      </div>
    `;
    gridContainer.appendChild(card);

    // Populate Checkboxes in Form
    const checkboxLabel = document.createElement('label');
    checkboxLabel.innerHTML = `<input type="checkbox" name="selectedTypes" value="${type.title}"> ${type.title}`;
    checkboxContainer.appendChild(checkboxLabel);

    // Populate Comparison Selects
    const opt1 = document.createElement('option');
    opt1.value = type.id;
    opt1.textContent = type.title;
    select1.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = type.id;
    opt2.textContent = type.title;
    select2.appendChild(opt2);
  });

  // Set default selections
  select1.value = 'personal';
  select2.value = 'ecommerce';

  function updateComparison() {
    const typeA = websiteTypes.find(t => t.id === select1.value);
    const typeB = websiteTypes.find(t => t.id === select2.value);
    
    if (!typeA || !typeB) return;

    name1.textContent = typeA.title;
    name2.textContent = typeB.title;

    resultsContainer.innerHTML = '';

    functionalFeatures.forEach(feature => {
      const hasA = typeA.features.includes(feature.name);
      const hasB = typeB.features.includes(feature.name);

      const row = document.createElement('div');
      row.className = 'comparison-results-row';
      row.innerHTML = `
        <div class="status-icon ${hasA ? 'has' : 'has-not'}">
          ${hasA ? '<i data-lucide="check-circle-2"></i>' : '<i data-lucide="minus"></i>'}
        </div>
        <div class="col-feature">
          ${feature.name}
          <p>${feature.desc}</p>
        </div>
        <div class="status-icon ${hasB ? 'has' : 'has-not'}">
          ${hasB ? '<i data-lucide="check-circle-2"></i>' : '<i data-lucide="minus"></i>'}
        </div>
      `;
      resultsContainer.appendChild(row);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  select1.addEventListener('change', updateComparison);
  select2.addEventListener('change', updateComparison);

  // Initial trigger
  updateComparison();

  // Handle "Select Solution" button click
  document.querySelectorAll('.btn-select').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const type = websiteTypes.find(t => t.id === id);
      if (type) {
        // Scroll to form
        document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });
        // Check the corresponding checkbox
        const cb = document.querySelector(`input[name="selectedTypes"][value="${type.title}"]`);
        if (cb) cb.checked = true;
      }
    });
  });

  // --- 2. Multi-Step Form Logic ---
  const formSteps = document.querySelectorAll('.form-step');
  const nextBtns = document.querySelectorAll('.next-step');
  const prevBtns = document.querySelectorAll('.prev-step');
  const progressBar = document.getElementById('progressBar');
  let currentStep = 0;

  function updateFormSteps() {
    formSteps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });
    const progress = ((currentStep + 1) / formSteps.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Basic validation for required fields in current step
      const currentStepEl = formSteps[currentStep];
      const requiredInputs = currentStepEl.querySelectorAll('[required]');
      let isValid = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ff4d4f';
          isValid = false;
        } else {
          input.style.borderColor = 'var(--sw-border)';
        }
      });
      if (isValid && currentStep < formSteps.length - 1) {
        currentStep++;
        updateFormSteps();
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        updateFormSteps();
      }
    });
  });

  // --- 3. Form Submission ---
  const form = document.getElementById('projectInquiryForm');
  const submitBtn = document.getElementById('submitBtn');
  const errorMsg = document.getElementById('form-error');
  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    errorMsg.textContent = '';
    
    // Gather Data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Handle multi-select checkboxes
    data.selectedTypes = formData.getAll('selectedTypes').join(', ');
    data.features = formData.getAll('features').join(', ');

    try {
      // 1. Send to Formspree for instant admin email notification (using standard site formspree endpoint)
      const formspreeResponse = await fetch('https://formspree.io/f/mqkenobp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // 2. Insert into Supabase if available
      if (window.supabaseUtils && window.supabaseUtils.supabase) {
        const { error } = await window.supabaseUtils.supabase
          .from('website_solutions_leads')
          .insert([{
            full_name: data.fullName,
            business_name: data.businessName,
            email: data.email,
            phone: data.phone,
            whatsapp: data.whatsapp,
            selected_types: data.selectedTypes,
            features: data.features,
            goals: data.projectGoals,
            has_logo: data.hasLogo,
            has_colors: data.hasColors,
            has_website: data.hasWebsite,
            has_domain: data.hasDomain,
            has_hosting: data.hasHosting,
            budget: data.budget,
            timeline: data.timeline,
            inspiration: data.inspirationLinks
          }]);
          
        if (error) {
          console.warn("Supabase insert failed (table might not exist yet), but email was sent.", error);
        }
      }

      // 3. Call TrendyAI backend API to register the client and start agent routing
      try {
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const backendURL = isLocalhost ? 'http://localhost:3000' : 'https://api.trendtacticsdigital.com';

        const clientPayload = {
            name: data.fullName,
            email: data.email,
            company: data.businessName || 'N/A',
            phone: data.phone,
            status: 'active',
            metadata: {
                whatsapp: data.whatsapp,
                selected_types: data.selectedTypes,
                features: data.features,
                goals: data.projectGoals,
                budget: data.budget,
                timeline: data.timeline,
                inspiration: data.inspirationLinks
            }
        };

        // Create client in backend Supabase
        const clientResponse = await fetch(`${backendURL}/api/v1/clients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientPayload)
        });

        if (clientResponse.ok) {
            const clientResult = await clientResponse.json();
            const clientId = clientResult.data && clientResult.data.id;

            if (clientId) {
                // Trigger smart agent routing
                const routePayload = {
                    message: `New Project Inquiry:\nClient: ${clientPayload.name}\nBusiness: ${clientPayload.company}\nTypes: ${data.selectedTypes}\nFeatures: ${data.features}\nGoals: ${data.projectGoals}\nBudget: ${data.budget}\nTimeline: ${data.timeline}`,
                    client_id: clientId
                };

                fetch(`${backendURL}/api/agent/route`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(routePayload)
                }).then(res => res.json())
                  .then(resData => console.log('Smart routing triggered successfully:', resData))
                  .catch(err => console.error('Failed to trigger smart routing:', err));
            }
        } else {
            console.warn('Failed to register client on TrendyAI backend:', clientResponse.statusText);
        }
      } catch (backendError) {
        console.warn('Failed to communicate with TrendyAI backend (API down or CORS issue):', backendError);
      }

      // Success
      form.style.display = 'none';
      successMsg.style.display = 'block';
      
    } catch (err) {
      errorMsg.textContent = 'An error occurred while submitting your request. Please try again.';
      submitBtn.innerHTML = 'Submit Project Request <i data-lucide="arrow-right"></i>';
      submitBtn.disabled = false;
      if (window.lucide) lucide.createIcons();
    }
  });
});
