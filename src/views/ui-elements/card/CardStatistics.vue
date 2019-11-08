<template>
  <div>
    <!-- ROW 1 -->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="subscribersGained.analyticsData"
          icon="UsersIcon"
          :statistic="subscribersGained.analyticsData.subscribers | k_formatter"
          statisticTitle="Subscribers Gained"
          :chartData="subscribersGained.series"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="revenueGenerated.analyticsData"
          icon="DollarSignIcon"
          :statistic="revenueGenerated.analyticsData.revenue | k_formatter"
          statisticTitle="Revenue Generated"
          :chartData="revenueGenerated.series"
          color="success"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="quarterlySales.analyticsData"
          icon="ShoppingCartIcon"
          :statistic="quarterlySales.analyticsData.sales"
          statisticTitle="Quarterly Sales"
          :chartData="quarterlySales.series"
          color="danger"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="ordersRecevied.analyticsData"
          icon="ShoppingBagIcon"
          :statistic="ordersRecevied.analyticsData.orders | k_formatter"
          statisticTitle="Orders Received"
          :chartData="ordersRecevied.series"
          color="warning"
          type="area"
        />
      </div>
    </div>

    <!-- ROW 2 -->
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MonitorIcon"
          icon-right
          statistic="78.9k"
          statisticTitle="Site Traffic"
          :chartData="siteTraffic.series"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="UserCheckIcon"
          icon-right
          statistic="659.8k"
          statisticTitle="Active Users"
          :chartData="activeUsers.series"
          color="success"
        />
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <statistics-card-line
          icon="MailIcon"
          icon-right
          statistic="28.7k"
          statisticTitle="Newsletter"
          :chartData="newsletter.series"
          color="warning"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";

export default {
  components: {
    StatisticsCardLine
  },
  data() {
    return {
      // Area charts
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},

      // Line Charts
      siteTraffic: {},
      activeUsers: {},
      newsletter: {}
    };
  },
  created() {
    // Subscribers gained
    this.$http
      .get("/api/card/card-statistics/subscribers")
      .then(response => {
        this.subscribersGained = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Revenue Generated
    this.$http
      .get("/api/card/card-statistics/revenue")
      .then(response => {
        this.revenueGenerated = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Sales
    this.$http
      .get("/api/card/card-statistics/sales")
      .then(response => {
        this.quarterlySales = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Orders
    this.$http
      .get("/api/card/card-statistics/orders")
      .then(response => {
        this.ordersRecevied = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Site Traffic gained
    this.$http
      .get("/api/card/card-statistics/site-traffic")
      .then(response => {
        this.siteTraffic = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Active Users
    this.$http
      .get("/api/card/card-statistics/active-users")
      .then(response => {
        this.activeUsers = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    // Site Traffic gained
    this.$http
      .get("/api/card/card-statistics/newsletter")
      .then(response => {
        this.newsletter = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
