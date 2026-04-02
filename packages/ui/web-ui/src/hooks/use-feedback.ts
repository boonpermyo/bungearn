import type React from 'react';
import { App as AntdFeedback } from 'antd';
import type {
  ArgsProps as AntdMessageArgs,
  JointContent as AntdMessageContent,
  MessageType as AntdMessageHandle
} from 'antd/es/message/interface';
import type { ModalFuncProps as AntdModalFuncProps } from 'antd/es/modal/interface';
import type { ModalFuncWithPromise } from 'antd/es/modal/useModal';
import type { ArgsProps as AntdNotificationArgs } from 'antd/es/notification/interface';

type AntdFeedbackControllers = ReturnType<typeof AntdFeedback.useApp>;
type AntdMessageController = AntdFeedbackControllers['message'];
type AntdModalController = AntdFeedbackControllers['modal'];
type AntdNotificationController = AntdFeedbackControllers['notification'];

export type UIMessageOptions = AntdMessageArgs;
export type UIMessageContent = AntdMessageContent;
export type UIMessageDuration = Parameters<AntdMessageController['success']>[1];
export type UIMessageOnClose = Parameters<AntdMessageController['success']>[2];
export type UIMessageHandle = AntdMessageHandle;

export interface UIMessageController {
  info(
    content: UIMessageContent,
    duration?: UIMessageDuration,
    onClose?: UIMessageOnClose
  ): UIMessageHandle;
  success(
    content: UIMessageContent,
    duration?: UIMessageDuration,
    onClose?: UIMessageOnClose
  ): UIMessageHandle;
  error(
    content: UIMessageContent,
    duration?: UIMessageDuration,
    onClose?: UIMessageOnClose
  ): UIMessageHandle;
  warning(
    content: UIMessageContent,
    duration?: UIMessageDuration,
    onClose?: UIMessageOnClose
  ): UIMessageHandle;
  loading(
    content: UIMessageContent,
    duration?: UIMessageDuration,
    onClose?: UIMessageOnClose
  ): UIMessageHandle;
  open(options: UIMessageOptions): UIMessageHandle;
  destroy(key?: React.Key): void;
}

export type UIModalOptions = AntdModalFuncProps;
export type UIModalResult = ReturnType<ModalFuncWithPromise>;

export interface UIModalController {
  info(options: UIModalOptions): UIModalResult;
  success(options: UIModalOptions): UIModalResult;
  error(options: UIModalOptions): UIModalResult;
  warning(options: UIModalOptions): UIModalResult;
  confirm(options: UIModalOptions): UIModalResult;
}

export type UINotificationOptions = AntdNotificationArgs;

export interface UINotificationController {
  success(options: UINotificationOptions): void;
  error(options: UINotificationOptions): void;
  info(options: UINotificationOptions): void;
  warning(options: UINotificationOptions): void;
  open(options: UINotificationOptions): void;
  destroy(key?: React.Key): void;
}

export type UIUseFeedbackResult = {
  message: UIMessageController;
  modal: UIModalController;
  notification: UINotificationController;
};

const createMessageController = (controller: AntdMessageController): UIMessageController => ({
  info: (content, duration, onClose) => controller.info(content, duration, onClose),
  success: (content, duration, onClose) => controller.success(content, duration, onClose),
  error: (content, duration, onClose) => controller.error(content, duration, onClose),
  warning: (content, duration, onClose) => controller.warning(content, duration, onClose),
  loading: (content, duration, onClose) => controller.loading(content, duration, onClose),
  open: (options) => controller.open(options),
  destroy: (key) => controller.destroy(key)
});

const createModalController = (controller: AntdModalController): UIModalController => ({
  info: ({ mousePosition, ...options }) =>
    controller.info({
      transitionName: 'whispa-dialog',
      maskTransitionName: 'whispa-overlay',
      mousePosition: {
        x: 0,
        y: 0,
        ...mousePosition
      },
      ...options
    }),
  success: ({ mousePosition, ...options }) =>
    controller.success({
      transitionName: 'whispa-dialog',
      maskTransitionName: 'whispa-overlay',
      mousePosition: {
        x: 0,
        y: 0,
        ...mousePosition
      },
      ...options
    }),
  error: ({ mousePosition, ...options }) =>
    controller.error({
      transitionName: 'whispa-dialog',
      maskTransitionName: 'whispa-overlay',
      mousePosition: {
        x: 0,
        y: 0,
        ...mousePosition
      },
      ...options
    }),
  warning: ({ mousePosition, ...options }) =>
    controller.warning({
      transitionName: 'whispa-dialog',
      maskTransitionName: 'whispa-overlay',
      mousePosition: {
        x: 0,
        y: 0,
        ...mousePosition
      },
      ...options
    }),
  confirm: ({ mousePosition, ...options }) =>
    controller.confirm({
      transitionName: 'whispa-dialog',
      maskTransitionName: 'whispa-overlay',
      mousePosition: {
        x: 0,
        y: 0,
        ...mousePosition
      },
      ...options
    })
});

const createNotificationController = (
  controller: AntdNotificationController
): UINotificationController => ({
  success: (options) => controller.success(options),
  error: (options) => controller.error(options),
  info: (options) => controller.info(options),
  warning: (options) => controller.warning(options),
  open: (options) => controller.open(options),
  destroy: (key) => controller.destroy(key)
});

export default function useFeedback(): UIUseFeedbackResult {
  const feedback = AntdFeedback.useApp();
  return {
    message: createMessageController(feedback.message),
    modal: createModalController(feedback.modal),
    notification: createNotificationController(feedback.notification)
  };
}
