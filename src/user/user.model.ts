import * as mongoose from 'mongoose';
import { Interface } from 'readline';

export const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true,
    },
    userName: {
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

export interface User {
    firstName:string,
    lastName:string,
    userName:string,
    email:string,
    password:string,
    isDelete:boolean
}