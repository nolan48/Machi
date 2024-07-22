import React from 'react'
import styles from './customize.module.css'
import Image from 'next/image'
import { useCustomize } from '@/hooks/use-customize'

export default function CakeSize({ imageSize, size, price, onClick }) {
  const { customize } = useCustomize()

  const imgs = {
    '3層': {
      伯爵: {
        base: '3-1.svg',
        綜合莓果: '3-1-deco1.svg',
        橙片咖啡: '3-1-deco2.svg',
        // ...其他裝飾...
      },
      抹茶: {
        base: '3-2.svg',
        綜合莓果: '3-2-deco1.svg',
        橙片咖啡: '3-2-deco2.svg',
        // ...其他裝飾...
      },
      巧克力: {
        base: '3-3.svg',
        綜合莓果: '3-3-deco1.svg',
        橙片咖啡: '3-3-deco2.svg',
        // ...其他裝飾...
      },
    },
    '4層': {
      伯爵: {
        base: '4-1.svg',
        綜合莓果: '4-1-deco1.svg',
        橙片咖啡: '4-1-deco2.svg',
        // ...其他裝飾...
      },
      抹茶: {
        base: '4-2.svg',
        綜合莓果: '4-2-deco1.svg',
        橙片咖啡: '4-2-deco2.svg',
        // ...其他裝飾...
      },
      巧克力: {
        base: '4-3.svg',
        綜合莓果: '4-3-deco1.svg',
        橙片咖啡: '4-3-deco2.svg',
        // ...其他裝飾...
      },
    },
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick()
    }
  }

  return (
    <div
      onClick={onClick}
      onKeyPress={handleKeyPress}
      style={{ position: 'relative' }}
      tabIndex={0}
      role="button"
    >
      <Image
        src={`/images/customize/${
          customize.layer && customize.flavor
            ? customize.deco
              ? imgs[customize.layer][customize.flavor][customize.deco]
              : imgs[customize.layer][customize.flavor].base
            : 'cake4.png'
        }`}
        alt="4吋蛋糕"
        width={imageSize}
        height={imageSize}
      />
      <p className={styles.size}>{size}</p>
      <p className={styles.price}>{price}</p>
    </div>
  )
}
