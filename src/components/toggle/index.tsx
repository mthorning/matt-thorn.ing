import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { a11yButton } from '@/utils';
import classes from './toggle.module.css';

export const ControlledToggle = ({
  toggled,
  onToggle,
}: {
  toggled: boolean;
  onToggle: () => void;
}) => (
  <div {...a11yButton(onToggle) } className={clsx(classes.toggle, toggled && classes.checked)} />
)

export function Toggle({ onToggle: surfaceToggle, initialChecked = false }: {
  onToggle: (checked: boolean) => void;
  initialChecked?: boolean;
}) {
  const [toggled, setToggled] = useState(initialChecked)

  const onToggle = () => setToggled((c: boolean) => !c)

  useEffect(() => surfaceToggle(toggled), [surfaceToggle, toggled])

  return <ControlledToggle {...{  onToggle, toggled }} />
}
