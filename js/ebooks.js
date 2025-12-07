// Ebooks Page JavaScript
// Loads ebooks from content.json and handles filtering

let allEbooks = [];
let filteredEbooks = [];

async function loadEbooks() {
    try {
        const response = await fetch('/data/content.json');
        const data = await response.json();
        allEbooks = data.ebooks || [];
        filteredEbooks = allEbooks;
        renderEbooks();
    } catch (error) {
        console.error('Error loading ebooks:', error);
        renderFallbackEbooks();
    }
}

function renderEbooks() {
    const grid = document.getElementById('ebooks-grid');
    if (!grid) return;
    
    if (filteredEbooks.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--white);">
                <i class="fas fa-book" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <p style="font-size: 1.2rem;">No ebooks found in this category. Check back soon!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredEbooks.map(ebook => `
        <div class="ebook-card" data-category="${ebook.category || 'other'}">
            <div class="ebook-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="ebook-content">
                <span class="ebook-category">${getCategoryLabel(ebook.category)}</span>
                <h3>${ebook.title}</h3>
                <p>${ebook.description || 'A valuable resource to help you grow your business and achieve your goals.'}</p>
                ${ebook.pages || ebook.downloads ? `
                <div class="ebook-meta">
                    ${ebook.pages ? `<span><i class="fas fa-file-pdf"></i> ${ebook.pages} Pages</span>` : ''}
                    ${ebook.downloads ? `<span><i class="fas fa-download"></i> ${ebook.downloads} Downloads</span>` : ''}
                </div>
                ` : ''}
                <div class="ebook-price">FREE</div>
                <div class="ebook-actions">
                    <button class="btn btn-read" onclick="openPdfViewer('${ebook.id}', '${ebook.title.replace(/'/g, "\\'")}', '${ebook.file}')">
                        <i class="fas fa-book-open"></i> Read Now
                    </button>
                    <button class="btn btn-download" onclick="openLeadModal('${ebook.id}', '${ebook.title.replace(/'/g, "\\'")}', '${ebook.file}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'digital-marketing': 'Digital Marketing',
        'business': 'Business',
        'motivational': 'Motivational',
        'self-help': 'Self-Help',
        'inspirational': 'Inspirational',
        'other': 'General'
    };
    return labels[category] || 'General';
}

function renderFallbackEbooks() {
    const grid = document.getElementById('ebooks-grid');
    if (!grid) return;
    
    // Fallback ebooks if JSON fails to load
    const fallbackEbooks = [
        {
            id: 'digital-marketing-guide',
            title: 'Complete Digital Marketing Guide',
            category: 'digital-marketing',
            description: 'Master the fundamentals of digital marketing with this comprehensive guide covering SEO, social media, email marketing, and more.'
        },
        {
            id: 'business-growth',
            title: 'Business Growth Strategies',
            category: 'business',
            description: 'Proven strategies and tactics to grow your business, increase revenue, and build a sustainable company.'
        },
        {
            id: 'success-mindset',
            title: 'Success Mindset Mastery',
            category: 'motivational',
            description: 'Develop the mindset and habits needed to achieve extraordinary success in business and life.'
        }
    ];
    
    allEbooks = fallbackEbooks;
    filteredEbooks = fallbackEbooks;
    renderEbooks();
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    loadEbooks();
    
    const filterButtons = document.querySelectorAll('.ebook-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter ebooks
            const filter = this.dataset.filter;
            if (filter === 'all') {
                filteredEbooks = allEbooks;
            } else {
                filteredEbooks = allEbooks.filter(ebook => ebook.category === filter);
            }
            
            renderEbooks();
        });
    });
});

