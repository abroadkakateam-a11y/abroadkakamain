import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories/user.repository';
import { registerSchema, loginSchema } from '../dtos/auth.dto';

export const authService = {
  register: async (input: unknown) => {
    const { name, email, password } = registerSchema.parse(input);
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error('Email already in use');
    const hashed = bcrypt.hashSync(password, 8);
    const user = await userRepository.create({ name, email, password: hashed });
    return user;
  },
  login: async (input: unknown) => {
    const { email, password } = loginSchema.parse(input);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
    return { token };
  },
};