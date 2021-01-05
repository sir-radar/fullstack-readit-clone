import { Request, Response } from "express";
import {isEmpty, validate} from "class-validator";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie  from "cookie";

const mapErrors = (errors: Object[]) => {
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1]
        return prev;
    }, {} )
}


const register = async(req: Request, res:Response) => {

    const {email, username, password} = req.body;

    try {
        const user = new User({email, username, password});
        const errors = await validate(user);
        if(errors.length > 0) {
            return res.status(400).json(mapErrors(errors));
        }
        await user.save();
        return res.json(user);
    }catch(err){
        if(err.code == 23505){
            return res.status(409).json({message: "Email or Username already taken"});
        }
        return res.status(500).json(err);
    }
};

const login = async(req: Request, res:Response) => {
    const {username, password} = req.body;

    try{
        let errors: any = {};

        if(isEmpty(username)) errors.username = "Username must not be empty";
        if(isEmpty(password)) errors.password = "Password must not be empty";
        if(Object.keys(errors).length > 0){
            res.status(400).json(errors);
        }

        const user = await User.findOne({username});

        if(!user) return res.status(404).json({username: 'User not found'})

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({password: "Username and password doesn't match"})
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET);

        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600,
            path:'/'
        }))
        return res.json(user);

    }catch(err){
        return res.status(500).json(err)
    }
}

const me = async (req: Request, res: Response) => {
    return res.json(res.locals.user)
}

const logout = async (_: Request, res: Response) => {
     res.set('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0),
            path:'/'
        }))

    return res.status(200).json({success: true})
}




export default{ register, login, me, logout }
