import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { emailRegex, phoneNumberRegex } from "../../common/const";
import commonService from "../../services/endpoints/commonService";
import styles from "./clients.module.css";

// const clients = [
//     {
//         Name: "Test",
//         Email: "test@test.com",
//         Phone: "+79876541232",
//         id: 1,
//     },
//     {
//         Name: "Test2",
//         Email: "test2@test.com",
//         Phone: "+79876541232",
//         id: 2,
//     },
//     {
//         Name: "Test3",
//         Email: "test3@test.com",
//         Phone: "+79876541232",
//         id: 3,
//     },
//     {
//         Name: "Test4",
//         Email: "test4@test.com",
//         Phone: "+79876541232",
//         id: 4,
//     },
//     {
//         Name: "Test5",
//         Email: "test5@test.com",
//         Phone: "+79876541232",
//         id: 5,
//     },
//     {
//         Name: "Test6",
//         Email: "test6@test.com",
//         Phone: "+79876541232",
//         id: 6,
//     },
//     {
//         Name: "Test7",
//         Email: "test7@test.com",
//         Phone: "+79876541232",
//         id: 7,
//     },
//     {
//         Name: "Test8",
//         Email: "test8@test.com",
//         Phone: "+79876541232",
//         id: 8,
//     },
//     {
//         Name: "Test9",
//         Email: "test9@test.com",
//         Phone: "+79876541232",
//         id: 9,
//     },
//     {
//         Name: "Test10",
//         Email: "test10@test.com",
//         Phone: "+79876541232",
//         id: 10,
//     },
// ];

const Clients = () => {
    const dispatch = useDispatch();
    const flat = useSelector((state) => state.flats.selectedFlat);
    const [form, setForm] = useState({
        Name: "",
        Email: "",
        Phone: "",
    });

    const [error, setError] = useState({
        Name: false,
        Email: false,
        Phone: false,
    });

    const disabledButton = !form.Email || !form.Name || !form.Phone || error.Email || error.Phone || error.Name;

    const changeHandler = (event) => {
        if (event.target.name === "Email") {
            if (emailRegex.test(event.target.value)) {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,
                });
                setError({ ...error, [event.target.name]: false });
            } else {
                setError({ ...error, [event.target.name]: true });
            }
        }
        if (event.target.name === "Phone") {
            if (phoneNumberRegex.test(event.target.value)) {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value,
                });
                setError({ ...error, [event.target.name]: false });
            } else {
                setError({ ...error, [event.target.name]: true });
            }
        }
        if (event.target.name === "Name") {
            if (event.target.value.length > 0) {
                setForm({
                    ...form,
                    [event.target.name]: event.target.value.trim(),
                });
                setError({ ...error, [event.target.name]: false });
            } else {
                setError({ ...error, [event.target.name]: true });
            }
        }
    };

    const addClient = async (e) => {
        e.preventDefault();

        const response = await commonService.createClient(form);
        if (response) {
            await commonService.addClient({
                AddressId: flat.addressId,
                ClientId: response.data.id,
            });
            //запрос уходит, клиет не появляется по отправленному flat.addressId
            //здесь можно было ответ от сервера добавить в redux, если бы он возвращал пользователя {name, phone, email}
        } else {
            toast.error("Не удалось добавить жильца. Свяжитесь с разработкой!");
        }
    };

    const deleteClient = async (id) => {
        const response = await commonService.deleteClient(id);
        if (response) {
            //удаление клиента, закомментировано, чтобы не выдавало ошибку сейчас
            // dispatch(actions.deleteCliet(id));
        } else {
            toast.error("Не удалось удалить жильца. Свяжитесь с разработкой!");
        }
    };

    return (
        <div>
            {Object.keys(flat).length === 0 ? (
                <div>Выберите квартиру</div>
            ) : (
                <>
                    <form className={styles.form}>
                        <p>Добавить жильца в квартиру {flat?.flat}</p>
                        <label htmlFor="name">Введите имя</label>
                        <input id="name" name="Name" type="text" placeholder="Имя" onChange={changeHandler} />
                        {error.Name && <span className={styles.error}>Введите имя</span>}
                        <label htmlFor="email">Введите почту</label>
                        <input id="email" name="Email" type="mail" placeholder="Почта" onChange={changeHandler} />
                        {error.Email && <span className={styles.error}>Неверный email</span>}
                        <label htmlFor="phone">Введите телефон</label>
                        <input id="phone" name="Phone" type="phone" placeholder="Телефон" onChange={changeHandler} />
                        {error.Phone && <span className={styles.error}>Неверный номер телефона</span>}
                        <button disabled={disabledButton} className={styles.addButton} onClick={addClient}>
                            Добавить
                        </button>
                    </form>
                    <div className={styles.container}>
                        {flat.clients?.length > 0 ? (
                            flat.clients?.map((client) => (
                                <div className={styles.card} key={client.id}>
                                    <p>{client.Name}</p>
                                    <p>{client.Email}</p>
                                    <p>{client.Phone}</p>
                                    <button onClick={() => deleteClient(client.id)}>Удалить</button>
                                </div>
                            ))
                        ) : (
                            <div>Нет данных</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Clients;
