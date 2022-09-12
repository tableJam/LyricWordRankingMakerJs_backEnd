function createRank(data){
  let TOP10 = [];
  let top10 = []
  data.filter(e=>e).filter(e=>e.length>=3).forEach((word,i) => {
    if(top10.includes(word)){
      let index = top10.indexOf(word);
      TOP10[index].count += 1;
    }else{
      top10.push(word);
      TOP10.push({word,count:1});
    }
  });

  TOP10 = TOP10.sort((a,b)=>a.count-b.count);

  let size = 230;
  TOP10 = TOP10.map(el=>{
    size -= 20;
    el =  {...el,size};
    return el;
  })
  return TOP10;
}

exports.createRank = createRank;
