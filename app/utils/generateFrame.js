import { Button, Frog, TextInput } from 'frog'
const app = new Frog({
    assetsPath: '/',
    basePath: '/api',
})

export default async function getFrame() {



    // const { buttonValue, inputText, status } = c
    // const fruit = inputText || buttonValue
    return c.res({
        action: '/second',
        image: (
            <div
                style={{
                    alignItems: 'center',
                    background:
                        status === 'response'
                            ? 'linear-gradient(to right, #432889, #17101F)'
                            : 'black',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        color: 'white',
                        fontSize: 60,
                        fontStyle: 'normal',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.4,
                        marginTop: 30,
                        padding: '0 120px',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    Main frame 1
                </div>
            </div>
        ),
        intents: [
            <TextInput placeholder="Enter custom fruit..." />,
            <Button value="gaming">Gaming</Button>,
            <Button value="anime">Anime</Button>,
            <Button value="other">Other</Button>,
            status === 'response' && <Button.Reset>Start Again</Button.Reset>,
        ],
    })

}

