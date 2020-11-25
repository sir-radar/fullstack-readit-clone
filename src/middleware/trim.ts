import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next) => {
    const exceptions = ['password'];

    console.log(req.body)

    Object.keys(req.body).forEach(key => {
        if(!exceptions.includes(key) && typeof req.body[key] === 'string'){
            req.body[key] = req.body[key].trim()
        }
    })

    next()
}
