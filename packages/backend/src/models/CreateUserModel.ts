import { connect, model, Schema } from "mongoose";
import createUser from '../../../shared/src/CreateUser';


const UserModel = new Schema({
    user: String,
})


const User = model<createUser>('user', UserModel);

