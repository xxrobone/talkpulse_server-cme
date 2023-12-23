import { Router } from 'express';
import validateToken from '../middleware/authMiddleware';
import * as userController from '../controllers/userController';

// will move this to auth!!!

const router = Router();


router.get('/user', validateToken, userController.getUser);

// UPDATE
/* router.put('/:id', async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json('User not found');
      }

      const { password, ...others } = updatedUser.toObject() as IUser;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('Not your account? Update failed!');
  }
}); */

// DELETE
/* router.delete('/:id', async (req: Request, res: Response) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can only delete your own account, Delete failed!');
  }
}); */

// GET USER BY ID
/* router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json('User not found');
    }

    const { password, ...others } = user.toObject() as IUser;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

*/

export default router; 
