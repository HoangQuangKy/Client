import React from 'react'
import play from '../../../public/play.png'
import info from '../../../public/info.png'
import replay from '../../../public/replayVideo.png'
import { useSelector } from 'react-redux'
import trailer from '../../../public/trailer.mp4'
import Video from './Video'
import { useState } from 'react'
import { Button, Modal } from 'antd';


function FilmHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const films = useSelector((state) => state.films.films);
    const randomFilm = useSelector((state) => state.films.randomFilm);
    console.log(randomFilm);

    return (
        <div className='w-full'>
            {randomFilm && (
                <div className='w-full relative'>
                    <div className='w-full h-[760px] relative'>
                        <Video
                            imgSrc={randomFilm.img}
                            videoSrc={trailer}
                        ></Video>

                    </div>
                    <p className=' absolute top-[400px] left-10 text-6xl font-semibold w-[486px] z-10'>{randomFilm.filmName}</p>
                    <div className='absolute top-[600px] left-10 w-[1880px] flex flex-row justify-between items-center z-10'>
                        <div className='flex flex-row'>
                            <button className='bg-white px-6 text-black font-semibold text-md rounded-md py-2 mr-3 flex flex-row justify-around items-center'>
                                <img src={play} alt="" width={25} height={25} className='mr-3' />
                                Play
                            </button>
                            <button onClick={showModal} className='bg-slate-400 px-5 text-white font-semibold text-md rounded-md py-2 mr-3 flex flex-row justify-around bg-opacity-50 items-center'>
                                <img src={info} alt="" width={25} height={25} className='mr-3' />
                                More info
                            </button>
                            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='h-full'>
                                <img
                                    src={randomFilm.img}
                                ></img>
                                <p className=' absolute top-[200px] left-10 text-3xl font-semibold w-[486px] z-10'>{randomFilm.filmName}</p>
                                <button className='bg-white absolute top-[250px] px-4 mx-2 text-black font-semibold text-md rounded-md py-1 mr-3 flex flex-row justify-around items-center'>
                                    <img src={play} alt="" width={25} height={25} className='mr-3' />
                                    Play
                                </button>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col w-[250px]'>
                                        <div className='flex text-center items-center mt-2'>
                                            <p className='text-sm px-2 border bg-opacity-30 border-solid mr-2'>{randomFilm.acceptAge}+</p>
                                            <button className=''>
                                                {randomFilm.genres.join(',')}
                                            </button>
                                        </div>
                                        <p className='text-sm mt-3'> {randomFilm.decs.length > 100 ? `${randomFilm.decs.slice(0, 100)}...` : randomFilm.decs}</p>
                                        <p>Episodes: {randomFilm.episodes}</p>
                                    </div>
                                    <div className='flex flex-col text-center items-center mt-2'>
                                        <p className=''>Cast: {randomFilm.actors.join(', ')}</p>
                                        <p className=''>
                                            Category: {randomFilm.category.join(',')}
                                        </p>
                                    </div>
                                </div>

                            </Modal>
                        </div>
                        <div className='flex flex-row items-center'>
                            <button className='mr-4'>
                                <img src={replay} alt="" width={50} height={50} className='' />
                            </button>
                            <p className='text-2xl pl-3 pr-12 border-white border-l-2 bg-opacity-30 py-1 bg-slate-700'>{randomFilm.acceptAge}+</p>

                        </div>
                    </div>

                </div >
            )
            }
        </div >
    )
}

export default FilmHeader
