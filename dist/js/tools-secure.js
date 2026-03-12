/**
 * Secure Tools JavaScript
 * Uses the secure backend API instead of exposed API keys
 */

// Tool Usage Analytics
function trackToolUsage(toolName) {
    try {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
        usage[toolName] = (usage[toolName] || 0) + 1;
        localStorage.setItem('toolUsage', JSON.stringify(usage));
    } catch (error) {
        console.warn('Failed to track tool usage:', error.message);
    }
}

// Enhanced Loading States
function showEnhancedLoading(button, resultDiv) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    button.closest('.tool-card').classList.add('loading');
    
    resultDiv.innerHTML = `
        <div style="text-align:center;padding:1rem;">
            <div style="display:inline-block;width:40px;height:40px;border:4px solid #f3f3f3;border-top:4px solid #00FFFF;border-radius:50%;animation:spin 1s linear infinite;"></div>
            <div style="color:#00FFFF;font-weight:600;margin-top:0.5rem;">AI is analyzing your data...</div>
            <div style="margin-top:0.5rem;font-size:0.9rem;color:#666;">This may take a few seconds</div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    return originalText;
}

function hideEnhancedLoading(button, originalText) {
    button.textContent = originalText;
    button.disabled = false;
    button.closest('.tool-card').classList.remove('loading');
}

// Show error state
function showError(resultDiv, message) {
    resultDiv.innerHTML = `
        <div style="text-align:center;padding:1rem;color:#d32f2f;">
            <i class="fas fa-exclamation-triangle" style="font-size:2rem;margin-bottom:1rem;"></i>
            <p><strong>Error:</strong> ${message}</p>
            <p style="font-size:0.9rem;margin-top:1rem;">Please try again or contact support if the problem persists.</p>
        </div>
    `;
}

// Format AI response for display
function formatResponse(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/^(\d+\.\s)/gm, '<strong>$1</strong>')
        .replace(/^(#{1,6})\s+(.*)/gm, (match, hashes, text) => {
            const level = hashes.length;
            return `<h${level}>${text}</h${level}>`;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if secure AI client is available
    if (!window.secureAIClient) {
        console.error('Secure AI client not loaded. Please include js/secure-ai-client.js');
        return;
    }

    // Search and Filter Functionality
    const searchInput = document.getElementById('toolsSearch');
    const categoryFilter = document.getElementById('toolsCategory');
    const toolCards = document.querySelectorAll('.tool-card');

    function filterTools() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        toolCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.closest('.tools-category')?.textContent.toLowerCase() || '';

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !selectedCategory || category.includes(selectedCategory.toLowerCase());

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterTools);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterTools);
    }

    // 1. Social Media Performance Analyzer
    const analyzeSocialBtn = document.getElementById('analyzeSocialPerformance');
    if (analyzeSocialBtn) {
        analyzeSocialBtn.addEventListener('click', async function() {
            const metrics = document.getElementById('socialMetricsInput').value.trim();
            const platform = document.getElementById('platformType').value;
            const resultDiv = document.getElementById('socialPerformanceResult');
            
            if (!metrics || !platform) {
                showError(resultDiv, 'Please enter your metrics and select a platform.');
                return;
            }
            
            const originalText = showEnhancedLoading(analyzeSocialBtn, resultDiv);
            
            try {
                trackToolUsage('Social Media Performance Analyzer');
                const prompt = `Analyze these social media metrics for ${platform}: ${metrics}. Give me a summary and 3 optimization recommendations.`;
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 800,
                    temperature: 0.7
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
                analyzeSocialBtn.closest('.tool-card').classList.add('success');
            } catch (err) {
                showError(resultDiv, err.message);
                analyzeSocialBtn.closest('.tool-card').classList.add('error');
            } finally {
                hideEnhancedLoading(analyzeSocialBtn, originalText);
            }
        });
    }

    // 2. Google Analytics Report Generator
    const gaReportBtn = document.getElementById('generateGAReport');
    if (gaReportBtn) {
        gaReportBtn.addEventListener('click', async function() {
            const gaData = document.getElementById('gaDataInput').value.trim();
            const reportType = document.getElementById('reportType').value;
            const resultDiv = document.getElementById('gaReportResult');
            
            if (!gaData || !reportType) {
                showError(resultDiv, 'Please enter your GA4 data and select a report type.');
                return;
            }
            
            const originalText = showEnhancedLoading(gaReportBtn, resultDiv);
            
            try {
                trackToolUsage('Google Analytics Report Generator');
                const prompt = `Generate a ${reportType} report from this Google Analytics 4 data: ${gaData}. Include actionable insights and recommendations.`;
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1000,
                    temperature: 0.6
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(gaReportBtn, originalText);
            }
        });
    }

    // 3. Advanced Marketing ROI Calculator
    const roiForm = document.getElementById('advancedROIForm');
    if (roiForm) {
        roiForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const ch1Rev = document.getElementById('channel1Revenue').value;
            const ch1Cost = document.getElementById('channel1Cost').value;
            const ch2Rev = document.getElementById('channel2Revenue').value;
            const ch2Cost = document.getElementById('channel2Cost').value;
            const clv = document.getElementById('customerLifetimeValue').value;
            const resultDiv = document.getElementById('advancedROIResult');
            
            if (!ch1Rev || !ch1Cost || !ch2Rev || !ch2Cost || !clv) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            
            const originalText = showEnhancedLoading(roiForm.querySelector('button[type="submit"]'), resultDiv);
            
            try {
                trackToolUsage('Advanced Marketing ROI Calculator');
                const prompt = `Calculate and analyze ROI for these marketing channels:
                Channel 1: Revenue $${ch1Rev}, Cost $${ch1Cost}
                Channel 2: Revenue $${ch2Rev}, Cost $${ch2Cost}
                Customer Lifetime Value: $${clv}
                
                Provide ROI calculations, insights, and recommendations for optimization.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 800,
                    temperature: 0.5
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(roiForm.querySelector('button[type="submit"]'), originalText);
            }
        });
    }

    // 4. Content Strategy Planner
    const contentStrategyBtn = document.getElementById('planContentStrategy');
    if (contentStrategyBtn) {
        contentStrategyBtn.addEventListener('click', async function() {
            const business = document.getElementById('contentBusinessName').value.trim();
            const industry = document.getElementById('contentIndustry').value;
            const goals = document.getElementById('contentGoals').value;
            const resultDiv = document.getElementById('contentStrategyResult');
            
            if (!business || !industry || !goals) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            
            const originalText = showEnhancedLoading(contentStrategyBtn, resultDiv);
            
            try {
                trackToolUsage('Content Strategy Planner');
                const prompt = `Create a comprehensive content strategy for ${business} in the ${industry} industry with goals: ${goals}. Include content types, publishing schedule, and success metrics.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1200,
                    temperature: 0.7
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(contentStrategyBtn, originalText);
            }
        });
    }

    // 5. SEO Audit Tool
    const seoAuditBtn = document.getElementById('performSEOAudit');
    if (seoAuditBtn) {
        seoAuditBtn.addEventListener('click', async function() {
            const website = document.getElementById('seoWebsite').value.trim();
            const keywords = document.getElementById('seoKeywords').value.trim();
            const resultDiv = document.getElementById('seoAuditResult');
            
            if (!website || !keywords) {
                showError(resultDiv, 'Please enter website URL and target keywords.');
                return;
            }
            
            const originalText = showEnhancedLoading(seoAuditBtn, resultDiv);
            
            try {
                trackToolUsage('SEO Audit Tool');
                const prompt = `Perform an SEO audit for ${website} targeting keywords: ${keywords}. Include technical SEO, on-page optimization, and content recommendations.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1000,
                    temperature: 0.6
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(seoAuditBtn, originalText);
            }
        });
    }

    // 6. Email Marketing Campaign Planner
    const emailCampaignBtn = document.getElementById('planEmailCampaign');
    if (emailCampaignBtn) {
        emailCampaignBtn.addEventListener('click', async function() {
            const business = document.getElementById('emailBusiness').value.trim();
            const audience = document.getElementById('emailAudience').value;
            const goal = document.getElementById('emailGoal').value;
            const resultDiv = document.getElementById('emailCampaignResult');
            
            if (!business || !audience || !goal) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            
            const originalText = showEnhancedLoading(emailCampaignBtn, resultDiv);
            
            try {
                trackToolUsage('Email Marketing Campaign Planner');
                const prompt = `Create an email marketing campaign plan for ${business} targeting ${audience} with the goal of ${goal}. Include subject lines, content structure, and automation workflows.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1000,
                    temperature: 0.7
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(emailCampaignBtn, originalText);
            }
        });
    }

    // 7. Competitor Analysis Tool
    const competitorBtn = document.getElementById('analyzeCompetitors');
    if (competitorBtn) {
        competitorBtn.addEventListener('click', async function() {
            const business = document.getElementById('competitorBusiness').value.trim();
            const competitors = document.getElementById('competitorList').value.trim();
            const resultDiv = document.getElementById('competitorAnalysisResult');
            
            if (!business || !competitors) {
                showError(resultDiv, 'Please enter your business name and competitor list.');
                return;
            }
            
            const originalText = showEnhancedLoading(competitorBtn, resultDiv);
            
            try {
                trackToolUsage('Competitor Analysis Tool');
                const prompt = `Analyze competitors for ${business}: ${competitors}. Provide insights on their strengths, weaknesses, opportunities, and threats. Include actionable recommendations.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1200,
                    temperature: 0.6
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(competitorBtn, originalText);
            }
        });
    }

    // 8. Customer Persona Generator
    const personaBtn = document.getElementById('generatePersonas');
    if (personaBtn) {
        personaBtn.addEventListener('click', async function() {
            const business = document.getElementById('personaBusiness').value.trim();
            const industry = document.getElementById('personaIndustry').value;
            const resultDiv = document.getElementById('personaResult');
            
            if (!business || !industry) {
                showError(resultDiv, 'Please enter business name and industry.');
                return;
            }
            
            const originalText = showEnhancedLoading(personaBtn, resultDiv);
            
            try {
                trackToolUsage('Customer Persona Generator');
                const prompt = `Create detailed customer personas for ${business} in the ${industry} industry. Include demographics, psychographics, pain points, and buying behavior.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1000,
                    temperature: 0.7
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(personaBtn, originalText);
            }
        });
    }

    // 9. Social Media Content Calendar
    const calendarBtn = document.getElementById('generateContentCalendar');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', async function() {
            const business = document.getElementById('calendarBusiness').value.trim();
            const platforms = document.getElementById('calendarPlatforms').value;
            const duration = document.getElementById('calendarDuration').value;
            const resultDiv = document.getElementById('contentCalendarResult');
            
            if (!business || !platforms || !duration) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            
            const originalText = showEnhancedLoading(calendarBtn, resultDiv);
            
            try {
                trackToolUsage('Social Media Content Calendar');
                const prompt = `Create a ${duration} social media content calendar for ${business} on ${platforms}. Include post types, content themes, and optimal posting times.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1200,
                    temperature: 0.7
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(calendarBtn, originalText);
            }
        });
    }

    // 10. PPC Campaign Optimizer
    const ppcBtn = document.getElementById('optimizePPC');
    if (ppcBtn) {
        ppcBtn.addEventListener('click', async function() {
            const business = document.getElementById('ppcBusiness').value.trim();
            const platform = document.getElementById('ppcPlatform').value;
            const data = document.getElementById('ppcData').value.trim();
            const resultDiv = document.getElementById('ppcOptimizationResult');
            
            if (!business || !platform || !data) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            
            const originalText = showEnhancedLoading(ppcBtn, resultDiv);
            
            try {
                trackToolUsage('PPC Campaign Optimizer');
                const prompt = `Optimize PPC campaigns for ${business} on ${platform} using this data: ${data}. Provide specific recommendations for keywords, ad copy, and bidding strategies.`;
                
                const response = await window.secureAIClient.getAIResponse(prompt, {
                    maxTokens: 1000,
                    temperature: 0.6
                });
                
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(ppcBtn, originalText);
            }
        });
    }

    // Market Research Assistant
    const marketResearchBtn = document.getElementById('conductMarketResearch');
    if (marketResearchBtn) {
        marketResearchBtn.addEventListener('click', async function() {
            const industry = document.getElementById('industryName').value.trim();
            const context = document.getElementById('marketResearchInput').value.trim();
            const resultDiv = document.getElementById('marketResearchResult');
            if (!industry || !context) {
                showError(resultDiv, 'Please enter your industry and describe your needs.');
                return;
            }
            const originalText = showEnhancedLoading(marketResearchBtn, resultDiv);
            try {
                trackToolUsage('Market Research Assistant');
                const prompt = `Conduct market research for the ${industry} industry. Business context: ${context}. Provide trend analysis and market opportunities.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 1000, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(marketResearchBtn, originalText);
            }
        });
    }

    // Pricing Strategy Optimizer
    const pricingBtn = document.getElementById('optimizePricing');
    if (pricingBtn) {
        pricingBtn.addEventListener('click', async function() {
            const product = document.getElementById('productService').value.trim();
            const price = document.getElementById('currentPrice').value.trim();
            const context = document.getElementById('pricingContext').value.trim();
            const resultDiv = document.getElementById('pricingResult');
            if (!product || !price || !context) {
                showError(resultDiv, 'Please fill in all fields.');
                return;
            }
            const originalText = showEnhancedLoading(pricingBtn, resultDiv);
            try {
                trackToolUsage('Pricing Strategy Optimizer');
                const prompt = `Analyze and optimize pricing for ${product} (current price: ₦${price}). Context: ${context}. Suggest a competitive pricing strategy.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(pricingBtn, originalText);
            }
        });
    }

    // Sales Funnel Analyzer
    const funnelBtn = document.getElementById('analyzeFunnel');
    if (funnelBtn) {
        funnelBtn.addEventListener('click', async function() {
            const funnelData = document.getElementById('funnelData').value.trim();
            const resultDiv = document.getElementById('funnelResult');
            if (!funnelData) {
                showError(resultDiv, 'Please describe your sales funnel.');
                return;
            }
            const originalText = showEnhancedLoading(funnelBtn, resultDiv);
            try {
                trackToolUsage('Sales Funnel Analyzer');
                const prompt = `Analyze this sales funnel: ${funnelData}. Identify bottlenecks and provide 3 actionable optimization tips.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(funnelBtn, originalText);
            }
        });
    }

    // Brand Voice & Tone Generator
    const brandVoiceBtn = document.getElementById('generateBrandVoice');
    if (brandVoiceBtn) {
        brandVoiceBtn.addEventListener('click', async function() {
            const description = document.getElementById('brandDescription').value.trim();
            const personality = document.getElementById('brandPersonality').value;
            const resultDiv = document.getElementById('brandVoiceResult');
            if (!description || !personality) {
                showError(resultDiv, 'Please describe your brand and select a personality.');
                return;
            }
            const originalText = showEnhancedLoading(brandVoiceBtn, resultDiv);
            try {
                trackToolUsage('Brand Voice & Tone Generator');
                const prompt = `Create brand voice guidelines for a ${personality} brand. Brand description: ${description}. Provide tone recommendations and examples.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(brandVoiceBtn, originalText);
            }
        });
    }

    // Visual Content Strategy Planner
    const visualStrategyBtn = document.getElementById('planVisualStrategy');
    if (visualStrategyBtn) {
        visualStrategyBtn.addEventListener('click', async function() {
            const brandName = document.getElementById('visualBrandName').value.trim();
            const goals = document.getElementById('visualContentGoals').value.trim();
            const resultDiv = document.getElementById('visualStrategyResult');
            if (!brandName || !goals) {
                showError(resultDiv, 'Please enter your brand name and goals.');
                return;
            }
            const originalText = showEnhancedLoading(visualStrategyBtn, resultDiv);
            try {
                trackToolUsage('Visual Content Strategy Planner');
                const prompt = `Plan a visual content strategy for ${brandName}. Goals: ${goals}. Provide design recommendations and content ideas.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(visualStrategyBtn, originalText);
            }
        });
    }

    // Color Palette Generator
    let lastColorPaletteInput = null;
    const colorPaletteBtn = document.getElementById('generateColorPalette');
    if (colorPaletteBtn) {
        colorPaletteBtn.addEventListener('click', async function() {
            const brandName = document.getElementById('brandNameForColors').value.trim();
            const mood = document.getElementById('colorMood').value;
            const resultDiv = document.getElementById('colorPaletteResult');
            if (!brandName || !mood) {
                showError(resultDiv, 'Please enter your brand name and select a color mood.');
                return;
            }
            const originalText = showEnhancedLoading(colorPaletteBtn, resultDiv);
            lastColorPaletteInput = { brandName, mood, resultDiv };
            try {
                trackToolUsage('Color Palette Generator');
                const prompt = `Suggest a 5-color palette for a ${mood} brand called ${brandName}. List hex codes.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 400, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
                // Retry logic can be added here if needed
            } finally {
                hideEnhancedLoading(colorPaletteBtn, originalText);
            }
        });
    }

    // Instagram Reels Strategy Generator
    const reelsStrategyBtn = document.getElementById('generateReelsStrategy');
    if (reelsStrategyBtn) {
        reelsStrategyBtn.addEventListener('click', async function() {
            const businessName = document.getElementById('reelsBusinessName').value.trim();
            const industry = document.getElementById('reelsIndustry').value;
            const resultDiv = document.getElementById('reelsStrategyResult');
            if (!businessName || !industry) {
                showError(resultDiv, 'Please enter your business name and select an industry.');
                return;
            }
            const originalText = showEnhancedLoading(reelsStrategyBtn, resultDiv);
            try {
                trackToolUsage('Instagram Reels Strategy Generator');
                const prompt = `Generate Instagram Reels strategy for ${businessName} in the ${industry} industry. Provide trending content ideas and engagement tips.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(reelsStrategyBtn, originalText);
            }
        });
    }

    // LinkedIn Content Planner
    const linkedinContentBtn = document.getElementById('planLinkedInContent');
    if (linkedinContentBtn) {
        linkedinContentBtn.addEventListener('click', async function() {
            const business = document.getElementById('linkedinBusiness').value.trim();
            const audience = document.getElementById('linkedinAudience').value;
            const resultDiv = document.getElementById('linkedInContentResult');
            if (!business || !audience) {
                showError(resultDiv, 'Please enter your business name and select target audience.');
                return;
            }
            const originalText = showEnhancedLoading(linkedinContentBtn, resultDiv);
            try {
                trackToolUsage('LinkedIn Content Planner');
                const prompt = `Create a LinkedIn content strategy for ${business} targeting ${audience}. Provide thought leadership content ideas and posting schedule.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 900, temperature: 0.7 });
                resultDiv.innerHTML = formatResponse(response.content);
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(linkedinContentBtn, originalText);
            }
        });
    }

    // Display Popular Tools
    function displayPopularTools() {
        const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
        const sortedTools = Object.entries(usage)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6); // Top 6 tools
        
        if (sortedTools.length > 0) {
            const popularSection = document.createElement('div');
            popularSection.className = 'popular-tools';
            popularSection.innerHTML = `
                <h3 style="text-align:center;margin:2rem 0;color:#0A1E3F;">Most Popular Tools</h3>
                <div class="tools-grid">
                    ${sortedTools.map(([tool, count]) => `
                        <div class="tool-card" style="border-color:#00bcd4;">
                            <div class="tool-icon"><i class="fas fa-star"></i></div>
                            <h3>${tool}</h3>
                            <p style="color:#0A1E3F !important;">Used ${count} time${count > 1 ? 's' : ''}</p>
                            <div style="border: 2px solid #00FFFF; color: #fff; background: #0A1E3F; border-radius: 50px; padding: 0.7em 1.5em; font-size: 1rem; font-weight: 600; margin: 0.5rem 0; display: inline-block;">
                                Popular Choice
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Insert after the search section
            const searchSection = document.querySelector('.tools-search-filter');
            if (searchSection) {
                searchSection.parentNode.insertBefore(popularSection, searchSection.nextSibling);
            }
        }
    }

    // Initialize popular tools display
    displayPopularTools();

    // Template download handlers
    const showCalendarExampleBtn = document.getElementById('showCalendarExample');
    if (showCalendarExampleBtn) {
        showCalendarExampleBtn.addEventListener('click', function() {
            const resultDiv = document.getElementById('calendarExampleResult');
            const downloadRow = document.getElementById('calendarDownloadRow');
            resultDiv.innerHTML = `
                <div style="background:#f5f7fa;border:1px solid #e1e5e9;border-radius:8px;padding:1em 0.7em;max-width:320px;margin:0 auto;">
                    <strong>Example Social Media Calendar:</strong><br><br>
                    <table style="width:100%;font-size:0.97em;text-align:left;border-collapse:collapse;">
                        <tr><th style='color:#0A1E3F;'>Date</th><th style='color:#0A1E3F;'>Platform</th><th style='color:#0A1E3F;'>Content</th></tr>
                        <tr><td>Mon</td><td>Instagram</td><td>Motivational Quote</td></tr>
                        <tr><td>Wed</td><td>Facebook</td><td>Blog Post Link</td></tr>
                        <tr><td>Fri</td><td>LinkedIn</td><td>Case Study</td></tr>
                    </table>
                </div>
            `;
            resultDiv.style.display = 'block';
            downloadRow.style.display = 'flex';
            showCalendarExampleBtn.style.display = 'none';
        });
    }

    const showChecklistExampleBtn = document.getElementById('showChecklistExample');
    if (showChecklistExampleBtn) {
        showChecklistExampleBtn.addEventListener('click', function() {
            const resultDiv = document.getElementById('checklistExampleResult');
            const downloadRow = document.getElementById('checklistDownloadRow');
            resultDiv.innerHTML = `
                <div style="background:#f5f7fa;border:1px solid #e1e5e9;border-radius:8px;padding:1em 0.7em;max-width:320px;margin:0 auto;">
                    <strong>Example Marketing Checklist:</strong><br><br>
                    <ul style='padding-left:1.1em;font-size:0.97em;color:#0A1E3F;'>
                        <li>Define campaign goal</li>
                        <li>Identify target audience</li>
                        <li>Create content assets</li>
                        <li>Schedule posts</li>
                        <li>Track results</li>
                    </ul>
                </div>
            `;
            resultDiv.style.display = 'block';
            downloadRow.style.display = 'flex';
            showChecklistExampleBtn.style.display = 'none';
        });
    }

    const showBusinessPlanExampleBtn = document.getElementById('showBusinessPlanExample');
    if (showBusinessPlanExampleBtn) {
        showBusinessPlanExampleBtn.addEventListener('click', function() {
            const resultDiv = document.getElementById('businessPlanExampleResult');
            const downloadRow = document.getElementById('businessPlanDownloadRow');
            resultDiv.innerHTML = `
                <div style="background:#f5f7fa;border:1px solid #e1e5e9;border-radius:8px;padding:1em 0.7em;max-width:320px;margin:0 auto;">
                    <strong>Business Plan Outline:</strong><br><br>
                    <ol style='padding-left:1.1em;font-size:0.97em;color:#0A1E3F;'>
                        <li>Executive Summary</li>
                        <li>Company Description</li>
                        <li>Market Analysis</li>
                        <li>Organization & Management</li>
                        <li>Products & Services</li>
                        <li>Marketing & Sales</li>
                        <li>Financial Projections</li>
                    </ol>
                </div>
            `;
            resultDiv.style.display = 'block';
            downloadRow.style.display = 'flex';
            showBusinessPlanExampleBtn.style.display = 'none';
        });
    }

    // ROI Calculator
    const roiFormSimple = document.getElementById('roiForm');
    if (roiFormSimple) {
        roiFormSimple.addEventListener('submit', async function(e) {
            e.preventDefault();
            const revenue = document.getElementById('roiRevenue').value;
            const cost = document.getElementById('roiCost').value;
            const resultDiv = document.getElementById('roiResult');
            
            if (!revenue || !cost) {
                showError(resultDiv, 'Please enter both revenue and cost.');
                return;
            }
            
            const roi = ((revenue - cost) / cost * 100).toFixed(2);
            const profit = (revenue - cost).toFixed(2);
            
            resultDiv.innerHTML = `
                <div style="background:#f0f9ff;border:1px solid #00FFFF;border-radius:8px;padding:1em;text-align:center;">
                    <h4 style="color:#0A1E3F;margin-bottom:1rem;">ROI Calculation Results</h4>
                    <div style="font-size:1.2em;font-weight:600;color:#00FFFF;">ROI: ${roi}%</div>
                    <div style="margin-top:0.5em;color:#0A1E3F;">Profit: $${profit}</div>
                    <div style="margin-top:0.5em;font-size:0.9em;color:#666;">
                        Revenue: $${revenue} | Cost: $${cost}
                    </div>
                </div>
            `;
            resultDiv.style.display = 'block';
        });
    }

    // Hashtag Generator
    const hashtagBtn = document.getElementById('generateHashtags');
    if (hashtagBtn) {
        hashtagBtn.addEventListener('click', async function() {
            const topic = document.getElementById('hashtagInput').value.trim();
            const resultDiv = document.getElementById('hashtagResult');
            
            if (!topic) {
                showError(resultDiv, 'Please enter a topic for hashtag generation.');
                return;
            }
            
            const originalText = hashtagBtn.textContent;
            showEnhancedLoading(hashtagBtn, resultDiv);
            
            try {
                trackToolUsage('Hashtag Generator');
                const prompt = `Generate 15 trending hashtags for the topic: ${topic}. Make them relevant and popular for social media.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 400, temperature: 0.7 });
                
                resultDiv.innerHTML = `
                    <div style="background:#f0f9ff;border:1px solid #00FFFF;border-radius:8px;padding:1em;">
                        <h4 style="color:#0A1E3F;margin-bottom:1rem;">Hashtags for "${topic}"</h4>
                        <div style="display:flex;flex-wrap:wrap;gap:0.5em;">
                            ${response.content.split('\n').filter(line => line.trim().startsWith('#')).map(hashtag => 
                                `<span style="background:#00FFFF;color:#0A1E3F;padding:0.3em 0.7em;border-radius:20px;font-size:0.9em;font-weight:600;">${hashtag.trim()}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
                resultDiv.style.display = 'block';
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(hashtagBtn, originalText);
            }
        });
    }

    // Headline Generator
    const headlineBtn = document.getElementById('generateHeadlines');
    if (headlineBtn) {
        headlineBtn.addEventListener('click', async function() {
            const topic = document.getElementById('headlineInput').value.trim();
            const resultDiv = document.getElementById('headlineResult');
            
            if (!topic) {
                showError(resultDiv, 'Please enter a topic for headline generation.');
                return;
            }
            
            const originalText = headlineBtn.textContent;
            showEnhancedLoading(headlineBtn, resultDiv);
            
            try {
                trackToolUsage('Headline Generator');
                const prompt = `Generate 8 catchy, high-converting headlines for a blog or ad about: ${topic}. For each headline, explain why it works.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 600, temperature: 0.7 });
                
                resultDiv.innerHTML = `
                    <div style="background:#f0f9ff;border:1px solid #00FFFF;border-radius:8px;padding:1em;">
                        <h4 style="color:#0A1E3F;margin-bottom:1rem;">Headlines for "${topic}"</h4>
                        <div style="color:#0A1E3F;">
                            ${formatResponse(response.content)}
                        </div>
                    </div>
                `;
                resultDiv.style.display = 'block';
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(headlineBtn, originalText);
            }
        });
    }

    // SEO Audit Tool
    const seoForm = document.getElementById('seoForm');
    if (seoForm) {
        seoForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const url = document.getElementById('seoUrl').value.trim();
            const resultDiv = document.getElementById('seoResult');
            
            if (!url) {
                showError(resultDiv, 'Please enter a website URL.');
                return;
            }
            
            const originalText = seoForm.querySelector('button[type="submit"]').textContent;
            showEnhancedLoading(seoForm.querySelector('button[type="submit"]'), resultDiv);
            
            try {
                trackToolUsage('SEO Audit Tool');
                const prompt = `Conduct a comprehensive SEO audit for ${url}. Provide technical recommendations, on-page optimization tips, and performance suggestions.`;
                const response = await window.secureAIClient.getAIResponse(prompt, { maxTokens: 800, temperature: 0.7 });
                
                resultDiv.innerHTML = `
                    <div style="background:#f0f9ff;border:1px solid #00FFFF;border-radius:8px;padding:1em;">
                        <h4 style="color:#0A1E3F;margin-bottom:1rem;">SEO Audit for ${url}</h4>
                        <div style="color:#0A1E3F;">
                            ${formatResponse(response.content)}
                        </div>
                    </div>
                `;
                resultDiv.style.display = 'block';
            } catch (err) {
                showError(resultDiv, err.message);
            } finally {
                hideEnhancedLoading(seoForm.querySelector('button[type="submit"]'), originalText);
            }
        });
    }

    // Marketing Maturity Quiz
    const quizForm = document.getElementById('quizForm');
    if (quizForm) {
        quizForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const q1 = parseInt(document.getElementById('quizQ1').value);
            const q2 = parseInt(document.getElementById('quizQ2').value);
            const q3 = parseInt(document.getElementById('quizQ3').value);
            const resultDiv = document.getElementById('quizResult');
            
            if (isNaN(q1) || isNaN(q2) || isNaN(q3)) {
                showError(resultDiv, 'Please answer all questions.');
                return;
            }
            
            const score = q1 + q2 + q3;
            let result = '';
            let tips = '';
            
            if (score <= 2) {
                result = 'Beginner';
                tips = 'Start by defining your audience and publishing content more regularly.';
            } else if (score <= 5) {
                result = 'Intermediate';
                tips = "You're on your way! Track your results and refine your strategy.";
            } else {
                result = 'Advanced';
                tips = 'Great job! Keep optimizing and try advanced tactics like automation.';
            }
            
            resultDiv.innerHTML = `
                <div style="background:#f0f9ff;border:1px solid #00FFFF;border-radius:8px;padding:1em;">
                    <h4 style="color:#0A1E3F;margin-bottom:1rem;">Your Marketing Maturity Level</h4>
                    <div style="color:#0A1E3F;">
                        <p><strong>Your Level:</strong> ${result}</p>
                        <p><strong>Score:</strong> ${score}/9</p>
                        <p><strong>Recommendation:</strong> ${tips}</p>
                    </div>
                </div>
            `;
            resultDiv.style.display = 'block';
            
            trackToolUsage('Marketing Maturity Quiz');
        });
    }

    console.log('✅ Secure tools system initialized successfully!');
}); 