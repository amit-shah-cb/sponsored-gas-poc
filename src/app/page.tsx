"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Capabilities } from "@/components/Capabilities";
import { Transact } from "@/components/Transact";
import { SignMessage } from "@/components/SignMessage";
import { TypedSign } from "@/components/TypedSign";
import { Permit2 } from "@/components/Permit2";
import { TransactWithPaymaster } from "@/components/TransactWithPaymaster";
import { ConnectAndSIWE } from "@/components/ConnectAndSIWE";
import { ApproveZeroEx } from "@/components/ApproveZeroEx";
import TinderCard from 'react-tinder-card'
import { useEffect, useRef, useState } from "react";
import VideoCard from "@/components/Video/VideoCard";

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  },
  {
    name: 'Monica Hall',
    url: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  },
  {
    name: 'Jared Dunn',
    url: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'
  }
]

const videoUrls = [
  {
    url: '/videos/video1.mp4',
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: '/videos/video2.mp4',
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: '/videos/video3.mp4',
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: './videos/video4.mp4',
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

const abi = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "to", type: "address" }],
    name: "safeMint",
    outputs: [],
  },
] as const;

function App() {
  const [tokens, setTokens] = useState([])
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [lastDirection, setLastDirection] = useState()

  const [videos, setVideos] = useState([] as any[]);
  const videoRefs = useRef([]);

  
  const onSwipe = (direction:any) => {
    console.log('You swiped: ' + direction)
    setLastDirection(direction)
  }
  
  const onCardLeftScreen = (myIdentifier:any) => {
    console.log(myIdentifier + ' left the screen')
  }

  const fetchTokens = async ()=> {
    const response = await fetch("/api/swap/trending");
    const data = await response.json();
    setTokens(data);
  }

  useEffect(() => {
    if(tokens.length === 0){
      console.log(fetchTokens)
      fetchTokens();
    }   
  },[tokens])


  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries:any) => {
      entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index:any) => (ref:any) => {
    (videoRefs.current as any[])[index]  = ref;
  };


  return (
    <>
      <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          <Capabilities />
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
      
     

      <div>
        <h2>Connect</h2>
        <>
          {connectors.map((connector) => (
            <button
              id={connector.id}
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
          <ConnectAndSIWE />
        </>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      {account.address && (
        <div>         
          <ApproveZeroEx />
          <TransactWithPaymaster />         
        </div>
      )}
      
      <div>
            <h1>React Tinder Card</h1>
            <div className='cardContainer'>
              {tokens && tokens.reverse().map((token:any,idx:number) =>
                <TinderCard className='swipe' key={token.uuid+'-'+idx} onSwipe={(dir) => onSwipe(dir)} onCardLeftScreen={() => onCardLeftScreen(token.uuid)}>
                  <div style={{ backgroundImage: 'url(' + token.imageURL + ')' }} className='card'>
                    <h3>{token.name}</h3>                  
                  </div>
                </TinderCard>
              )}
            </div>
            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
          </div>

    <div className="app">
      <div className="container">
        {/* <TopNavbar className="top-navbar" /> */}
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
        {/* <BottomNavbar className="bottom-navbar" /> */}
      </div>
    </div>
    </>
  );
}

export default App;
