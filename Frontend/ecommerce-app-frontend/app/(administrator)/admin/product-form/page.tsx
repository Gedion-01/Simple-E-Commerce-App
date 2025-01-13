"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  adminGetProduct,
  createProduct,
  updateProduct,
} from "@/lib/admin_handler";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadWidget from "./_components/UploadWidget";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
  image_url: string;
  image_urls: string[];
}

export default function ProductFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [productData, setProductData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category_id: 1,
    image_url: "",
    image_urls: [],
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const product = await adminGetProduct(Number(productId));
      setProductData(product);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSaveProduct = async () => {
    try {
      if (id) {
        await updateProduct(productData.id, productData);
      } else {
        await createProduct(productData);
      }
      router.push("/admin");
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleUploadSuccess = (result: any) => {
    setProductData({
      ...productData,
      image_urls: [...productData.image_urls, result.info.secure_url],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Product" : "Add New Product"}
      </h1>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={productData.quantity}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category_id" className="text-right">
            Category ID
          </Label>
          <Input
            id="category_id"
            name="category_id"
            type="number"
            value={productData.category_id}
            onChange={handleInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Images</Label>
          <div className="col-span-3">
            <UploadWidget onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>
      </div>
      <Button type="button" onClick={handleSaveProduct}>
        {id ? "Update" : "Create"}
      </Button>
    </div>
  );
}
