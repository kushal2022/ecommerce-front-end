// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';

import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

const colors = [
    "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
    "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700",
    "bg-gradient-to-r from-orange-500 via-red-500 to-pink-600"
];

const HeroBanner = () => {
    return (
        <div className='py-2 rounded-md'>
            <Swiper
                grabCursor = {true}
                autoplay = {{
                    delay:4000,
                    disableOnInteraction: false,
                }}
                navigation
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{clickable: true}}
                scrollbar={{ draggable: true}}
                slidesPerView={1}>

                    {bannerLists.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div className={`carousel-item rounded-2xl sm:h-[500px] h-96 ${colors[i]} flex items-center justify-center shadow-2xl`}>
                                <div className='flex items-center justify-center w-full'>
                                    <div className='hidden lg:flex justify-center w-1/2 p-8'>
                                    <div className='text-center'>
                                        <h3 className='text-2xl text-white text-opacity-80 font-semibold tracking-wide'>
                                            {item.title}
                                        </h3>
                                        <h1 className='text-6xl text-white font-black mt-4 drop-shadow-lg'>
                                            {item.subtitle}
                                        </h1>
                                        <p className='text-white text-opacity-90 font-semibold mt-6 text-lg drop-shadow'>
                                            {item.description}
                                        </p>
                                        <Link 
                                            className='mt-8 inline-block bg-white text-slate-900 py-3 px-8 rounded-lg hover:bg-slate-100 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                                            to="/products">
                                        Shop Now →
                                        </Link>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                    <img src={item?.image} className='drop-shadow-2xl transform hover:scale-110 transition-transform duration-500'></img>
                                </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}}
            </Swiper>
        </div>
    );
}


export default HeroBanner;