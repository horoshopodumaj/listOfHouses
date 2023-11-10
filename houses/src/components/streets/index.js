import React from "react";

import { useSelector } from "react-redux";
import Houses from "../houses";
import styles from "./streets.module.css";

const Streets = ({ getStreetHouses }) => {
    const streets = useSelector((state) => state.streets.streets);
    const selectedStreetId = useSelector((state) => state.streets.selectedStreetId);

    return (
        <div className={styles.box}>
            <ul>
                {streets?.map((street) => {
                    return (
                        <li key={street.id} onClick={() => getStreetHouses(street.id)}>
                            <div>{street.nameWithPrefix}</div>
                            {street.id === selectedStreetId && <Houses />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Streets;
