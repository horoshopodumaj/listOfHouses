import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { actions as flatsActions } from "../../store/slices/flatsSlice";
import { actions } from "../../store/slices/housesSlice";
import Flats from "../flats";

const Houses = ({ getStreetHouses }) => {
    const dispatch = useDispatch();

    const houses = useSelector((state) => state.houses.houses);
    const selectedHouseId = useSelector((state) => state.houses.selectedHouseId);

    const getHouses = (e, id) => {
        e.stopPropagation();
        if (id !== selectedHouseId) {
            dispatch(actions.setSelectedHouseId(id));
        } else {
            dispatch(actions.setSelectedHouseId(null));
            dispatch(flatsActions.setSelectedFlatId(null));
            dispatch(flatsActions.setSelectedFlat({}));
        }
    };

    return (
        <ul>
            {houses?.map((house) => (
                <li key={house.id} onClick={(e) => getHouses(e, house.id)}>
                    <div>{house.name}</div>
                    {house.id === selectedHouseId && <Flats selectedHouseId={selectedHouseId} />}
                </li>
            ))}
            <div></div>
        </ul>
    );
};

export default Houses;
