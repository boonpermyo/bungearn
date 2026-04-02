'use client';

import { useReducer } from 'react';

type State<S> = {
  isOpen: boolean;
  state: S | null;
};

type CloseModalStateAction = {
  type: 'CLOSE';
};

type OpenModalStateAction<S> = {
  type: 'OPEN';
  payload: S;
};

type Action<S> = OpenModalStateAction<S> | CloseModalStateAction;

type InitialModalState<S> = {
  isOpen?: boolean;
  state?: S | null;
};

export type UseModalStateResult<S> = {
  isOpen: boolean;
  state: S | null;
  open: (payload: S) => void;
  close: () => void;
};

function modalStateReducer<S>(state: State<S>, action: Action<S>): State<S> {
  switch (action.type) {
    case 'OPEN':
      return { isOpen: true, state: action.payload };
    case 'CLOSE':
      return { isOpen: false, state: null };
    default:
      return state;
  }
}

export default function useModalState<S = unknown>(
  initialState: InitialModalState<S> = {}
): UseModalStateResult<S> {
  const [state, dispatch] = useReducer(modalStateReducer<S>, {
    isOpen: initialState.isOpen ?? false,
    state: initialState.state ?? null
  });

  const open = (payload: S) => dispatch({ type: 'OPEN', payload });
  const close = () => dispatch({ type: 'CLOSE' });

  return {
    isOpen: state.isOpen,
    state: state.state,
    open,
    close
  };
}
