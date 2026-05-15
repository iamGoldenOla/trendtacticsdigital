portfolio_path = "portfolio.html"
with open(portfolio_path, "r", encoding="utf-8") as f:
    content = f.read()

# ─────────────────────────────────────────────────────────
# 1. MetalicHorse → Akinola Olujobi Personal Site
# ─────────────────────────────────────────────────────────
content = content.replace(
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/metalichorse_final.png" alt="MetalicHorse">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>MetalicHorse</h3>
            <p>Luxury automotive dealership platform showcasing high-end vehicles with premium branding and user
              experience.</p>
            <a href="#" class="portfolio-link">Case Study <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>''',
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/akinola_final.png" alt="Akinola Olujobi" onerror="this.src='/img/portfolio/midway_final.png'">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Akinola Olujobi</h3>
            <p>Personal brand and portfolio website for digital entrepreneur and tech innovator Akinola Olujobi.</p>
            <a href="https://akinolaolujobi.com" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>'''
)

# ─────────────────────────────────────────────────────────
# 2. CORDMALLABEL → VocalEdge
# ─────────────────────────────────────────────────────────
content = content.replace(
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/cordmall_final.png" alt="CORDMALLABEL">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>CORDMALLABEL</h3>
            <p>Luxury Nigerian Fashion House website blending traditional elegance with modern digital shopping
              experiences.</p>
            <a href="#" class="portfolio-link">Case Study <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>''',
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/vocaledge_final.png" alt="VocalEdge" onerror="this.src='/img/portfolio/allengreen_final.png'">
            <div class="portfolio-category-badge">Web App</div>
          </div>
          <div class="portfolio-item-content">
            <h3>VocalEdge</h3>
            <p>AI-powered singing assistant and vocal training platform with SATB stem separation and real-time transcription.</p>
            <a href="https://vocaledge.vercel.app" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>'''
)

# ─────────────────────────────────────────────────────────
# 3. Socrates Educonsult → Christ The Haven School
# ─────────────────────────────────────────────────────────
content = content.replace(
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/socrates_final.png" alt="Socrates Educonsult">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Socrates Educonsult</h3>
            <p>Educational consultancy platform providing expert guidance and resources for academic excellence.</p>
            <a href="#" class="portfolio-link">Case Study <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>''',
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/christhaven_final.png" alt="Christ The Haven School" onerror="this.src='/img/portfolio/midway_final.png'">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Christ The Haven School</h3>
            <p>A modern school platform built to connect students, parents, and staff through seamless digital communication.</p>
            <a href="https://christthehavenschool.com" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>'''
)

# ─────────────────────────────────────────────────────────
# 4. Trafes Place → Edvoura Learning Hub + add Maingrace
# ─────────────────────────────────────────────────────────
content = content.replace(
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/trafes_place_final.png" alt="Trafes Place">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Trafes Place</h3>
            <p>Wildlife and safari adventure platform inviting travelers to experience Africa\'s wild beauty through
              premium tours.</p>
            <a href="#" class="portfolio-link">Case Study <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>''',
    '''        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/edvoura_final.png" alt="Edvoura Learning Hub" onerror="this.src='/img/portfolio/midway_final.png'">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Edvoura Learning Hub</h3>
            <p>An innovative e-learning platform bridging education gaps with curated digital courses and academic resources.</p>
            <a href="https://edvouralearninghub.com" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>

        <div class="portfolio-item-premium" data-category="website">
          <div class="portfolio-img-wrapper">
            <img src="/img/portfolio/maingrace_final.png" alt="Maingrace Global Limited" onerror="this.src='/img/portfolio/midway_final.png'">
            <div class="portfolio-category-badge">Website</div>
          </div>
          <div class="portfolio-item-content">
            <h3>Maingrace Global Limited</h3>
            <p>Corporate website for an international business consultancy delivering excellence in global trade and services.</p>
            <a href="https://www.maingracegloballimited.com/" target="_blank" class="portfolio-link">Visit Website <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>'''
)

with open(portfolio_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Portfolio updated!")
