<template>
  <div class="balance-view__entire-body">
    <IndexTable v-slot="{ indexedItems, indexHandler }" :items="items">
      <v-data-table
        :headers="header"
        :items="indexedItems"
        sort-by="index"
        @current-items="indexHandler"
      >
      </v-data-table>
    </IndexTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from '@vue/composition-api';
import moment from 'moment';
import { keyBy } from 'lodash';

import IndexTable from '@/components/IndexTable.vue';
import { Transaction, TransactionQueryInput, User, UserQueryInput } from '@/generated/graphql';
import { useUserGetters } from '@/store';
import { BALANCE_HEADER } from '@/constants/portfolio';
import { GET_TRANSFER_HISTORY, GET_NAMES } from '@/services/graphql/queries';

export default defineComponent({
  name: 'BalanceView',
  components: {
    IndexTable
  },
  setup(
    _props,
    {
      root: {
        $apolloProvider: {
          defaultClient: { query }
        }
      }
    }
  ) {
    const { getObjectId } = useUserGetters(['getObjectId']);
    const tableItems: Ref<any> = ref([]);

    const process = () => {
      query<{ transaction: Transaction }>({
        query: GET_TRANSFER_HISTORY,
        variables: {
          query: { _id: getObjectId.value }
        } as TransactionQueryInput
      }).then(({ data: { transaction } }) => {
        if (transaction && transaction.tokenLog)
          query<{ users: User[] }>({
            query: GET_NAMES,
            variables: {
              nameQuery: {
                OR: [...transaction.tokenLog.map(item => ({ _id: item!.sentTo }))]
              } as UserQueryInput
            }
          }).then(({ data: { users } }) => {
            const keyedUsers = keyBy(users, '_id');
            tableItems.value = transaction.tokenLog!.map(log => {
              const userAccess = keyedUsers[log?.sentTo || log?.receivedFrom];
              if (!userAccess) return {};
              return {
                name: `${userAccess.firstName} ${userAccess.lastName}`,
                date: moment(log!.timestamp).fromNow(),
                amount: `${log!.tokensSent}`
              };
            });
          });
      });
    };

    onMounted(() => {
      process();
    });

    return {
      header: ref(BALANCE_HEADER),
      items: tableItems,
      process
    };
  }
});
</script>

<style lang="scss" scoped>
.balance-view {
  &__entire-body {
    width: 100%;
    padding: 0px 10px 0px 10px;
  }
}
</style>
