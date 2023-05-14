<template>
  <div class="mt-12 d-flex-auto d-flex align-items-center">
    <span class="mr-4 pl-8">
      <span>Page</span>
      <span class="mx-1">{{ selectedPage }}</span>
      <span>of </span>
      <span>{{ total_pages }}</span>
    </span>
    <v-spacer />
    <v-pagination
      :value="selectedPage"
      @input="changePage"
      :length="total_pages"
      :total-visible="totalItemsVisible"
    />
    <v-spacer />
    <span>Items per page</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark text color="primary" class="ml-2 pr-6" v-bind="attrs" v-on="on">
          {{ pagination_items_per_page }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="changeNumberOfItemsVisible(number)"
        >
          <v-list-item-title>
            {{ number }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
const DEFAULT_ITEMS_PER_PAGE = 20;
export default {
  props: {
    pageCount: {
      type: Number,
      default: 1,
    },
    totalItemsVisible: {
      type: Number,
      default: 7,
    },
    count: {
      type: Number,
      default: 1,
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      itemsPerPageArray: [10, 20, 30],
      itemsPerPage: 10,
      selectedPage: 1,
    };
  },
  computed: {
    total_pages() {
      return Math.ceil(this.count / this.itemsPerPage);
    },
    pagination_items_per_page() {
      if (this.pagination == null) return DEFAULT_ITEMS_PER_PAGE;
      if (this.pagination?.limit > this.total_pages) return this.total_pages;
      return this.pagination.limit;
    },
  },
  methods: {
    changePage(selectedPage) {
      this.selectedPage = selectedPage;
      let offset;
      if (selectedPage === 1) offset = 0;
      if (selectedPage !== 1) offset = selectedPage * this.itemsPerPage - 10;
      this.$emit("changePage", offset, this.itemsPerPage);
    },
    changeNumberOfItemsVisible(number) {
      this.itemsPerPage = number;
      this.$emit("changePage", this.pagination.offset, this.itemsPerPage);
    },
  },
};
</script>
