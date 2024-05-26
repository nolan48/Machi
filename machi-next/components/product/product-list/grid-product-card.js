import React from 'react';
import Link from 'next/link';
import styles from './product.module.scss';
import Image from 'next/image';
import { IoCartOutline } from 'react-icons/io5';
import FavFcon from './fav-icon';
import { checkAuth } from '@/services/user';
import { addToCart } from '@/services/cart';
import Swal from 'sweetalert2';
import { useCart } from '@/hooks/cart-type-state';

export default function GridProductCard({ product }) {
  const imageUrl = `/images/product/card/${product.product_id}1.jpg`;

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  });

  const { addItem } = useCart();

  return (
    <div className="col-6 col-md-3">
      <div className={`${styles.cardBody}`}>
        <FavFcon id={product.product_id} style={styles.heartIcon} />
        <Link href={`/product/${product.product_id}`} passHref>
          <Image
            src={imageUrl}
            className={styles.cardImg}
            alt="productImg"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            width={230}
            height={230}
            objectFit='cover'
          />
        </Link>
        <div className={styles.cardInfo}>
          <h5 className={styles.cardText}>{product.product_name}</h5>
          <p className={styles.typeText}>{product.product_category}</p>
          <h5 className={styles.currency}>
            NT${product.product_price_small}
          </h5>
          <button
            className={`${styles.cartBtn}`}
            onClick={async () => {
              const response = await checkAuth();
              if (response.data.status === 'success') {
                const data = {
                  product_id_fk: product.product_id,
                  product_name: product.product_name,
                  product_price: product.product_price_small,
                  product_count: 1,
                  product_subtitle: product.product_subtitle_small,
                };
                addItem(data)
                  .then((response) => {
                    console.log('添加成功:', response);
                    Toast.fire({
                      icon: 'success',
                      title: '成功加入購物車',
                    });
                  })
                  .catch((error) => {
                    console.error('添加失敗:', error);
                  });
              } else {
                console.log('用戶未登入');
              }
            }}
          >
            <IoCartOutline className={styles.cartIcon} /> 加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}
