import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';

export type ModalProps = AntdModalProps;

export default function Modal({ ...props }: AntdModalProps) {
  return <AntdModal maskClosable={false} {...props} />;
}
