import React, { useRef, useEffect, useContext, ReactNode, ElementType } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface TransitionContextProps {
  parent: {
    show?: boolean;
    isInitialRender?: boolean;
    appear?: boolean;
  };
}

const TransitionContext = React.createContext<TransitionContextProps>({
  parent: {},
});

function useIsInitialRender(): boolean {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

interface CSSTransitionProps {
  show?: boolean;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: boolean;
  unmountOnExit?: boolean;
  tag?: ElementType;
  children: ReactNode;
  [key: string]: unknown;
}

function CSSTransition({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag: Component = 'div',
  children,
  ...rest
}: CSSTransitionProps) {
  const enterClasses = enter.split(' ').filter(Boolean);
  const enterStartClasses = enterStart.split(' ').filter(Boolean);
  const enterEndClasses = enterEnd.split(' ').filter(Boolean);
  const leaveClasses = leave.split(' ').filter(Boolean);
  const leaveStartClasses = leaveStart.split(' ').filter(Boolean);
  const leaveEndClasses = leaveEnd.split(' ').filter(Boolean);
  const removeFromDom = unmountOnExit;

  function addClasses(node: HTMLElement, classes: string[]) {
    if (classes.length) node.classList.add(...classes);
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    if (classes.length) node.classList.remove(...classes);
  }

  const nodeRef = useRef<HTMLElement>(null);

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener('transitionend', done, false);
      }}
      onEnter={() => {
        if (!removeFromDom && nodeRef.current) nodeRef.current.style.display = '';
        if (nodeRef.current) addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        if (nodeRef.current) {
          removeClasses(nodeRef.current, enterStartClasses);
          addClasses(nodeRef.current, enterEndClasses);
        }
      }}
      onEntered={() => {
        if (nodeRef.current) removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        if (nodeRef.current) addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        if (nodeRef.current) {
          removeClasses(nodeRef.current, leaveStartClasses);
          addClasses(nodeRef.current, leaveEndClasses);
        }
      }}
      onExited={() => {
        if (nodeRef.current) {
          removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
          if (!removeFromDom) nodeRef.current.style.display = 'none';
        }
      }}
    >
      <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : undefined }}>
        {children}
      </Component>
    </ReactCSSTransition>
  );
}

interface TransitionProps {
  show?: boolean;
  appear?: boolean;
  children: ReactNode;
  [key: string]: unknown;
}

function Transition({ show, appear, ...rest }: TransitionProps) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return <CSSTransition appear={parent.appear || !parent.isInitialRender} show={parent.show} {...rest} />;
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
