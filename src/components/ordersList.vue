<template>
  <div class="usersList">
    <h1 class="usersList__title">Orders list</h1>
  </div>

  <div class="usersList__list">
    <div class="usersList__top">
      <div class="usersList__top-search">
        <input
          type="text"
          class="usersList__search"
          v-model="searchValue"
          placeholder="search for orders (Firstname, lastname, mail)"
        />
      </div>
    </div>

    <table>
      <thead>
        <th>ID</th>
        <th>Email</th>
        <th>Firstname & lastname</th>
        <th>$ Brutto</th>
        <th>Status</th>
        <th>Akcje</th>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in filteredItems().slice(
            (page - 1) * rowsPerPage,
            rowsPerPage * page
          )"
          :key="index"
        >
          <td>{{ order.id }}</td>
          <td>{{ order.user.email }}</td>
          <td>{{ order.user.firstname }} {{ order.user.lastname }}</td>
          <td>{{ order.brutto }} $</td>
          <td>
            <span :class="'status-' + order.status">
              {{ statusses[order.status] }}
            </span>
          </td>
          <td>
            <button>Szczegóły</button>
            <button>Anuluj</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="!searchValue" class="usersList__pagination">
    <button
      v-for="index in filteredItems()?.length / rowsPerPage"
      :key="index"
      class="usersList__pagination-item"
      :class="{ active: index === page }"
      @click="page = index"
    >
      {{ index }}
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import data from "../data/orders.json";

export default {
  name: "ordersList",
  components: {},
  setup() {
    const store = useStore();
    store.dispatch("getUsersData");
    const ordersData = data;
    let searchValue = ref("");
    let rowsPerPage = ref(3);
    let page = ref(1);

    const statusses = ["New", "Paid", "Unpaid"];

    const filteredItems = () => {
      if (searchValue.value) {
        rowsPerPage.value = data.orders.length;
      } else {
        rowsPerPage.value = 3;
      }
      return ordersData.orders?.filter((item) => {
        let name = item.user.firstname + item.user.lastname + item.user.email;
        return name.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1;
      });
    };

    return {
      ordersData,
      filteredItems,
      searchValue,
      rowsPerPage,
      page,
      statusses,
    };
  },
};
</script>
