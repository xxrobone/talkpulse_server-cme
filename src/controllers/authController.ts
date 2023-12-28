import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { assertDefined } from "../utils/asserts";
import {verifyEmail, passwordResetEmail} from "../services/EmailVerification";

// SIGN UP
export const signUp = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    try {
        if (await User.findOne({username: username})) {
            return res.status(400).json({ message: "Username already taken, try an other" });
        }

        if (await User.findOne({email: email})) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = new User({ username: username, password, email })

        assertDefined(process.env.EMAIL_TOKEN)

        const emailToken = jwt.sign(
            { username: username },
            process.env.EMAIL_TOKEN,
            { expiresIn: '1h' }
        );
        
        verifyEmail(username, email, emailToken)
        await user.save()

        res.status(201).json({ username, id: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ACCOUNT VERIFYCATION
export const verifyAccount = async (req: Request, res: Response) => {
    const { username, token } = req.params;

    try {
        // Check if the user exists
        const userFound = await User.findOne({ username });

        if (!userFound) {
            return res.status(404).json({ message: 'User not found in the database' });
        }

        // Verify the token
        const secret = process.env.EMAIL_TOKEN;
        assertDefined(secret);

        const decodedToken = jwt.verify(token, secret);
        console.log('Decoded token:', decodedToken);

        // Update user confirmation status
        await User.updateOne({ username }, { $set: { confirmed: true } });

        return res.json({ message: 'User successfully verified' });
    } catch (error) {
        console.error('Error during verification:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// LOG-IN - SIGN-IN
export const logIn = async (req: Request, res: Response) => {
    console.log(req.userId);
    try {
        // Get username and password from request body
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({username: username}, '+password');

        // Check so user exists and password is a match
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Wrong username or password' });
        }

        if (user.confirmed === false) {
            return res.status(400).json({ message: 'Account not confirmed, please check your email for confirmation' });
        }
        
        assertDefined(process.env.JWT_SECRET)
        
        // Return JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        assertDefined(process.env.REFRESH_TOKEN_SECRET)

        // Return refreshtoken
        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });


        res.status(200).json({token, refreshToken, username: user.username})
    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const refreshJWT = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret ) {
        throw Error('Missing REFRESH_TOKEN_SECRET');
    }

    try {
    // Return refreshtoken
    const decodedPayload = await jwt.verify(refreshToken, refreshTokenSecret) as {userId: string};  

    assertDefined(process.env.JWT_SECRET)
    
    // Return JWT
    const token = jwt.sign({ userId: decodedPayload.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        token
    })
    } catch(error) {
        console.log(error)
        return res.status(403).json({message: 'Invalid token'})
    }   
}  


// UPDATING PROFILE
export const updateProfile = async (req: Request, res: Response) => {
    const { userId } = req

    const user = await User.findById(userId);

    if (!user) {
        console.log("User not found with id: ", userId)
        return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({
        username: user.username,
        email: user.email,
        password: user.password
    })
}

// PASSWORD RESET REQUEST - forgot password
export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log('Email received:', email);
  
    try {
      // Check if the user exists
      const userFound = await User.findOne({ email });
  
      console.log('User found:', userFound);
  
      if (!userFound) {
        return res.status(404).json({ message: 'User not found in the database' });
      }
  
      // Generate a reset token
      const secret = process.env.PASSWORD_RESET_TOKEN;
  
      console.log('Secret:', secret);
  
      if (!secret) {
        return res.status(500).json({ message: 'Internal Server Error - Missing secret' });
      }
  
      const resetToken = jwt.sign({ email }, secret, { expiresIn: '1h' });
      console.log('Reset token:', resetToken);
  
      if (!resetToken) {
        return res.status(500).json({ message: 'Internal Server Error - Unable to generate token' });
      }
  
      // Send reset password email
      await passwordResetEmail(email, resetToken);
  
      return res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error during password reset request:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
    const { email, token, newPassword } = req.body;
  
    try {
      // Verify the reset token
      const secret = process.env.PASSWORD_RESET_TOKEN;
      assertDefined(secret);
  
      // Check if a user with the provided email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found in the database' });
      }
  
      // Set the new password (will be automatically hashed by the pre-save hook)
      user.password = newPassword;
      await user.save();
  
      return res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error during password reset:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  