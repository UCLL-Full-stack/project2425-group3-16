import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJwtToken = ({ username, role }: { username: string, role: Role }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'project2425-group3-16' }
    try {
        return jwt.sign({ username, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Failed to generate JWT token, see server log for details.');
    };
}

export { generateJwtToken };