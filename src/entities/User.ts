import { IsEmail, Length } from "class-validator";
import {Entity as TOEntity, Column, Index, BeforeInsert} from "typeorm";
import bcrypt from "bcrypt";
import { Exclude} from "class-transformer";
import Entity from './Entity';

@TOEntity("users")
export class User extends  Entity{
    constructor(user: Partial<User>){
        super();
        Object.assign(this, user);
    }

    @Index()
    @IsEmail()
    @Column({unique:true})
    email: string;

    @Index()
    @Length(3, 255)
    @Column({unique: true})
    username: string;

    @Exclude()
    @Index()
    @Length(6, 255)
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassord(){
        this.password = await bcrypt.hash(this.password, 6)
    }

}
