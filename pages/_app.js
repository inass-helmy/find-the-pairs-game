import React from "react";
import App from "next/app";
import withReduxSaga from "next-redux-saga";
import "../styles/antd.less";
import wrapper from "../src/store/index";

class GameApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(withReduxSaga(GameApp));
