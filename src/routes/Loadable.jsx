import React from 'react';
import Loadable from 'react-loadable';
import LoadingComponent from '@components/Loading';

// 通用过场组件
const Loading = ({ error, pastDelay }) => {
    if(error) {
      return <div>Error...</div>
    } else if (pastDelay) {   // 是否超过过场时间
      return <LoadingComponent/>
    } else {
      return null
    }
  }

  const LoadableComponent = (loader, loading=Loading) => {
    return Loadable({
      loader,
      loading,
      delay: 20,    // 过场时间超过300ms时显示过场组件
    })
  }

  export default LoadableComponent;
