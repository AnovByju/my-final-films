"use client";
import { useState, useRef } from "react";
import {
  Heart, X, Bookmark, Shuffle, User, Film, Filter,
  Star, MessageCircle, ArrowLeft, Clock,
  ChevronUp, ChevronDown, Trophy
} from "lucide-react";

const MOVIES = [
  { id:1, title:"Inception", year:2010, lb:4.2, genres:["Sci-Fi","Action"], lang:"English",
    dir:"Christopher Nolan", runtime:"2h 28m", bg:"#0e1530",
    desc:"A thief who steals corporate secrets through dream-sharing tech is given the impossible task of planting an idea into a CEO's mind. wow!",
    poster:"https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    comments:[
      {u:"cinema_club",av:"CC",t:"Mind-bending masterpiece. That totem spin lives rent-free in my head.",lk:4231},
      {u:"reel_talk",av:"RT",t:"Every rewatch reveals something new. A true modern classic.",lk:2890},
      {u:"filmbuff22",av:"FB",t:"Hans Zimmer's score elevates every single frame.",lk:1543},
    ]},
  { id:2, title:"Parasite", year:2019, lb:4.5, genres:["Thriller","Drama"], lang:"Korean",
    dir:"Bong Joon-ho", runtime:"2h 12m", bg:"#1a1200",
    desc:"Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Parks and the destitute Kims.",
    poster:"https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    comments:[
      {u:"worldcinema",av:"WC",t:"Changed my view on class and society. The perfect film.",lk:5621},
      {u:"bong_fan",av:"BF",t:"Every scene is intentional. Nothing wasted. Bong is a genius.",lk:3102},
      {u:"subtitle_fan",av:"SF",t:"This film made me stop avoiding subtitles forever.",lk:2341},
    ]},
  { id:3, title:"Her", year:2013, lb:4.1, genres:["Romance","Sci-Fi"], lang:"English",
    dir:"Spike Jonze", runtime:"2h 6m", bg:"#1e0a10",
    desc:"A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    poster:"https://image.tmdb.org/t/p/w500/eCOtqtfvn7mxGaoDMJhpEMcpEFL.jpg",
    comments:[
      {u:"lonely_hearts",av:"LH",t:"Made me cry. Twice. On a Tuesday afternoon.",lk:3421},
      {u:"joaquin_fan",av:"JF",t:"His best performance. Says everything without saying anything.",lk:2110},
      {u:"tech_feels",av:"TF",t:"Terrifyingly relevant in the age of AI.",lk:1876},
    ]},
  { id:4, title:"Whiplash", year:2014, lb:4.3, genres:["Drama","Music"], lang:"English",
    dir:"Damien Chazelle", runtime:"1h 46m", bg:"#1e0800",
    desc:"A promising young drummer enrolls at a cut-throat music conservatory where his instructor will stop at nothing.",
    poster:"https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    comments:[
      {u:"jazz_head",av:"JH",t:"I started sweating during the final performance. Pure cinema.",lk:4102},
      {u:"film_school",av:"FS",t:"J.K. Simmons deserved every award he received.",lk:3210},
      {u:"musicians",av:"MC",t:"Both inspiring and terrifying as a musician.",lk:2001},
    ]},
  { id:5, title:"La La Land", year:2016, lb:4.0, genres:["Romance","Drama","Music"], lang:"English",
    dir:"Damien Chazelle", runtime:"2h 8m", bg:"#120e20",
    desc:"In Los Angeles, a jazz musician and an aspiring actress fall in love while relentlessly pursuing their dreams.",
    poster:"https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Bs0.jpg",
    comments:[
      {u:"dreamers_co",av:"DC",t:"That epilogue sequence is pure heartbreak and pure cinema.",lk:3870},
      {u:"gosling_fan",av:"GF",t:"Devastating in the most beautiful way.",lk:2910},
      {u:"musicals",av:"ML",t:"Makes me want to move to LA. Almost.",lk:1654},
    ]},
  { id:6, title:"Get Out", year:2017, lb:4.0, genres:["Horror","Thriller"], lang:"English",
    dir:"Jordan Peele", runtime:"1h 44m", bg:"#081408",
    desc:"A young man visits his girlfriend's parents and discovers something deeply sinister beneath their welcoming surface.",
    poster:"https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    comments:[
      {u:"horror_buff",av:"HB",t:"The tea cup scene. I was gripping my armrest the entire time.",lk:4521},
      {u:"social_lens",av:"SL",t:"Horror as social commentary done to absolute perfection.",lk:3241},
      {u:"peele_fan",av:"PF",t:"Every detail means something different on a rewatch.",lk:2109},
    ]},
  { id:7, title:"Spirited Away", year:2001, lb:4.6, genres:["Animation","Fantasy"], lang:"Japanese",
    dir:"Hayao Miyazaki", runtime:"2h 5m", bg:"#08161a",
    desc:"A sullen girl wanders into a world ruled by gods, witches, and spirits and must find her way home.",
    poster:"https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    comments:[
      {u:"ghibli_fan",av:"GF",t:"Every frame is a painting. Miyazaki is simply unmatched.",lk:7231},
      {u:"animation_art",av:"AA",t:"The film that made me take animation seriously as high art.",lk:5102},
      {u:"nostalgia99",av:"NT",t:"Watched at 6. Watched at 26. Cried both times.",lk:4320},
    ]},
  { id:8, title:"Interstellar", year:2014, lb:4.3, genres:["Sci-Fi","Drama"], lang:"English",
    dir:"Christopher Nolan", runtime:"2h 49m", bg:"#081020",
    desc:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    comments:[
      {u:"space_nerd",av:"SN",t:"The docking scene + Zimmer's organ. Pure transcendence.",lk:5431},
      {u:"physics_fan",av:"PF",t:"Made me read about black holes for a solid week.",lk:3102},
      {u:"time_is_rel",av:"TR",t:"The bookshelf scene destroys me every single time.",lk:4210},
    ]},
  { id:9, title:"Amélie", year:2001, lb:4.4, genres:["Romance","Comedy"], lang:"French",
    dir:"Jean-Pierre Jeunet", runtime:"2h 2m", bg:"#180e04",
    desc:"An imaginative Parisian woman quietly changes the lives of those around her while neglecting her own happiness.",
    poster:"https://image.tmdb.org/t/p/w500/iY3EjknPSBMm8Eo4Awa7nwfbfhh.jpg",
    comments:[
      {u:"french_film",av:"FF",t:"Makes Paris feel both magical and entirely real at once.",lk:4102},
      {u:"tautou_fan",av:"TF",t:"Audrey Tautou carries every scene with her eyes alone.",lk:3541},
      {u:"world_cinema",av:"WC",t:"Whimsical and profound. What romance should aspire to be.",lk:2310},
    ]},
  { id:10, title:"Knives Out", year:2019, lb:4.1, genres:["Mystery","Thriller"], lang:"English",
    dir:"Rian Johnson", runtime:"2h 10m", bg:"#0e081c",
    desc:"A master detective investigates the death of a renowned crime novelist, unraveling his eccentric family's secrets.",
    poster:"https://image.tmdb.org/t/p/w500/pThyQovXQrws2hmJobTo0rF3WKB.jpg",
    comments:[
      {u:"mystery_fan",av:"MF",t:"The twist you don't see coming because it isn't the twist.",lk:3872},
      {u:"ana_stan",av:"AS",t:"Ana de Armas carries this film on her back. Brilliant.",lk:4102},
      {u:"whodunit",av:"WD",t:"Subverts the genre while loving it deeply. Perfection.",lk:2890},
    ]},
];

const ALL_GENRES=["Action","Animation","Comedy","Drama","Fantasy","Horror","Music","Mystery","Romance","Sci-Fi","Thriller"];
const ALL_LANGS=["English","French","Japanese","Korean","Spanish","Hindi","Italian","German"];
const T={gold:"#f5c518",bg:"#0f0f13",s1:"#1a1a24",tm:"rgba(255,255,255,0.55)",td:"rgba(255,255,255,0.28)",green:"#00c864",red:"#e63232"};
const PH=750,PB=10,HDR=52,NAV=76,CH=750-PB*2-HDR-NAV;

export default function MyFinalFilms() {
  const [tab,setTab]=useState("home");
  const [fi,setFi]=useState(0);
  const [selected,setSelected]=useState([]);
  const [saved,setSaved]=useState([]);
  const [filters,setFilters]=useState({g:[],l:[]});
  const [showF,setShowF]=useState(false);
  const [showC,setShowC]=useState(false);
  const [mode,setMode]=useState("feed");
  const [em,setEm]=useState([]);
  const [ei,setEi]=useState(0);
  const [winner,setWinner]=useState(null);
  const [dragX,setDragX]=useState(0);
  const [dragging,setDragging]=useState(false);
  const [swipeAnim,setSwipeAnim]=useState(null);
  const [pAngle,setPAngle]=useState(0);
  const [pSpin,setPSpin]=useState(false);
  const [pResult,setPResult]=useState(null);
  const [pCool,setPCool]=useState(null);
  const [imgErr,setImgErr]=useState({});
  const feedY=useRef(null);
  const dragStart=useRef(0);

  const movies=(()=>{
    const f=MOVIES.filter(m=>{
      if(filters.g.length&&!m.genres.some(g=>filters.g.includes(g)))return false;
      if(filters.l.length&&!filters.l.includes(m.lang))return false;
      return true;
    });
    return f.length?f:MOVIES;
  })();
  const cfm=movies[Math.min(fi,movies.length-1)];
  const cem=em[ei];
  const isSel=m=>selected.some(x=>x.id===m.id);
  const isSav=m=>saved.some(x=>x.id===m.id);
  const fnav=dir=>setFi(f=>dir===1?Math.min(f+1,movies.length-1):Math.max(f-1,0));
  const pick=m=>{
    if(mode!=='feed')return;
    if(isSel(m)){setSelected(s=>s.filter(x=>x.id!==m.id));return;}
    if(selected.length>=3)return;
    const ns=[...selected,m];setSelected(ns);
    if(ns.length===3)setTimeout(()=>{setEm(ns);setEi(0);setMode("elim");},450);
  };
  const save=m=>setSaved(s=>isSav(m)?s.filter(x=>x.id!==m.id):[...s,m]);
  const doSwipe=dir=>{
    if(swipeAnim)return;
    setSwipeAnim(dir);setDragX(0);
    setTimeout(()=>{
      setSwipeAnim(null);
      const rem=em.filter((_,i)=>i!==ei);
      if(rem.length<=1){setWinner(rem[0]??em[ei]);setMode("winner");}
      else{setEm(rem);setEi(i=>Math.min(i,rem.length-1));}
    },380);
  };
  const ds=e=>{dragStart.current=e.touches?.[0]?.clientX??e.clientX;setDragging(true);};
  const dm=e=>{if(!dragging)return;setDragX((e.touches?.[0]?.clientX??e.clientX)-dragStart.current);};
  const de=e=>{
    const d=(e.changedTouches?.[0]?.clientX??e.clientX)-dragStart.current;
    setDragging(false);setDragX(0);
    if(Math.abs(d)>55)doSwipe(d>0?'R':'L');
  };
  const reset=()=>{setSelected([]);setEm([]);setEi(0);setMode("feed");setWinner(null);};
  const canSpin=!pCool||Date.now()>pCool;
  const cdLeft=pCool?Math.max(0,pCool-Date.now()):0;
  const fmtCd=ms=>{const h=Math.floor(ms/3.6e6),m=Math.floor((ms%3.6e6)/6e4);return`${h}h ${m}m`;};
  const spin=()=>{
    if(!canSpin||pSpin)return;
    setPSpin(true);setPResult(null);
    setPAngle(a=>a+1440+Math.random()*720);
    setTimeout(()=>{setPResult(movies[Math.floor(Math.random()*movies.length)]);setPSpin(false);setPCool(Date.now()+2*60*60*1000);},3000);
  };
  const onErr=id=>setImgErr(e=>({...e,[id]:true}));

  const renderFeed=()=>(
    <div style={{height:CH,overflow:'hidden',position:'relative'}}
      onTouchStart={e=>{feedY.current=e.touches[0].clientY;}}
      onTouchEnd={e=>{const d=e.changedTouches[0].clientY-feedY.current;if(Math.abs(d)>40){d<0?fnav(1):fnav(-1);}}}
    >
      <div style={{transform:`translateY(-${fi*CH}px)`,transition:'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)'}}>
        {movies.map(mv=>{
          const sel=isSel(mv),sv=isSav(mv),err=imgErr[mv.id];
          return(
            <div key={mv.id} style={{height:CH,position:'relative',overflow:'hidden',background:mv.bg}}>
              {!err&&<img src={mv.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} onError={()=>onErr(mv.id)}/>}
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.96)0%,rgba(0,0,0,0.2)55%,transparent 100%)'}}/>
              <div style={{position:'absolute',top:11,left:12,right:66,display:'flex',gap:3}}>
                {movies.map((_,i)=><div key={i} style={{height:2.5,flex:1,borderRadius:2,background:i===fi?T.gold:'rgba(255,255,255,0.28)',transition:'background 0.3s'}}/>)}
              </div>
              <div style={{position:'absolute',top:7,right:11,display:'flex',gap:4}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:24,height:24,borderRadius:12,overflow:'hidden',border:`1.5px solid ${selected[i]?T.gold:'rgba(255,255,255,0.28)'}`,background:selected[i]?'transparent':'rgba(0,0,0,0.3)'}}>
                    {selected[i]&&<img src={selected[i].poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={()=>{}}/>}
                  </div>
                ))}
              </div>
              <div style={{position:'absolute',right:11,bottom:110,display:'flex',flexDirection:'column',gap:15,alignItems:'center'}}>
                <button onClick={()=>pick(mv)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                  <div style={{width:44,height:44,borderRadius:22,background:sel?'rgba(255,90,90,0.22)':'rgba(0,0,0,0.42)',border:`1.5px solid ${sel?'#ff5a5a':'rgba(255,255,255,0.22)'}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Heart size={19} fill={sel?'#ff5a5a':'none'} color={sel?'#ff5a5a':'white'}/>
                  </div>
                  <span style={{fontSize:10,color:sel?'#ff5a5a':'rgba(255,255,255,0.55)',fontWeight:sel?700:400}}>{sel?'Picked':'Pick'}</span>
                </button>
                <button onClick={()=>save(mv)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                  <div style={{width:44,height:44,borderRadius:22,background:sv?'rgba(245,197,24,0.18)':'rgba(0,0,0,0.42)',border:`1.5px solid ${sv?T.gold:'rgba(255,255,255,0.22)'}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Bookmark size={19} fill={sv?T.gold:'none'} color={sv?T.gold:'white'}/>
                  </div>
                  <span style={{fontSize:10,color:sv?T.gold:'rgba(255,255,255,0.55)',fontWeight:sv?700:400}}>{sv?'Saved':'Save'}</span>
                </button>
                <button onClick={()=>setShowC(true)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                  <div style={{width:44,height:44,borderRadius:22,background:'rgba(0,0,0,0.42)',border:'1.5px solid rgba(255,255,255,0.22)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <MessageCircle size={19} color="white"/>
                  </div>
                  <span style={{fontSize:10,color:'rgba(255,255,255,0.55)'}}>{mv.comments.length}</span>
                </button>
              </div>
              <div style={{position:'absolute',right:11,top:'36%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:6}}>
                {fi>0&&<button onClick={()=>fnav(-1)} style={{width:30,height:30,borderRadius:15,background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.16)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ChevronUp size={15} color="white"/></button>}
                {fi<movies.length-1&&<button onClick={()=>fnav(1)} style={{width:30,height:30,borderRadius:15,background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,255,255,0.16)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><ChevronDown size={15} color="white"/></button>}
              </div>
              <div style={{position:'absolute',bottom:9,left:12,right:64}}>
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:6}}>
                  <div style={{display:'flex',alignItems:'center',gap:3,background:'rgba(245,197,24,0.14)',borderRadius:20,padding:'2px 9px',border:`1px solid ${T.gold}`}}>
                    <Star size={10} fill={T.gold} color={T.gold}/><span style={{color:T.gold,fontSize:11,fontWeight:700}}>{mv.lb}</span>
                  </div>
                  <span style={{color:T.tm,fontSize:11}}>{mv.runtime}</span>
                  <span style={{color:T.td}}>·</span>
                  <span style={{color:T.tm,fontSize:11}}>{mv.lang}</span>
                </div>
                <h2 style={{color:'white',margin:'0 0 2px',fontSize:22,fontWeight:900,letterSpacing:'-0.5px',lineHeight:1.1}}>{mv.title}</h2>
                <p style={{color:T.tm,margin:'0 0 5px',fontSize:11}}>{mv.year} · {mv.dir}</p>
                <p style={{color:'rgba(255,255,255,0.7)',fontSize:12,margin:'0 0 6px',lineHeight:1.5,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{mv.desc}</p>
                <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                  {mv.genres.map(g=><span key={g} style={{fontSize:10,padding:'2px 8px',borderRadius:20,background:'rgba(255,255,255,0.09)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.14)'}}>{g}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selected.length===3&&mode==='feed'&&(
        <div onClick={()=>{setEm(selected);setEi(0);setMode('elim');}} style={{position:'absolute',bottom:14,left:12,right:12,background:T.gold,borderRadius:14,padding:'13px 15px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',zIndex:10,boxShadow:'0 4px 24px rgba(245,197,24,0.45)'}}>
          <span style={{fontWeight:900,color:'#1a1000',fontSize:14}}>Start Elimination Round →</span>
          <div style={{display:'flex',gap:3}}>
            {selected.map(mv=><div key={mv.id} style={{width:28,height:28,borderRadius:14,overflow:'hidden',border:'1.5px solid rgba(0,0,0,0.22)'}}><img src={mv.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={()=>{}}/></div>)}
          </div>
        </div>
      )}
    </div>
  );

  const renderElim=()=>{
    if(!cem)return null;
    const tx=swipeAnim==='R'?500:swipeAnim==='L'?-500:dragX;
    const rot=swipeAnim==='R'?14:swipeAnim==='L'?-14:dragX*0.07;
    const showK=dragX>28||swipeAnim==='R';
    const showN=dragX<-28||swipeAnim==='L';
    return(
      <div style={{height:CH,background:'#070710',display:'flex',flexDirection:'column',overflow:'hidden'}}>
        <div style={{padding:'10px 16px',textAlign:'center',flexShrink:0}}>
          <p style={{color:T.tm,fontSize:11,margin:'0 0 8px',letterSpacing:1.5,fontWeight:600}}>ELIMINATION · {em.length} LEFT</p>
          <div style={{display:'flex',justifyContent:'center',gap:7}}>
            {em.map((mv,i)=>(
              <div key={mv.id} style={{width:40,height:58,borderRadius:8,overflow:'hidden',border:`2px solid ${i===ei?T.gold:'rgba(255,255,255,0.1)'}`,opacity:i===ei?1:0.38,transition:'all 0.3s',background:mv.bg}}>
                <img src={mv.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={()=>{}}/>
              </div>
            ))}
          </div>
        </div>
        <div style={{flex:1,position:'relative',padding:'4px 14px 8px',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:'4px 14px 8px',borderRadius:20,overflow:'hidden',background:cem.bg,transform:`translateX(${tx}px) rotate(${rot}deg)`,transition:swipeAnim?'transform 0.38s ease':dragging?'none':'transform 0.08s ease',cursor:'grab',userSelect:'none'}}
            onMouseDown={ds} onMouseMove={dm} onMouseUp={de} onMouseLeave={e=>{if(dragging)de(e);}}
            onTouchStart={ds} onTouchMove={dm} onTouchEnd={de}>
            {!imgErr[cem.id]&&<img src={cem.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',pointerEvents:'none'}} onError={()=>onErr(cem.id)}/>}
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.9)0%,transparent 50%)'}}/>
            {showK&&<div style={{position:'absolute',top:14,left:14,background:'rgba(0,200,80,0.92)',borderRadius:8,padding:'5px 14px',border:'2px solid #00c864',opacity:Math.min(Math.abs(dragX)/80+0.3,1)}}><span style={{color:'white',fontWeight:900,fontSize:17}}>KEEP ✓</span></div>}
            {showN&&<div style={{position:'absolute',top:14,right:14,background:'rgba(220,50,50,0.92)',borderRadius:8,padding:'5px 14px',border:'2px solid #dc3232',opacity:Math.min(Math.abs(dragX)/80+0.3,1)}}><span style={{color:'white',fontWeight:900,fontSize:17}}>NOPE ✗</span></div>}
            <div style={{position:'absolute',bottom:14,left:14,right:14}}>
              <h3 style={{color:'white',margin:'0 0 4px',fontSize:21,fontWeight:900,letterSpacing:'-0.5px'}}>{cem.title}</h3>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <Star size={12} fill={T.gold} color={T.gold}/><span style={{color:T.gold,fontSize:12,fontWeight:700}}>{cem.lb}</span>
                <span style={{color:T.tm,fontSize:12}}>· {cem.year} · {cem.runtime}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:22,padding:'8px 0 12px',flexShrink:0}}>
          <button onClick={()=>doSwipe('L')} style={{width:60,height:60,borderRadius:30,background:'rgba(220,50,50,0.12)',border:'2px solid rgba(220,50,50,0.44)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><X size={27} color={T.red}/></button>
          <button onClick={()=>save(cem)} style={{width:40,height:40,borderRadius:20,background:'rgba(245,197,24,0.1)',border:`1.5px solid ${T.gold}`,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Bookmark size={16} color={T.gold} fill={isSav(cem)?T.gold:'none'}/></button>
          <button onClick={()=>doSwipe('R')} style={{width:60,height:60,borderRadius:30,background:'rgba(0,200,80,0.12)',border:'2px solid rgba(0,200,80,0.44)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Heart size={27} color={T.green}/></button>
        </div>
      </div>
    );
  };

  const renderWinner=()=>!winner?null:(
    <div style={{height:CH,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:22,background:`radial-gradient(ellipse at 50% 30%,rgba(245,197,24,0.07)0%,transparent 65%)`}}>
      <Trophy size={34} color={T.gold} style={{marginBottom:12}}/>
      <p style={{color:T.gold,fontSize:11,letterSpacing:2.5,margin:'0 0 16px',fontWeight:700}}>YOUR FILM TONIGHT</p>
      <div style={{width:155,height:235,borderRadius:14,overflow:'hidden',border:`3px solid ${T.gold}`,boxShadow:`0 8px 40px rgba(245,197,24,0.22)`,marginBottom:16,background:winner.bg}}>
        <img src={winner.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={()=>{}}/>
      </div>
      <h2 style={{color:'white',fontSize:21,fontWeight:900,margin:'0 0 3px',textAlign:'center',letterSpacing:'-0.5px'}}>{winner.title}</h2>
      <p style={{color:T.tm,fontSize:13,margin:'0 0 10px'}}>{winner.year} · {winner.runtime}</p>
      <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:20}}>
        <Star size={13} fill={T.gold} color={T.gold}/><span style={{color:T.gold,fontWeight:700}}>{winner.lb}</span>
        <span style={{color:T.tm,fontSize:13}}>on Letterboxd</span>
      </div>
      <button onClick={reset} style={{background:T.gold,color:'#1a1000',border:'none',borderRadius:26,padding:'12px 28px',fontWeight:900,fontSize:15,cursor:'pointer'}}>Find Another Film</button>
    </div>
  );

  const renderSaved=()=>(
    <div style={{height:CH,overflow:'auto',padding:16}}>
      <h2 style={{color:'white',fontSize:17,fontWeight:900,margin:'0 0 14px'}}>Saved Films</h2>
      {saved.length===0?(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'68%',color:T.tm}}>
          <Bookmark size={40} style={{marginBottom:12,opacity:0.2}} color="white"/>
          <p style={{margin:0,fontSize:15,fontWeight:600}}>Nothing saved yet</p>
          <p style={{margin:'5px 0 0',fontSize:12,opacity:0.7}}>Bookmark films from the feed</p>
        </div>
      ):(
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {saved.map(m=>(
            <div key={m.id} style={{borderRadius:12,overflow:'hidden',position:'relative',border:'1px solid rgba(255,255,255,0.07)',background:m.bg}}>
              <img src={m.poster} alt="" style={{width:'100%',height:126,objectFit:'cover',display:'block'}} onError={()=>{}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.87)0%,transparent 50%)'}}/>
              <div style={{position:'absolute',bottom:7,left:8,right:24}}>
                <p style={{color:'white',fontSize:11,fontWeight:700,margin:0}}>{m.title}</p>
                <div style={{display:'flex',alignItems:'center',gap:3,marginTop:2}}><Star size={9} fill={T.gold} color={T.gold}/><span style={{color:T.gold,fontSize:10}}>{m.lb}</span></div>
              </div>
              <button onClick={()=>save(m)} style={{position:'absolute',top:5,right:5,background:'rgba(0,0,0,0.55)',border:'none',borderRadius:9,width:20,height:20,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><X size={11} color="white"/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderAccount=()=>(
    <div style={{height:CH,overflow:'auto',padding:16}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'18px 0',borderBottom:'1px solid rgba(255,255,255,0.07)',marginBottom:14}}>
        <div style={{width:66,height:66,borderRadius:33,background:`linear-gradient(135deg,${T.gold}0%,#e67e22 100%)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:900,color:'#1a1000',marginBottom:10}}>F</div>
        <h3 style={{color:'white',margin:'0 0 3px',fontSize:16,fontWeight:900}}>Film Fan</h3>
        <p style={{color:T.tm,fontSize:12,margin:0}}>Member since 2024</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:9,marginBottom:16}}>
        {[['Saved',saved.length],['Winners',winner?1:0],['Sessions',1]].map(([l,v])=>(
          <div key={l} style={{background:T.s1,borderRadius:11,padding:'11px 6px',textAlign:'center',border:'1px solid rgba(255,255,255,0.06)'}}>
            <p style={{color:'white',fontSize:19,fontWeight:900,margin:'0 0 2px'}}>{v}</p>
            <p style={{color:T.tm,fontSize:11,margin:0}}>{l}</p>
          </div>
        ))}
      </div>
      {['Viewing Preferences','Watch History','Letterboxd Connect','Notifications','Privacy Settings'].map(item=>(
        <div key={item} style={{padding:'13px 14px',background:T.s1,borderRadius:10,marginBottom:5,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',border:'1px solid rgba(255,255,255,0.05)'}}>
          <span style={{color:'white',fontSize:13}}>{item}</span>
          <span style={{color:T.td,fontSize:15}}>›</span>
        </div>
      ))}
    </div>
  );

  const renderPicker=()=>{
    const segs=movies.slice(0,Math.min(8,movies.length));
    const sc=['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63'];
    return(
      <div style={{height:CH,overflow:'auto',display:'flex',flexDirection:'column',alignItems:'center',padding:'14px 18px'}}>
        <h2 style={{color:'white',fontSize:16,fontWeight:900,margin:'0 0 3px'}}>Random Picker</h2>
        <p style={{color:T.tm,fontSize:12,margin:'0 0 16px',textAlign:'center'}}>Let fate choose your film tonight</p>
        <div style={{position:'relative',width:210,height:210,marginBottom:16,flexShrink:0}}>
          <div style={{position:'absolute',top:-9,left:'50%',transform:'translateX(-50%)',zIndex:5,width:0,height:0,borderLeft:'8px solid transparent',borderRight:'8px solid transparent',borderTop:'16px solid white'}}/>
          <svg width="210" height="210" viewBox="0 0 210 210" style={{transform:`rotate(${pAngle}deg)`,transition:pSpin?'transform 3s cubic-bezier(0.17,0.67,0.12,1)':'none',borderRadius:'50%',display:'block',overflow:'hidden'}}>
            {segs.map((mv,i)=>{
              const a=2*Math.PI/segs.length,sa=i*a-Math.PI/2,ea=sa+a;
              const x1=105+100*Math.cos(sa),y1=105+100*Math.sin(sa);
              const x2=105+100*Math.cos(ea),y2=105+100*Math.sin(ea);
              const ma=sa+a/2,tx=105+66*Math.cos(ma),ty=105+66*Math.sin(ma);
              return(
                <g key={mv.id}>
                  <path d={`M 105 105 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`} fill={sc[i%sc.length]} stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
                  <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8" fontWeight="bold" transform={`rotate(${(ma+Math.PI/2)*180/Math.PI},${tx},${ty})`}>{mv.title.length>7?mv.title.slice(0,6)+'…':mv.title}</text>
                </g>
              );
            })}
            <circle cx="105" cy="105" r="17" fill="#0f0f13" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
          </svg>
        </div>
        {canSpin?(
          <button onClick={spin} disabled={pSpin} style={{background:pSpin?'rgba(245,197,24,0.15)':T.gold,color:pSpin?T.gold:'#1a1000',border:`1.5px solid ${T.gold}`,borderRadius:26,padding:'12px 44px',fontWeight:900,fontSize:15,cursor:pSpin?'not-allowed':'pointer',transition:'all 0.3s',marginBottom:14}}>
            {pSpin?'Spinning…':'SPIN'}
          </button>
        ):(
          <div style={{display:'flex',alignItems:'center',gap:7,background:T.s1,borderRadius:12,padding:'10px 16px',border:'1px solid rgba(255,255,255,0.08)',marginBottom:14}}>
            <Clock size={14} color={T.tm}/><span style={{color:T.tm,fontSize:12}}>{fmtCd(cdLeft)} remaining</span>
          </div>
        )}
        {pResult&&(
          <div style={{width:'100%',background:T.s1,borderRadius:14,overflow:'hidden',border:`1.5px solid ${T.gold}`,display:'flex'}}>
            <div style={{width:58,flexShrink:0,background:pResult.bg}}>
              <img src={pResult.poster} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} onError={()=>{}}/>
            </div>
            <div style={{padding:'11px 13px'}}>
              <p style={{color:T.td,fontSize:10,margin:'0 0 3px',letterSpacing:1.5,fontWeight:700}}>TONIGHT'S FILM</p>
              <h4 style={{color:'white',margin:'0 0 4px',fontSize:14,fontWeight:900}}>{pResult.title}</h4>
              <div style={{display:'flex',alignItems:'center',gap:4}}><Star size={10} fill={T.gold} color={T.gold}/><span style={{color:T.gold,fontSize:11,fontWeight:700}}>{pResult.lb}</span><span style={{color:T.tm,fontSize:11}}>· {pResult.year}</span></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFilters=()=>(
    <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.66)',zIndex:60,display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={()=>setShowF(false)}>
      <div style={{background:'#14141e',borderRadius:'22px 22px 0 0',padding:'14px 16px',maxHeight:'66%',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
        <div style={{width:34,height:3,borderRadius:2,background:'rgba(255,255,255,0.18)',margin:'0 auto 12px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <h3 style={{color:'white',margin:0,fontSize:15,fontWeight:900}}>Filters</h3>
          <button onClick={()=>{setFilters({g:[],l:[]});setFi(0);}} style={{background:'none',border:'none',color:T.gold,fontSize:13,cursor:'pointer',fontWeight:600}}>Clear all</button>
        </div>
        <p style={{color:T.tm,fontSize:11,letterSpacing:1.5,margin:'0 0 8px',fontWeight:600}}>GENRE</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:15}}>
          {ALL_GENRES.map(g=>{const a=filters.g.includes(g);return<button key={g} onClick={()=>{setFilters(f=>({...f,g:a?f.g.filter(x=>x!==g):[...f.g,g]}));setFi(0);}} style={{padding:'5px 12px',borderRadius:20,background:a?T.gold:'rgba(255,255,255,0.08)',color:a?'#1a1000':'white',border:'none',cursor:'pointer',fontSize:12,fontWeight:a?700:400}}>{g}</button>;})}
        </div>
        <p style={{color:T.tm,fontSize:11,letterSpacing:1.5,margin:'0 0 8px',fontWeight:600}}>LANGUAGE</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:16}}>
          {ALL_LANGS.map(l=>{const a=filters.l.includes(l);return<button key={l} onClick={()=>{setFilters(f=>({...f,l:a?f.l.filter(x=>x!==l):[...f.l,l]}));setFi(0);}} style={{padding:'5px 12px',borderRadius:20,background:a?T.gold:'rgba(255,255,255,0.08)',color:a?'#1a1000':'white',border:'none',cursor:'pointer',fontSize:12,fontWeight:a?700:400}}>{l}</button>;})}
        </div>
        <button onClick={()=>setShowF(false)} style={{width:'100%',padding:'13px',background:T.gold,color:'#1a1000',border:'none',borderRadius:14,fontWeight:900,fontSize:15,cursor:'pointer'}}>
          {filters.g.length+filters.l.length>0?`Apply (${filters.g.length+filters.l.length} active)`:'Apply Filters'}
        </button>
      </div>
    </div>
  );

  const renderComments=()=>{
    const mv=mode==='elim'?cem:cfm;
    if(!mv)return null;
    return(
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.66)',zIndex:60,display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={()=>setShowC(false)}>
        <div style={{background:'#14141e',borderRadius:'22px 22px 0 0',maxHeight:'70%',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.07)',position:'sticky',top:0,background:'#14141e',zIndex:5}}>
            <div style={{width:34,height:3,borderRadius:2,background:'rgba(255,255,255,0.18)',margin:'0 auto 11px'}}/>
            <h3 style={{color:'white',margin:0,fontSize:14,fontWeight:900,textAlign:'center'}}>Letterboxd Reviews</h3>
            <p style={{color:T.tm,fontSize:12,textAlign:'center',margin:'3px 0 0'}}>{mv.title} · ★{mv.lb}</p>
          </div>
          {mv.comments.map((c,i)=>(
            <div key={i} style={{padding:'12px 15px',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
              <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:6}}>
                <div style={{width:30,height:30,borderRadius:15,background:`hsl(${(i*97+180)%360},48%,42%)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'white',flexShrink:0}}>{c.av}</div>
                <p style={{color:'white',fontSize:12,fontWeight:600,margin:0,flex:1}}>@{c.u}</p>
                <div style={{display:'flex',alignItems:'center',gap:3}}><Heart size={11} color={T.tm}/><span style={{color:T.tm,fontSize:11}}>{(c.lk/1000).toFixed(1)}k</span></div>
              </div>
              <p style={{color:'rgba(255,255,255,0.82)',fontSize:13,margin:0,lineHeight:1.55}}>{c.t}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHeader=()=>(
    <div style={{height:HDR,background:'rgba(9,9,14,0.98)',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',padding:'0 14px',justifyContent:'space-between',position:'relative',zIndex:30}}>
      {mode==='elim'||mode==='winner'?(
        <button onClick={reset} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:4,color:T.gold,padding:0}}>
          <ArrowLeft size={16}/><span style={{fontSize:13,fontWeight:600}}>Back</span>
        </button>
      ):<div style={{width:48}}/>}
      <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)'}}>
        <span style={{fontWeight:900,fontSize:17,letterSpacing:'-0.3px',color:'white'}}>my<span style={{color:T.gold}}>Final</span>Films</span>
      </div>
      {mode==='feed'&&tab==='home'?(
        <button onClick={()=>setShowF(true)} style={{width:33,height:33,borderRadius:17,background:filters.g.length+filters.l.length>0?'rgba(245,197,24,0.13)':'rgba(255,255,255,0.06)',border:`1px solid ${filters.g.length+filters.l.length>0?T.gold:'rgba(255,255,255,0.1)'}`,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
          <Filter size={14} color={filters.g.length+filters.l.length>0?T.gold:'rgba(255,255,255,0.58)'}/>
        </button>
      ):<div style={{width:33}}/>}
    </div>
  );

  const renderNav=()=>{
    const tabs=[{id:'home',Icon:Film,label:'For You'},{id:'saved',Icon:Bookmark,label:'Saved'},{id:'picker',Icon:Shuffle,label:'Random'},{id:'account',Icon:User,label:'Account'}];
    return(
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:NAV,background:'rgba(8,8,12,0.97)',borderTop:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',zIndex:40}}>
        {tabs.map(({id,Icon,label})=>{
          const act=tab===id&&mode==='feed';
          return(
            <button key={id} onClick={()=>{if(mode!=='elim'&&mode!=='winner')setTab(id);}} style={{flex:1,background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'10px 0 18px'}}>
              <Icon size={20} color={act?T.gold:'rgba(255,255,255,0.33)'} fill={act&&id==='saved'?T.gold:'none'}/>
              <span style={{fontSize:10,color:act?T.gold:'rgba(255,255,255,0.33)',fontWeight:act?700:400}}>{label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderContent=()=>{
    if(mode==='elim')return renderElim();
    if(mode==='winner')return renderWinner();
    if(tab==='saved')return renderSaved();
    if(tab==='account')return renderAccount();
    if(tab==='picker')return renderPicker();
    return renderFeed();
  };

  return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',padding:'16px 0',background:'#0a0a0f'}}>
      <style>{`::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.12);border-radius:2px}button{-webkit-tap-highlight-color:transparent;outline:none}`}</style>
      <div style={{width:390,height:PH,background:T.bg,borderRadius:44,overflow:'hidden',position:'relative',border:`${PB}px solid #1c1c28`,boxShadow:'0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04)'}}>
        {renderHeader()}
        {renderContent()}
        {renderNav()}
        {showF&&renderFilters()}
        {showC&&renderComments()}
      </div>
    </div>
  );
}
