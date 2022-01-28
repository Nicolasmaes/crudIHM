<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ info.data }}</p>
    <h3>add user, press enter</h3>
    <br />
    <span class="p-float-label">
      <InputText
        class="p-inputtext-lg"
        id="username"
        type="text"
        v-model="data"
        v-on:keyup.enter="
          createUser(data);
          resetInput();
        "
      />
      <label for="username">username</label>
    </span>

    <h3>to modify them</h3>
    <ul>
      <li v-for="(item, idx) in info.data" :key="item.username">
        <p class="capitalize">{{ item.username }}</p>

        <span class="p-float-label">
          <InputText
            id="username"
            type="text"
            v-model="dataUpdated"
            v-on:keyup.enter="
              updateUser(idx, dataUpdated);
              resetInput();
            "
          />
          <label for="username">update</label>
        </span>
        <Button
          label="delete"
          class="p-button-raised p-button-rounded p-button-warning"
          v-on:click="deleteUser(item.username, idx)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      info: {},
    };
  },

  mounted() {
    axios
      .get("http://localhost:8000/users")
      .then((response) => (this.info = response));
  },
  methods: {
    resetInput() {
      this.data = "";
      this.dataUpdated = "";
      console.log("effacement ok");
    },
    updateUser(idx, dataUpdated) {
      axios
        .put("http://localhost:8000/users/" + this.info.data[idx].username, {
          username: dataUpdated,
        })
        .then(() => (this.info.data[idx].username = dataUpdated))
        .catch((error) => {
          error.response.status;
        });
      console.log(this.info.data[idx].username); //string
      console.log(dataUpdated); //string
      console.log(idx); //number
    },
    deleteUser(id, idx) {
      axios
        .delete("http://localhost:8000/users/" + id)
        .then(() => this.info.data.splice(idx, 1));
    },

    createUser(data) {
      axios
        .post("http://localhost:8000/users/", {
          username: data,
        })
        .then((response) => this.info.data.push(response.data))
        .catch((error) => {
          error.response.status;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  padding: 10px;
  border: 1px solid rgba(15, 15, 112, 0.61);
  border-radius: 15px;
  margin: 4px;
}
a {
  color: #42b983;
}
.capitalize::first-letter {
  text-transform: capitalize;
}
.p-inputtext {
  border-radius: 10px;
}
</style>