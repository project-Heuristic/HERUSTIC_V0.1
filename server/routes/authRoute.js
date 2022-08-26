import express from "express"

const router=express.Router();
router.get('/',(req,res)=>{
    res.send('Server is Working');
});

router.post('/register',(req,res)=>{
    const { Name,phone,Email,userType,AadharNumber,AadharNumberVerify,schoolId,IdNumber} =req.body;

})
// 

export default router;