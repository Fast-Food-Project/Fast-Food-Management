// DetailProduct.tsx
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import Image from "next/image";
import InputEdit from "../shared/input/InputEdit";

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

type DetailProductProps = {
  isDetailOverlayOpen: boolean;
  selectedProduct: ProductProps | null; // Define the type according to the shape of selectedProduct
  setIsDetailOverlayOpen: (isOpen: boolean) => void;
};

const DetailProduct: React.FC<DetailProductProps> = ({
  isDetailOverlayOpen,
  selectedProduct,
  setIsDetailOverlayOpen,
}) => {
  return (
    <>
      {isDetailOverlayOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[750px] h-[620px] flex rounded-lg">
            <div className="relative w-[375px] h-[620px]">
              <Image
                alt="product-img"
                src={selectedProduct.image}
                fill
                className=""
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="w-[375px] flex flex-col gap-2 p-2">
              <div className="flex w-full items-center justify-end">
                <Icon
                  icon="iconoir:cancel"
                  className="text-[24px] text-text-color cursor-pointer"
                  onClick={() => setIsDetailOverlayOpen(false)}
                />
              </div>
              <h2 className="text-[20px] font-semibold text-text-dark-500">
                {selectedProduct.productName}
              </h2>
              <div className="w-full grid grid-cols-2 gap-2">
                <InputEdit
                  titleInput="ID"
                  width="174px"
                  value={selectedProduct.id}
                  onChange={() => {}}
                />
                <InputEdit
                  titleInput="Added date"
                  width="174px"
                  value={format(new Date().toISOString(), "PPP")}
                  onChange={() => {}}
                />
                <InputEdit
                  titleInput="Category"
                  width="174px"
                  value="Food"
                  onChange={() => {}}
                />
                <InputEdit
                  titleInput="Official price"
                  width="174px"
                  value={`${selectedProduct.price.toString()} VND`}
                  onChange={() => {}}
                />
              </div>
              <p className="w-full text-text-dark-400 text-[16px] pt-1">
                Ingredients:
              </p>
              <div className="w-full max-w-md mx-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Quantity
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedProduct.ingredients || []).map(
                      (ingredient: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {ingredient.name}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {ingredient.quantity}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {ingredient.unit}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <p className="w-full text-text-dark-400 text-[16px] pt-1">
                Descriptions:
              </p>
              <textarea
                className="h-[71px] border border-border-color rounded-md p-2"
                placeholder="It has spicy flavor..."
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
