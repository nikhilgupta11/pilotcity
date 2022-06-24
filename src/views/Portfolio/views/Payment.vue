<template>
  <ValidationObserver v-slot="{}">
    <div class="sponsor__container d-flex flex-column">
      <v-alert v-if="invoiceState.state === 'error'" type="error">{{
        invoiceState.message
      }}</v-alert>
      <div class="sponsor__details d-flex flex-row justify-center align-start">
        <div class="sponsor__details-avatar">
          <Profile :size="60" />
        </div>

        <div class="sponsor__details-namecard d-flex flex-column">
          <validation-provider v-slot="{ errors }" rules="required">
            <v-text-field
              v-model="sponsorName"
              :error-messages="errors"
              height="60"
              outlined
              rounded
              label="Sponsor"
              class="sponsor__details-name font-weight-bold"
              hint="Choose your public display name"
              :placeholder="`${user.firstName} ${user.lastName}`"
            ></v-text-field>
          </validation-provider>
        </div>

        <div class="sponsor__pay-card">
          <v-btn x-large rounded outlined text :disabled="!selectedProduct.length" @click="checkout"
            >Pay by Card</v-btn
          >
        </div>
        <div class="sponsor__pay-card">
          <v-btn
            x-large
            rounded
            outlined
            text
            :disabled="!selectedProduct.length"
            @click="sendInvoice"
            >Pay by Invoice</v-btn
          >
        </div>
      </div>

      <div v-if="purchaseOptions.length" class="sponsor__program-menu">
        <v-card
          v-for="option in purchaseOptions"
          :key="option.title"
          elevation="0"
          :color="option.color"
          dark
          class="mb-3"
        >
          <v-card-title class="landing__menu-title">
            <div class="sponsor__option-title white--text font-weight-bold">{{ option.title }}</div>
            <div class="sponsor__option-unit font-weight-bold">
              <v-chip color="white" outlined>{{ option.unitLabel }}</v-chip>
            </div>
            <div class="sponsor__option-price white--text mr-auto">${{ option.price / 100 }}</div>
            <v-text-field
              v-model="option.quantity"
              class="sponsor__quantity-check"
              min="0"
              outlined
              x-large
              label="Quantity"
              type="number"
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle>{{ option.desc }}</v-card-subtitle>
        </v-card>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { computed, ref, Ref } from '@vue/composition-api';
import { defer } from 'rxjs';
import { retry } from 'rxjs/operators';

import { useDbActions, useStripeActions, useDbState } from '@/store';
import Profile from '@/components/Profile.vue';

export default {
  name: 'Payment',

  components: {
    Profile
  },

  setup(_, ctx) {
    const { user } = useDbState(['user']);
    const sponsorName = ref('');
    const { getProductInfos } = useDbActions(['getProductInfos']);
    const PRICE_IDS =
      process.env.VUE_APP_PAYMENT_ENV === 'development'
        ? [
            'price_1HXAFALnkQGEgDQnGsjqbuuM', // student
            'price_1HXABLLnkQGEgDQnwzzt63Np', // family
            'price_1HXA9ZLnkQGEgDQn9uaE7Hm2', // group
            'price_1HXAD3LnkQGEgDQnqxQabHZO', // class
            'price_1HXACELnkQGEgDQnWpGByUE0' // teacher
          ]
        : [
            'price_1HXEkkLnkQGEgDQnedtEFh3p',
            'price_1HXEkcLnkQGEgDQnVKGG37Yj',
            'price_1KoekVLnkQGEgDQn4LEznMVj',
            'price_1KoemRLnkQGEgDQnohSIpDbo',
            'price_1HXEkfLnkQGEgDQntVYb3iFX'
          ];
    const ColorCode = {
      'Per Student': 'green',
      'Per Family': 'orange',
      'Per Group': 'purple',
      'Per Class': 'blue',
      'Per Teacher': 'pink'
    };
    const purchaseOptions: Ref<
      {
        title: string;
        desc: string | null;
        priceId: string;
        price: number | null;
        color: any;
        quantity: number;
        unitLabel: string | null;
      }[]
    > = ref([]);
    getProductInfos({ priceId: PRICE_IDS }).then(result => {
      purchaseOptions.value = result.body.map(res => ({
        title: res.product.name,
        desc: res.product.description,
        priceId: res.price.id,
        price: res.price.unit_amount,
        color: ColorCode[res.product.name],
        quantity: 0,
        unitLabel: res.product.unit_label
      }));
    });
    const selectedProduct = computed(() => purchaseOptions.value.filter(opt => opt.quantity > 0));
    const { createCheckoutSession, createInvoice } = useStripeActions([
      'createCheckoutSession',
      'createInvoice'
    ]);
    const invoiceState = ref({
      state: '',
      message: ''
    });
    const checkout = async () => {
      defer(() =>
        createCheckoutSession({
          lineItems: selectedProduct.value,
          cancelUrl: 'http://pilotcity.com/sponsor'
        })
      )
        .pipe(retry(3))
        .subscribe(result => {
          if (result.error) {
            invoiceState.value.state = 'error';
            invoiceState.value.message = result.error.message!;
          }
        });
    };
    // Handle Invoicing

    const sendInvoice = async () => {
      try {
        const invoice = await createInvoice({ lineItems: selectedProduct.value });
        // eslint-disable-next-line no-unreachable
        if (invoice?.openInvoice?.hosted_invoice_url)
          window.location.href = invoice?.openInvoice?.hosted_invoice_url;
        ctx.root.$router.push(invoice?.openInvoice?.hosted_invoice_url);
        invoiceState.value.state = 'success';
        invoiceState.value.state = 'success';
      } catch (err) {
        invoiceState.value.state = 'error';
        invoiceState.value.message = err;
      }
      // handle invoice logic
    };
    return {
      sponsorName,
      purchaseOptions,
      checkout,
      selectedProduct,
      sendInvoice,
      invoiceState,
      user
    };
  }
};
</script>

<style lang="scss" scoped>
.landing__menu-title {
  @media (max-width: 991px) {
    justify-content: space-between !important;
  }
}
.sponsor {
  &__container {
    margin-top: 50px;
    padding-left: 6%;
    padding-right: 6%;
  }

  &__pay-card {
    margin-left: 25px;
    margin-top: 5px;
    @media (max-width: 991px) {
      margin-left: 0;
      width: 100%;
      button {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }

  &__option-title {
    font-family: Raleway;
    font-size: 30px;
    margin-right: 20px;
    @media (max-width: 991px) {
      margin-bottom: 10px !important;
      margin-right: 0 !important;
    }
  }

  &__option-unit {
    font-family: Raleway;
    margin-right: 20px;

    @media (max-width: 991px) {
      margin-bottom: 10px !important;
      margin-right: 0 !important;
    }
  }

  &__option-price {
    font-weight: 300;
    font-size: 30px;
    @media (max-width: 991px) {
      width: 100% !important;
      margin-bottom: 10px !important;
    }
  }

  &__details {
    margin-top: 7px;
    margin-bottom: 50px;
    width: 100%;
    @media (max-width: 991px) {
      flex-direction: column !important;
    }
  }

  &__details-avatar {
    @media (max-width: 991px) {
      width: 100% !important;
      margin-bottom: 20px !important;
      text-align: center;
    }
  }

  &__details-namecard {
    margin-left: 25px;
    @media (max-width: 991px) {
      margin-left: 0 !important;
      width: 100%;
    }
  }

  &__details-name {
    font-family: Raleway;
    font-size: 25px;
  }

  &__quantity-check {
    margin-left: auto;
    max-width: 100px;
    font-size: 25px;
  }

  &__program-menu {
    display: grid;
    grid-template-columns: repeat(1, 80%);
    grid-template-rows: repeat(5, 20%);
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    margin-bottom: 150px;
    justify-content: center;

    @media (max-width: 991px) {
      grid-template-columns: auto !important;
    }
  }
}
</style>
