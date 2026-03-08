import os

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    try:
        # Check if the file is truly utf-16 encoded because of the earlier oops
        with open(file, 'rb') as f:
            raw = f.read()
            
        encoding = 'utf-8'
        if b'\x00' in raw[:100]:
            encoding = 'utf-16'
            
        with open(file, 'r', encoding=encoding, errors='ignore') as f:
            content = f.read()
            
        # Clean up the double carriage returns that windows might've injected
        clean_content = content.replace('\r\n', '\n').replace('\r\r\n', '\n').replace('\r\r', '\n')
        
        with open(file, 'w', encoding='utf-8', newline='') as f:
            f.write(clean_content)
            
        print(f"Fixed encoding for {file} (from {encoding} to utf-8)")
    except Exception as e:
        print(f"Error on {file}: {e}")

print("Encoding fix complete!")
