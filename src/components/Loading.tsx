import React, { PureComponent } from 'react';
import LoadingGif from '../assets/loading.gif';

class Loading extends PureComponent {
  
  render() {
    return (
      <div>
        <img width="50" src={LoadingGif} alt="Loading"/>
      </div>
    );
  }
};

export default Loading;