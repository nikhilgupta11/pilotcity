<template>
  <div class="all-invites__entire-body">
    <IndexTable v-slot="{ indexedItems, indexHandler }" :items="items">
      <v-data-table
        :headers="header"
        :items="indexedItems"
        sort-by="index"
        @current-items="indexHandler"
      />
    </IndexTable>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from '@vue/composition-api';
import { keyBy } from 'lodash';

import IndexTable from '@/components/IndexTable.vue';
import { TransactionQueryInput, UserQueryInput } from '@/generated/graphql';
import { useUserGetters } from '@/store';
import { ALL_INVITE_HEADER } from '@/constants/portfolio';
import { REFFERERAL_LOG, REFERAL_LOG_USERS } from '@/services/graphql/queries';

export default {
  name: 'AllInvites',
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
    const tableItems: Ref<any> = ref([]);
    query({
      query: REFFERERAL_LOG,
      variables: {
        input: {
          _id: useUserGetters(['getId']).getId.value
        } as TransactionQueryInput
      }
    }).then(({ data: { transaction } }) => {
      if (transaction?.referral)
        query({
          query: REFERAL_LOG_USERS,
          variables: {
            input: {
              OR: [...transaction.referral?.map(log => ({ email: log!.sentTo }))]
            } as UserQueryInput
          }
        }).then(({ data: { users } }) => {
          const usersByEmail = keyBy(users, 'email');
          tableItems.value = transaction.referral?.map(log => ({
            contact: log?.sentTo,
            date: log?.timestamp,
            status: usersByEmail[log!.sentTo!] ? 'Accepted' : 'Pending'
          }));
        });
    });

    return {
      header: ref(ALL_INVITE_HEADER),
      items: tableItems
    };
  }
};
</script>

<style lang="scss">
.all-invites {
  &__entire-body {
    width: 100%;
    padding: 0px 10px 0px 10px;
    @media (max-width: 767px) {
      padding: 0;

      .v-data-footer {
        padding: 0;
        justify-content: center;

        .v-data-footer__select {
          margin-right: 5px;
        }
        .v-data-footer__pagination {
          margin: 0 12px 0 12px;
        }
        .v-data-footer__icons-before {
          button {
            height: 20px;
            width: 20px;
          }
        }
      }

      .v-data-table__mobile-row__header {
        white-space: nowrap;
        text-align: left;
      }
      .v-data-table__mobile-row__cell {
        > div {
          flex-wrap: unset;
        }
      }
    }
  }
  &__pending {
    .v-btn__content {
      color: white;
    }
    &.v-btn {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
