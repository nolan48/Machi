import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function PreviewUploadImage({
  avatarImg = '',
  avatarBaseUrl = '',
  defaultImg = 'default.png',
  setSelectedFile,
  selectedFile,
}) {
  // 預覽圖片
  const [preview, setPreview] = useState('')

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
  }

  const showImg = () => {
    if (selectedFile) {
      return preview
    }

    if (avatarImg) {
      return avatarBaseUrl + '/' + avatarImg
    }

    return avatarBaseUrl + '/' + defaultImg
  }

  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <Image src={showImg()} alt="Avatar" layout="fill" objectFit="cover" />
        </div>
      </label>
      <input
        id="file-input"
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      <div>
        <p>點按頭像可以選擇新照片</p>
      </div>
      <style jsx>
        {`
          .image-upload > input {
            display: none;
          }
        `}
      </style>
    </div>
  )
}
