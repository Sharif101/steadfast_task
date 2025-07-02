"use client";
import Landing from "@/component/Landing/Landing";
import { handleFetch } from "@/hooks/useRequest";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleFetch("shop/products").then((res) => {
      console.log("API response:", res);

      if (res && res.data && res.data.products) {
        setProducts(res.data.products);
      } else if (res) {
        setProducts(res);
      }
    });
  }, []);

  console.log({ products });

  return (
    <div>
      <Landing products={products} />
    </div>
  );
}
