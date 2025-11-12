import React from 'react'
import { PageHolderProps } from '@/types/layouts'

const PageHolder: React.FC<PageHolderProps> = ({ children, title, desc, outerElement }) => {
  return (
    <div className='bg-background h-full max-h-full p-2 sm:p-6 flex flex-col gap-3 relative overflow-hidden'>
      <div>
        <h1 className="mb-2 font-heading font-bold text-3xl text-primary">
          {title}
        </h1>

        {desc &&
          <p className="font-sans text-muted-foreground">
            {desc}
          </p>
        }
      </div>

      {children}

      {outerElement && (outerElement)}
    </div>
  )
}

export default PageHolder