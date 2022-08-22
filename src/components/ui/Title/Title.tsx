import classNames from "classnames";
import React, { FC, PropsWithChildren } from "react";
import title from "./Title.module.scss";

interface ITitle {
  className?: string;
  variant?: Sizes;
}

type Sizes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Title: FC<PropsWithChildren<ITitle>> = ({
  className,
  variant = "h2",
  children,
}) => {
  const Tag = `${variant}` as keyof JSX.IntrinsicElements;

  return <Tag className={classNames(title.params, className)}>{children}</Tag>;
};

export { Title };
