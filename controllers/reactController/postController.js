
const Product = require('../../models/productModel');


exports.getPostHome = async (req, res, next) => {
    const perPage = 6;
    const page = req.params.page || 1;
    // for search
    const title = req.query.title;
    // options i khong phan biet chu hoa /thuong tim het
    var condition = title ? {product_name: {$regex: new RegExp(title),$options: "i"}}: {};
    try {
        await Product.find(condition)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, products) {
                Product.count().exec(function (err, count) {
                    if (err) return next(err);
                    res.status(200).json({
                        title: 'Home',
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        user: req.user
                    });
                });
            });
    } catch (err) {
        res.status(400).send('Cannot execute query in get all post!');
    }
}
exports.getUpdatePost =  (req, res, next) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({
                status: 'success',
                data: doc
            })
        }
    });
}
exports.addUpdatePost = async function (req, res, next) {
    try {
        console.log(req.body);
        if (!req.body._id) {
            // (Add) INSERT INTO MONGODB
            if(req.files){
             
            }
            const post = await Product.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    data: post
                }
            });

        } else {
            // UPDATE INTO MONGODB
            if(req.files){
                if (Object.keys(req.files).length !== 0) {
                    await fnMixinUpload(req.files,req);
                }
            }
            await Product.findOneAndUpdate({ _id: req.body._id }, req.body, { useFindAndModify: false, new: true }, (err, doc) => {
                if (!err) {
                    res.redirect('/');
                }
                else {
                    // neu update khong duoc
                    if (err.name == 'ValidationError') {
                        // co the them xu ly validation error o day nghien cuu 
                        // hien thi lai data da edit nhung chua thanh cong
                        res.render('postAddEdit.pug', {
                            title: 'Update A Post Details',
                            data: req.body
                        });
                    } else {
                        console.log('Error during updating the record! ' + err);
                    }
                }
            });
        }

    } catch (err) {
        console.log(err);
        res.status(400).send('Cannot add or update product');
    }
}
exports.search = async(req,res,next) => {
    try{
       const posts = await Product.find( { "product_name": `${req.body}` } )
        res.status(200).json({
            data: posts
        });
    }catch(err){
        res.status(400).send('Cannot execute query in search!');
    }

}

// exports.getPost = async (req, res, next) => {
   // db.stores.find( { $text: { $search: "java coffee shop" } } )
//     try {
//         const post = await Product.findOne({ product_slug: req.params.slug });
//         console.log(post);
//         if (!post) {
//             res.status(404).send('Not found post detail with name!');
//         }
//         res.status(200).render('detail.pug', {
//             title: `${post.product_name}`,
//             post
//         });
//     } catch (err) {
//         res.status(400).send('Cannot execute query in detail!');
//     }
// }