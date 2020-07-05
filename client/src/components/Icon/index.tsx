import React from 'react';
import classNames from 'classnames';
// import style from './style.module.scss';

type PropTypes = {
  icon: string;
  className?: string;
};

function Icon({ icon, className }: PropTypes) {
  const iconClass = classNames('material-icons', className);
  return <i className={iconClass}>{icon}</i>;
}

export default Icon;
