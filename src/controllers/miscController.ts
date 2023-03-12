import { Request, Response } from "express";
import { Post } from "../entities/Post";
import { Sub } from "../entities/Sub";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Vote } from "../entities/Vote";


const vote = async(req: Request, res:Response) => {

    const {identifier, slug, commentIdentifier, value} = req.body;

    if(![-1, 0, 1].includes(value)){
        return res.status(400).json({value: 'Value must be -1, 0 or 1'})
    }

    try {
        const user: User = res.locals.User
        let post = await Post.findOneOrFail({identifier, slug})
        let vote: Vote | undefined;
        let comment: Comment | undefined;
        if(commentIdentifier){
            //find comment and vote if they exist
            comment = await Comment.findOneOrFail({identifier: commentIdentifier })
            vote = await Vote.findOne({user, comment})
        }else{
            //find vote for post if it exist
            vote = await Vote.findOne({user, post})
        }



    } catch(err){
        return res.status(500).json({error: 'Something went wrong'})
    }
};


export default{ vote }
