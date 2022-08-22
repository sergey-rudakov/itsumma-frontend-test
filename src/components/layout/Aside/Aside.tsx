import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import aside from "./Aside.module.scss";

interface IAside {
    className?: string;
}

const Aside: React.FC<PropsWithChildren<IAside>> = ({ className, children }) => {
    return (
        <aside className={classNames(aside.container, className)}>
            {children}
        </aside>
    );
};

export { Aside };
