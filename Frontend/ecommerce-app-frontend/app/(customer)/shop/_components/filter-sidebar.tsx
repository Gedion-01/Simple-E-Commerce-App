"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  categories: string[];
  searchTerm: string;
  selectedCategories: string[];
  priceRange: number[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  searchTerm,
  selectedCategories,
  priceRange,
}) => {
  const router = useRouter();

  const handleFilterChange = (
    newSearchTerm: string,
    newSelectedCategories: string[],
    newPriceRange: number[]
  ) => {
    const params = new URLSearchParams({
      search: newSearchTerm,
      categories: newSelectedCategories.join(","),
      minPrice: newPriceRange[0].toString(),
      maxPrice: newPriceRange[1].toString(),
      page: "1",
    });

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full md:w-1/4">
      <Input
        type="search"
        placeholder="Search products..."
        defaultValue={searchTerm}
        onChange={(e) =>
          handleFilterChange(e.target.value, selectedCategories, priceRange)
        }
        className="mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2 mb-2">
          <Checkbox
            id={category}
            defaultChecked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => {
              const newSelectedCategories = checked
                ? [...selectedCategories, category]
                : selectedCategories.filter((c) => c !== category);
              handleFilterChange(searchTerm, newSelectedCategories, priceRange);
            }}
          />
          <Label htmlFor={category}>{category}</Label>
        </div>
      ))}
      <h2 className="text-xl font-semibold mt-6 mb-2">Price Range</h2>
      <Slider
        min={0}
        max={2000}
        step={10}
        defaultValue={priceRange}
        onValueChange={(newPriceRange) =>
          handleFilterChange(searchTerm, selectedCategories, newPriceRange)
        }
        className="mb-2"
      />
      <div className="flex justify-between">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default FilterSidebar;
