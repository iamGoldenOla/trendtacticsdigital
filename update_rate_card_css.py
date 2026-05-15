import os

filepath = "styles/rate-card.css"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Add more yellow (gold) to make it pop
content = content.replace('border-bottom: 2px solid var(--cyan);', 'border-bottom: 2px solid var(--gold);')
content = content.replace('color: var(--cyan);', 'color: var(--gold);')
# Revert some cyan to avoid making everything yellow
content = content.replace('color: var(--gold); /* cyan */', 'color: var(--cyan);') # just in case

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated rate-card.css")
