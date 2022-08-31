const fs = require('fs');
let data = fs.readFileSync('lyrics.csv','utf-8').replaceAll('"','').replace('[','').replace(']').split(',');
let TOP10 = [];
let top10 = []
data.filter(e=>e).forEach((word,i) => {
  if(top10.includes(word)){
    let index = top10.indexOf(word);
    TOP10[index].count += 1;
  }else{
    top10.push(word);
    TOP10.push({word,count:1});
  }
});

TOP10 = TOP10.sort((a,b)=>a.count-b.count);

let font_size = 230;
TOP10 = TOP10.map(el=>{
  el =  {...el,font_size};
  font_size -= 20;
  return el;
})



TOP10.forEach((el,i,array)=>{
  console.log(`************** 🎉🎉🎉 NO.${array.length - i}***************`);
  console.log('             ')
  console.log(`🎊   ${el.word}`)
  console.log('             ')
  console.log(`🎙  ${el.count} times `)
  console.log('             ')


})
