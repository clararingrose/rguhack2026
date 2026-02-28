const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs   = require('fs');

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
        title: 'Evil Blog'
    });
});

app.get('/signin', (req, res) => {
    const picsDir = path.join(__dirname, 'public', 'assets', 'profilepics');

    let profilePics = [];
    try {
        profilePics = fs.readdirSync(picsDir).filter(f =>
            /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f)
        );
    } catch (err) {
        console.warn('Could not read profilepics directory:', err.message);
    }

    res.render('pages/signin', { profilePics });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌍 Carbon Calculator running at http://localhost:${PORT}`);
});
