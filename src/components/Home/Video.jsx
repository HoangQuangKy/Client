import React, { useEffect, useRef, useState } from 'react'

function Video({ videoSrc, imgSrc }) {
    // const videoRef = useRef(null);
    const [playing, setPlaying] = useState(true);

    // useEffect(() => {
    //     if (playing) {
    //         videoRef.current.play();
    //     } else {
    //         videoRef.current.pause();
    //     }
    // }, [playing])
    const handleVideoEnd = () => {
        setPlaying(false)
    }
    return (
        <div>
            <video
                // ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className='w-full h-full object-fill absolute'
            ></video>
            <img src={imgSrc}
                alt=""
                className={`w-full h-full object-fill absolute ${playing ? 'hidden' : 'block'}`} />
        </div>
    )
}

export default Video
