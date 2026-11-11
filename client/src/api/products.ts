// 서버와 연결할 파일
import type { Category, NewProduct, Product } from "../types/product";
import api from "./api";

// 서버(DB)에서 원하는 데이터 타입을 정의
interface ProductRow{
    id: number;
    p_name: string;
    category: Category;
    price: number;
    description: string;
    image: string | null;   // 선택 속성
}

// DB 데이터 -> 화면 보여주기
const toProduct = (row: ProductRow) : Product => ({
    id: row.id,
    pName: row.p_name,
    category: row.category,
    price: row.price,
    description: row.description,
    image: row.image ?? undefined  // 경로 : string(문자열)
})

// 상품 목록
export const getProducts = async () => {
    const response = await api.get<ProductRow[]>('/products');
    return response.data.map(toProduct);
}

// 상품 등록(폼 필드에 입력된 값을 DB로 넘김)
export const createProduct = async (product: NewProduct) => {
    await api.post("/products", {
        pName: product.pName,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image
    })
}

// 상품 삭제
export const deleteProduct = async (productId: number) => {
    await api.delete(`/products/${productId}`);
}

// 상품 수정(폼에서 수정한 데이터 -> DB로 보내기)
export const modifyProduct = async (product: Product) => {
    await api.put(`/products/${product.id}`, {
        pName: product.pName,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image
    })
}