import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        // Main Container: Screen height ni 80% chesam (h-[80vh])
        <div className='relative w-full h-[80vh] flex items-center justify-center overflow-hidden'>
            
            {/* 1. Background Video Integration */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className='absolute top-0 left-0 w-full h-full object-cover z-0'
            >
                <source src="https://res.cloudinary.com/dxmeu3yib/video/upload/v1738920194/178565-860270644_medium_1_lt10zd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 2. Dark Overlay: Video paina text clear ga kanipinchadaniki */}
            <div className='absolute top-0 left-0 w-full h-full bg-black/55 z-10'></div>

            {/* 3. Content Section: Video paina kanipisthundi (z-20) */}
            <div className='relative z-20 text-center text-white px-4 max-w-4xl mx-auto'>
                <div className='flex flex-col gap-6'>
                    <span className='mx-auto px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[#FF4D4D] font-bold border border-white/20'>
                        No. 1 Job Hunt Website
                    </span>
                    
                    <h1 className='text-5xl md:text-6xl font-bold leading-tight'>
                        Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                    </h1>
                    
                    <p className='text-gray-200 text-lg md:text-xl font-light'>
                        Connecting tech talents with top companies like Google, Microsoft & Startups.
                    </p>

                    {/* Search Bar: Background white ga unchi emphasis icham */}
                    <div className='flex w-full md:w-[70%] shadow-2xl border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto bg-white p-1'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full text-black px-2'
                        />
                        <Button onClick={searchJobHandler} className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] p-4 h-12 w-12 flex items-center justify-center">
                            <Search className='h-5 w-5 text-white' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection