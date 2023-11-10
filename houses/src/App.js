import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import Clients from "./components/clients";
import Streets from "./components/streets";
import commonService from "./services/endpoints/commonService";
import { actions as flatsActions } from "./store/slices/flatsSlice";
import { actions as housesActions } from "./store/slices/housesSlice";
import { actions } from "./store/slices/streetSlice";

function App() {
    const dispatch = useDispatch();
    const selectedStreetId = useSelector((state) => state.streets.selectedStreetId);

    useEffect(() => {
        (async () => {
            const response = await commonService.getAllStreets();
            dispatch(actions.setStreets(response.data));
        })();
    }, [dispatch]);

    const getStreetHouses = (id) => {
        if (selectedStreetId !== id) {
            (async () => {
                const response = await commonService.getStreetHouses(id);
                const responseFlats = await commonService.getAllFlats({ streetId: `${id}` });
                dispatch(housesActions.setHouses(response.data));
                dispatch(actions.setSelectedStreetId(id));

                const flatsOfHouse = {};

                responseFlats.data.forEach((item) => {
                    const { clients, houseId, streetId, streetName, addressId, flat } = item;

                    if (!flatsOfHouse[houseId]) {
                        flatsOfHouse[houseId] = [
                            {
                                streetId,
                                streetName,
                                addressId,
                                houseId,
                                flat,
                                clients: [...clients],
                            },
                        ];
                    } else {
                        flatsOfHouse[houseId].push({
                            streetId,
                            streetName,
                            addressId,
                            houseId,
                            flat,
                            clients: [...clients],
                        });
                    }
                });
                dispatch(flatsActions.setFlats(flatsOfHouse));
            })();
        } else {
            dispatch(actions.setSelectedStreetId(null));
            dispatch(housesActions.setSelectedHouseId(null));
            dispatch(flatsActions.setSelectedFlatId(null));
            dispatch(flatsActions.setSelectedFlat({}));
        }
    };

    return (
        <div className="App">
            <main className={styles.main}>
                <aside className={styles.aside}>
                    <Streets getStreetHouses={getStreetHouses} />
                </aside>
                <section className={styles.tableSection}>
                    <Clients />
                </section>
            </main>
        </div>
    );
}

export default App;
