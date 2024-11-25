// import { Icon } from "@iconify/react/dist/iconify.js";
// import InputEdit from "../shared/input/InputEdit";
// import ButtonFunction from "../shared/button/ButtonFunction";
// import { useState } from "react";
// import InputDate from "../shared/input/InputDate";

// interface GradientProps {
//   name: string;
//   quantity: number;
//   unit: string;
// }

// interface ProductProps {
//   id: string;
//   image: string;
//   productName: string;
//   price: number;
//   ingredients: GradientProps[];
//   createAt: Date;
// }

// type EditProductProps = {
//   isAddOverlayOpen: boolean;
//   setIsAddOverlayOpen: (isOpen: boolean) => void;
// };

// const AddProduct: React.FC<EditProductProps> = ({
//   isAddOverlayOpen,
//   setIsAddOverlayOpen,
// }) => {
//   const [updatedItem, setUpdatedItem] = useState<ProductProps>({
//     id: "",
//     image: "",
//     productName: "",
//     price: 0,
//     ingredients: [],
//     createAt: new Date(),
//   }); // Khởi tạo sản phẩm mới với dữ liệu rỗng

//   const handleSave = () => {
//     // Ở đây bạn có thể lưu lại dữ liệu mới, ví dụ gửi API
//     console.log("Saved product: ", updatedItem);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUpdatedItem({
//       ...updatedItem,
//       [e.target.name]: e.target.value, // Cập nhật thông tin trong state khi người dùng thay đổi input
//     });
//   };

//   const handleIngredientChange = (
//     index: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedIngredients = updatedItem.ingredients.map((ingredient, i) => {
//       if (i === index) {
//         return { ...ingredient, [field]: value };
//       }
//       return ingredient;
//     });
//     setUpdatedItem({ ...updatedItem, ingredients: updatedIngredients });
//   };

//   const handleDeleteIngredient = (index: number) => {
//     const updatedIngredients = updatedItem.ingredients.filter(
//       (_, i) => i !== index
//     );
//     setUpdatedItem({ ...updatedItem, ingredients: updatedIngredients });
//   };

//   const handleUpdateImage = () => {
//     // Cập nhật ảnh nếu cần
//   };

//   return (
//     <>
//       {isAddOverlayOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white w-[798px] h-[700px] flex flex-col rounded-lg p-2 gap-2">
//             <div className="flex justify-between items-center h-[40px] p-4">
//               <div className="flex w-[480px] justify-between gap-8">
//                 <input
//                   className="text-[20px] w-[480px] text-text-dark-500 font-semibold border border-border-color rounded-md px-4"
//                   value={updatedItem.productName} // Liên kết giá trị input với productName
//                   onChange={(e) =>
//                     setUpdatedItem({
//                       ...updatedItem,
//                       productName: e.target.value,
//                     })
//                   } // Cập nhật khi thay đổi
//                   name="productName"
//                   placeholder="Enter Product Name"
//                 />
//                 <ButtonFunction
//                   width="w-fit"
//                   border_radius="rounded-full"
//                   icon="solar:camera-linear"
//                   background="bg-active-background"
//                   text_color="text-primary-100"
//                   event={handleUpdateImage}
//                 />
//               </div>

//               <Icon
//                 icon="iconoir:cancel"
//                 className="text-[24px] text-text-color cursor-pointer"
//                 onClick={() => setIsAddOverlayOpen(false)}
//               />
//             </div>

//             <div className="flex w-[790px] h-[640px]">
//               <div className="w-[415px] h-[640px] flex flex-col gap-2 p-2">
//                 <div className="w-full grid grid-cols-2 gap-2">
//                   <InputEdit
//                     titleInput="ID"
//                     width="174px"
//                     value={updatedItem.id}
//                     onChange={handleChange}
//                     name="id"
//                     placeholder="Enter ID"
//                   />
//                   <InputDate
//                     titleInput="Added date"
//                     width="174px"
//                     value={updatedItem.createAt.toISOString()}
//                     onChange={() => {}}
//                   />
//                   <InputEdit
//                     titleInput="Category"
//                     width="174px"
//                     value="Food"
//                     onChange={handleChange}
//                   />
//                   <InputEdit
//                     titleInput="Official price"
//                     width="174px"
//                     value={`${updatedItem.price.toString()} VND`}
//                     onChange={handleChange}
//                     name="price"
//                     placeholder="Enter Official Price"
//                   />
//                 </div>

//                 <p className="w-full text-text-dark-400 text-[16px]">
//                   Ingredients:
//                 </p>
//                 <div className="w-full max-w-md mx-auto">
//                   <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
//                     <thead>
//                       <tr className="border-b">
//                         <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
//                           Name
//                         </th>
//                         <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
//                           Quantity
//                         </th>
//                         <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
//                           Unit
//                         </th>
//                         <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {updatedItem.ingredients.map((ingredient, index) => (
//                         <tr key={index} className="border-b">
//                           <td className="px-4 py-2 text-sm text-gray-800">
//                             <input
//                               type="text"
//                               value={ingredient.name}
//                               onChange={(e) =>
//                                 handleIngredientChange(
//                                   index,
//                                   "name",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full"
//                             />
//                           </td>
//                           <td className="px-4 py-2 text-sm text-gray-800">
//                             <input
//                               type="number"
//                               value={ingredient.quantity}
//                               onChange={(e) =>
//                                 handleIngredientChange(
//                                   index,
//                                   "quantity",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full"
//                             />
//                           </td>
//                           <td className="px-4 py-2 text-sm text-gray-800">
//                             <input
//                               type="text"
//                               value={ingredient.unit}
//                               onChange={(e) =>
//                                 handleIngredientChange(
//                                   index,
//                                   "unit",
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full"
//                             />
//                           </td>
//                           <td className="px-4 py-2 text-sm text-gray-800 text-center">
//                             <Icon
//                               icon="gg:trash"
//                               className="text-[15px] text-text-color cursor-pointer"
//                               onClick={() => handleDeleteIngredient(index)}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="w-[400px] flex justify-end p-3">
//                   <ButtonFunction
//                     icon="ic:round-add"
//                     event={handleSave}
//                     title="Add"
//                     width="w-[67px]"
//                     background="bg-active-background"
//                     border_radius="rounded-xl"
//                     text_color="text-primary-100"
//                     border_color="bg-active-background"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddProduct;

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState } from "react";
import InputDate from "../shared/input/InputDate";

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

type EditProductProps = {
  isAddOverlayOpen: boolean;
  setIsAddOverlayOpen: (isOpen: boolean) => void;
};

const AddProduct: React.FC<EditProductProps> = ({
  isAddOverlayOpen,
  setIsAddOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<ProductProps>({
    id: "",
    image: "",
    productName: "",
    price: 0,
    ingredients: [],
    createAt: new Date(),
  }); // Khởi tạo sản phẩm mới với dữ liệu rỗng

  const handleDeleteGradient = (index: number) => {
    if (updatedItem) {
      const updatedIngredients = updatedItem.ingredients.filter(
        (_, i) => i !== index
      );
      setUpdatedItem({ ...updatedItem, ingredients: updatedIngredients });
    }
  };

  const handleSave = () => {
    if (updatedItem) {
      // Ở đây bạn có thể gọi API để lưu thông tin sản phẩm
      console.log("Saved product: ", updatedItem);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Dynamically update the value
      });
    }
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    if (updatedItem) {
      const updatedIngredients = updatedItem.ingredients.map(
        (ingredient, i) => {
          if (i === index) {
            return { ...ingredient, [field]: value };
          }
          return ingredient;
        }
      );
      setUpdatedItem({ ...updatedItem, ingredients: updatedIngredients });
    }
  };

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString()
      : "";
  };

  const handleUpdateImage = () => {
    // Xử lý khi người dùng thay đổi ảnh (chưa có logic trong ví dụ này)
  };

  return (
    <>
      {isAddOverlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[798px] h-[700px] flex flex-col rounded-lg p-2 gap-2">
            <div className="flex justify-between items-center h-[40px] p-4">
              <div className="flex w-[480px] justify-between gap-8">
                <input
                  className="text-[20px] w-[480px] text-text-dark-500 font-semibold border border-border-color rounded-md px-4"
                  value={updatedItem.productName || ""} // Liên kết giá trị input với productName
                  onChange={(e) => handleChange(e)} // Cập nhật productName khi thay đổi
                  name="productName"
                  placeholder="Enter product name"
                />
                <ButtonFunction
                  width="w-fit"
                  border_radius="rounded-full"
                  icon="solar:camera-linear"
                  background="bg-active-background"
                  text_color="text-primary-100"
                  event={handleUpdateImage}
                />
              </div>

              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsAddOverlayOpen(false)}
              />
            </div>
            <div className="flex w-[790px] h-[640px]">
              <div className="relative w-[375px] h-[640px]">
                <Image
                  alt="product-img"
                  src={
                    updatedItem.image ||
                    "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg"
                  } // Hiển thị ảnh mặc định nếu chưa có ảnh
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
              </div>
              <div className="w-[415px] h-[650px] flex flex-col gap-2 p-2">
                <div className="w-full grid grid-cols-2 gap-2">
                  <InputEdit
                    titleInput="ID"
                    width="174px"
                    value={updatedItem.id || ""}
                    onChange={handleChange}
                    name="id"
                    placeholder="Enter ID"
                  />
                  <InputDate
                    titleInput="Added date"
                    width="174px"
                    value={updatedItem ? formatDate(updatedItem.createAt) : ""}
                    onChange={() => {}}
                  />
                  <InputEdit
                    titleInput="Category"
                    width="174px"
                    value="Food"
                    onChange={handleChange}
                  />
                  <InputEdit
                    titleInput="Official price"
                    width="174px"
                    value={`${updatedItem.price.toString()} VND`}
                    onChange={handleChange}
                    name="price"
                    placeholder="Enter Official Price"
                  />
                </div>

                <p className="w-full text-text-dark-400 text-[16px]">
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
                        <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {updatedItem?.ingredients?.map((ingredient, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sm text-gray-800">
                            <input
                              type="text"
                              value={ingredient.name}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            <input
                              type="number"
                              value={ingredient.quantity}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            <input
                              type="text"
                              value={ingredient.unit}
                              onChange={(e) =>
                                handleIngredientChange(
                                  index,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="w-full"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800 text-center">
                            <Icon
                              icon="gg:trash"
                              className="text-[15px] text-text-color cursor-pointer"
                              onClick={() => handleDeleteGradient(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="w-[400px] flex justify-end p-3">
                  <ButtonFunction
                    icon="ic:round-add"
                    event={handleSave}
                    title="Add"
                    width="w-[67px]"
                    background="bg-active-background"
                    border_radius="rounded-xl"
                    text_color="text-primary-100"
                    border_color="bg-active-background"
                  />
                </div>

                <p className="w-full text-text-dark-400 text-[16px]">
                  Descriptions:
                </p>
                <textarea
                  className="h-[91px] border border-border-color rounded-md p-2"
                  placeholder="It has spicy flavor..."
                />
                <div className="w-[400px] flex justify-end p-2">
                  <ButtonFunction
                    event={handleSave}
                    title="Add new item"
                    width="w-[139px]"
                    background="bg-dark-bg"
                    border_radius="rounded-xl"
                    text_color="text-white"
                    border_color="bg-dark-bg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
