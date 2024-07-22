// import MyNavbar from './my-navbar-nouse'
import MyNavbarBS5 from '@/components/layout/default-layout/my-navbar'
import MyFooter from '@/components/layout/default-layout/my-footer'
import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'

export default function LoginLayout({ title = '', children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />
      <main className="flex-shrink-0 mt-3">
        <div className="container-fluid p-0 m-0">{children}</div>
        {/* 全域的載入動畫指示器 */}
        {loader()}
      </main>
      <MyFooter />
    </>
  )
}
