const Review = require('../model/ReviewModel');


const getReview = async(req, res)=>{

    try{
        const tests = await Review.findAll();
        res.status(200).json(tests);

    }
    catch(error){
        res.status(500).json({error: "Failed to Load"})
    }
}

const createReview = async(req, res)=>{
    
    try{
        
const {Rating, Comment, ReviewDate} = req.body;


const newtest = await Review.create({Rating, Comment, ReviewDate})

res.status(200).json(newtest);
    }
    catch(error){
        res.status(500).json({error: "Failed to Load Reviews"})
        console.log(error)
    }

}

const updateReview = async(req, res)=>{
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.update(req.body);
        res.json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteReview = async(req, res)=>{
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {createReview, getReview, deleteReview, updateReview}

