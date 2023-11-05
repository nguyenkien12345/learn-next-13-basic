import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is my home page',
}

export default function Home() {
  return (
    <>
      <ul>
        <li style={{margin: "20px 0px"}}>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
        <li style={{margin: "20px 0px"}}>
          <Link href={"/youtube"}>Youtube</Link>
        </li>
        <li style={{margin: "20px 0px"}}>
          <Link href={"/tiktok"}>Tiktok</Link>
        </li>
      </ul>
    </>
  )
}
