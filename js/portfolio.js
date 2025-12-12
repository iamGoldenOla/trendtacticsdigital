// Portfolio asset definitions (replace/add as needed)
const portfolioAssets = [
  // Adverts (videos/images)
  { type: 'video', src: '/images/videos-for-advert/advert-for-our-sponsors.mp4', title: 'Advert For Our Sponsors', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/BF-FARMS-ADVERT.mp4', title: 'BF Farms Advert', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/Edvoura_advert2.mp4', title: 'Edvoura Advert', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/GABSON-ENGINEERING-ADVERT.mp4', title: 'Gabson Engineering Advert', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/GCS-EDUCATION-ADVERT.mp4', title: 'GCS Education Advert', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/GREENTICK-AD2.mp4', title: 'Greentick Advert', category: 'advert', description: '' },
  { type: 'video', src: '/images/videos-for-advert/OSUPA-INTEGRATED-SERVICES-ADVERT.mp4', title: 'Osupa Integrated Services Advert', category: 'advert', description: '' },
  // Spoken Word (if exists)
  // { type: 'video', src: '/videos/GOD-HEARD-YOU-NOW-WALK-IN-PEACE-spoken-word.mp4', title: 'God Heard You Now Walk In Peace', category: 'spoken-word', description: '' },
  // Music Generation (if exists)
  // { type: 'video', src: '/videos/COLD-COLDER-COLDEST-THIS-IS-WINTER-music.mp4', title: 'Cold Colder Coldest (Music)', category: 'music-generation', description: '' },
  { type: 'youtube', src: 'https://youtu.be/31j1QwMls4w?list=PLdDzLt-LMUzePM2grAn9UCoswdH5pssap', title: 'AI Music Video 1', category: 'music-generation', description: '' },
  { type: 'youtube', src: 'https://www.youtube.com/watch?v=bWDo1vN5aJQ&list=PLdDzLt-LMUzcCDdaMpdk9RPfozUE1KeAL', title: 'AI Music Video 2', category: 'music-generation', description: '' },
  // Movie/Script (if exists)
  // { type: 'video', src: '/videos/WHEN-THE-LIGHT-GO-BLACK-movie-script.mp4', title: 'When The Light Go Black (Movie Script)', category: 'advert', description: '' },
  // Image Generation
  { type: 'image', src: '/images/image-generation-4.jpg', title: 'Image Generation 4', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/image-generation-3.jpg', title: 'Image Generation 3', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/image-generation-5.png', title: 'Image Generation 5', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/advert-image-generation.jpg', title: 'Advert Image Generation', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/zambian-man--Grok.jpg', title: 'Zambian Man (Grok)', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/kano-lady-whisk.jpg', title: 'Kano Lady Whisk', category: 'image-generation', description: '' },
  { type: 'image', src: '/images/kano-lady-grok-2.jpg', title: 'Kano Lady Grok 2', category: 'image-generation', description: '' },
  // Website Design
  { type: 'image', src: '/images/dsa-parental-website.png', title: 'DSA Parental Website', category: 'website-design', description: '' },
  { type: 'image', src: '/images/Screenshot-(14).png', title: 'Screenshot 14', category: 'website-design', description: '' },
  { type: 'image', src: '/images/maingrace247-website.png', title: 'Maingrace247 Website', category: 'website-design', description: '' },
  { type: 'image', src: '/images/akinola-olujobi-website.png', title: 'Akinola Olujobi Website', category: 'website-design', description: '' },
  { type: 'image', src: '/images/blog1.jpg', title: 'Blog 1', category: 'website-design', description: '' },
  { type: 'image', src: '/images/blog2.jpg', title: 'Blog 2', category: 'website-design', description: '' },
  { type: 'image', src: '/images/blog3.jpg', title: 'Blog 3', category: 'website-design', description: '' },
  // Promo Video
  { type: 'video', src: '/images/Trendtactics-digital-promo.mp4', title: 'Trendtactics Digital Promo', category: 'advert', description: '' },
  // Logo
  { type: 'image', src: '/images/Trendtactics-logo.jpg', title: 'Trendtactics Logo', category: 'website-design', description: '' },
];

const categoryLabels = {
  'advert': 'Advert',
  'image-generation': 'Image Generation',
  'website-design': 'Web Design',
  'music-generation': 'AI Music',
  'spoken-word': 'Spoken Word',
  'facebook-ads': 'Social Ads',
};

function renderPortfolio() {
  const groupsContainer = document.getElementById('portfolio-groups');
  const filter = document.querySelector('.filter-btn.active').dataset.filter;
  groupsContainer.innerHTML = '';

  // Group assets by category
  const grouped = {};
  portfolioAssets.forEach(asset => {
    if (filter !== 'all' && asset.category !== filter) return;
    if (!grouped[asset.category]) grouped[asset.category] = [];
    grouped[asset.category].push(asset);
  });

  // Render each group
  Object.keys(categoryLabels).forEach(category => {
    if (!grouped[category]) return;
    const section = document.createElement('section');
    section.className = 'portfolio-group';
    section.innerHTML = `
      <h2 class="portfolio-group-title">${categoryLabels[category]}</h2>
      <div class="portfolio-grid">
        ${grouped[category].map(asset => renderCard(asset)).join('')}
      </div>
    `;
    groupsContainer.appendChild(section);
  });
}

function getYouTubeEmbedUrl(url) {
  // Extract video ID from various YouTube URL formats
  let videoId = '';
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('embed/')[1].split('?')[0].split('&')[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

function renderCard(asset) {
  if (asset.type === 'image') {
    return `
      <div class="portfolio-card" data-category="${asset.category}">
        <div class="portfolio-media">
          <img src="${asset.src}" alt="${asset.title}" loading="lazy" />
        </div>
        <div class="portfolio-card-body">
          <h3>${asset.title}</h3>
          <span class="portfolio-badge">${categoryLabels[asset.category]}</span>
          <p>${asset.description || ''}</p>
        </div>
      </div>
    `;
  } else if (asset.type === 'video') {
    // Generate optimized video sources with multiple resolutions
    const videoBasePath = asset.src.replace('.mp4', '');
    const posterPath = '/images/Trendtactics_logo.jpg';

    return `
      <div class="portfolio-card" data-category="${asset.category}">
        <div class="portfolio-media">
          <video controls preload="metadata" poster="${posterPath}" loading="lazy" style="background-size: 120% 120%; background-position: center;">
            <source src="${videoBasePath}-480p.mp4" type="video/mp4" media="(max-width: 480px)">
            <source src="${videoBasePath}-720p.mp4" type="video/mp4" media="(max-width: 1280px)">
            <source src="${asset.src}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="portfolio-card-body">
          <h3>${asset.title}</h3>
          <span class="portfolio-badge">${categoryLabels[asset.category]}</span>
          <p>${asset.description || ''}</p>
        </div>
      </div>
    `;
  } else if (asset.type === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(asset.src);
    return `
      <div class="portfolio-card" data-category="${asset.category}">
        <div class="portfolio-media">
          <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="portfolio-card-body">
          <h3>${asset.title}</h3>
          <span class="portfolio-badge">${categoryLabels[asset.category]}</span>
          <p>${asset.description || ''}</p>
        </div>
      </div>
    `;
  }
  return '';
}

// Filter button logic
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio();
  });
});

document.addEventListener('DOMContentLoaded', renderPortfolio); 