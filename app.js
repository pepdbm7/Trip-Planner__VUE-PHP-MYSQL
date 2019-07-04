const app = new Vue({
  el: "#app",
  data: {
    editForm: false,
    newForm: true,
    selectedTrip: {
      ID: "",
      where: "",
      when: "",
      who: "",
      budget: ""
    },
    trips: [],
  },
  created() {
    this.showTrips();
  },
  computed: {
    isValid() {
      return (
        this.selectedTrip.where.trim() &&
        this.selectedTrip.when.trim() &&
        this.selectedTrip.who.trim() &&
        this.selectedTrip.budget.trim()
        )
      }
  },
  methods: {
    showTrips() {
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

        axios({
          method: "post",
          url: "http://localhost/vue/crud-vue-php-mysql/api.php?action=create",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(res => {console.log(res); window.location.reload()})
          .catch(error => console.log(error));
    },
    editTrip() {
        let formData = new FormData();
        formData.append("ID", this.selectedTrip.ID);
        formData.append("where", this.selectedTrip.where);
        formData.append("when", this.selectedTrip.when);
        formData.append("who", this.selectedTrip.who);
        formData.append("budget", this.selectedTrip.budget);

        axios({
          method: "post",
          url: "http://localhost/vue/crud-vue-php-mysql/api.php?action=update",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(res => {console.log(res); 
          // window.location.reload()
          })
          .catch(error => console.log(error));
    },
    selected({ ID, Where, When, Who, Budget }) {
      this.selectedTrip.ID = ID;
      this.selectedTrip.where = Where;
      this.selectedTrip.when = When;
      this.selectedTrip.who = Who;
      this.selectedTrip.budget = Budget;
    },
    emptyFields() {
      this.selectedTrip.ID = '';
      this.selectedTrip.where = '';
      this.selectedTrip.when = '';
      this.selectedTrip.who = '';
      this.selectedTrip.budget = '';
    }
  }
});
