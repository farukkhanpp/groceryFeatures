import axiosClient from "./axiosClient";

export async function fetchAllProducts({ limit = 100 } = {}) {
  const { data } = await axiosClient.get("/products", {
    params: { limit, select: "id,title,price,category,thumbnail,stock,rating,description" },
  });

  return (data.products || []).map((product) => ({
    id: product.id,
    title: product.title,
    price: Math.round(product.price * 100) / 100,
    category: product.category,
    thumbnail: product.thumbnail,
    stock: product.stock,
    rating: product.rating,
    description: product.description,
  }));
}
