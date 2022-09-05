const express = require('express');
const app = express();
const {products} = require('./data.js');

//res.json([body]) : Sends a JSON response. 

app.get('/', (req,res)=>{
   res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image}
    })
    res.json(newProducts)
})

//POUR ACCEDER A UN PRODUIT SPECIFIQUE DEFINI
// app.get('/api/products/1',(req,res)=>{
//     const singleProduct = products.find((product)=> product.id === 1)
//     res.json(singleProduct)
// })

// PARAMETERS -------------------------------------
//POUR ACCEDER A UN PRODUIT SPECIFIQUE DE MANIERE GENERALE

app.get('/api/products/:productID',(req,res)=>{
    // console.log(req);
    // console.log(req.params);
    const {productID} = req.params;
    const singleProduct = products.find((product)=> product.id === Number(productID)) // Number () car params retourne une string
    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist')
    }
    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req,res)=>{
    console.log(req.params);
    res.send('hello world')

})

// QUERIES -------------------------------------
// URL entered in browser :
// localhost:5000/api/v1/query?name=john&id=4

app.get('/api/v1/query', (req,res)=>{
    //console.log(req.query);//return {name: 'john', id: '4'}
    const {search, limit} = req.query
    let sortedProducts = [...products];
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
        return product.name.startsWith(search)
        //La méthode startsWith() renvoie un booléen indiquant si la chaine de caractères commence par la deuxième chaine de caractères fournie en argument.
        //str.startsWith(chaîneRecherchée [, position]);
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit))
        //La méthode slice() renvoie un objet tableau, contenant une copie superficielle (shallow copy) d'une portion du tableau d'origine, la portion est définie par un indice de début et un indice de fin (exclus). 
    }
    if(sortedProducts.length < 1){
        //res.status(200).send('no product matched your search')
        return res.status(200).json({success: true,data: []})
    }
    res.status(200).json(sortedProducts)
    res.send('hello world')
})

app.listen(5000, ()=>{
    console.log('server is listening on port 5000');
})