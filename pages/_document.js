import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            {/* Add your custom <script> tag here */}
            <script src="https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"></script>
          </Head>
          <body>
            <Main />
            <NextScript />
            <script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.js" charset="utf-8" async></script>
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;
  