export const RequestExportList = [
  {
    id: "001",
    createAt: new Date("2024-09-22"),
    createBy: "Alex",
    orderId: "001",
    status: 0,
    quantity: 20,
    staffId: "S101", // Staff ID
    staffName: "John", // Staff Name
  },
  {
    id: "002",
    createAt: new Date("2024-09-22"),
    createBy: "June",
    orderId: "002",
    status: 1,
    quantity: 30,
    staffId: "S102", // Staff ID
    staffName: "Jane", // Staff Name
  },
  {
    id: "003",
    createAt: new Date("2024-09-22"),
    createBy: "Alex",
    orderId: "003",
    status: 2,
    quantity: 40,
    staffId: "S103", // Staff ID
    staffName: "Alice", // Staff Name
  },
  {
    id: "004",
    createAt: new Date("2024-09-23"),
    createBy: "Mike",
    orderId: "004",
    status: 0,
    quantity: 20,
    staffId: "S104", // Staff ID
    staffName: "Bob", // Staff Name
  },
  {
    id: "005",
    createAt: new Date("2024-09-23"),
    createBy: "Sara",
    orderId: "005",
    status: 1,
    quantity: 30,
    staffId: "S105", // Staff ID
    staffName: "Emma", // Staff Name
  },
  {
    id: "006",
    createAt: new Date("2024-09-24"),
    createBy: "David",
    orderId: "006",
    status: 2,
    quantity: 20,
    staffId: "S101", // Staff ID
    staffName: "John", // Staff Name
  },
  {
    id: "007",
    createAt: new Date("2024-09-24"),
    createBy: "Emma",
    orderId: "007",
    status: 0,
    quantity: 20,
    staffId: "S102", // Staff ID
    staffName: "Jane", // Staff Name
  },
  {
    id: "008",
    createAt: new Date("2024-09-25"),
    createBy: "John",
    orderId: "008",
    status: 1,
    quantity: 30,
    staffId: "S103", // Staff ID
    staffName: "Alice", // Staff Name
  },
  {
    id: "009",
    createAt: new Date("2024-09-25"),
    createBy: "Rachel",
    orderId: "009",
    status: 2,
    quantity: 20,
    staffId: "S104", // Staff ID
    staffName: "Bob", // Staff Name
  },
  {
    id: "010",
    createAt: new Date("2024-09-26"),
    createBy: "Paul",
    orderId: "010",
    status: 0,
    quantity: 20,
    staffId: "S105", // Staff ID
    staffName: "Emma", // Staff Name
  },
  {
    id: "011",
    createAt: new Date("2024-09-26"),
    createBy: "Lily",
    orderId: "011",
    status: 1,
    quantity: 30,
    staffId: "S101", // Staff ID
    staffName: "John", // Staff Name
  },
  {
    id: "012",
    createAt: new Date("2024-09-27"),
    createBy: "Tom",
    orderId: "012",
    status: 2,
    quantity: 20,
    staffId: "S102", // Staff ID
    staffName: "Jane", // Staff Name
  },
];

export const InventoryListData = [
  {
    id: "001",
    name: "Chicken",
    stockLevel: 20,
    unit: "kg",
    supplier: "Nesson",
    status: 0,
  },
  {
    id: "002",
    name: "Pork",
    stockLevel: 0,
    unit: "kg",
    supplier: "Visson",
    status: 1,
  },
  {
    id: "003",
    name: "Beef",
    stockLevel: 20,
    unit: "kg",
    supplier: "Visson",
    status: 2,
  },
  {
    id: "004",
    name: "Salad",
    stockLevel: 50,
    unit: "kg",
    supplier: "FreshFarm",
    status: 0,
  },
  {
    id: "005",
    name: "Chicken",
    stockLevel: 30,
    unit: "kg",
    supplier: "Nesson",
    status: 1,
  },
  {
    id: "006",
    name: "Pork",
    stockLevel: 10,
    unit: "kg",
    supplier: "Visson",
    status: 2,
  },
  {
    id: "007",
    name: "Beef",
    stockLevel: 15,
    unit: "kg",
    supplier: "Visson",
    status: 0,
  },
  {
    id: "008",
    name: "Salad",
    stockLevel: 100,
    unit: "kg",
    supplier: "FreshFarm",
    status: 1,
  },
  {
    id: "009",
    name: "Chicken",
    stockLevel: 10,
    unit: "kg",
    supplier: "Nesson",
    status: 2,
  },
  {
    id: "010",
    name: "Pork",
    stockLevel: 50,
    unit: "kg",
    supplier: "Visson",
    status: 0,
  },
  {
    id: "011",
    name: "Beef",
    stockLevel: 80,
    unit: "kg",
    supplier: "Visson",
    status: 1,
  },
  {
    id: "012",
    name: "Salad",
    stockLevel: 20,
    unit: "kg",
    supplier: "FreshFarm",
    status: 2,
  },
  {
    id: "013",
    name: "Chicken",
    stockLevel: 40,
    unit: "kg",
    supplier: "Nesson",
    status: 0,
  },
  {
    id: "014",
    name: "Pork",
    stockLevel: 25,
    unit: "kg",
    supplier: "Visson",
    status: 1,
  },
  {
    id: "015",
    name: "Beef",
    stockLevel: 100,
    unit: "kg",
    supplier: "Visson",
    status: 2,
  },
];

export const ProductData = [
  {
    id: "0001",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Juicy Cheeseburger",

    price: 69000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0002",
    image:
      "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg",
    productName: "Fries",

    price: 59000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0003",
    image:
      "https://i.pinimg.com/736x/47/33/42/473342867a2b774fb26b89e3a8d099c1.jpg",
    productName: "Chicken",

    price: 79000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0004",
    image:
      "https://i.pinimg.com/736x/61/f4/8e/61f48e38b690a889f1c8c15cffda243d.jpg",
    productName: "Pizza",

    price: 179000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0005",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Veggie Burger",

    price: 65000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0006",
    image:
      "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg",
    productName: "Hot Dog",

    price: 49000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0007",
    image:
      "https://i.pinimg.com/736x/47/33/42/473342867a2b774fb26b89e3a8d099c1.jpg",
    productName: "Cheese Fries",

    price: 68000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0008",
    image:
      "https://i.pinimg.com/736x/61/f4/8e/61f48e38b690a889f1c8c15cffda243d.jpg",
    productName: "BBQ Wings",

    price: 95000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0009",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Onion Rings",

    price: 49000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0010",
    image:
      "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg",
    productName: "Grilled Cheese Sandwich",

    price: 55000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0011",
    image:
      "https://i.pinimg.com/736x/47/33/42/473342867a2b774fb26b89e3a8d099c1.jpg",
    productName: "Caesar Salad",

    price: 75000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0012",
    image:
      "https://i.pinimg.com/736x/61/f4/8e/61f48e38b690a889f1c8c15cffda243d.jpg",
    productName: "Grilled Chicken Salad",

    price: 89000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0013",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Steak",

    price: 169000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0014",
    image:
      "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg",
    productName: "Pasta",

    price: 89000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0015",
    image:
      "https://i.pinimg.com/736x/47/33/42/473342867a2b774fb26b89e3a8d099c1.jpg",
    productName: "Fish and Chips",

    price: 119000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0016",
    image:
      "https://i.pinimg.com/736x/61/f4/8e/61f48e38b690a889f1c8c15cffda243d.jpg",
    productName: "Pulled Pork Sandwich",

    price: 99000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0017",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Veggie Wrap",

    price: 58000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0018",
    image:
      "https://i.pinimg.com/736x/2b/85/c3/2b85c3f5233135e68691667987a7a283.jpg",
    productName: "Chicken Tenders",

    price: 74000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0019",
    image:
      "https://i.pinimg.com/736x/47/33/42/473342867a2b774fb26b89e3a8d099c1.jpg",
    productName: "Taco",

    price: 59000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
  {
    id: "0020",
    image:
      "https://i.pinimg.com/736x/39/e9/7f/39e97f890fb372074fa0e06e202ef665.jpg",
    productName: "Nachos",

    price: 64000,
    createAt: new Date("2024-09-22"),
    ingredients: [
      {
        name: "Chicken thighs",
        quantity: 5,
        unit: "pieces",
      },
      {
        name: "Chesse",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Butter",
        quantity: 3,
        unit: "pieces",
      },
      {
        name: "Milk",
        quantity: 200,
        unit: "ml",
      },
      {
        name: "Flour",
        quantity: 1,
        unit: "kg",
      },
    ],
  },
];

interface UserProps {
  id: string;
  fullname: string;
  dob: Date; // Correct type for dob
  email: string;
  phoneNumber: string; // Match the property name in UserData
  position: string;
  address: string;
  city: string;
  cardId: string;
  country: string;
  acountName: string;
  avatar: string;
  status: string;
  password: string;
  enrolledDate: Date; // Correct the typo
}

export const UserData: UserProps = {
  id: "001",
  fullname: "Juni Vu",
  dob: new Date("2024-09-22"),
  email: "abc@gmail.com",
  phoneNumber: "01234555678",
  avatar: "/assets/images/ava.png",
  position: "Manager",
  address: "1/111A Cau Xeo, Tan Son Nhi, Tan Phu",
  city: "Ho Chi Minh",
  cardId: "01234555678",
  status: "Active",
  country: "Viet Nam",
  acountName: "Juni Vu",
  password: "0123456789",
  enrolledDate: new Date("2024-09-22"),
};

export const StoresData = [
  {
    id: "001",
    storeName: "Store A",
    email: "storea@gmail.com",
    phone: "0123456789",
    signUpDate: new Date("2024-09-22"),
    status: 1,
    nation: "Viet Nam",
    city: "TP.HCM",
    district: "Tan Phu",
    location: "1/111A Cau Xeo, Tan Son Nhi, Tan Phu, TPHCM",
    orderQuantity: 56,
    accountName: "storeA@gmail.com",
  },
  {
    id: "002",
    storeName: "Store B",
    email: "storeb@gmail.com",
    phone: "01234533789",
    signUpDate: new Date("2024-09-22"),
    status: 0,
    nation: "Viet Nam",
    city: "Ha Noi",
    district: "Dong Da",
    location: "123 Lang Ha, Dong Da, Ha Noi",
    orderQuantity: 20,
    accountName: "storeB@gmail.com",
  },
  {
    id: "003",
    storeName: "Store C",
    email: "storec@gmail.com",
    phone: "0123456781",
    signUpDate: new Date("2024-09-23"),
    status: 1,
    nation: "Viet Nam",
    city: "Da Nang",
    district: "Hai Chau",
    location: "456 Bach Dang, Hai Chau, Da Nang",
    orderQuantity: 45,
    accountName: "storeC@gmail.com",
  },
  {
    id: "004",
    storeName: "Store D",
    email: "stored@gmail.com",
    phone: "0123456782",
    signUpDate: new Date("2024-09-24"),
    status: 0,
    nation: "Viet Nam",
    city: "Can Tho",
    district: "Ninh Kieu",
    location: "789 Tran Hung Dao, Ninh Kieu, Can Tho",
    orderQuantity: 15,
    accountName: "storeD@gmail.com",
  },
  {
    id: "005",
    storeName: "Store E",
    email: "storee@gmail.com",
    phone: "0123456783",
    signUpDate: new Date("2024-09-25"),
    status: 1,
    nation: "Viet Nam",
    city: "TP.HCM",
    district: "District 1",
    location: "23 Nguyen Hue, District 1, TPHCM",
    orderQuantity: 78,
    accountName: "storeE@gmail.com",
  },
  {
    id: "006",
    storeName: "Store F",
    email: "storef@gmail.com",
    phone: "0123456784",
    signUpDate: new Date("2024-09-26"),
    status: 0,
    nation: "Viet Nam",
    city: "Hai Phong",
    district: "Le Chan",
    location: "34 Lach Tray, Le Chan, Hai Phong",
    orderQuantity: 10,
    accountName: "storeF@gmail.com",
  },
  {
    id: "007",
    storeName: "Store G",
    email: "storeg@gmail.com",
    phone: "0123456785",
    signUpDate: new Date("2024-09-27"),
    status: 1,
    nation: "Viet Nam",
    city: "Nha Trang",
    district: "Vinh Hai",
    location: "56 Nguyen Tat Thanh, Vinh Hai, Nha Trang",
    orderQuantity: 40,
    accountName: "storeG@gmail.com",
  },
  {
    id: "008",
    storeName: "Store H",
    email: "storeh@gmail.com",
    phone: "0123456786",
    signUpDate: new Date("2024-09-28"),
    status: 0,
    nation: "Viet Nam",
    city: "Hue",
    district: "Phu Hoi",
    location: "67 Nguyen Hue, Phu Hoi, Hue",
    orderQuantity: 18,
    accountName: "storeH@gmail.com",
  },
  {
    id: "009",
    storeName: "Store I",
    email: "storei@gmail.com",
    phone: "0123456787",
    signUpDate: new Date("2024-09-29"),
    status: 1,
    nation: "Viet Nam",
    city: "Da Lat",
    district: "Phuong 1",
    location: "12 Tran Quoc Toan, Phuong 1, Da Lat",
    orderQuantity: 65,
    accountName: "storeI@gmail.com",
  },
  {
    id: "010",
    storeName: "Store J",
    email: "storej@gmail.com",
    phone: "0123456788",
    signUpDate: new Date("2024-09-30"),
    status: 0,
    nation: "Viet Nam",
    city: "Vung Tau",
    district: "Ward 2",
    location: "89 Le Loi, Ward 2, Vung Tau",
    orderQuantity: 22,
    accountName: "storeJ@gmail.com",
  },
];
