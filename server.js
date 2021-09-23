const express = require('express');
const path = require('path');

//Get Routes
const clothsRoute = require('./routes/api/cloths.js');
const productsRoute = require('./routes/api/product.js');
const menClothsRoute = require('./routes/api/men-cloths.js');
const womenClothsRoute = require('./routes/api/women-cloths.js');
const brandsRoute = require('./routes/api/brands');

//Build the App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Set Routes
app.use('/api/cloths', clothsRoute);
app.use('/api/product', productsRoute);
app.use('/api/men', menClothsRoute);
app.use('/api/women', womenClothsRoute);
app.use('/api/brands', brandsRoute);

//Set a default path to the client once built
if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});