<template>
  <div class="d-flex align-center justify-center" style="height: 100%">
    <v-progress-circular :size="100" :width="7" color="blue" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { useDbGetters, useDbState, useUserGetters } from '@/store';
import { watchEffect } from '@vue/composition-api';

export default {
  setup(props, ctx) {
    const { collection } = useDbGetters(['collection']);
    const { user } = useDbState(['user']);

    function redirect() {
      collection.value!('Student')
        .findOne({ participant_id: user.value?._id }, { sort: { lastSaved: -1 } })
        .then(res => {
          if (res) {
            ctx.root.$router.push({
              name: 'guide',
              params: { programId: res.program_id.toString(), page: '0' }
            });
          } else {
            ctx.root.$router.push({ name: 'portfolio' });
          }
        });
    }

    watchEffect(() => {
      if (user.value?._id) {
        redirect();
      }
    });

    return { redirect };
  }
};
</script>
