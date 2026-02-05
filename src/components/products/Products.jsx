import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";
import { FiGrid, FiList } from "react-icons/fi";

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const {products, categories, pagination} = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();
    useProductFilter();

    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* HEADER */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                <div className="lg:px-14 sm:px-8 px-4 py-6 2xl:w-[90%] 2xl:mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 mb-1">All Products</h1>
                    <p className="text-sm text-slate-500">{pagination?.totalElements || 0} products available</p>
                </div>
            </div>

            {/* MAIN */}
            <div className="lg:px-14 sm:px-8 px-4 py-8 2xl:w-[90%] 2xl:mx-auto">
                <div className="lg:flex lg:gap-8">
                    {/* SIDEBAR */}
                    <aside className="lg:w-64 w-full mb-8 lg:mb-0">
                        <div className="lg:sticky lg:top-28">
                            <Filter categories={categories ? categories : []} />
                        </div>
                    </aside>

                    {/* PRODUCTS */}
                    <main className="flex-1">
                        {/* TOOLBAR */}
                        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6 flex justify-between items-center shadow-sm mb-6">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-slate-700">Sort:</label>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-slate-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-lg p-1 bg-slate-50">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-blue-500 text-white" : "text-slate-600 hover:text-slate-800"}`}
                                    title="Grid view"
                                >
                                    <FiGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-blue-500 text-white" : "text-slate-600 hover:text-slate-800"}`}
                                    title="List view"
                                >
                                    <FiList size={20} />
                                </button>
                            </div>
                        </div>

                        {/* CONTENT */}
                        {isLoading ? (
                            <div className="flex justify-center items-center h-96">
                                <Loader />
                            </div>
                        ) : errorMessage ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-8 flex justify-center items-center h-96">
                                <div className="text-center">
                                    <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-3"/>
                                    <p className="text-red-700 font-semibold">{errorMessage}</p>
                                </div>
                            </div>
                        ) : products && products.length > 0 ? (
                            <div>
                                {viewMode === "grid" ? (
                                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
                                        {products.map((item, i) => (
                                            <ProductCard key={i} {...item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4 mb-8">
                                        {products.map((item, i) => (
                                            <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                                                <ProductCard {...item} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-center pt-8">
                                    <Paginations 
                                        numberOfPage={pagination?.totalPages}
                                        totalProducts={pagination?.totalElements}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-50 rounded-lg p-12 text-center border border-slate-200">
                                <p className="text-slate-500 text-lg">No products found. Try adjusting your filters.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Products;