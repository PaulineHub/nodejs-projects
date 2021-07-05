const Product = require('../models/product');

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    .limit(10)
    .skip(1)
    res.status(200).json({products,nbHits:products.length})
}

const getAllProducts = async (req,res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {};

    if(featured){
        //on cree une nouvelle propriete a l'objet vide queryObject, nommee featured (qui est le contenu de la requete) et on convertit la string de la requete en valeur booleenne
        queryObject.featured = featured ==='true'? true : false
    } 
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        //console.log(filters)//return price-$gt-40,rating-$gte-4
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }
    console.log(queryObject) // return {featured:false}
    let result = Product.find(queryObject);
   
    //SORT
    if(sort){
        //console.log(sort) return name, -price
        //on veut .sort('-name price'), il faut enlever la ,
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}