<template>
    <b-container>
      <b-row>
        <b-col>
          <b-jumbotron bg-variant="light">
            <template #header>Benchmarking and Survey of Explanation Methods
              for Black Box Models</template>

            <template #lead>
              This web application presents a collection of references to eXplainable AI methods.
              The methods exposed can be browsed, filtered and explored by means of a combination
              of multiple filter criteria.
              <hr/>
              <b-button size="sm" class="mb-1" v-b-toggle="'authors'">
              Show list of authors</b-button>
              <b-collapse id="authors">
                <p>This is a joint work of:  </p>
                <b-card title="Francesco Bodria, Fosca Giannotti, Francesca Naretto"
                sub-title="{name.surname}@sns.it">
                  <b-card-text>Scuola Normale Superiore</b-card-text>
                </b-card>
                <b-card title="Riccardo Guidotti, Dino Pedreschi"
                sub-title="{name.surname}@unipi.it">
                  <b-card-text>University of Pisa</b-card-text>
                </b-card>
                <b-card title="Salvatore Rinzivillo"
                sub-title="rinzivillo@isti.cnr.it">
                  <b-card-text>ISTI, CNR</b-card-text>
                </b-card>
              </b-collapse>
            </template>

          </b-jumbotron>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>
            This website provides access to a systematic categorization
            of explanation methods based on the data type and the type of
            explanation methods.
          </p>
          <h3>Taxonomy Dimensions</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Filter by Explanation type">
            <b-form-radio-group
              v-model="expl_type.value"
              :options="expl_type.options"
              name="buttonsAgnSpec"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Filter by data type">
            <b-form-radio-group
              v-model="data_type.value"
              :options="data_type.options"
              name="buttonsDataType"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Filter by Local/Global">
            <b-form-radio-group
              v-model="glo_loc.value"
              :options="glo_loc.options"
              name="buttonsGloLoc"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Filter by In/Ph">
            <b-form-radio-group
              v-model="in_ph.value"
              :options="in_ph.options"
              name="buttonsInPh"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Filter by Agnostic/Specific">
            <b-form-radio-group
              v-model="agn_spec.value"
              :options="agn_spec.options"
              name="buttonsAgnSpec"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        
      </b-row>
      <b-row>
        <b-col>
          <b-card-group deck>
            <MethodViewer v-for="e in entries" :key="e.name.short" :data="e"></MethodViewer>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import crossfilter from 'crossfilter2';
import MethodViewer from '@/components/methodViewer';

let cf; // crossfilter instance to handle the local data cube
let dDataType;
let dGloLoc;
let dInPh;
let dAgnSpec;
let dType;

export default {
  name: 'MethodsBrowser',
  components: {
    MethodViewer,
  },
  data() {
    return {
      entries: [],
        data_type: {
          value: 'All',
          options: ['All'],
        },
        glo_loc: {
          value: 'All',
          options: ['All'],
        },
        in_ph: {
          value: 'All',
          options: ['All'],
        },
        agn_spec: {
          value: 'All',
          options: ['All'],
        },
        expl_type: {
          value: 'All',
          options: ['All'],
        },
    };
  },
  mounted() {
    fetch('./static/methods.json')
      .then(response => response.json())
      .then((data) => {
        

        cf = crossfilter(data);
        dDataType = cf.dimension(d => d.data_type);
        dGloLoc = cf.dimension(d => d.glo_loc);
        dInPh = cf.dimension(d => d.in_ph);
        dAgnSpec = cf.dimension(d => d.agn_spec);
        dType = cf.dimension(d => d.type);

        this.data_type.options = ['All'].concat(dDataType.group().reduceCount().all().map(v => v.key));
        this.data_type.value = this.data_type.options[0];

        this.glo_loc.options = ['All'].concat(dGloLoc.group().reduceCount().all().map(v => v.key));
        this.glo_loc.value = this.glo_loc.options[0];

        this.in_ph.options = ['All'].concat(dInPh.group().reduceCount().all().map(v => v.key));
        this.in_ph.value = this.in_ph.options[0];

        this.agn_spec.options = ['All'].concat(dAgnSpec.group().reduceCount().all().map(v => v.key));
        this.agn_spec.value = this.agn_spec.options[0];

        this.expl_type.options = ['All'].concat(dType.group().reduceCount().all().map(v => v.key));
        this.expl_type.value = this.expl_type.options[0];

        this.refreshList(dDataType);
      });
  },
  methods: {
    refreshList(cfDimension) {
      this.entries = cfDimension.top(Infinity); 
    }
  },
  computed: {
  },
  watch: {
    data_type: {
      handler(newVal, oldVal) {
        if(newVal.value === 'All') {
          dDataType.filter(null);
        }else {
          dDataType.filter(newVal.value)
        }
        this.refreshList(dDataType);
      },
      deep: true,
    },
    glo_loc: {
      handler(newVal, oldVal) {
        if(newVal.value === 'All') {
          dGloLoc.filter(null);
        }else {
          dGloLoc.filter(newVal.value)
        }
        this.refreshList(dGloLoc);
      },
      deep: true,
    },
    in_ph: {
      handler(newVal, oldVal) {
        if(newVal.value === 'All') {
          dInPh.filter(null);
        }else {
          dInPh.filter(newVal.value)
        }
        this.refreshList(dInPh);
      },
      deep: true,
    },
    agn_spec: {
      handler(newVal, oldVal) {
        if(newVal.value === 'All') {
          dAgnSpec.filter(null);
        }else {
          dAgnSpec.filter(newVal.value)
        }
        this.refreshList(dAgnSpec);
      },
      deep: true,
    },
    expl_type: {
      handler(newVal, oldVal) {
        if(newVal.value === 'All') {
          dType.filter(null);
        }else {
          dType.filter(newVal.value)
        }
        this.refreshList(dType);
      },
      deep: true,
    },
  }
};
</script>

<style scoped>
  .predicate{
    font-size: 1.2em;
    padding: 10px 15px;
  }
</style>
