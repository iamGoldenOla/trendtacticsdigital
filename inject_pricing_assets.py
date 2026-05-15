filepath = "pricing.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add CSS link before </head>
if "pricing-cards.css" not in content:
    content = content.replace(
        '<link rel="stylesheet" href="/styles/rate-card.css">',
        '<link rel="stylesheet" href="/styles/rate-card.css">\n    <link rel="stylesheet" href="/styles/pricing-cards.css">'
    )

# 2. Add currency toggle JS before </body>
js_snippet = """
    <script>
    // Currency Toggle Logic
    (function() {
      var toggle = document.getElementById('rc-currency-toggle');
      var labelNgn = document.getElementById('rc-label-ngn');
      var labelUsd = document.getElementById('rc-label-usd');
      if (!toggle) return;

      function updateCurrency() {
        var isUsd = toggle.checked;
        document.querySelectorAll('.price-ngn').forEach(function(el) {
          el.style.display = isUsd ? 'none' : '';
        });
        document.querySelectorAll('.price-usd').forEach(function(el) {
          el.style.display = isUsd ? '' : 'none';
        });
        if (labelNgn) labelNgn.style.color = isUsd ? '#9ca3af' : '#0A1E3F';
        if (labelUsd) labelUsd.style.color = isUsd ? '#0A1E3F' : '#9ca3af';
      }

      toggle.addEventListener('change', updateCurrency);
      updateCurrency(); // init
    })();
    </script>
"""

if "rc-currency-toggle" not in content or "updateCurrency" not in content:
    # Insert before the last </body>
    content = content.replace('</body>', js_snippet + '\n</body>', 1)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Added CSS link and currency toggle JS.")
