import api from "../api";

const actions = {
    getAllStreets: async () => await api.get("/Request/streets"),
    getStreetHouses: async (idStreet) => await api.get(`/Request/houses/${idStreet}`),
    getAllFlats: async (params) => await api.get(`/HousingStock/`, { params }),
    createClient: async (data) => await api.post(`/HousingStock/client`, data),
    deleteClient: async (id) => await api.delete(`/HousingStock/bind_client/${id}`),
    addClient: async (data) => await api.put(`/HousingStock/bind_client`, data),
};

export default actions;
