import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
import truncateText from "../../utils/truncateText";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        about = false,
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader = false;
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();

    const handleProductView = (product) => {
        if (!about) {
            setSelectedViewProduct(product);
            setOpenProductViewModal(true);
        }
    };

    const addToCartHandler = (cartItems) => {
        dispatch(addToCart(cartItems, 1, toast));
    };

    return (
        <div className="group bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
            {/* IMAGE */}
            <div className="relative w-full overflow-hidden bg-slate-100 aspect-square">
                <img 
                    className="w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    onClick={() => {
                        handleProductView({
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                    }}
                    src={image}
                    alt={productName}
                />
                {discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{Math.round(discount)}%
                    </div>
                )}
                {!isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-4">
                <h2 
                    onClick={() => {
                        handleProductView({
                            id: productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                    }}
                    className="text-sm font-semibold mb-1 cursor-pointer text-slate-900 hover:text-blue-600 line-clamp-2 transition-colors"
                >
                    {truncateText(productName, 50)}
                </h2>
                
                <div className="mb-3 h-8">
                    <p className="text-slate-600 text-xs line-clamp-2">
                        {truncateText(description, 80)}
                    </p>
                </div>

                {!about && (
                    <div>
                        {/* PRICE */}
                        <div className="mb-3">
                            {specialPrice ? (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-slate-900">
                                        ${Number(specialPrice).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-slate-400 line-through">
                                        ${Number(price).toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-slate-900">
                                    ${Number(price).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={!isAvailable || btnLoader}
                            onClick={() => addToCartHandler({
                                image,
                                productName,
                                description,
                                specialPrice,
                                price,
                                productId,
                                quantity,
                            })}
                            className={`w-full py-2 px-3 rounded-lg font-medium text-sm flex justify-center items-center gap-2 transition-all ${
                                isAvailable 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg' 
                                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            <FaShoppingCart size={14} />
                            {isAvailable ? "Add" : "Out"}
                        </button>
                    </div>
                )}
            </div>

            <ProductViewModal 
                open={openProductViewModal}
                setOpen={setOpenProductViewModal}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;