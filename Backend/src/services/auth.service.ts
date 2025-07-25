import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { userRepository } from "../repositories/user.repository";
import {
  registerSchema,
  loginSchema,
  refreshTokenBody,
} from "../dtos/auth.dto";
interface Payload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
export const authService = {
  register: async (input: unknown) => {
    const { name, email, password } = registerSchema.parse(input);
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new Error("Email already in use");
    const hashed = bcrypt.hashSync(password, 8);
    const user = await userRepository.create({ name, email, password: hashed });

    await user.save();
    return {
      user,
    };
  },
  login: async (input: unknown) => {
    const { email, password } = loginSchema.parse(input);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      config.refreshSecret,
      { expiresIn: "15d" }
    );
    user.refreshToken = refreshToken;
    await user.save();
    return {
      refreshToken,
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  },
  refresh: async (input: unknown) => {
    const { refreshToken } = refreshTokenBody.parse(input);

    const payload: Payload = jwt.verify(refreshToken, config.refreshSecret);
    const user = await userRepository.findById(payload.id);
    console.log(user);
    if (!user || user.refreshToken != refreshToken) {
      throw new Error("Token not found ");
    }
    const newRefreshToken = jwt.sign(
      { id: user._id, role: user.role },
      config.refreshSecret,
      { expiresIn: "15d" }
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      config.refreshSecret,
      { expiresIn: "1h" }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};
