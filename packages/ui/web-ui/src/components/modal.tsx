import { Modal as AntdModal, type ModalProps as AntdModalProps } from 'antd';

export type ModalProps = AntdModalProps;

export default function Modal({ mousePosition, ...props }: AntdModalProps) {
  return (
    <AntdModal
      maskClosable={false}
      transitionName="whispa-dialog"
      maskTransitionName="whispa-overlay"
      mousePosition={{
        x: 0,
        y: 0,
        ...mousePosition
      }}
      {...props}
    />
  );
}
