import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams]);

    useEffect(() => { 
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${searchParams.toString()}`);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [searchParams, searchTerm, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => {
            const newOrder = (prevOrder === "asc") ?  "desc" : "asc";
            params.set("sortby", newOrder);
            navigate(`${pathname}?${params}`);
            return newOrder;
        })
    };

    const handleClearFilters = () => {
        navigate({ pathname : window.location.pathname });
    };

    return (
        <div className="space-y-6">
            {/* SEARCH */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-3.5 text-slate-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border border-slate-300 text-slate-800 rounded-md py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* CATEGORIES */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Categories</h3>
                <div className="space-y-1">
                    <button 
                        onClick={() => { params.delete('category'); navigate(`${pathname}?${params}`); setCategory('all'); }}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            category === 'all' 
                                ? 'bg-blue-500 text-white font-medium' 
                                : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                        All Products
                    </button>
                    {categories && categories.map((item) => (
                        <button 
                            key={item.categoryId}
                            onClick={() => { params.set('category', item.categoryName); navigate(`${pathname}?${params}`); setCategory(item.categoryName); }}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                category === item.categoryName 
                                    ? 'bg-blue-500 text-white font-medium' 
                                    : 'text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            {item.categoryName}
                        </button>
                    ))}
                </div>
            </div>

            {/* PRICE RANGE */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">Price</h3>
                <div className="space-y-4">
                    <input 
                        type="range" 
                        min="0" 
                        max="5000" 
                        defaultValue="5000"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                        <span>$0</span>
                        <span>$5000+</span>
                    </div>
                </div>
            </div>

            {/* AVAILABILITY */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Stock</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-slate-300 text-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700">In Stock Only</span>
                </label>
            </div>

            {/* ACTIONS */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex gap-2">
                <button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2.5 rounded-md font-medium text-sm transition-colors"
                    onClick={toggleSortOrder}
                >
                    {sortOrder === "asc" ? <FiArrowUp className="inline mr-1" size={16} /> : <FiArrowDown className="inline mr-1" size={16} />}
                    Sort
                </button>
                <button 
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2"
                    onClick={handleClearFilters}
                >
                    <FiRefreshCw size={16} />
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Filter;