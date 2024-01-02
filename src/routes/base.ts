import Router from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send('Api for talkpulse up and running! 100 miles and running!');
});
  
export default router;