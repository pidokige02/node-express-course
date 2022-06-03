const Product = require('../models/product');

const createProducts = async (req, res) => {
  console.log(req.body)
  const product = await Product.create(req.body)
  res.status(201).json({ product })
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ products, nbHits: products.length });
};

// const getAllProductsStatic = async (req, res) => {
//   const products = await Product.find({})
//   .sort('name')
//   .select('name price')
//   .limit(10)
//   .skip(5)

//   res.status(200).json({ products, nbHits: products.length });
// };


// const getAllProducts = async (req, res) => {
//   console.log(req.query)
//   const products = await Product.find(req.query)
//   res.status(200).json({ products, nbHits: products.length });
// }

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  console.log(req.query)

  if (featured) {
    // query param looks like featured=true or featured=false
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    // query param looks like company=ikea
    queryObject.company = company;
  }
  if (name) {
    // query param looks like name=ab, meaning checking whether thare is 'ab' in the name.
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    // query param looks like numericFilters=price>30,rating>4
    console.log("numericFilters", numericFilters)
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log("filters", filters)
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
        console.log(queryObject[field], field, [operator], Number(value))
      }
    });
  }
  console.log("queryObject", queryObject)
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    // query param look like sort=name or sort=-name field name 을 기준으로 오름 내림으로 정렬
    // sort=-name,price or sort=name,price
    console.log(sort)     // -name,price
    const sortList = sort.split(',').join(' ');
    console.log(sortList) // -name price
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    // query param looks like fields=name,price
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;     // query param looks like page=1 or the other number.
  const limit = Number(req.query.limit) || 10;  // query param looks like limit=4 or the other number.
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23 : total number of items
  // 4 7(1st) 7(2nd) 7(3rd) 2(4th)
  // 4 : total pages
  // 7 : limit

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  createProducts,
  getAllProducts,
  getAllProductsStatic,
};
