import React from 'react';
import classNames from 'classnames/bind';
import styles from './loadingIndicator.scss';

const cx = classNames.bind(styles);

const defaultProps = {
  center: true,
  fullscreen: true,
};

const LoadingIndicator = ({
  center = true,
  className,
  fullscreen = true,
}) => (
  <div className={cx({ center, fullscreen }, className)}>Loading...</div>
);

LoadingIndicator.defaultProps = defaultProps;

export default LoadingIndicator;
