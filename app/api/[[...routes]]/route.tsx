/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { abi } from "../[[...routes]]/abi.js"
import { getCollection } from '@/app/testSup.js'
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  imageOptions: { height: 600, width: 600 }
})

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    image: "https://maroon-annoyed-dinosaur-120.mypinata.cloud/ipfs/QmdauDoGHRwCENgqEzuNZPFmrHVDt7xnnEbcCMjdKV6vTF",
    intents: [
      <Button action='/gaming' value="gaming">Gaming</Button>,
      <Button action='/anime' value="anime">Anime</Button>,
      <Button action='/superHero' value="superHero">Super Hero</Button>,
      status === 'response' && <Button.Reset>Start Again</Button.Reset>,
    ],
  })
})


app.frame('/gaming', async (c) => {
  let currentIndex = 0;

  if (c.buttonValue && c.buttonValue.startsWith('nextPFP')) {
    const parts = c.buttonValue.split('_');

    if (parts.length > 1) {
      currentIndex = parseInt(parts[1], 10) + 1;
    }
  }

  const col = await getCollection('gaming');

  if (currentIndex >= col.length) {
    currentIndex = 0;
  }

  const { status } = c;

  return c.res({
    image: col[currentIndex].image,
    intents: [
      <Button value={`nextPFP_${currentIndex}`} action='/gaming'>Next PFP</Button>,
      <Button.Transaction target={`/gaming/${col[currentIndex].tokenId}`}>Mint PFP</Button.Transaction>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})


app.frame('/anime', async (c) => {
  let currentIndex = 0;

  if (c.buttonValue && c.buttonValue.startsWith('nextPFP')) {
    const parts = c.buttonValue.split('_');

    if (parts.length > 1) {
      currentIndex = parseInt(parts[1], 10) + 1;
    }
  }

  const col = await getCollection('anime');

  if (currentIndex >= col.length) {
    currentIndex = 0;
  }

  const { status } = c;

  return c.res({
    image: col[currentIndex].image,
    intents: [
      <Button value={`nextPFP_${currentIndex}`} action='/anime'>Next PFP</Button>,
      <Button.Transaction target={`/anime/${col[currentIndex].tokenId}`}>Mint PFP</Button.Transaction>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})


app.frame('/superHero', async (c) => {
  let currentIndex = 0;

  if (c.buttonValue && c.buttonValue.startsWith('nextPFP')) {
    const parts = c.buttonValue.split('_');

    if (parts.length > 1) {
      currentIndex = parseInt(parts[1], 10) + 1;
    }
  }

  const col = await getCollection('superHero');

  if (currentIndex >= col.length) {
    currentIndex = 0;
  }

  const { status } = c;

  return c.res({
    image: col[currentIndex].image,
    imageOptions: { height: 600, width: 600 },
    intents: [
      <Button value={`nextPFP_${currentIndex}`} action='/superHero'>Next PFP</Button>,
      <Button.Transaction target={`/superHero/${col[currentIndex].tokenId}`}>Mint PFP</Button.Transaction>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})


app.transaction(
  '/gaming/:tokenId',
  (c) => {
    const { tokenId } = c.req.param();

    return c.contract({
      abi,
      chainId: 'eip155:84532',
      functionName: "buyNft",
      to: '0x424982C7e5b95922694d6e14E3e03108609FDb68',
      args: [tokenId]
    })
  }
)

app.transaction(
  '/anime/:tokenId',
  (c) => {
    const { tokenId } = c.req.param();

    return c.contract({
      abi,
      chainId: 'eip155:84532',
      functionName: "buyNft",
      to: '0x50437e842627ca35Dc84cc30E61ee077ae9f0754',
      args: [tokenId]
    })
  }
)

app.transaction(
  '/superHero/:tokenId',
  (c) => {
    const { tokenId } = c.req.param();

    return c.contract({
      abi,
      chainId: 'eip155:84532',
      functionName: "buyNft",
      to: '0x56322678959B028C200D0625eF8c158c27D882D7',
      args: [tokenId]
    })
  }
)


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
