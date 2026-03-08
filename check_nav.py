lines = open('about.html', 'r', encoding='utf-8', errors='ignore').readlines()
print('head ends at:', [i for i, l in enumerate(lines) if '</head>' in l])
print('nav at:', [i for i, l in enumerate(lines) if '<nav' in l])
