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
    //const products = await Product.find(req.query)
    // Source d'erreur si on a au moins une erreur dans la query (un clé qui n'existe pas par ex), la requete qu'on met en paramètre de find() donnera un tableau vide.
    // A la place, on crée un objet vide queryObject, et on lui ajout des paires clé/valeur si ces dernières sont dans la requête.
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {};
    // BASIC QUERIES
    if(featured){
        queryObject.featured = featured ==='true'? true : false
    } 
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name, $options:'i'}
    }
    // NUMERIC FILTERS
    // Si on veut filtrer par prix plus grand que 40$ par exemple
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
        //console.log(filters)//return price-$gt-40,rating-$gte-4 {}
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
            //console.log(filters)//return { price: {'$gt': 40},rating: {'$gte': 4} }
        })
    }
    console.log(queryObject) // return {featured:false}
    let result = Product.find(queryObject);
   
    //SORT
    // On utilise la query de Mongoose Query.prototype.sort() sur l'objet 'result' qui est un Schema de Mongoose instancié.
    // Documentation https://mongoosejs.com/docs/api/query.html#query_Query-sort
    if (sort) {
        //console.log(sort) return 'name, -price'
        //on veut .sort('-name price'), il faut enlever la ,
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }

    // SELECT
    // Spécifie les clés à inclure ou exclure du résultat
    // Ex: URL"?fields=company,rating" retourne des objets avec uniquement _id, rating et company.
    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    // PAGINATION
    // Par défaut, on se trouve à la page 1 et on se limite à 10 produits.
    // Si on veut aller à la page 2, on veut skipper une fois (2 pages - 1 page) le nombre d'items à "skipper/omettre"
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products,nbHits:products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}