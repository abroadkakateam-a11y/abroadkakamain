import { UserModel, IUser } from '../models/user.model';

export const userRepository = {
    findByEmail: (email: string) => UserModel.findOne({ email }).exec(),
    findById: (id: string) => UserModel.findById(id).exec(),
    create: (data: Partial<IUser>) => new UserModel(data).save(),
};
