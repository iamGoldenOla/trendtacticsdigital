const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'courses.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/tools', (req, res) => {
    res.sendFile(path.join(__dirname, 'tools.html'));
});

// Catch all other routes and serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Static file server running on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`📄 Available pages:`);
    console.log(`   - Home: http://localhost:${PORT}/`);
    console.log(`   - Courses: http://localhost:${PORT}/courses`);
    console.log(`   - About: http://localhost:${PORT}/about`);
    console.log(`   - Services: http://localhost:${PORT}/services`);
    console.log(`   - Contact: http://localhost:${PORT}/contact`);
    console.log(`   - Blog: http://localhost:${PORT}/blog`);
    console.log(`   - Portfolio: http://localhost:${PORT}/portfolio`);
    console.log(`   - Pricing: http://localhost:${PORT}/pricing`);
    console.log(`   - Tools: http://localhost:${PORT}/tools`);
});