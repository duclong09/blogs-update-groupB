const express = require('express');
const reactPostController = require('../../controllers/reactController/postController');
const reactUserPostController = require('../../controllers/reactController/userController');
const authController = require('../../controllers/authController');
const commentController = require('../../controllers/reactController/commentController');
const router = express.Router();

const Product = require('../../models/productModel');
router.get('/search',authController.isLoggedIn,reactPostController.getPostHome);
router.get('/client',authController.isLoggedIn,reactPostController.getPostHome);
router.get('/post/:page',authController.isLoggedIn,reactPostController.getPostHome);

router.get('/detail/:slug', async(req,res,next) => {
    try{
        const post = await Product.findOne({product_slug: req.params.slug });
        if(!post){
            res.status(404).send('Not found post detail with name ' + product_slug + '!' );
        }
        res.status(200).json({
            message: 'data detail',
            post
        });

    }catch(err){
        res.status(400).send('Cannot execute query in detail page!');
    }
});
router.post('/login', reactUserPostController.loginPost);
router.get('/getPost/:id',reactPostController.getUpdatePost);

router.post('/update-post/:id',reactPostController.addUpdatePost);
router.post('/create-post',reactPostController.addUpdatePost);
router.post('/search',reactPostController.search);
// Comments
router.get('/get-comment',commentController.getComment);
router.post('/create-comment',commentController.createComment);
router.delete('/delete-comment/:id',commentController.deleteComment);


module.exports = router;