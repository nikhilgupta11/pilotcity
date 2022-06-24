/* eslint-disable import/prefer-default-export */
import { computed, ComputedRef, onBeforeUnmount, watchEffect } from '@vue/composition-api';
import { CommentAuthor } from '../@types/comment.d';
import { OperationModeType } from '../@types/operationMode.d';
import { OperationMode } from '../constants/operationMode';

export function useVideoAsk(
  currentUser: ComputedRef<CommentAuthor>,
  operationMode: ComputedRef<OperationModeType>,
  userType: ComputedRef<'organizer' | 'stakeholder' | 'participant' | ''>,
  programDoc
) {
  const videoAskUrl: ComputedRef<string> = computed(() => {
    let videoAskUrl;
    if (operationMode.value === OperationMode.Participant) {
      videoAskUrl = 'https://www.videoask.com/fvyv1x3y8';
    } else if (operationMode.value === OperationMode.Setup) {
      videoAskUrl = 'https://www.videoask.com/fmicny32j';
    } else if (operationMode.value === OperationMode.Preview) {
      videoAskUrl = 'https://www.videoask.com/fh5yzj1mw';
    } else if (operationMode.value === OperationMode.Monitor && userType.value === 'stakeholder') {
      videoAskUrl = 'https://www.videoask.com/f6i30otym';
    } else if (operationMode.value === OperationMode.Monitor && userType.value === 'organizer') {
      videoAskUrl = 'https://www.videoask.com/fmicny32j';
    }

    return `${videoAskUrl}#contact_email=${encodeURI(
      currentUser.value?.email ? currentUser.value?.email : ''
    )}&contact_name=${encodeURI(
      `${currentUser.value?.firstName ? currentUser.value?.firstName : ''} ${
        currentUser.value?.lastName ? currentUser.value?.lastName : ''
      }`
    )}&product_name=${encodeURI(
      programDoc?.data?.programName ? programDoc?.data?.programName : ''
    )}&contact_phone_number=${encodeURI(
      currentUser.value?.phoneNumber ? currentUser.value?.phoneNumber : ''
    )}`;
  });

  const text: ComputedRef<string> = computed(() => {
    let text = '';
    if (operationMode.value === OperationMode.Participant) {
      text = 'Get help';
    } else if (operationMode.value === OperationMode.Setup) {
      text = 'Get help';
    } else if (operationMode.value === OperationMode.Preview) {
      text = 'Get help';
    } else if (operationMode.value === OperationMode.Monitor && userType.value === 'stakeholder') {
      text = 'Get live help 8am - 3pm PST';
    } else if (operationMode.value === OperationMode.Monitor && userType.value === 'organizer') {
      text = 'Get help';
    }
    return text;
  });

  let widget = null;
  let isLoadingWidget = false;
  // TODO: populate details from currentUser

  const destroyWidget = () => {
    widget.remove();
    widget = null;
  };

  watchEffect(() => {
    if (widget) {
      destroyWidget();
    }
    if (operationMode.value === OperationMode.None || isLoadingWidget) return;

    isLoadingWidget = true;

    window.videoask
      .loadEmbed({
        kind: 'widget',
        url: videoAskUrl.value,
        options: {
          widgetType: 'VideoThumbnailExtraLarge',
          text: text.value,
          backgroundColor: '#ffffff',
          position: 'bottom-right',
          dismissible: true
        }
      })
      .then(element => {
        widget = element;
        isLoadingWidget = false;
      });
  });

  onBeforeUnmount(() => {
    if (widget) {
      destroyWidget();
    }
  });

  return {};
}
