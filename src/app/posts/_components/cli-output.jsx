import React from 'react'
import { css } from '@emotion/react'

const style = css`
  display: block;
  overflow-x: auto;
  background: #f1f1f1;
  color: #6e6b5e;
  padding: 0.5em;

  body.dark & {
    background: #1e1e1e;
    color: rgb(212, 212, 212);
  }
`
const errorStyle = css`
  border: 0.5em solid #e8111294;
`
export default function CliOutput({ output, error }) {
  const styles = [style]
  if (error) styles.push(errorStyle)
  return <pre css={styles}>{output}</pre>
}
