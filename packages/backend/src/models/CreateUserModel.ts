import { model, Schema } from "mongoose";
import createUser from '../../../shared/src/CreateUser';


const UserModel = new Schema({
    user: {type:String, required:true, unique:true }
})


const User = model<createUser>('user', UserModel);

const SaveUser = async (item: createUser):Promise<void> => {
    const SaveUser = new User(item);
    const SaveNewUser = await SaveUser.save();
    if (!SaveNewUser) {
        throw new Error ()
    }
};

export default  SaveUser ;