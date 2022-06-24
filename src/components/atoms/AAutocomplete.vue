<template>
  <div>
    <div class="auto-complete-text-wrapper">
      <v-icon v-if="leftIcon" left>{{ leftIcon }}</v-icon>
      <autocomplete
        v-model="inputValue"
        class="auto-complete-text"
        label="Employer Name"
        :class="isRounded ? 'rounded' : 'square'"
        :search="search"
        :placeholder="placeholder"
        :get-result-value="getResultValue"
        :debounce-time="500"
        @submit="$emit('val', $event)"
      >
        <template #result="{ result, props }">
          <li v-bind="props" :class="result.none ? 'pointer-none' : ''" class="autocomplete-result">
            <div v-if="result.none">No results found</div>
            <div v-else v-html="myResult(result)" />
          </li>
        </template>
      </autocomplete>
      <v-icon v-if="rightIcon" right>{{ rightIcon }}</v-icon>
    </div>
    <div v-if="errorMessage.length" class="mt-2" style="color: red">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api';
import Autocomplete from '@trevoreyre/autocomplete-vue';
import '@trevoreyre/autocomplete-vue/dist/style.css';

export default {
  components: {
    Autocomplete
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: null
    },
    leftIcon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Search...'
    },
    errorMessage: {
      type: [String, Array],
      default: () => {}
    },
    isRounded: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const inputValue = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('val', newVal);
      }
    });

    const apiUrl = process.env.VUE_APP_GOOGLE_PLACES;

    function search(input) {
      const url = `${apiUrl}?query=${encodeURI(input)}&type=${props.type}`;
      /* eslint-disable consistent-return */
      return new Promise(resolve => {
        if (input.length < 3) {
          return resolve([]);
        }
        fetch(url)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('Something went wrong');
          })
          .then(data => {
            if (data.data) {
              resolve(data.data.results);
            }
          })
          .catch(err => {
            resolve([{ none: true }]);
          });
      });
    }

    function myResult(val) {
      if (props.type === 'school') {
        return `${val.name}, ${val.formatted_address}`;
      }
      if (props.type === 'region' || props.type === 'street') {
        return val.formatted_address;
      }
      return val.name;
    }

    function getResultValue(result) {
      return result;
    }

    return {
      apiUrl,
      search,
      getResultValue,
      inputValue,
      myResult
    };
  }
};
</script>

<style lang="scss">
.auto-complete-text-wrapper {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  letter-spacing: normal;
  max-width: 100%;
  text-align: left;
  .auto-complete-text {
    width: 100%;
    .autocomplete {
      .autocomplete-input {
        padding: 15px 12px;
        padding-right: 35px;
        border-radius: 4px;
        background: transparent;
        border-color: rgba(0, 0, 0, 0.38);
      }
    }
    &.rounded {
      .autocomplete {
        .autocomplete-input {
          padding: 15px 24px;
          padding-right: 35px;
          border-radius: 28px;
          background: transparent;
          border-color: rgba(0, 0, 0, 0.38);
        }
      }
    }
  }

  .autocomplete-result-list {
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-top: 3px;
    border-radius: 6px;
    padding-left: 0;
    .autocomplete-result {
      background-image: none;
      padding: 12px;
    }
  }
}

.pointer-none {
  pointer-events: none;
}
</style>
