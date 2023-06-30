import React, { Component } from 'react';
import Lottie, { Options } from 'react-lottie';
import animationData from '../public/wloader.json';

interface LottieControlState {
  isStopped: boolean;
  isPaused: boolean;
}

export default class LottieControl extends Component<{}, LottieControlState> {
  constructor(props: {}) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    const buttonStyle: React.CSSProperties = {
      display: 'block',
      margin: '10px auto',
    };

    const defaultOptions: Options = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <div >
        <Lottie
          options={defaultOptions}
          height={300}
          width={300}
        />
      </div>
    );
  }
}
