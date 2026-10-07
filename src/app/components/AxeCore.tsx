"use client";

import React, { useEffect } from "react";

export default function AxeCore() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            Promise.all([
                import("react-dom"),
                import("@axe-core/react")
            ]).then(([ReactDOM, axe]) => {
                axe.default(React, ReactDOM, 1000);
            });
        }
    }, []);

    return null;
}