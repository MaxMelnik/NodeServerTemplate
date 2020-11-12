const {User} = require('../schema');

class UserService {
    static async findUserById(userId) {
        return User.findOne({_id: userId});
    }

    static async findUserByEmail(email) {
        return User.findOne({email: email});
    }

    static async updatePassword(user, newPassword) {
        user.password = newPassword;
        return await user.save();
    }

    static async setStats(user, data) {
        Object.assign(user, data);
        return await user.save();
    }

    static async setWeightObject(user) {
        const resObject = {
            weightList: user.weightList,
            targetWeight: user.targetWeight
        }
        return resObject;
    }
}

module.exports = UserService;