import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const url = 'https://pf-ps-brame-base.vercel.app' || 'http://localhost:3000'

  const frameMetadata = await getFrameMetadata(`${url}/api`)
  return {
    other: frameMetadata,
  }

  // const frameTags = await getFrameMetadata(
  //   `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
  // )
  // return {
  //   other: frameTags,
  // }
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        paste this link to warpcast to create you own PFP frame!
      </div>
    </main>
  )
}
