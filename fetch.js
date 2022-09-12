const request = require('request');
const {JSDOM} = require('jsdom');

const fetch = (url) => {
  return new Promise((resolve,reject)=>{
    const myRequest = request.defaults();
    try{
      myRequest(url,{},((err,res)=>{
        if(err)reject(err);
        const dom = new JSDOM(removeStyles(res.body));
        const document = dom.window.document;
        resolve(document);
      }))
    }catch(err){
      reject('💥💀💥')
    }
  })
}

function removeStyles(text){
  return text.replace(/<style .*?<\/style>/gims, '');
}



exports.fetch = fetch;
