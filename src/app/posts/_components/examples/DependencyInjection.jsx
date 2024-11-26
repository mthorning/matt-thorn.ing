import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

function Table({ columns, data }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  if (loading)
    return (
      <div
        css={css`
          margin-bottom: 1.08rem;
          border: 1px solid;
          width: 100%;
          text-align: center;
          height: 191.82px;
          line-height: 191.82px;
        `}
      >
        Loading...
      </div>
    )
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th style={{ border: '1px solid', padding: '5px' }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr>
            {columns.map(col => (
              <td style={{ padding: '5px', border: '1px solid' }}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const response = [
  { make: 'Ford', model: 'Escort', registration: 'wm01txh' },
  { make: 'Peugot', model: '406', registration: 'ml06xdh' },
  { make: 'Honda', model: 'Civic', registration: 'p78dhe' },
  { make: 'Citreon', model: 'Picasso', registration: 'wf03iry' },
]

export default function DependencyInjection() {
  const [showTable, setShowTable] = useState(false)
  const columns = ['make', 'model', 'registration']
  const data = response.map(car => ({
    ...car,
    registration: (
      car.registration.slice(0, car.registration.length - 3) +
      ' ' +
      car.registration.slice(car.registration.length - 3)
    ).toUpperCase(),
  }))
  return (
    <div
      css={css`
        margin: 20px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {showTable ? (
        <Table columns={columns} data={data} />
      ) : (
        <button onClick={() => setShowTable(true)}>Show Component</button>
      )}
    </div>
  )
}
