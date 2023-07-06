import React from "react";
export default function Card({ children, width }) {

    return (

        <div

            style={{
                display: "flex",
                background: "#fff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
                padding: "16px",
                width: `${width}`,
                justifyContent: "center",
                alignItems: "center",
                margin: "1em",
            }}
        >
            {children}

        </div>

    );

}