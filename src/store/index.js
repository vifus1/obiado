import { createStore } from "vuex";
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";

const API_HOST = "https://reqres.in";
const USERS_LIST = `${API_HOST}/api/users?page=`;
const USERS = `${API_HOST}/api/users/`;
const notification = useNotification();

export default createStore({
  state: {
    usersData: [],
    userData: [],
    userUpdateStatus: [],
    userAddStatus: [],
  },
  mutations: {
    addUsersData(state, data) {
      state.usersData = data;
    },
    addUserData(state, data) {
      state.userData = data;
    },
    addUserUpdateStatus(state, data) {
      state.userUpdateStatus = data;
    },
    addUserAddStatus(state, data) {
      state.userAddStatus = data;
    },
  },
  actions: {
    getUsersData(context, page = 1) {
      axios.get(USERS_LIST + page).then((response) => {
        context.commit("addUsersData", response.data);
      });
    },
    getUserData(context, id) {
      axios.get(USERS + id).then((response) => {
        context.commit("addUserData", response.data);
      });
    },
    deleteUser(context, uid) {
      axios.delete(USERS + uid, { _method: "delete" }).then((response) => {
        notification.notify({
          type: "success",
          title: "Deleted successfully, status: " + response.status,
        });
      });
    },
    updateUser(context, payload) {
      axios.patch(USERS + payload.uid, payload).then((response) => {
        context.commit("addUserUpdateStatus", response);
        notification.notify({
          type: "success",
          title: "Updated successfully, status: " + response.status,
        });
      });
    },
    addUser(context, payload) {
      axios
        .post(USERS, payload)
        .then((response) => {
          context.commit("addUserAddStatus", response);
          notification.notify({
            type: "success",
            title: "Added successfully, status: " + response.status,
          });
        })
        .catch((error) => {
          notification.notify({
            type: "error",
            title: "Error: " + error.response.data.data,
          });
        });
    },
  },
  getters: {
    getUsersData(state) {
      return state.usersData;
    },
    getUserData(state) {
      return state.userData;
    },
    getUserUpdateStatus(state) {
      return state.userUpdateStatus;
    },
    getUserAddStatus(state) {
      return state.userAddStatus;
    },
  },
});
