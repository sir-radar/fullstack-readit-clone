import { Request, Response } from "express";
import {isEmpty, validate} from "class-validator";
import { Post } from "../entities/Post";
import { Sub } from "../entities/Sub";


const create = async(req: Request, res:Response) => {

    const {title, body, sub} = req.body;

    const user = res.locals.user;

    if(title.trim() === ''){
        return res.status(400).json({title: 'Title can not be empty'});
    }

    try {
        const subRecord = await Sub.findOneOrFail({name: sub});

        const post = new Post({title, body, user, sub: subRecord});
        await post.save();
        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Something when wrong'});
    }
};

const getPosts = async(_: Request, res:Response) => {
    try{
        const posts = await Post.find({
            order: {createdAt: 'DESC'}
        })

        return res.json(posts)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

const getPost = async(req: Request, res:Response) => {
    const {identifier, slug} = req.params
    try{
        const post = await Post.findOneOrFail({identifier, slug})

        return res.json(post)

    }catch(err){
        console.log(err)
        return res.status(404).json({error: 'Post not found'})
    }
}




export default{ create, getPosts, getPost }
