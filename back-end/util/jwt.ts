import jwt from 'jsonwebtoken';
import { Role } from '../types';

const generateJWTToken =  (
    {username, role}: {username: string, role: Role}
): string =>{
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app'}

    try{
        return jwt.sign({username, role}, process.env.JWT_SECRET, options)
    }catch (error){
        console.log(error)
        throw Error('Error generating JWT token, see server log for details.');
    }
}

export  {generateJWTToken}