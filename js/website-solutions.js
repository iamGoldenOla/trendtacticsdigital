document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Populate Website Types Grid & Comparison ---
  const websiteTypes = [
    { id: 'personal', title: 'Personal Brand Website', icon: 'user', bestFor: 'Coaches, MCs, Influencers, Speakers, Creators', complexity: 'Low', features: ['Booking System', 'Blog', 'Mobile Optimization'] },
    { id: 'portfolio', title: 'Portfolio Website', icon: 'camera', bestFor: 'Designers, Developers, Photographers, Creatives', complexity: 'Low', features: ['Dashboard', 'Mobile Optimization', 'SEO Optimization'] },
    { id: 'business', title: 'Business Website', icon: 'briefcase', bestFor: 'SMEs, Startups, Local businesses', complexity: 'Medium', features: ['Booking System', 'Blog', 'Mobile Optimization', 'SEO Optimization'] },
    { id: 'corporate', title: 'Corporate Website', icon: 'building', bestFor: 'Companies, Agencies, Organizations', complexity: 'High', features: ['Dashboard', 'Blog', 'Mobile Optimization', 'SEO Optimization'] },
    { id: 'ecommerce', title: 'E-Commerce Website', icon: 'shopping-cart', bestFor: 'Online stores, Fashion brands, Retail', complexity: 'High', features: ['Payments', 'Dashboard', 'E-Commerce', 'Mobile Optimization', 'SEO Optimization'] },
    { id: 'lms', title: 'Educational / LMS', icon: 'graduation-cap', bestFor: 'Schools, Tutors, Academies, Learning platforms', complexity: 'Enterprise', features: ['Payments', 'Dashboard', 'Membership', 'Mobile Optimization'] },
    { id: 'membership', title: 'Membership Website', icon: 'users', bestFor: 'Private communities, Subscription platforms', complexity: 'High', features: ['Payments', 'Dashboard', 'Membership', 'Mobile Optimization'] },
    { id: 'event', title: 'Event Website', icon: 'calendar', bestFor: 'Conferences, Concerts, Weddings, Summits', complexity: 'Medium', features: ['Booking System', 'Payments', 'Mobile Optimization'] },
    { id: 'realestate', title: 'Real Estate Website', icon: 'home', bestFor: 'Realtors, Property agencies', complexity: 'High', features: ['Dashboard', 'Mobile Optimization', 'SEO Optimization'] },
    { id: 'saas', title: 'SaaS / AI Platform', icon: 'cpu', bestFor: 'Startups, AI products, Web apps', complexity: 'Enterprise', features: ['Payments', 'Dashboard', 'AI Features', 'Mobile Optimization'] },
    { id: 'hybrid', title: 'Hybrid Website', icon: 'layers', bestFor: 'Personal brands with professional structure', complexity: 'Medium-High', features: ['Booking System', 'Payments', 'Blog', 'Mobile Optimization'] }
  ];

  const gridContainer = document.querySelector('.solutions-grid');
  const checkboxContainer = document.getElementById('websiteTypeCheckboxes');
  const comparisonBody = document.getElementById('comparison-body');

  const allFeatures = ['Booking System', 'Payments', 'Dashboard', 'Blog', 'AI Features', 'Membership', 'E-Commerce', 'SEO Optimization', 'Mobile Optimization'];

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

    // Populate Comparison Table
    const tr = document.createElement('tr');
    let tdHTML = `<td><strong>${type.title}</strong></td>`;
    allFeatures.forEach(feature => {
      const hasFeature = type.features.includes(feature);
      tdHTML += `<td class="${hasFeature ? 'has-feature' : ''}">${hasFeature ? '<i data-lucide="check"></i>' : '-'}</td>`;
    });
    tr.innerHTML = tdHTML;
    comparisonBody.appendChild(tr);
  });

  // Re-init lucide icons for newly added elements
  if (window.lucide) {
    lucide.createIcons();
  }

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
