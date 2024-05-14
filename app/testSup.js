import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import { abi } from './api/[[...routes]]/abi.js'
import { read } from 'fs';
import { error } from 'console';

// const account = privateKeyToAccount("");
const gamingCollection = '0xb1DD4421c161f084F976882e5696961a9D9163b8'
const animeCollection = '0x032a83B877E61C8db532A57b7841770401414e36'
const superHeroCollection = '0x2be0f3b34Dedb1A9Ce89ECD17963464a250B86C5'

// const walletClient = createWalletClient({
//     chain: baseSepolia,
//     account,
//     transport: http('https://base-sepolia.g.alchemy.com/v2/5D113o1keOcRf_BH2eRgM6AYuOK_euUo'),
// })

const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
})


let readSupply = await publicClient.readContract({
    abi: abi,
    address: gamingCollection,
    functionName: 'totalSupply'
});



const returnURI = async (id, category) => {
    let contract;
    if (category === 'gaming') {
        contract = gamingCollection;
    } else if (category === 'anime') {
        contract = animeCollection;
    } else if (category === 'superHero') {
        contract = superHeroCollection;
    } else {
        throw new error('invalid category selection!')
    }

    if (contract) {
        let uri = await publicClient.readContract({
            abi: abi,
            address: contract,
            functionName: 'tokenURI',
            args: [id]
        })
        return uri;
    }

}

export const getCollection = async (category) => {
    let uris = [];
    for (let i = 0; i < readSupply; i++) {
        let uri = await returnURI(i, category);
        let metadata = await fetch(uri).then(response => response.json())  // Convert the response to JSON
            .then(data => {
                uris.push(data);
            })
    }
    // console.log('----uri', uris[0].image);

    return uris;
}

export default readSupply;
