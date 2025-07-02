import Landing from "@/component/Landing/Landing";
import { handleFetch } from "@/hooks/useRequest";

export default async function Home() {
  const res = await handleFetch("shop/products");
  const products = res?.data?.products || res || [];

  return (
    <div>
      <Landing products={products} />
    </div>
  );
}
