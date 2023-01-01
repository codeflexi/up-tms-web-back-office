<template>
    <section class="address">
      <h2>{{ label }}</h2>
      <div class="address__field">
        <label for="streetName">Street name</label>
        <input
          type="text"
          id="streetName"
          :value="streetName"
          @input="$emit('update:streetName', $event.target.value)"
          required
        />
      </div>
      <div class="address__field">
        <label for="streetNumber">Street number</label>
        <input
          type="text"
          id="streetNumber"
          :value="streetNumber"
          @input="$emit('update:streetNumber', $event.target.value)"
          required
        />
      </div>
      <div class="address__field">
        <label for="city">City</label>
        <input
          type="text"
          id="city"
          :value="city"
          @input="$emit('update:city', $event.target.value)"
          required
        />
      </div>
      <div class="address__field">
        <label for="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          :value="postcode"
          @input="$emit('update:postcode', $event.target.value)"
          required
        />
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "AddressFieldGroup",
    props: {
      label: {
        type: String,
        default: "",
      },
      streetName: {
        type: String,
        default: "",
      },
      streetNumber: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      postcode: {
        type: String,
        default: "",
      },
    },
  };
  </script>