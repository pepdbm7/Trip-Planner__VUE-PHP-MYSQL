const app = new Vue({
  el: "#app",
  data: {
    editForm: false,
    newForm: true,
    selectedTrip: {
      where: "",
      when: "",
      who: "",
      budget: ""
    },
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
        })
        .catch(error => console.log(error));
    },
    createTrip() {
      let formData = new FormData();
      formData.append("where", this.selectedTrip.where);
      formData.append("when", this.selectedTrip.when);
      formData.append("who", this.selectedTrip.who);
      formData.append("budget", this.selectedTrip.budget);

      console.log({ formData });

      var trip = {};

      formData.forEach(function(value, key) {
        trip[key] = value;
      });

      //   formData("where", this.$refs.where.value);
      //   formData("when", this.$refs.when.value);
      //   formData("who", this.$refs.who.value);
      //   formData("budget", this.$refs.budget.value);

      axios({
        method: "post",
        url: "http://localhost/vue/crud-vue-php-mysql/api.php?action=create",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        // .post("http://localhost/vue/crud-vue-php-mysql/api.php?action=create", { formData })
        .then(res => console.log(res))
        .catch(error => console.log(error));
    },
    editTrip() {
      let formData = new FormData();
      formData.append("where", this.selectedTrip.where);
      formData.append("when", this.selectedTrip.when);
      formData.append("who", this.selectedTrip.who);
      formData.append("budget", this.selectedTrip.budget);

      console.log({ formData });

      //   axios.post("http://localhost/vue/crud-vue-php-mysql/api.php?action=retrieve", formData)
      //   .then(res => {})
      //   .catch(error => console.log(error));
    }
  }
});
