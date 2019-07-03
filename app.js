const app = new Vue({
  el: "#app",
  data: {
    editForm: false,
    newForm: true,
    trips: []
  },
  created() {
    this.showTrips();
  },
  watch: {
    trips: function(newValue, oldValue) {
      console.log({ oldValue, newValue });
    }
  },
  methods: {
    showTrips: function() {
      axios
        .get("http://localhost/vue/crud-vue-php-mysql/api.php?action=retrieve")
        .then(res => {
          console.log(res.data.trips);
          //let's put them in the data array:
          this.trips = res.data.trips;
        });
    }
  }
});
