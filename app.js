const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const Article = require('./models/article')

const userRouters = require('./routes/user')

const app = express();

mongoose.connect(`mongodb+srv://ldsahu232003:9ygjcaL2fvjC16FH@cluster0.qmquv7f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser : true
});

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    const article = await Article.find();
    res.render('index',{article:article})
})

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/article', userRouters)

app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('working on port 8080')
})