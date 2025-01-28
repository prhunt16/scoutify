'use client'

import * as React from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'

export function Providers({ children }) {
  return (
    <DirectionProvider>
      {children}
    </DirectionProvider>
  )
}