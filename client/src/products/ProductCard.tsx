import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types/product"; 
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const NO_IMAGE = "/images/no-image.png"

const ProductCard = ({product}: {product: Product}) => {
    const { addToCart } = useCart();
    const { currentUser } = useUser();  // 로그인 한 회원
    const navigate = useNavigate();

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
            <img
                className="product-card_img"
                // ?? : null 병합 연산자. 왼쪽 값이 null이거나 undefined인 경우
                src={product.image ?? NO_IMAGE}
                alt={product.pName}
            />
            </Link>
            <span>{product.category}</span>
            <h3>
                <Link to={`/product/${product.id}`}>{product.pName}</Link>
            </h3>
            <p>{product.price.toLocaleString()} 원</p>
            <button onClick={() => {
                if(!currentUser){
                    alert("로그인이 필요합니다.");
                    navigate('/signin');
                    return;
                }
                addToCart(product.id, 1);
                alert("상품이 장바구니에 담겼습니다."
                )}}>담기</button>
        </div>
    )
}

export default ProductCard;