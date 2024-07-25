import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { data } from 'jquery'
import React from 'react'
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5'
import { useCart } from '@/hooks/cart-type-state'
import styles from './course-detail.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { checkAuth } from '@/services/user'
import Swal from 'sweetalert2'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { addFav, removeFav, getFavs } from '@/services/user'
import { IoHeart } from 'react-icons/io5'
import FormattedDate from '@/components/course/date/date'
import FormattedDate1 from '@/components/course/date/date1'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { clearConfig } from 'dompurify'
import Link from 'next/link'

export default function Detail() {
  const [course, setCourse] = useState({
    status: '',
    data: {
      course: {
        course_id: '',
        course_name: '',
        course_description: '',
        course_description_full: '',
        course_category: '',
        teacher_id_fk: '',
        course_location: '',
        course_price: '',
        course_enroll_start: '',
        course_enroll_end: '',
        course_start_time: '',
        course_end_time: '',
        course_status: '',
        course_teacher: '',
        course_teacher_description: '',
      },
    },
  })

  //我的最愛
  const { favorites, setFavorites } = useAuth()
  const isFavorite = favorites.includes(course.data.course.course_id)

  const handleFavoriteClick = async () => {
    if (isFavorite) {
      await removeFav(course.data.course.course_id)
    } else {
      await addFav(course.data.course.course_id)
    }
    const newFavorites = await getFavs()
    setFavorites(newFavorites.data.data.favorites)
  }

  //我的最愛
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  //時間用
  const dateString = '2024-05-17T13:41:19.000Z'

  //通知用
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

  const router = useRouter()

  const getCourse = async (pid) => {
    const url = `http://localhost:3005/api/course/${pid}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (typeof data === 'object' && data !== null) {
        setCourse(data)
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      getCourse(router.query.pid)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  const [activeButton, setActiveButton] = useState('intro')

  const handleButtonClick = (eventKey) => {
    setActiveButton(eventKey)
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const imageUrl1 = `/images/course/slide/${course.data.course.course_id}_1.jpg`
  const imageUrl2 = `/images/course/slide/${course.data.course.course_id}_2.jpg`
  const imageUrl3 = `/images/course/slide/${course.data.course.course_id}_3.jpg`

  return (
    <>
      <div className="row mt-5 mx-10 d-flex justify-content-center ">
        <div className="col-md-5">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Swiper
              style={{
                width: '50vh',
                height: '50vh',
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Autoplay, FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img src={imageUrl1} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={imageUrl2} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={imageUrl3} />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  src={imageUrl1}
                  style={{
                    width: '10vh',
                    height: '10vh',
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={imageUrl2}
                  style={{
                    width: '10vh',
                    height: '10vh',
                  }}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={imageUrl3}
                  style={{
                    width: '10vh',
                    height: '10vh',
                  }}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="col-md-6 ms-3 product-info">
          <h4 className="text-primary-dark mt-2">
            {course.data.course.course_name}
          </h4>
          <p className="text-muted">{course.data.course.course_category}</p>
          <p
            className="product-desc mb-4"
            dangerouslySetInnerHTML={{
              __html: course.data.course.course_description,
            }}
          ></p>

          <div className="mb-4">
            <p className="product-desc mb-4">
              課程時間:
              <FormattedDate
                dateString={course.data.course.course_start_time}
              />
              ~<FormattedDate dateString={course.data.course.course_end_time} />
            </p>
            <p className="product-desc mb-4">
              報名開始:
              <FormattedDate1
                dateString={course.data.course.course_enroll_start}
              />
            </p>
            <p className="product-desc mb-4">
              報名截止:
              <FormattedDate1
                dateString={course.data.course.course_enroll_end}
              />
            </p>
          </div>
          <div
            className={`d-flex g-3 justify-content-between align-items-center mb-4 addbuton`}
          >
            <div
              className={`btn-group d-flex`}
              role={`group`}
              aria-label={`Basic mixed styles example `}
              style={{
                width: '128px',
                height: '48px',
              }}
            >
              <button
                className={` btn btn-outline-light text-primary-dark h4 mb-0 border-brown`}
                style={{ width: '28px' }}
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1)
                  }
                }}
              >
                -
              </button>
              <button
                className={` btn btn-outline-light text-primary-dark h4 mb-0 border-brown`}
              >
                {quantity}
              </button>
              <button
                className={` btn btn-outline-light text-primary-dark h4 mb-0 border-brown`}
                style={{ width: '28px' }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="col-md-5 d-flex justify-content-center align-items-center text-primary-dark">
              <p className="pe-2">售價</p>
              <h4 className="text-primary-dark">
                {course.data.course.course_price}
              </h4>
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-center align-items-center ">
            <div className="col-6 pe-2">
              <button
                className={`${styles.dbtn} btn btn-outline-brown btn-lg w-100 cartBtn`}
                onClick={async () => {
                  const response = await checkAuth()
                  if (response.data.status === 'success') {
                    const data = {
                      course_id_fk: course.data.course.course_id,
                      course_name: course.data.course.course_name,
                      course_price: course.data.course.course_price,
                      course_count: quantity,
                      course_address: course.data.course.course_location,
                      course_date: course.data.course.course_start_time,
                    }
                    addItem(data)
                      .then((response) => {
                        Toast.fire({
                          icon: 'success',
                          title: '成功加入購物車',
                        })
                      })
                      .catch((error) => {
                        console.error('添加失敗:', error)
                      })
                  } else {
                    console.log('用戶未登入')
                    Swal.fire({
                      title: '您尚未登入',
                      text: '請先登入！',
                      icon: 'error',
                      confirmButtonColor: '#ab927d',
                      confirmButtonText: '確定',
                    })
                  }
                }}
              >
                <IoCartOutline className="fs-3 text-brown" /> 加入購物車
              </button>
            </div>
            <div className="col-6 ps-2">
              <button
                className="btn btn-brown text-white btn-lg w-100 buynowBtn"
                onClick={async () => {
                  const response = await checkAuth()
                  if (response.data.status === 'success') {
                    const data = {
                      course_id_fk: course.data.course.course_id,
                      course_name: course.data.course.course_name,
                      course_price: course.data.course.course_price,
                      course_count: quantity,
                      course_address: course.data.course.course_location,
                      course_date: course.data.course.course_start_time,
                    }

                    addItem(data)
                      .then((response) => {
                        Swal.fire({
                          title: '已加入購物車',
                          text: '您的商品已成功加入購物車！',
                          icon: 'success',
                          confirmButtonColor: '#ab927d',
                          confirmButtonText: '前往購物車',
                        }).then(() => {
                          window.location.href = '/cart'
                        })
                      })
                      .catch((error) => {
                        console.error('添加失敗:', error)
                      })
                  } else {
                    console.log('用戶未登入')
                    Swal.fire({
                      title: '您尚未登入',
                      text: '請先登入！',
                      icon: 'error',
                      confirmButtonColor: '#ab927d',
                      confirmButtonText: '確定',
                    })
                  }
                }}
              >
                立即購買
              </button>
            </div>
          </div>
          <button
            className="btn btn-outline-gary col-md-6 text-start text-primary-dark"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <IoHeart className="fs-3 text-primary-dark" />
            ) : (
              <IoHeartOutline className="fs-3 text-primary-dark" />
            )}
            加入追蹤清單
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="label">
          <button
            onClick={() => handleButtonClick('intro')}
            className={`${styles.intro} ${
              activeButton === 'intro' ? styles.buttonActive : ''
            }`}
            title="課程介紹"
          >
            課程介紹
          </button>
          <button
            onClick={() => handleButtonClick('other')}
            className={`${styles.other} ${
              activeButton === 'other' ? styles.buttonActive : ''
            }`}
            title="運送與注意事項"
          >
            講師介紹
          </button>
        </div>
        <div
          className="content"
          style={{ display: activeButton === 'intro' ? 'block' : 'none' }}
        >
          <div className="list-group-flush p-2 py-3 mb-4 border">
            <div className="list-group-flush p-2 py-3 mb-4 ">
              <h4 id="title">｜講堂時間與地點｜</h4>
              <p className={`${styles.text1} product-desc mb-4 text1`}>
                ►講堂日期：
                <FormattedDate
                  dateString={course.data.course.course_start_time}
                />
                ~
                <FormattedDate
                  dateString={course.data.course.course_end_time}
                />{' '}
                <br />
                ►講堂費用：{course.data.course.course_price}
              </p>

              <h4 id="title">｜講堂介紹｜</h4>
              <p
                className={`${styles.text1} product-desc mb-4 text1`}
                dangerouslySetInnerHTML={{
                  __html: course.data.course.course_description_full,
                }}
              ></p>
            </div>
          </div>
        </div>
        <div
          className="content"
          style={{ display: activeButton === 'other' ? 'block' : 'none' }}
        >
          <div className="list-group-flush p-2 py-3 mb-4 border">
            <div className="list-group-flush p-2 py-3 mb-4 ">
              <h4 id="title">｜講師名稱｜</h4>
              <p className={`${styles.text1} list-group-item`}>
                {course.data.course.course_teacher}
              </p>

              <h4 id="title">｜講師經歷｜</h4>
              <p
                className={`${styles.text1} product-desc mb-4 text1`}
                dangerouslySetInnerHTML={{
                  __html: course.data.course.course_teacher_description,
                }}
              ></p>
              <p className="list-group-item"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
