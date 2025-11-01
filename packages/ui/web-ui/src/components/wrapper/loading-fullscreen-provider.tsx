'use client';

import { createContext, useContext, useReducer, useRef, type PropsWithChildren } from 'react';
import Loading from '../loading';
import { useUnmount } from '../../hooks';

type LoadingFullscreenState = {
  activeIds: string[];
};

type ShowLoadingFullscreenAction = {
  type: 'SHOW_LOADING_FULLSCREEN';
  payload: { id: string };
};

type HideLoadingFullscreenAction = {
  type: 'HIDE_LOADING_FULLSCREEN';
  payload: { id: string };
};

type LoadingFullscreenAction = ShowLoadingFullscreenAction | HideLoadingFullscreenAction;

const loadingFullscreenReducer = (
  state: LoadingFullscreenState,
  action: LoadingFullscreenAction
): LoadingFullscreenState => {
  switch (action.type) {
    case 'SHOW_LOADING_FULLSCREEN': {
      const { id } = action.payload;
      if (state.activeIds.includes(id)) {
        return state;
      }
      return { ...state, activeIds: [...state.activeIds, id] };
    }
    case 'HIDE_LOADING_FULLSCREEN': {
      const { id } = action.payload;
      if (!state.activeIds.includes(id)) {
        return state;
      }
      return {
        ...state,
        activeIds: state.activeIds.filter((activeId) => activeId !== id)
      };
    }
    default:
      return state;
  }
};

type LoadingFullscreenContextValue = {
  loading: boolean;
  showLoadingFullscreen: (payload: { id: string }) => void;
  hideLoadingFullscreen: (payload: { id: string }) => void;
};

const LoadingFullscreenContext = createContext<LoadingFullscreenContextValue | undefined>(undefined);

type LoadingFullscreenProviderProps = PropsWithChildren;
export type UseLoadingFullscreenResult = {
  loading: boolean;
  showLoadingFullscreen: () => void;
  hideLoadingFullscreen: () => void;
};

export const useLoadingFullscreen = (): UseLoadingFullscreenResult => {
  const uniqueIdRef = useRef<string>(crypto.randomUUID());
  const context = useContext(LoadingFullscreenContext);

  if (!context) {
    throw new Error('useLoadingFullscreen must be used within a LoadingFullscreenProvider');
  }

  useUnmount(() => {
    context.hideLoadingFullscreen({ id: uniqueIdRef.current });
  });

  return {
    loading: context.loading,
    showLoadingFullscreen: () => context.showLoadingFullscreen({ id: uniqueIdRef.current }),
    hideLoadingFullscreen: () => context.hideLoadingFullscreen({ id: uniqueIdRef.current })
  };
};

export default function LoadingFullscreenProvider({ children }: LoadingFullscreenProviderProps) {
  const [state, dispatch] = useReducer(loadingFullscreenReducer, { activeIds: [] });

  const loading = state.activeIds.length > 0;

  const contextValue: LoadingFullscreenContextValue = {
    loading,
    showLoadingFullscreen: (payload) => dispatch({ type: 'SHOW_LOADING_FULLSCREEN', payload }),
    hideLoadingFullscreen: (payload) => dispatch({ type: 'HIDE_LOADING_FULLSCREEN', payload })
  };

  return (
    <LoadingFullscreenContext value={contextValue}>
      <Loading fullscreen spinning={loading} />
      {children}
    </LoadingFullscreenContext>
  );
}
