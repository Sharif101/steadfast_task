"use client";
import Landing from "@/component/Landing/Landing";
import { handleFetch } from "@/hooks/useRequest";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    handleFetch("shop/products").then((res) => {
      if (res) setProducts(res);
    });
  }, []);

  return (
    <div>
      <Landing products={products || []} />
    </div>
  );
}
