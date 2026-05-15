import glob

for page in glob.glob('*.html'):
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = content.replace("68 pages", "6-8 pages")
    if new_content != content:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed 68 pages in {page}")
