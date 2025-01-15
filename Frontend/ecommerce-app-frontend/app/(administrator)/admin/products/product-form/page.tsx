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
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import UploadWidget from "./_components/UploadWidget";
import ImagePreview from "./_components/ImagePreview";
import { Trash, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  category_id: z.number().min(1, "Category ID is required"),
  image_url: z.string().url("Invalid URL").optional(),
  image_urls: z.array(z.string().url("Invalid URL")).optional(),
  is_featured: z.boolean().optional(),
});

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: string;
  category_id: number;
  image_url: string;
  image_urls: string[];
  is_featured: boolean;
}

export default function ProductFormPage() {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: "0",
    quantity: "0",
    category_id: 1,
    image_url: "",
    image_urls: [],
    is_featured: false,
  });

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  console.log(productData);

  const fetchProduct = async (productId: string) => {
    try {
      setIsLoading(true);
      const product = await adminGetProduct(Number(productId));
      console.log(product);
      setProductData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity.toString(),
        category_id: product.category_id,
        image_url: product.image_url,
        image_urls: product.images.map((image: any) => image.image_url),
        is_featured: Boolean(product.is_featured),
      });
    } catch (error) {
      console.error("Error fetching product", error);
      toast.toast({
        title: "Error",
        description: "Failed to fetch product details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductData({ ...productData, [name]: checked });
  };

  const handleSaveProduct = async () => {
    try {
      setIsLoading(true);

      // Validate product data
      productSchema.parse(productData);

      if (id) {
        await updateProduct(productData.id, productData);
        toast.toast({
          title: "Success",
          description: "Product updated successfully.",
        });
      } else {
        await createProduct(productData);
        toast.toast({
          title: "Success",
          description: "Product created successfully.",
        });
      }
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product", error);
      if (error instanceof z.ZodError) {
        toast.toast({
          title: "Validation Error",
          description: error.errors.map((err) => err.message).join(", "),
          variant: "destructive",
        });
      } else {
        toast.toast({
          title: "Error",
          description: "Failed to save product.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainImageUploadSuccess = (result: any) => {
    const newImageUrl = result.info.secure_url;
    setProductData((prevData) => ({
      ...prevData,
      image_url: newImageUrl,
    }));
  };

  const handleAdditionalImagesUploadSuccess = (result: any) => {
    const newImageUrl = result.info.secure_url;
    setProductData((prevData) => ({
      ...prevData,
      image_urls: [...prevData.image_urls, newImageUrl],
    }));
  };

  const handleDeleteMainImage = () => {
    setProductData((prevData) => ({
      ...prevData,
      image_url: "",
    }));
  };

  const handleDeleteAdditionalImage = (index: number) => {
    setProductData((prevData) => ({
      ...prevData,
      image_urls: prevData.image_urls.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Edit Product" : "Add New Product"}
      </h1>
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
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
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="text"
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
                    type="text"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category_id" className="text-right">
                    Category
                  </Label>
                  <Select
                    // Convert number to string for the Select value
                    value={String(productData.category_id)}
                    onValueChange={(value) =>
                      setProductData({
                        ...productData,
                        category_id: Number(value),
                      })
                    }
                  >
                    <SelectTrigger id="category_id" className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Electronics</SelectItem>
                      <SelectItem value="2">Clothing</SelectItem>
                      <SelectItem value="3">Home &amp; Kitchen</SelectItem>
                      <SelectItem value="4">Books</SelectItem>
                      <SelectItem value="5">Sports &amp; Outdoors</SelectItem>
                      <SelectItem value="6">
                        Beauty &amp; Personal Care
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="is_featured" className="text-right">
                    Featured
                  </Label>
                  <Input
                    id="is_featured"
                    name="is_featured"
                    type="checkbox"
                    checked={productData.is_featured}
                    onChange={handleCheckboxChange}
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="images">
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Main Image</h3>
                  <div className="flex flex-col items-start gap-4">
                    <UploadWidget
                      buttonName="Upload Main Image"
                      onUploadSuccess={handleMainImageUploadSuccess}
                    />
                    {productData.image_url && (
                      <ImagePreview
                        src={productData.image_url}
                        alt="Main Product Image"
                        onDelete={handleDeleteMainImage}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Additional Images
                  </h3>
                  <UploadWidget
                    onUploadSuccess={handleAdditionalImagesUploadSuccess}
                    options={{ multiple: true, maxFiles: 5 }}
                  />
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {productData.image_urls.map((url, index) => (
                      <ImagePreview
                        key={index}
                        src={url}
                        alt={`Product Image ${index + 1}`}
                        onDelete={() => handleDeleteAdditionalImage(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <Button type="button" onClick={handleSaveProduct} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {id ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{id ? "Update" : "Create"}</>
          )}
        </Button>
      </div>
    </div>
  );
}
