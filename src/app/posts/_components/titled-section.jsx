import React, { useState } from 'react'
import { FaPenSquare, FaGithubSquare } from 'react-icons/fa'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { css } from '@emotion/react'

function mdLinks(text = '') {
  return text.replace(/\[(.*)\]\((https?:\/\/.*)\)/, '<a href="$2">$1</a>')
}

const Arrow = ({ collapsible, collapsed, setCollapsed }) => {
  return collapsible ? (
    <div
      css={css`
        margin-left: 16px;
        align-self: flex-end;
      `}
    >
      {React.createElement(collapsed ? IoIosArrowDown : IoIosArrowUp, {
        onClick() {
          setCollapsed((current) => !current)
        },
      })}
    </div>
  ) : null
}
const Links = ({ github, blogs, collapsible, collapsed, setCollapsed }) => (
  <div
    css={css`
      display: inline-flex;
      align-items: center;
      a {
        margin-left: 8px;
        color: var(--color);
        display: inline-flex;
        align-items: center;
        font-size: 1.4em;
      }

      a:hover {
        color: var(--linkHover);
      }
    `}
  >
    {blogs ? (
      <a href={blogs}>
        <FaPenSquare />
      </a>
    ) : null}
    {github ? (
      <a href={github}>
        <FaGithubSquare />
      </a>
    ) : null}
    <Arrow {...{ collapsible, collapsed, setCollapsed }} />
  </div>
)

export default function TitledSection({
  title,
  Icon,
  subtitle,
  info,
  children,
  collapsible,
  github,
  blogs,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [height, setHeight] = useState(null)
  return (
    <div
      css={css`
            margin-top: 32px;
        * {
          margin-bottom: 0;
        }
        p {
            padding-top: 8px;
            margin-top: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          border-bottom: 1px dotted var(--color);
          padding-bottom: 16px;
        `}
      >
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <h3
              css={css`
                display: flex;
                aligin-items: center;
              `}
            >
              {Icon ? (
                <Icon
                  css={css`
                    margin-right: 8px;
                  `}
                />
              ) : null}
              {title}
            </h3>
            <Links
              {...{ github, blogs, collapsible, collapsed, setCollapsed }}
            />
          </div>
          {subtitle ? <h4>{subtitle}</h4> : null}
          {info ? <h6>{info}</h6> : null}
        </div>
      </div>
      <p
        ref={(el) => {
          if (el && height === null) {
            setHeight(el.clientHeight)
            setCollapsed(true)
          }
        }}
        css={css`
          ${collapsible
            ? `
              overflow: hidden;
              height: ${collapsed ? '0' : `${height}px`};
              transition: height 0.3s ease-in-out;
        `
            : ''}
        `}
        dangerouslySetInnerHTML={{ __html: mdLinks(children) }}
      />
    </div>
  )
}
