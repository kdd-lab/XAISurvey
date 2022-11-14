<template>
  <b-card
    img-top
    class="mb-2" style="max-width: 20rem;"
    no-body
  >
    <b-card-img v-if="data.cover_image" :src="data.cover_image"></b-card-img>
    <b-card-img v-else src='./static/cover_images/gialloXAI.png'></b-card-img>
    <b-card-body>
      
      <b-card-title>{{data.name.short}}</b-card-title>
      <b-card-subtitle>{{data.name.long}}</b-card-subtitle>
      
    </b-card-body>
    <b-card-body>
      {{data.description}}
      <b-button v-if="data.link_to_code.length" size="sm" variant="dark" :href="data.link_to_code">Code</b-button>
    </b-card-body>
      


    <b-card-footer>
      <div>
        <b-badge>{{data.data_type}}</b-badge>
        <b-badge>{{data.in_ph}}</b-badge>
        <b-badge>{{data.glo_loc}}</b-badge>
        <b-badge>{{data.agn_spec}}</b-badge>
      </div>
    </b-card-footer>
  </b-card>
</template>

<script>


export default {
  name: 'PatientView',
  data() {
    return {
      
    };
  },
  props: {
    data: {
      type: Object,
      default(rawprops) {
        return {
          type: "Feature Importance",
          data_type: "ANY",
          in_ph: "PH",
          glo_loc: "L",
          agn_spec: "A",
          name: {
              "short": "SHORT",
              "long": "Title"
          },
          reference: "",
          authors: "Authors",
          year: "2015",
          title: "Paper title",
          venue: "venue",
          cover_image: "https://via.placeholder.com/800x200.png",
          link_to_code: "",
          description: ""
        }
      },
    },
    title: {
      type: String,
      default: 'Patient',
    },
  },
};
</script>

<style scoped>

</style>
