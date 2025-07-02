"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { MdFavoriteBorder, MdStar } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { Cart } from "@/contexts/context";
import { handleAddToCart } from "@/utils/handleCart";

export default function ProductDetails({ productDetails }) {
  const { stateCart, dispatchCart } = useContext(Cart);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const imageArray = Object.values(productDetails.data.image || {});
  const mainImage =
    selectedVariant?.image ||
    imageArray?.[selectedImage]?.url ||
    productDetails?.data?.thumbnail ||
    "";

  const maxQuantity =
    selectedVariant?.total_stock_qty || productDetails.data.total_stock_qty;
  const increaseQty = () => {
    if (quantity < maxQuantity) {
      setQuantity((qty) => qty + 1);
    }
  };
  const decreaseQty = () => setQuantity((qty) => (qty > 1 ? qty - 1 : 1));

  const description =
    productDetails.data.description || "No description available.";

  const onAddToCart = () => {
    handleAddToCart({
      productDetails,
      selectedVariant,
      quantity,
      stateCart,
      dispatchCart,
    });
  };

  return (
    <div className="">
      <div className="my-3 text-sm text-gray-700 max-w-8xl mx-auto px-30">
        Home &gt; Tops &gt; T-Shirts
      </div>

      <div className="flex justify-between gap-5 max-w-8xl mx-auto px-30 bg-white py-5">
        <div className="w-[500px]">
          <div className="w-[500px] h-[480px] flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <Image
              src={mainImage}
              alt="Selected Product Image"
              width={480}
              height={480}
              className="object-contain max-w-full max-h-full"
              priority
            />
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {imageArray.map((img, i) => (
              <Image
                key={i}
                src={img.url}
                alt={i + 1}
                width={60}
                height={60}
                className={`w-[60px] h-[60px] object-contain rounded-md cursor-pointer border ${
                  selectedImage === i
                    ? "border-2 border-[#00A788]"
                    : "border border-gray-300"
                }`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="w-[500px]">
            <h2 className="text-2xl mb-2 text-[#0F172A]">
              {productDetails.data.name}
            </h2>
            <p className="text-[14px] text-gray">
              {productDetails?.data?.merchant?.shop_name}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <span>{productDetails.data.rating_avg || "0"}</span>
                <div className="flex">
                  <MdStar className="text-yellow-500 text-[20px]" />
                  <MdStar className="text-yellow-500 text-[20px]" />
                  <MdStar className="text-yellow-500 text-[20px]" />
                  <MdStar className="text-yellow-500 text-[20px]" />
                  <MdStar className="text-yellow-500 text-[20px]" />
                </div>
                <span className="ml-2 text-gray-600 font-normal">
                  {productDetails.data.rating_count || "0"}
                </span>
                <span>
                  <IoIosArrowDown className="font-bold" />
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MdFavoriteBorder className="text-[30px] text-[#64748B]" />
                <IoShareSocialOutline className="text-[30px] text-[#64748B]" />
              </div>
            </div>

            <div className="mb-3 text-2xl text-green-700 font-bold">
              ৳
              {selectedVariant?.discount_price ||
                productDetails.data.product_detail.discount_price}
              {(selectedVariant
                ? parseFloat(selectedVariant.regular_price) >
                  parseFloat(selectedVariant.discount_price)
                : parseFloat(productDetails.data.product_detail.regular_price) >
                  parseFloat(
                    productDetails.data.product_detail.discount_price
                  )) && (
                <span className="line-through text-gray-400 text-base ml-2">
                  ৳
                  {selectedVariant?.regular_price ||
                    productDetails.data.product_detail.regular_price}
                </span>
              )}
              <span className="text-[12px] ml-5">
                Total Quantity:{" "}
                {selectedVariant?.total_stock_qty ||
                  productDetails.data.total_stock_qty}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <p> Promotion</p>
              <p className="bg-[#e44d2e] text-white px-2 py-0.5 rounded text-xs w-fit">
                Min. spend ৳550
              </p>
            </div>

            {productDetails?.data?.is_variant && (
              <div className="mt-4">
                <p className="font-medium text-gray-700">Available Colors:</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {productDetails?.data?.variations?.map((imgInfo, i) => (
                    <Image
                      key={i}
                      src={imgInfo.image}
                      alt={`Variant ${i + 1}`}
                      width={50}
                      height={50}
                      className={`w-[50px] h-[50px] object-contain rounded-md cursor-pointer border ${
                        selectedVariant?.image === imgInfo.image
                          ? "border-2 border-green-600"
                          : "border border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedVariant(imgInfo);
                        setQuantity(1);
                        setSelectedImage(i);
                      }}
                    />
                  ))}
                </div>

                {selectedVariant?.variation_attributes?.length > 0 && (
                  <div className="my-6">
                    <h4 className="text-base font-semibold text-[#0F172A] mb-3 border-b pb-1 border-gray-200">
                      Selected Configuration
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedVariant.variation_attributes.map((attr, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg shadow-xs"
                        >
                          <span className="text-sm text-gray-600 font-medium">
                            {attr.attribute.name}
                          </span>
                          <span className="text-sm text-gray-800 font-semibold">
                            {attr.attribute_option.attribute_value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6 mt-3">
              <div className="font-semibold mb-1">Quantity</div>
              <div className="flex items-center justify-between border border-gray-200 rounded-full w-fit px-1 py-1">
                <button
                  onClick={decreaseQty}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xl flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                >
                  -
                </button>
                <div className="w-10 text-center text-black text-[14px]">
                  {quantity}
                </div>
                <button
                  onClick={increaseQty}
                  disabled={quantity >= maxQuantity}
                  className={`w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-xl flex items-center justify-center transition cursor-pointer ${
                    quantity >= maxQuantity
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-200"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-green-700 text-white font-bold py-3 rounded cursor-pointer hover:bg-green-800 transition"
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* ---- */}
        <div className="flex flex-col gap-4 text-gray-800 text-sm max-w-md">
          {/* Delivery Options */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Delivery Options</h3>

            <div className="flex items-start gap-3 mb-3">
              <div className="text-green-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5H4a1 1 0 011 1v1h10V6a1 1 0 011-1h.828a1 1 0 01.707 1.707L16.414 8H3.586l-1.121-1.293A1 1 0 013.172 5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Regular</p>
                <p className="text-gray-500">Delivery within 2-3 days</p>
              </div>
            </div>

            <div className="flex items-start gap-3 opacity-50">
              <div className="text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5H4a1 1 0 011 1v1h10V6a1 1 0 011-1h.828a1 1 0 01.707 1.707L16.414 8H3.586l-1.121-1.293A1 1 0 013.172 5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-red-500">
                  Express{" "}
                  <span className="text-xs font-normal text-red-500 ml-1">
                    Not Available
                  </span>
                </p>
                <p className="text-gray-400">Delivery within 24 Hours.</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-4">Sold by</h3>

            <div className="flex items-center gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-base">BD FASHION HOUSE</p>
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 01.894.553l1.382 2.763 3.047.443a1 1 0 01.555 1.706l-2.203 2.147.52 3.029a1 1 0 01-1.451 1.054L10 12.347l-2.744 1.444a1 1 0 01-1.451-1.054l.52-3.029-2.203-2.147a1 1 0 01.555-1.706l3.047-.443 1.382-2.763A1 1 0 0110 2z" />
                  </svg>
                </div>
                <div className="inline-flex items-center px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded mt-1">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09L5.5 12.5 1 8.91l6.061-.909L10 2l2.939 6.001L19 8.91 14.5 12.5l1.378 5.59z" />
                  </svg>
                  Rising Star
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <button className="flex-1 border border-green-500 text-green-600 py-1 rounded font-semibold hover:bg-green-50 transition">
                Chat Now
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-1 rounded font-semibold hover:bg-gray-50 transition">
                View Shop
              </button>
            </div>

            <div className="grid grid-cols-3 text-center text-xs text-gray-600 font-medium">
              <div>
                <p className="text-base text-black font-bold">100%</p>
                <p>Ship on Time</p>
              </div>
              <div>
                <p className="text-base text-black font-bold">90%</p>
                <p>Chat Response</p>
              </div>
              <div>
                <p className="text-base text-black font-bold">99.8%</p>
                <p>Shop Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative my-5 ml-30 w-[80em] bg-white p-10 rounded-[10px]">
        <h3 className="mb-2 text-lg font-semibold">Description</h3>
        <div
          className={`relative transition-all duration-300 overflow-hidden ${
            showFullDescription ? "" : "max-h-32"
          }`}
        >
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {description}
          </p>
          {!showFullDescription && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-black font-semibold border-none bg-transparent cursor-pointer flex items-center gap-1"
          >
            See {showFullDescription ? "Less" : "More"}{" "}
            {showFullDescription ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
      </div>
    </div>
  );
}
