
const {JSDOM} = require('jsdom')
const fs = require('fs');
const wait = () =>  new Promise(resolve=>{  setTimeout(()=>{resolve()},2000)  })
const {fetch} = require('../fetch.js');
let collectedSongs = []

//goto page by puppeteer
async function parse(url,logic){
  const document = await fetch(url);
  await wait();
  try{
   let results = logic(document);
   return results;
  }catch(err){
    console.log(err)
  }
}



//remove already used song ;
function remove(url){
  let songName = url.slice(52);
  songName = songName.toLowerCase()
  if(collectedSongs.includes(songName)){
    console.log(songName,'0000000')
    return true
  }else{
    collectedSongs.push(songName);
    return false
  }
}


//get each song`s link
const getSong = async (name) =>{
  const logic = (document) =>{
    let songs = [...document.querySelectorAll('.tal.qx a')].map(el=>el.href);
    console.log('page')
    return songs
  }
  console.log(name,'name')
  let url = `https://www.lyrics.com/artist/${name}`
  console.log(url,'in')
  return await parse(url,logic);
}



//collect word from song of lyrics;
const getLyric = async (url) =>{
  if(remove(url))return '';
  const logic = (document) =>{
    let wordArray = document.querySelector('#lyric-body-text').textContent.replace(/\n/g,'').trim().split(' ');
    console.log(wordArray)
    return wordArray;
  }
  console.log(`🎉🎙 ${url.slice(52)}`)
  let lyric = await parse(url,logic);
  console.log(lyric,'lir');
  return lyric;
} 




//getSong()-->getLyric()-->answer[]-->csv-->createRank;
async function start(name){
  let songs = await getSong(name);
  let answer = []
  console.log('hello',songs)
 for await(let s of songs){
  if(answer.filter(e=>e).length > 10000)break;
  console.log(answer.length,'words is collected🚀💥🛸')
  answer.push(...await getLyric(s));
 }
 return answer;
}


exports.start = start;



