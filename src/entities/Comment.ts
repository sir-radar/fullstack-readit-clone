import {Entity as TOEntity, Column, Index, ManyToOne, JoinColumn, BeforeInsert} from "typeorm";
import Entity from './Entity';
import { Post } from "./Post";
import { User } from './User';
import { makeId } from '../utils/helpers';

@TOEntity("comments")
export class Comment extends  Entity{
    constructor(comment: Partial<Comment>){
        super();
        Object.assign(this, comment);
    }

    @Index()
    @Column()
    identifier: string; // 7 character Id

    @Column()
    body: string;

    @Column()
    username: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User;

    @ManyToOne(() => Post, post => post.comments, {nullable: false})
    post: Post;

    @BeforeInsert()
    makeId(){
        this.identifier = makeId(8)
    }
}
