import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            {/* Add your custom <script> tag here */}
           
          </Head>
          <body>
            <Main />
            <NextScript />
          
          </body>
        </Html>
      );
    }
  }
  
  export default MyDocument;
  