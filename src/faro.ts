'use client';

import { useEffect } from 'react';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export function Faro() {
  useEffect(() => {
    console.log('env', process.env.PUBLIC_ENV);
    if (process.env.PUBLIC_ENV !== 'production') return;

    initializeFaro({
      url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/2d5bf727104966cc9012e43a2f0c93b3',
      app: {
        name: 'matt-thorn.ing',
        version: '1.0.0',
        environment: 'production',
      },

      instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),

        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
      ],
    });
  }, []);

  return null;
}
