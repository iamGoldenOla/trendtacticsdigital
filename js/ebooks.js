// Ebooks Page JavaScript
// Loads ebooks from the ebooks directory

let allEbooks = [];
let filteredEbooks = [];

// Ebook data - mapping PDF files to metadata
const ebookData = [
    {
        id: 'little-black-book',
        title: 'Little Black Book For Stunning Success',
        author: 'Robin Sharma',
        category: 'business',
        file: 'ebooks/01. Little Black Book For Stunning Success author Robin Sharma.pdf',
        description: 'A powerful guide to achieving extraordinary success in business and life.'
    },
    {
        id: 'side-hustle-ideas',
        title: '14 Real Side Hustle and Small Business Ideas',
        author: 'Justin Gesso',
        category: 'business',
        file: 'ebooks/14-Real-Side-Hustle-and-Small-Business-Ideas-Justin-Gesso-full.pdf',
        description: 'Discover proven side hustle ideas and small business opportunities to generate extra income.'
    },
    {
        id: 'limiting-beliefs',
        title: '16 Limiting Beliefs That Are Preventing You From Thriving',
        author: 'Tony Robbins',
        category: 'motivational',
        file: 'ebooks/23. 16 limiting beliefs that are preventing you from thriving author Tony Robbins.pdf',
        description: 'Break free from limiting beliefs and unlock your true potential for success.'
    },
    {
        id: 'psychology-of-salesmanship',
        title: 'The Psychology of Salesmanship',
        author: 'William W. Atkinson',
        category: 'sales',
        file: 'ebooks/31. The Psychology of Salesmanship author William W. Atkinson.pdf',
        description: 'Master the psychological principles behind successful sales and persuasion.'
    },
    {
        id: 'overnight-success',
        title: '279 Days to Overnight Success',
        author: 'Chris Guillebeau',
        category: 'entrepreneurship',
        file: 'ebooks/279 Days to Overnight Success author Chris Guillebeau.pdf',
        description: 'A practical guide to building a successful business in less than a year.'
    },
    {
        id: 'gifts-of-imperfection',
        title: 'The Gifts of Imperfection',
        category: 'self-help',
        file: 'ebooks/2545_GiftsofImperfection.pdf',
        description: 'Embrace your imperfections and live a wholehearted life.'
    },
    {
        id: 'market-your-business',
        title: '101 Ways to Market Your Business',
        category: 'marketing',
        file: 'ebooks/101 Ways to Market Your Business_ Building a Successful Business with Creative Marketing (101 . . . Series) ( PDFDrive ).pdf',
        description: 'Creative marketing strategies to build and grow your business successfully.'
    },
    {
        id: 'one-person-business',
        title: 'A One Person Business: How To Start A Small Business',
        category: 'business',
        file: 'ebooks/A One Person Business_ How To Start A Small Business ( PDFDrive ).pdf',
        description: 'Complete guide to starting and running a successful one-person business.'
    },
    {
        id: 'architect-entrepreneur',
        title: 'Architect and Entrepreneur: A Field Guide to Building, Branding, and Marketing Your Startup',
        category: 'business',
        file: 'ebooks/Architect and Entrepreneur_ A Field Guide to Building, Branding, and Marketing Your Startup Design Business ( PDFDrive ).pdf',
        description: 'Learn how to build, brand, and market your startup design business effectively.'
    },
    {
        id: 'be-obsessed',
        title: 'Be Obsessed or Be Average',
        author: 'Grant Cardone',
        category: 'motivational',
        file: 'ebooks/Be Obsessed or Be Average - Cardone, Grant.pdf',
        description: 'The mindset and strategies to achieve extraordinary success in business.'
    },
    {
        id: 'blink',
        title: 'Blink: The Power of Thinking Without Thinking',
        category: 'business',
        file: 'ebooks/Blink-The-Power-of-Thinking-Without-Thinking-pdf-free-download.pdf',
        description: 'Explore the power of rapid cognition and intuitive decision-making.'
    },
    {
        id: 'built-to-sell',
        title: 'Built to Sell: Turn Your Business Into One You Can Sell',
        category: 'business',
        file: 'ebooks/Built to Sell_ Turn Your Business Into One You Can Sell ( PDFDrive ).pdf',
        description: 'Learn how to build a business that is valuable and sellable.'
    },
    {
        id: 'buying-trances',
        title: 'Buying Trances: A New Psychology of Sales and Marketing',
        category: 'sales',
        file: 'ebooks/Buying Trances_ A New Psychology of Sales and Marketing ( PDFDrive ).pdf',
        description: 'Understand the psychology behind buying decisions and how to influence them.'
    },
    {
        id: 'confident-you',
        title: 'Confident You: An Introvert\'s Guide to Success in Life and Business',
        category: 'self-help',
        file: 'ebooks/Confident you _ an introvert_s guide to success in life and business ( PDFDrive ).pdf',
        description: 'A guide for introverts to succeed in business and life with confidence.'
    },
    {
        id: 'daily-self-discipline',
        title: 'Daily Self-Discipline: Everyday Habits and Exercises to Build Self-Discipline',
        category: 'self-help',
        file: 'ebooks/Daily Self-Discipline_ Everyday Habits and Exercises to Build Self-Discipline and Achieve Your Goals ( PDFDrive ).pdf',
        description: 'Build self-discipline through daily habits and exercises to achieve your goals.'
    },
    {
        id: 'how-to-persuade',
        title: 'How to Persuade and Get Paid: The Sales Workshop for Everyone',
        author: 'Phil M. Jones',
        category: 'sales',
        file: 'ebooks/[PDF Download] How to Persuade and Get Paid_ The Sales Workshop for Everyone - Phil M. Jones.pdf',
        description: 'Master the art of persuasion and sales to get paid what you deserve.'
    }
];

function loadEbooks() {
    allEbooks = ebookData;
    filteredEbooks = allEbooks;
    renderEbooks();
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
                ${ebook.author ? `<p style="color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-bottom: 0.5rem;">By ${ebook.author}</p>` : ''}
                <p>${ebook.description || 'A valuable resource to help you grow your business and achieve your goals.'}</p>
                <div class="ebook-actions">
                    <button class="btn btn-read" onclick="openPdfViewer('${ebook.id}', '${ebook.title.replace(/'/g, "\\'")}', '${ebook.file}')">
                        <i class="fas fa-book-open"></i> Read Now
                    </button>
                    <a href="/${ebook.file}" class="btn btn-download" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'marketing': 'Marketing',
        'business': 'Business',
        'sales': 'Sales',
        'entrepreneurship': 'Entrepreneurship',
        'motivational': 'Motivational',
        'self-help': 'Self-Help',
        'other': 'General'
    };
    return labels[category] || 'General';
}

// PDF Viewer Functions
function openPdfViewer(id, title, file) {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-viewer');
    const titleEl = document.getElementById('pdf-viewer-title');
    
    if (modal && iframe && titleEl) {
        titleEl.textContent = title;
        iframe.src = `/${file}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePdfViewer() {
    const modal = document.getElementById('pdf-viewer-modal');
    const iframe = document.getElementById('pdf-viewer');
    
    if (modal && iframe) {
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = '';
    }
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
            const category = this.dataset.category;
            if (category === 'all') {
                filteredEbooks = allEbooks;
            } else {
                filteredEbooks = allEbooks.filter(ebook => ebook.category === category);
            }
            
            renderEbooks();
        });
    });
    
    // Close PDF viewer
    const closeBtn = document.getElementById('pdf-viewer-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePdfViewer);
    }
    
    // Close on outside click
    const modal = document.getElementById('pdf-viewer-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePdfViewer();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePdfViewer();
        }
    });
});

// Make functions globally available
window.openPdfViewer = openPdfViewer;
window.closePdfViewer = closePdfViewer;
