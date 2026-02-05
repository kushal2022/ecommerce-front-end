import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "./HeroBanner";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import ProductCard from "../shared/ProductCard";
import Loader from "../shared/Loader";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="lg:px-14 sm:px-8 px-4 py-8">
                <div className="py-6">
                    <HeroBanner />
                </div>
                
                <div className="py-12">
                    <div className="flex flex-col justify-center items-center space-y-4 mb-12">
                        <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full px-4 py-1">
                            <span className="text-white text-sm font-semibold uppercase tracking-wider">Featured Collection</span>
                        </div>
                        <h1 className="text-slate-900 text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Featured Products</h1>
                        <p className="text-slate-600 text-lg text-center max-w-2xl">
                            Discover our handpicked selection of top-rated items curated just for you!
                        </p>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : errorMessage ? (
                        <div className="flex justify-center items-center h-[200px]">
                            <div className="bg-red-100 border border-red-400 rounded-lg p-6 flex justify-center items-center">
                                <FaExclamationTriangle className="text-red-600 text-3xl mr-3"/>
                                <span className="text-red-700 text-lg font-medium">
                                    {errorMessage}
                                </span>
                            </div>
                        </div>
                    ) : (
                <div className="pb-6 pt-8 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
                           {products && 
                           products?.slice(0,4)
                                    .map((item, i) => <ProductCard key={i} {...item} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;