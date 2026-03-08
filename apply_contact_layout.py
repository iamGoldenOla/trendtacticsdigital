import re

with open('contact.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to replace from '<!-- Contact Information with Parallax Background -->' to '<!-- Ebook Promo Section -->'
pattern = r'<!-- Contact Information with Parallax Background -->.*?<!-- Ebook Promo Section -->'

replacement = '''<!-- Contact Premium Layout -->
      <section class=\"contact-premium-section\" style=\"padding: 5rem 0; background: #ffffff;\">
        <div class=\"container\">
          <div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 4rem;\">
            
            <!-- Contact Info Sidebar -->
            <div style=\"background: #f8fbff; border-radius: 20px; padding: 3rem; box-shadow: 0 10px 40px rgba(0, 153, 255, 0.05); border: 1px solid rgba(0, 255, 255, 0.1);\">
              <h2 style=\"font-size: 2rem; margin-bottom: 1.5rem; color: #0a1e3f;\">Get In <span class=\"text-gradient\">Touch</span></h2>
              <p style=\"color: #555; margin-bottom: 2.5rem; line-height: 1.6;\">Whether you have a question, need a consultation, or want to explore how we can grow your business together, our team is ready to help.</p>

              <div style=\"display: flex; gap: 1rem; margin-bottom: 2rem;\">
                <div style=\"width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,102,255,0.1)); display: flex; align-items: center; justify-content: center; color: #0066ff; font-size: 1.5rem; flex-shrink: 0;\">
                  <i class=\"fas fa-envelope\"></i>
                </div>
                <div>
                  <h4 style=\"margin: 0 0 0.3rem 0; color: #0a1e3f; font-size: 1.1rem;\">Email Us</h4>
                  <p style=\"margin: 0; color: #666;\">info@trendtacticsdigital.com<br>support@trendtacticsdigital.com</p>
                </div>
              </div>

              <div style=\"display: flex; gap: 1rem; margin-bottom: 2rem;\">
                <div style=\"width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,102,255,0.1)); display: flex; align-items: center; justify-content: center; color: #0066ff; font-size: 1.5rem; flex-shrink: 0;\">
                  <i class=\"fas fa-phone\"></i>
                </div>
                <div>
                  <h4 style=\"margin: 0 0 0.3rem 0; color: #0a1e3f; font-size: 1.1rem;\">Call Us</h4>
                  <p style=\"margin: 0; color: #666;\">+234 906 813 3874<br>Mon-Fri: 9AM - 6PM WAT</p>
                </div>
              </div>

              <div style=\"display: flex; gap: 1rem;\">
                <div style=\"width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,102,255,0.1)); display: flex; align-items: center; justify-content: center; color: #0066ff; font-size: 1.5rem; flex-shrink: 0;\">
                  <i class=\"fas fa-map-marker-alt\"></i>
                </div>
                <div>
                  <h4 style=\"margin: 0 0 0.3rem 0; color: #0a1e3f; font-size: 1.1rem;\">Visit Us</h4>
                  <p style=\"margin: 0; color: #666;\">123 Digital Avenue<br>Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <!-- Contact Form Area -->
            <div style=\"padding: 1rem 0;\">
              <h2 style=\"font-size: 2rem; margin-bottom: 0.5rem; color: #0a1e3f;\">Send Us a Message</h2>
              <p style=\"color: #666; margin-bottom: 2rem;\">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form id=\"contactForm\" style=\"display: flex; flex-direction: column; gap: 1.2rem;\">
                <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem;\">
                  <div>
                    <label for=\"contactName\" style=\"display: block; font-weight: 600; margin-bottom: 0.4rem; color: #333; font-size: 0.9rem;\">Your Name</label>
                    <input type=\"text\" id=\"contactName\" name=\"name\" required placeholder=\"John Doe\" style=\"width: 100%; padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid #e0e0e0; background: #fff; font-size: 1rem; transition: border-color 0.3s; outline: none;box-sizing: border-box;\"/>
                  </div>
                  <div>
                    <label for=\"contactEmail\" style=\"display: block; font-weight: 600; margin-bottom: 0.4rem; color: #333; font-size: 0.9rem;\">Your Email</label>
                    <input type=\"email\" id=\"contactEmail\" name=\"email\" required placeholder=\"john@company.com\" style=\"width: 100%; padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid #e0e0e0; background: #fff; font-size: 1rem; transition: border-color 0.3s; outline: none;box-sizing: border-box;\"/>
                  </div>
                </div>

                <div>
                  <label for=\"contactSubject\" style=\"display: block; font-weight: 600; margin-bottom: 0.4rem; color: #333; font-size: 0.9rem;\">Subject</label>
                  <input type=\"text\" id=\"contactSubject\" name=\"subject\" required placeholder=\"How can we help?\" style=\"width: 100%; padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid #e0e0e0; background: #fff; font-size: 1rem; transition: border-color 0.3s; outline: none;box-sizing: border-box;\"/>
                </div>

                <div>
                  <label for=\"contactMessage\" style=\"display: block; font-weight: 600; margin-bottom: 0.4rem; color: #333; font-size: 0.9rem;\">Message</label>
                  <textarea id=\"contactMessage\" name=\"message\" required rows=\"5\" placeholder=\"Tell us about your project...\" style=\"width: 100%; padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid #e0e0e0; background: #fff; font-size: 1rem; transition: border-color 0.3s; outline: none; resize: vertical;box-sizing: border-box;\"></textarea>
                </div>

                <div id=\"aiSentiment\" style=\"font-size: 0.9rem; color: #888;\"></div>
                
                <button type=\"submit\" class=\"btn btn-primary btn-large\" style=\"align-self: flex-start; padding: 1rem 2.5rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer; border-radius: 50px; background: linear-gradient(135deg, #0a1e3f, #00ffff); color: white; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);\">
                  Send Message <i class=\"fas fa-paper-plane\"></i>
                </button>
                <div id=\"aiThankYou\" style=\"margin-top: 1rem; font-size: 1.05rem; color: #0a1e3f;\"></div>
                <input type=\"text\" name=\"website\" id=\"website\" style=\"display: none;\" tabindex=\"-1\" autocomplete=\"off\" />
              </form>
            </div>
          </div>

          <!-- Google Maps Embed Premium -->
          <div style=\"border-radius: 20px; overflow: hidden; box-shadow: 0 15px 50px rgba(10,30,63,0.1); height: 450px; position: relative; border: 1px solid #eee;\">
            <iframe
              src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890\"
              width=\"100%\"
              height=\"100%\"
              style=\"border: 0;\"
              allowfullscreen=\"\"
              loading=\"lazy\"
              referrerpolicy=\"no-referrer-when-downgrade\"
            >
            </iframe>
            <!-- Overlay card -->
            <div style=\"position: absolute; bottom: 30px; left: 30px; background: white; padding: 1.5rem 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 1rem;\">
              <div style=\"width: 40px; height: 40px; background: #0a1e3f; color: #00ffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;\">
                <i class=\"fas fa-map-marker-alt\"></i>
              </div>
              <div>
                <h4 style=\"margin: 0 0 0.2rem 0; font-size: 1.1rem; color: #0a1e3f;\">Our Main Office</h4>
                <p style=\"margin: 0; color: #666; font-size: 0.9rem;\">123 Digital Avenue, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Ebook Promo Section -->'''

new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)

if count > 0:
    with open('contact.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('Successfully updated contact.html')
else:
    print('Pattern not found in contact.html')
