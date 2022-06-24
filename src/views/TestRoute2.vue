<template>
  <div>
    <h1 style="text-align: center; color: rgb(27, 114, 53)">GeeksforGeeks</h1>

    <h3 style="text-align: center">Vue.js | Watchers</h3>

    <!-- Creating element for Vue -->
    <div style="text-align: center" id="ex">
      <h3>
        Enter any Value :
        <input type="text" v-model="value1" />
      </h3>
      <h3>
        Input number x 2 :
        <span style="font-size: 30px">
          {{ result }}
        </span>
      </h3>
    </div>
  </div>
</template>

<script>
// import { ref, watch } from '@vue/composition-api';

export default {
  name: 'Testroute2',
  data: {
                // Setting values for fields
                value1: '',
                result: 0
            },
            // Creating a Watcher
            watch: {

                // Creating function for
                // input component
                value1: function (val) {
                    this.value1 = val;
                    this.result = 2 * val;
                },

                // Creating function for
                // result component
                result: function (val) {
                    this.result = val;
                }
            }

//   data() {
//     return {
//       qus: '',
//       ans: 'first answer'
//     };
//   },
//   watch: {
//     qus() {
//       if (qus.indexOf('?') > -1) {
//         this.func();
//       }
//     }
//   },
//   methods: {
//     func: function () {
//       this.ans = 'thinking........';
//     }
  }
  // const qus = ref('');
  // const ans = ref('first answer');

  // watch(qus, (newqus, oldqus) => {
  //   console.log(newqus);
  //   if (newqus.indexOf('?') > -1) {
  //     this.func();
  //   }
  // });
  // const funct = () => {
  //   this.ans = 'thinking....';
  // };

  // return {
  //   qus,
  //   ans,
  //   funct
  // };
  //   }
};
</script>
