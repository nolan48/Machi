import React from 'react'
import Link from 'next/link'
import styles from './product.module.scss'
import Image from 'next/image'
import { IoCartOutline } from 'react-icons/io5'
import FavFcon from './fav-icon'
import Swal from 'sweetalert2'

export default function ListProductCard({ product }) {
  const imageUrl = `/images/product/card/${product.product_id}1.jpg`

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
  })

  return (
    <div className={`card ${styles.listProductCard}`}>
      <div className="row g-0">
        <div className={`col-lg-3 col-6 ${styles.listProductCardImg}`}>
          <Link
            href={`/product/${product.product_id}`}
            passHref
            className="text-decoration-none"
          >
            <Image
              src={imageUrl}
              className="img-fluid rounded"
              alt="productImg"
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              width={300}
              height={300}
              objectFit="cover"
            />
          </Link>
        </div>
        <div className="col-lg-8 col-6 mt-2">
          <div
            className={`d-flex flex-column justify-content-between h-100 ${styles.listProductCardText}`}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className={styles.listProductCardTitle}>
                  {product.product_name.slice(0, 20)}
                </h5>
                <FavFcon
                  id={product.product_id}
                  style={`${styles.listHeartIcon} d-flex justify-content-end`}
                />
              </div>
              <p className={`${styles.listProductCardCategory}`}>
                {product.product_category}
              </p>
            </div>
            <div>
              <div className={`card-text d-flex justify-content-between mt-3 `}>
                <p
                  className={`text-primary-dark fw-bold ${styles.listCurrency}`}
                >
                  NT${product.product_price_small}
                </p>
                <button className={`btn mb-2 ${styles.listCartBtn}`}>
                  <IoCartOutline className={styles.cartIcon} /> 加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
