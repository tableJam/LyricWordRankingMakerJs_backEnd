const express = require('express');
const router = express.Router()
const {start} = require('../ctrl/main.js');
const {createRank} = require('../ctrl/createRank.js');

router.get('/',(req,res)=>{
  res.status(200).json('helloworld')
})
router.post('/:name', async (req,res)=>{
  let data = await start(req.params.name);
  res.status(200).json(data);
});


module.exports = router