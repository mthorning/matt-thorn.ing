'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { setup } from 'xstate';
import { useMachine } from '@xstate/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { constants } from '@/css-vars';
import { useColourScheme, type ColourScheme } from '@/hooks';
import { ControlledToggle } from '@/components/toggle';
import classes from './theme-toggle.module.css';

const machineConfig = {
  id: 'themeToggle',
  initial: 'init',
  context: ({ input }: { input: { startMode: ColourScheme } }) => ({
    startMode: input.startMode,
  }),
  states: {
    init: {
      always: [
        {
          target: 'light',
          guard: 'isLight',
        },
        {
          target: 'dark',
        },
      ],
    },
    toDark: {
      after: {
        cssDuration: { target: 'dark' },
      },
      exit: {
        type: 'setColourScheme',
        params: { scheme: 'dark' },
      },
      tags: ['dark'],
    },
    dark: {
      on: {
        toggle: {
          target: 'toLight',
        },
        light: {
          target: 'light',
        },
      },
      tags: ['dark'],
    },
    toLight: {
      after: {
        cssDuration: { target: 'light' },
      },
      exit: {
        type: 'setColourScheme',
        params: { scheme: 'light' },
      },
      tags: ['light'],
    },
    light: {
      on: {
        target: 'toDark',
        light: {
          target: 'dark',
        },
      },
      tags: ['light'],
    },
  },
} as const;

const themeToggleMachine = setup({
  types: {
    context: {} as {
      startMode: ColourScheme;
    },
    input: {} as {
      startMode: ColourScheme;
    },
  },
  delays: {
    cssDuration: constants.transitionSpeed / 2,
  },
  actions: {
    setColourScheme: (_, _params: { scheme: ColourScheme }) => undefined,
  },
  guards: {
    isLight: ({ context }) => context.startMode === 'light',
  },
}).createMachine(machineConfig);

export default function ThemeToggle() {
  const [colourScheme, setColourScheme] = useColourScheme();

  const [state, send] = useMachine(
    themeToggleMachine.provide({
      actions: {
        setColourScheme: (_, params: { scheme: ColourScheme }) => {
          setColourScheme(params.scheme);
        },
      },
    }),
    { input: { startMode: colourScheme } }
  );

  const onToggle = useCallback(() => {
    send({ type: 'toggle' });
  }, [send]);

  useEffect(() => {
    if (colourScheme !== state.value) send({ type: colourScheme });
  }, [colourScheme, state.value, send]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className={classes.container}>
      <FaSun className={state.hasTag('light') ? classes.sun : classes.astro} />
      <div className={classes.innerContainer}>
        <ControlledToggle toggled={state.hasTag('dark')} onToggle={onToggle} />
      </div>
      <FaMoon className={state.hasTag('dark') ? classes.moon : classes.astro} />
    </div>
  ) : null;
}
