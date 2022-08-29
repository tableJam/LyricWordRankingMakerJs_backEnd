
const {JSDOM} = require('jsdom')
const puppeteer = require('puppeteer');
const browser = puppeteer.launch();
const fs = require('fs');
let artistName = process.argv[2];
let url = `https://www.lyrics.com/artist/${artistName}`

const wait = () =>  new Promise(resolve=>{  setTimeout(()=>{resolve()},2000)  })

let collectedSongs = []

//goto page by puppeteer
async function parse(url,logic){
  let tab = await (await browser).newPage();
  await tab.setDefaultNavigationTimeout(0); 
  let res = await tab.goto(url);
  await wait();
  const html = await res.text();
  const jsdom = new JSDOM(html, { url: res.url() });
  const document = jsdom.window.document;
  try{
   let results = logic(document);
   return results;
  }catch(err){
    console.log(err)
  }
}

//remove song already used;
function remove(url){
  let songName = url.slice(52);
  songName = songName.toLowerCase()
  if(collectedSongs.includes(songName)){
    return true
  }else{
    collectedSongs.push(songName);
    return false
  }
}

//get each song`s link
const getSong = async () =>{
  const logic = (document) =>{
    let songs = [...document.querySelectorAll('.tal.qx a')].map(el=>el.href);
    return songs
  }
  return await parse(url,logic);
}

//collect word from song of lyrics;
const getLyric = async (url) =>{
  if(remove(url))return '';
  const logic = (document) =>{
    let wordArray = document.querySelector('#lyric-body-text').textContent.replaceAll('\n','').trim().split(' ');
    return wordArray;
  }
  console.log(`🎉🎙 ${url.slice(52)}`)
  let lyric = await parse(url,logic);
  console.log(lyric);
  return lyric;
} 


//getSong()-->getLyric()-->answer[]-->csv-->createRank;
async function start(){
  let songs = await getSong();
  let answer = []
  
 for await(let song_link of songs){
  if(answer.filter(e=>e).length > 10000)break;
  answer.push(...await getLyric(song_link));
 }
 fs.writeFileSync('lyrics.txt',JSON.stringify(answer),'utf-8');
 console.log('done');
}




  start();



