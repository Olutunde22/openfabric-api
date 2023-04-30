import bcrypt from 'bcrypt'

const saltRounds = 10
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);
    return { salt, password };
};

export const verifyPassword = async (userPassword, hashedPassword) => {
    return await bcrypt.compare(userPassword, hashedPassword);
};