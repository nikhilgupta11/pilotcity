<template>
  <div class="monitor__activities">
    <v-data-table
      :headers="header"
      :items="filteredActivities"
      sort-by="resource"
      :items-per-page="100"
      :hide-default-footer="true"
    >
      <template #item.click="{ item }">
        <v-btn
          :dark="item.unlocked"
          class="font-weight-black"
          depressed
          rounded
          small
          :disabled="!item.unlocked"
          :ripple="false"
          @click="handleMonitorButtonClick(item)"
          ><v-icon small left>mdi-magnify</v-icon>Monitor</v-btn
        >
      </template>

      <template #item.activity="{ item }">
        <div class="font-weight-bold body-1">
          {{ item.activity.charAt(0).toUpperCase() + item.activity.slice(1) }}
        </div>
      </template>

      <template #item.progress>
        <v-progress-linear color="green" value="90"></v-progress-linear>
      </template>

      <template #item.status="{ item }">
        <v-icon v-if="item.unlocked" color="green" dark>mdi-lock-open</v-icon>
        <!-- <v-icon v-else color="orange" dark>mdi-alert-circle</v-icon> -->
        <v-icon v-else color="red" dark>mdi-lock</v-icon>
      </template>

      <template #item.type>
        <!-- <v-chip color="red darken-4" dark small label disabled>Activity</v-chip> -->
        <v-chip color="purple darken-4" dark outlined small disabled>Deliverable</v-chip>
        <!-- <v-chip color="orange darken-4" dark small label disabled>Tool</v-chip> -->
      </template>

      <template #item.completedTime="{ item }">
        {{
          item.completedTime
            ? formatDate(item.completedTime)
            : item.activity === 'start'
            ? 'Completed at start'
            : item.completed
            ? 'Completed'
            : 'Not completed yet'
        }}
      </template>

      <template #item.group>
        <v-chip color="blue darken-4" dark x-small label disabled>Research</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { computed, defineComponent, ref, PropType } from '@vue/composition-api';

import { MONITOR_HEADER } from '@/constants/monitor';

export default defineComponent({
  name: 'TableView',
  props: {
    selectedStudent: {
      required: true,
      type: Object
    },
    studentAdks: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    teamAdks: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    programAdks: {
      required: true,
      type: Array as PropType<Array<Record<string, any>>>
    },
    activityFilter: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const adks = [
      'start',
      'scope',
      'community',
      'team',
      'train',
      'research',
      'tinker',
      'ideate',
      'pitch',
      'forum',
      'make',
      'demo',
      'interview',
      'offer'
    ];
    const teamAdks = ['tinker', 'ideate', 'pitch', 'forum', 'make', 'demo'];
    const filteredActivities = computed(() => {
      const studentData = adks.map((programAdk, index) => {
        let adkListToLookIn;
        if (teamAdks.includes(programAdk)) adkListToLookIn = props.teamAdks;
        else adkListToLookIn = props.studentAdks;
        const studentAdk = adkListToLookIn.find(
          adk => adk.name && adk.name.toLowerCase() === programAdk
        );
        return {
          index: index + 1,
          activity: programAdk,
          unlocked: studentAdk !== undefined || programAdk === 'start',
          completion: (studentAdk && (studentAdk.completed || studentAdk.isComplete)) || false,
          completedTime: (studentAdk && studentAdk.completed) || ''
        };
      });
      if (!props.activityFilter) return studentData;
      const index =
        studentData.findIndex(
          item => item.activity.toLowerCase() === props.activityFilter.toLowerCase()
        ) + 1;
      return studentData.slice(0, index >= 0 ? index : studentData.length - 1);
    });

    const lastUnlockedIndex = computed(() => {
      let lastUnlockedIndex = 0;
      adks.forEach((programAdk, index) => {
        const studentAdk = props.studentAdks.find(
          adk => adk.name && adk.name.toLowerCase() === programAdk
        );
        if (studentAdk !== undefined) lastUnlockedIndex = index;
      });
      return lastUnlockedIndex;
    });

    const formatDate = (date: Date) => {
      return moment(date).fromNow();
    };

    const handleMonitorButtonClick = item => {
      context.emit('monitor-click', {
        page: item.index - 1
      });
    };

    return {
      header: ref(MONITOR_HEADER),
      filteredActivities,
      lastUnlockedIndex,
      formatDate,
      handleMonitorButtonClick
    };
  }
});
</script>

<style lang="scss">
.monitor {
  &__activities {
    width: 100%;
  }
}
</style>
