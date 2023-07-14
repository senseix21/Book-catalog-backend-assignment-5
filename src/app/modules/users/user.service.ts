import { IUser } from "./user.interface";
import { User } from "./user.model";


//Create a new User
const createUser = async (data: IUser): Promise<IUser> => {
    const result = await User.create(data);
    return result;
};

export const UserService = {
    createUser
}