import * as mongoose from "mongoose";

// interface is exported
export interface IUser{
    name: string,
    age: number,
    habbit?: string
}

// UserDocument is for mongoose purposed.
// You can add fields which generate by mongoose middlewear.
interface UserDocument extends mongoose.Document, IUser{
    isAdult: boolean
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isAdult: {
        type: Boolean,
        required: true
    },
    habbit: String
})

// function here cannot be arrow function, nor this would be wrong
// function此處不可用 => 取代，不然 this會出錯
UserSchema.pre('validate', function (next){
    console.log(this.age);
    if(this.age < 18){
        this.isAdult = false;
    }else{
        this.isAdult = true;
    }
    next()
})

// Singleton pattern
export class UserModel {
    private static instance: UserModel
    private _userModel: mongoose.Model<UserDocument>

    private constructor(){
        this._userModel = mongoose.model<UserDocument>("user", UserSchema, "users", true);
    }

    static getInstance() {
        if (!UserModel.instance) {
            UserModel.instance = new UserModel();
        }
        return UserModel.instance;
    }

    create(user: IUser): Promise<IUser>{
        return this._userModel.create(user)
    }

    findAllUser(): Promise< IUser[]>{
        return this._userModel.find().exec()
    }
}
