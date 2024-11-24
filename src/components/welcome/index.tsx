'use client';

import { useRef, type MutableRefObject } from 'react';
import { setup } from 'xstate';
import clsx from 'clsx';
import { useMachine } from '@xstate/react';
import RainAnimation from '@/components/rain-animation';
import classes from './welcome.module.css';

const businessCardMachine = setup({
  delays: {
    cssDuration: 500,
  },
}).createMachine({
  id: 'businessCard',
  initial: 'welcome',
  states: {
    welcome: {
      initial: 'idle',
      on: {
        toggle: { target: '.shrinking' },
      },
      states: {
        idle: {},
        growing: {
          after: {
            cssDuration: { target: 'idle' },
          },
        },
        shrinking: {
          tags: 'zero',
          after: {
            cssDuration: { target: '#businessCard.about.growing' },
          },
        },
      },
    },
    about: {
      initial: 'idle',
      on: {
        toggle: { target: '.shrinking' },
      },
      states: {
        idle: {},
        growing: {
          after: {
            cssDuration: { target: 'idle' },
          },
        },
        shrinking: {
          tags: 'zero',
          after: {
            cssDuration: { target: '#businessCard.welcome.growing' },
          },
        },
      },
    },
  },
});

function BusinessCard({
  objRef,
}: {
  objRef: MutableRefObject<HTMLButtonElement | null>;
}) {
  const [state, send] = useMachine(businessCardMachine);
  console.log(state.hasTag('zero'));
  console.log(state.toJSON());
  return (
    <div
          className={clsx({
            [classes.showBack]: state.matches('welcome'),
            [classes.showFront]: state.matches('about'),
          })}
    >
      <div className={clsx(classes.box, classes.front)}>
        <h1>Matt Thorning</h1>
        <button
          ref={objRef}
          onClick={() => send({ type: 'toggle' })}
        >
          flip
        </button>
      </div>
      <div className={clsx(classes.box, classes.back)}>
        <h1>About</h1>
        <button
          ref={objRef}
          onClick={() => send({ type: 'toggle' })}
        >
          flip
        </button>
      </div>
    </div>
  );
}

export default function NameBox() {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <RainAnimation objRef={ref} />
      <BusinessCard objRef={ref} />
    </>
  );
}
