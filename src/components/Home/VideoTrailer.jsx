import React from 'react'
import { useEffect, useRef, useState } from 'react'

function VideoTrailer({ videoSrc, imgSrc }) {
    const [playing, setPlaying] = useState(true);

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
            <img src={imgSrc} alt=""
                width={'250px'} {playing ? ''}
                height={'250px'}
                className=' object-fill max-h-[140px] rounded-md'
            />

        </div>
    )
}

export default VideoTrailer
