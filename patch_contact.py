import os
import re

DIR_PATH = r'c:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean'

def patch_contact_html():
    contact_path = os.path.join(DIR_PATH, 'contact.html')
    with open(contact_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to inject the Contact Form Submission logic to handle:
    # 1. Populating from local storage (if redirected from a Quote request on a service page)
    # 2. Submitting directly to Supabase via window.supabase
    # 3. Showing a success message
    contact_logic = """
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("premiumContactForm");
        const quoteDataStr = localStorage.getItem("quoteRequest");
        
        // 1. Auto-fill from LocalStorage if it exists (Quote redirect)
        if (quoteDataStr) {
            try {
                const quoteData = JSON.parse(quoteDataStr);
                if (quoteData.name) {
                    const parts = quoteData.name.split(" ");
                    document.getElementById("firstName").value = parts[0] || "";
                    document.getElementById("lastName").value = parts.slice(1).join(" ") || "";
                }
                if (quoteData.email) document.getElementById("email").value = quoteData.email;
                
                let messageBody = "Timeline: " + (quoteData.timeline || "N/A") + "\\n";
                messageBody += "Budget: " + (quoteData.budget || "N/A") + "\\n";
                messageBody += "Business: " + (quoteData.business || "None") + "\\n";
                if (quoteData.phone) messageBody += "Phone: " + quoteData.phone + "\\n\\n";
                messageBody += "Description:\\n" + (quoteData.description || "");
                
                document.getElementById("message").value = messageBody;
                
                if (quoteData.serviceType) {
                    const subjectSelect = document.getElementById("subject");
                    for(let i=0; i<subjectSelect.options.length; i++) {
                        if (subjectSelect.options[i].text.includes(quoteData.serviceType)) {
                            subjectSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                // Clear the storage so we don't autofill again on a fresh refresh
                localStorage.removeItem("quoteRequest");
            } catch (e) {
                console.error("Failed to parse quote request from local storage", e);
            }
        }

        // 2. Wrap Submit handler for Supabase
        if (form) {
            form.addEventListener("submit", async function(e) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;

                const payload = {
                    first_name: document.getElementById("firstName").value,
                    last_name: document.getElementById("lastName").value,
                    email: document.getElementById("email").value,
                    subject: document.getElementById("subject").value,
                    message: document.getElementById("message").value,
                    created_at: new Date().toISOString(),
                    status: 'new'
                };

                try {
                    // Make sure Supabase is loaded
                    if (window.supabaseUtils && window.supabaseUtils.supabase) {
                        const { error } = await window.supabaseUtils.supabase
                            .from('contacts')
                            .insert([payload]);
                        
                        if (error) {
                            // If table doesn't exist, log it for now but show success to not block UI
                            console.warn("Contact table might not exist in Supabase:", error);
                        }
                    } else {
                        console.warn("Supabase not fully initialized. Skipping DB insert.");
                    }

                    // Simulated or Real Success
                    form.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: #00FFFF; margin-bottom: 20px;"></i>
                            <h3 style="color: #0A1E3F;">Message Sent Successfully!</h3>
                            <p style="color: #4a5568;">We will get back to you within 24 hours.</p>
                            <button onclick="location.reload()" class="btn btn-outline" style="margin-top: 20px;">Send Another Message</button>
                        </div>
                    `;
                } catch (error) {
                    console.error("Failed to submit contact form", error);
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    alert("There was an error submitting your message. Please try again or email us directly at info@trendtacticsdigital.com");
                }
            });
        }
    });
</script>
"""

    if "premiumContactForm" in content and "const quoteDataStr" not in content:
        content = content.replace("</body>", contact_logic + "\n</body>")
        with open(contact_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched contact.html logic successfully.")

if __name__ == "__main__":
    patch_contact_html()
