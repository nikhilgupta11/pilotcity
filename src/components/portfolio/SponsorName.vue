<template>
  <span>{{ sponsorName }}</span>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';

import { TOKEN, USER } from '@/services/graphql/queries';

export default {
  name: 'SponsorName',
  props: {
    item: { required: true, type: Object }
  },
  setup(
    props,
    {
      root: {
        $apolloProvider: {
          defaultClient: { query }
        }
      }
    }
  ) {
    const sponsorName = ref('');
    const tokenId = props.item.tokenPool[0];
    query({
      query: TOKEN,
      variables: { id: tokenId }
    }).then(async ({ data }) => {
      const tokenOwnerId = data.tokens[0].owner_id;
      const sponsor = (
        await query({
          query: USER,
          variables: { id: tokenOwnerId }
        })
      ).data.users[0];
      sponsorName.value = sponsor.sponsorName
        ? sponsor.sponsorName
        : `${sponsor.firstName} ${sponsor.lastName}`;
    });
    return { sponsorName };
  }
};
</script>
