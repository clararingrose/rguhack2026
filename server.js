const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Evil Carbon Emissions Calculator'
    });
});

app.get('/wrapped', (req, res) => {
    const totalCO2kg = 0;
    res.render('pages/wrapped', { totalCO2kg });
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Evil Blog - Carbon Emissions Calculator'
    });
});

app.get('/signin', (req, res) => {
    res.render('pages/signin', {
        title: 'Evil Sign In'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌍 Carbon Calculator running at http://localhost:${PORT}`);
});
