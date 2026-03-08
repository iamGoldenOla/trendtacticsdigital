const fs = require('fs');

const files = ['portfolio.html', 'contact.html'];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  let match;
  let badge, title, desc, btnHref, btnText, imgSrc, imgAlt;

  if (file === 'portfolio.html') {
    match = content.match(/<section class="portfolio-hero[\s\S]*?<\/section>/);
    badge = 'Proven Results';
    title = 'Our <span class="text-gradient">Portfolio</span>';
    desc = 'Explore our diverse work in digital marketing, web design, creative media, and ad campaigns. Each project reflects our commitment to innovation and results.';
    btnHref = '#portfolio-filters';
    btnText = 'View Our Work';
    imgSrc = 'images/portfolio_parallele.jpg';
    imgAlt = 'Portfolio Showcase';
  } else {
    match = content.match(/<section class="page-hero[\s\S]*?<\/section>/);
    badge = '24/7 Support';
    title = 'Let\'s Talk <span class="text-gradient">Growth</span>';
    desc = 'Ready to transform your business? Get in touch with our team of digital experts and let\'s discuss your custom strategy.';
    btnHref = '.contact-main';
    btnText = 'Send Message';
    imgSrc = 'images/contact-us-parallex.jpg';
    imgAlt = 'Contact Us';
  }

  if (match) {
    const oldHero = match[0];
    const newHero = <!-- Redesigned Hero Section -->
    <section class="service-page-hero-clean">
      <div class="container">
        <div class="service-hero-grid">
          <div class="service-hero-content">
            <div class="service-hero-badge"> + badge + </div>
            <h1 class="service-hero-title"> + title + </h1>
            <p class="service-hero-subtitle"> + desc + </p>
            <div class="service-hero-actions">
              <a href=" + btnHref + " class="btn btn-primary btn-large"> + btnText + </a>
            </div>
          </div>
          <div class="service-hero-image-wrapper">
            <img src=" + imgSrc + " alt=" + imgAlt + " class="service-hero-img" />
          </div>
        </div>
      </div>
    </section>;

    content = content.replace(oldHero, newHero);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced hero in ' + file);
  } else {
    console.log('Match not found in ' + file);
  }
}
