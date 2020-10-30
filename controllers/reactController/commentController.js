const api = require('../../api/api');
const Comment = require('../../models/reactModel/commentModel');
exports.getComment = async (req, res, next) => {
   try{
    const data = await Comment.find({});
    if(!data){
        res.status(200).json({
            status: 'error',
            data: 'khong ton tai comment nao!'
        });
    }
    res.status(200).json({
        status: 'success',
        data: data
    });
   }catch(err){
       res.status(400).send('cannot execute getComment!');
   }

}
exports.createComment = async (req,res,next)=> {
    try{
        let ob = {};
        // chi cho phep tao cac truong hop le
        Object.keys(req.body).forEach(el => {
            if(['commentUser','commentContent'].includes(el)){
                ob[el] = req.body[el];
            }
        })
        if(api.isEmptyObject(ob) === 0){
            return res.status(404).send('Du lieu nhap khong dung!')
        }
        const comment = await Comment.create(ob);
        res.status(201).json({
            status: 'success',
            data: comment
        });
    }catch(err){
        res.status(400).send('cannot execute create comment!');
    }

}
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            res.status(404).send('Not found post with ID to delete!');
        }
        res.status(200).json({
            status:'success',
            message: "Xóa Thành Công!"
        })
    } catch (err) {
        res.status(400).send('Cannot add delete product');
    }
}