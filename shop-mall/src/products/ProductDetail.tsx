import { Link, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
    const {id} = useParams<{id: string}>();
    const {products} = useProduct();
    const { addToCart } = useCart();

    // find()로 해당 id와 일치하는 상품 찾기
    // product/3 : 3은 string -> 숫자로 형변환
    const product = products.find(p => p.id === Number(id))

    // 없는 상품인 경우..
    if(!product){
        return <div>상품을 찾을 수 없습니다.</div>
    }

    return (
        <div className="product-detail">
            {/* -?. : 옵셔널 체이닝
                상품을 찾지 못해 undefined일때 오류 대신 undefined를 돌려줌 */}
            <Link to='/' className="product-detail_back">↩</Link>
            <span className="product-detail_category">{product?.category}</span>
            <h2>{product?.pName}</h2>
            <p className="product-detail_price">{product?.price.toLocaleString()} 원</p>
            <p className="product-detail_desc">{product?.description}</p>
            <button className="product-detail_cart" onClick={() => {
                addToCart(product?.id, 1);
                alert("상품이 장바구니에 담겼습니다."
            )}}>담기</button>
        </div>
    )
}

export default ProductDetail;