import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const NO_IMAGE = "/images/no-image.png"

const ProductDetail = () => {
    const {id} = useParams<{id: string}>();
    const {products, removeProduct} = useProduct();
    const { addToCart } = useCart();
    const { currentUser } = useUser();
    const navigate = useNavigate();

    // 관리자 인증
    const isAdmin = currentUser?.role ==="admin";

    // find()로 해당 id와 일치하는 상품 찾기
    // product/3 : 3은 string -> 숫자로 형변환
    const product = products.find(p => p.id === Number(id))

    // 없는 상품인 경우..
    if(!product){
        return <div>상품을 찾을 수 없습니다.</div>
    }

    // 상품 삭제 핸들러
    const handleDelete = async () => {
        if(!window.confirm("정말로 상품을 삭제할까요?"))
        try {
            await removeProduct(product.id);    // 삭제 함수 호출
            alert("상품이 삭제되었습니다.");
            navigate('/');
        } catch {
            alert("상품 삭제 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="product-detail">
            {/* -?. : 옵셔널 체이닝
                상품을 찾지 못해 undefined일때 오류 대신 undefined를 돌려줌 */}
            <Link to='/' className="product-detail_back">↩</Link>
            <span className="product-detail_category">{product?.category}</span>
            <img
                className="product-detail_img"
                src={product.image ?? NO_IMAGE}
                alt={product.pName}
            />
            <h2>{product?.pName}</h2>
            <p className="product-detail_price">{product?.price.toLocaleString()} 원</p>
            <p className="product-detail_desc">{product?.description}</p>
            <button className="product-detail_cart" onClick={() => {
                    if(!currentUser){
                    alert("로그인이 필요합니다.");
                    navigate('/signin');
                    return;
                }
                addToCart(product?.id, 1);
                alert("상품이 장바구니에 담겼습니다."
            )}}>담기</button>
            {/* 권한이 관리자인 경우만 수정, 삭제 기능 */}
            {isAdmin && 
            <div className="product-detail_admin">
                <Link 
                    to={`/product/${product.id}/edit`}
                    className="product-detail_edit"
                >수정</Link>
                <button
                    className="product-detail_delete"
                    onClick={handleDelete}
                >삭제</button>
            </div> }
        </div>
    )
}

export default ProductDetail;