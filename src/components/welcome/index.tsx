'use client';

import { useRef, type MutableRefObject, type ComponentProps } from 'react';
import { setup } from 'xstate';
import clsx from 'clsx';
import Link from 'next/link';
import { useMachine } from '@xstate/react';
import RainAnimation from '@/components/rain-animation';
import ThemeToggle from '@/components/theme-toggle';
import { constants } from '@/css-vars';
import classes from './welcome.module.css';
import { FaGithub, FaLinkedin, FaBluesky } from 'react-icons/fa6';

function A(props: ComponentProps<typeof Link>) {
  return <Link {...props} target="_blank" rel="noopener noreferrer" />;
}

const businessCardMachine = setup({
  delays: {
    cssDuration: constants.transitionSpeed / 2,
  },
}).createMachine({
  id: 'businessCard',
  initial: 'about',
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

function Welcome({ showAbout }: { showAbout: () => void }) {
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <h1>Welcome</h1>
        <h3>It&apos;s not much, but it&apos;s home</h3>
      </div>
      <div className={classes.cardContent}>
        <button onClick={() => showAbout()}>About</button>
      </div>
      <div className={classes.cardFooter}>
        <ThemeToggle />
      </div>
    </div>
  );
}
function About({ goBack }: { goBack: () => void }) {
  return (
    <div className={classes.card}>
      <div className={classes.cardContent}>
        <div className={classes.aboutContent}>
          <div className={classes.aboutName}>
            <h1>Matt Thorning</h1>
            <h3>Software engineer</h3>
          </div>
          <div className={classes.separator} />
          <div className={classes.aboutLinks}>
            <div>
              <p>
                <strong>Location:</strong>{' '}
                <A href="https://www.google.co.uk/maps/place/Cornwall/@50.4431734,-5.6159549,179714m/data=!3m2!1e3!4b1!4m6!3m5!1s0x486ab7f0bf270ec9:0x6e423c85d94b4571!8m2!3d50.5036299!4d-4.6524982!16zL20vMDFxMWo?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D">
                  Cornwall
                </A>
              </p>
              <p>
                <strong>Company:</strong>{' '}
                <A href="https://grafana.com/">Grafana Labs</A>
              </p>
            </div>
            <div className={classes.aboutFooter}>
              {/* <button onClick={() => goBack()}>flip</button> */}
              <A href="https://linkedin.com/in/matt-thorning-39a858120">
                <FaLinkedin />
              </A>
              <A href="https://bsky.app/profile/matt-thorn.ing">
                <FaBluesky />
              </A>
              <A href="https://github.com/mthorning">
                <FaGithub />
              </A>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessCard({
  objRef,
}: {
  objRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [state, send] = useMachine(businessCardMachine);

  return (
    <div
      className={clsx({
        [classes.showAbout]: state.matches('about'),
        [classes.showWelcome]: state.matches('welcome'),
      })}
    >
      <div
        ref={state.matches('welcome') ? objRef : null}
        className={clsx(classes.box, classes.welcome)}
      >
        <Welcome showAbout={() => send({ type: 'toggle' })} />
      </div>
      <div
        ref={state.matches('about') ? objRef : null}
        className={clsx(classes.box, classes.about)}
      >
        <About goBack={() => send({ type: 'toggle' })} />
      </div>
    </div>
  );
}

export default function NameBox() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={classes.container}>
      <RainAnimation objRef={ref} />
      <BusinessCard objRef={ref} />
    </div>
  );
}
