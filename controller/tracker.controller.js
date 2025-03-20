import Track from "../models/track.model.js";

export const createTracker = async(req, res, next)=>{
    try {
        const tracker = await Track.create({
            ...req.body,
            user: req.user._id,
        })
        res.status(201).json({success: true, data: tracker});
    } catch (error) {
        next(error);
    }
}

export const getUserTracker = async (req, res, next)=>{
    try {
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const tracks = await Track.find({user: req.params.id});
        res.status(200).json({success: true, data:tracks});
    } catch (error) {
        next(error);
    }
}