import Head from 'next/head'
import styles from './publish-form.module.scss'
import Link from 'next/link'
import Myeditor from '@/components/blog/article-add/Myeditor'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { publish } from '@/services/blog'
import { checkAuth } from '@/services/user'
import Swal from 'sweetalert2'

export default function PublishForm() {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [data, setData] = useState('')
  const router = useRouter()
  const [category, setCategory] = useState([]) // 新增的 state
  const categories = ['蛋糕', '泡芙', '塔派', '餅乾', '點心', '馬卡龍', '教學']

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await checkAuth()
        console.log(response) // 新增的 console.log

        if (response.status === 200) {
          setAuthor(response.data.data.user.user_id) // 將用戶 ID 設置為 author 的初始值
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserInfo()
  }, [])

  const saveToDb = async (event) => {
    event.preventDefault()

    const parser = new DOMParser()

    // 使用 DOMParser 解析用戶輸入的 HTML
    const doc = parser.parseFromString(data, 'text/html')

    // 選擇所有的圖片元素
    const images = doc.querySelectorAll('img')

    // 遍歷每一個圖片元素，並設定其寬度為 100%
    images.forEach((img) => {
      img.style.width = '100%'
      img.style.height = 'auto'
    })

    // 將修改後的 HTML 轉換回字符串
    const newData = doc.body.innerHTML

    try {
      const response = await publish({
        title,
        author,
        article: newData,
        category,
      })
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '文章新增成功',
          confirmButtonColor: '#ab927d',
        })
        router.push('/blog')
      } else {
        Swal.fire({
          icon: 'error',
          title: '失敗',
          text: `寫入失敗: ${response.data.message}`,
          confirmButtonColor: '#ab927d',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value
    if (category.includes(selectedCategory)) {
      setCategory(category.filter((cat) => cat !== selectedCategory))
    } else {
      if (category.length < 4) {
        setCategory([...category, selectedCategory])
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: '最多只能選擇四個標籤',
        })
      }
    }
  }
  return (
    <>
      <Head>
        <title>發表文章</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <div className={`d-flex align-items-center ${styles.between}`}>
          {' '}
          <div className={styles.h1}>發表文章 </div>
          <div>
            <Link href="/blog" className="btn btn-primary btn-sm ms-2">
              回文章列表
            </Link>
          </div>
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">文章標題</span>
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text" style={{ display: 'none' }}>
            作者
          </span>
          <input
            className="form-control"
            type="number"
            name="author"
            value={author}
            readOnly
            style={{ display: 'none' }}
          />
        </div>
        <div className="">
          <div className="">
            <span className="">標籤 ：</span>
            {categories.map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  name="category"
                  checked={category.includes(cat)}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <Myeditor
          name="article"
          onChange={(data) => {
            setData(data)
          }}
          editorLoaded={editorLoaded}
        />
        <div className="input-group mt-2">
          <button className="btn btn-primary ms-auto" onClick={saveToDb}>
            送出
          </button>
        </div>
      </main>
    </>
  )
}