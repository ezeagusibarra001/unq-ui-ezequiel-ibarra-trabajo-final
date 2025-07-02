import React, { type JSX } from 'react';
import styles from './Container.module.scss';

type FlexDirection = 'row' | 'col';
type Align = 'start' | 'center' | 'end' | 'stretch';
type Justify = 'start' | 'center' | 'end' | 'space-between' | 'space-around';

type ContainerProps = {
  direction?: FlexDirection;
  gap?: string;
  align?: Align;
  justify?: Justify;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
};

export default function Container({
  direction = 'col',
  gap = '1rem',
  align = 'start',
  justify = 'start',
  className = '',
  as: Tag = 'div',
  children,
}: ContainerProps) {
  return (
    <Tag
      className={`${styles.container} ${className}`}
      style={{
        flexDirection: direction === 'row' ? 'row' : 'column',
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
    >
      {children}
    </Tag>
  );
}
