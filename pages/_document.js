import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html style={{ height: '100%' }}>
                <Head>
                    <style>{`
                        #__next { height: 100% }
                    `}</style>
                </Head>
                <body style={{ height: '100%' }}>
                    <Main style={{ height: '100%' }} />
                    <NextScript />
                </body>
            </html>
        )
    }
}

export default MyDocument
