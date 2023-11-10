import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "../../store/slices/flatsSlice";

const Flats = ({ selectedHouseId }) => {
    const dispatch = useDispatch();

    const selectedFlatId = useSelector((state) => state.flats.selectedFlatId);
    const flats = useSelector((state) => state.flats.flats[selectedHouseId]);

    const getClients = (e, flat) => {
        e.stopPropagation();
        if (flat.addressId !== selectedFlatId) {
            dispatch(actions.setSelectedFlatId(flat.addressId));
            dispatch(actions.setSelectedFlat(flat));
        } else {
            dispatch(actions.setSelectedFlatId(null));
            dispatch(actions.setSelectedFlat({}));
        }
    };

    return (
        <ul>
            {flats?.map((flat) => {
                return (
                    <li key={flat.addressId} onClick={(e) => getClients(e, flat)}>
                        <div>{flat.flat}</div>
                    </li>
                );
            })}
            <div></div>
        </ul>
    );
};

export default Flats;
