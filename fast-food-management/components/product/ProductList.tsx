"use client";
import React, { useState } from "react";
import SearchBar from "../shared/orther/SearchBar";
import AddPageButton from "../shared/button/AddPageButton";
import FilterButton from "../shared/button/FilterButton";
import { ProductData as initialData } from "@/constants/data";
import ProductFrame from "../shared/orther/ProductFrame";
import DetailProduct from "./DetailProduct";
import EditProduct from "./EditProdut";
import AddProduct from "./AddProduct";

interface GradientProps {
  name: string;
  quantity: number;
  unit: string;
}

interface ProductProps {
  id: string;
  image: string;
  productName: string;
  price: number;
  ingredients: GradientProps[];
  createAt: Date;
}

const ProductList = () => {
  const filterStatus = ["Name", "Id"];
  const [isDetailOverlayOpen, setIsDetailOverlayOpen] = useState(false);
  const [isEditOverlayOpen, setIsEditOverlayOpen] = useState(false);
  const [isAddOverlayOpen, setIsAddOverlayOpen] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>(initialData); // Quản lý danh sách sản phẩm
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  const toggleAddOverlay = () => {
    setIsAddOverlayOpen(!isAddOverlayOpen);
  };

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm); // Logic tìm kiếm sẽ được thêm sau
  };

  const handleSetFilter = (filter: string) => {
    console.log("Selected filter:", filter); // Cập nhật trạng thái bộ lọc
  };

  const handleDelete = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleEdit = (product: ProductProps) => {
    setSelectedProduct(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsEditOverlayOpen(true); // Mở modal
  };

  const handleDetail = (product: ProductProps) => {
    setSelectedProduct(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsDetailOverlayOpen(true); // Mở modal
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
        <AddPageButton onClick={toggleAddOverlay} />
      </div>
      <div className="w-full grid grid-cols-6 gap-8 mt-4">
        {products.map((item) => (
          <ProductFrame
            key={item.id}
            param={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDetail={handleDetail}
          />
        ))}
      </div>

      <DetailProduct
        isDetailOverlayOpen={isDetailOverlayOpen}
        selectedProduct={selectedProduct}
        setIsDetailOverlayOpen={setIsDetailOverlayOpen}
      />

      <EditProduct
        isEditOverlayOpen={isEditOverlayOpen}
        selectedProduct={selectedProduct}
        setIsEditOverlayOpen={setIsEditOverlayOpen}
      />

      <AddProduct
        isAddOverlayOpen={isAddOverlayOpen}
        setIsAddOverlayOpen={setIsAddOverlayOpen}
      />
    </div>
  );
};

export default ProductList;
