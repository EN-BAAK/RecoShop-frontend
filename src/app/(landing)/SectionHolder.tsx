import { cn } from '@/lib/utils'
import { SectionHolderProps } from '@/types/components'
import React from 'react'

const SectionHolder: React.FC<SectionHolderProps> = ({ title, desc, children, sectionStyle, decoration = false, id }) => {
  return (
    <section
      id={id}
      className={cn(
        "bg-background w-full py-[50px] px-4 sm:px-6 lg:px-8 relative",
        sectionStyle,
        decoration && "z-1 overflow-hidden"
      )}>
      {decoration && (
        <React.Fragment>
          <div className="absolute top-2 right-32 w-50 h-50 border-t-2 border-l-2 border-muted-foreground rounded-full opacity-30 -z-1" />
          <div className="absolute top-52 right-32 w-35 h-80 border-b-2 border-l-2 border-muted-foreground rounded-full opacity-20 -z-1" />
          <div className="absolute -bottom-4 left-50 w-32 h-180 border-l-2 border-b-2 border-muted-foreground rounded-full opacity-15 -z-1" />
          <div className="absolute top-52 right-150 w-120 h-50 border-t-2 border-l-2 border-muted-foreground rounded-full opacity-25 -z-1" />
          <div className="absolute top-[35%] right-[35%] w-120 h-120 border-t-2 border-b-2 border-muted-foreground rounded-full opacity-25 -z-1" />
        </React.Fragment>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="mb-4 text-center md:text-left lg:text-left">
          <h2 className="mb-2 capitalize font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {title}
          </h2>

          <p className="max-w-2xl text-base sm:text-md text-foreground/60">
            {desc}
          </p>
        </div>

        {children}
      </div>
    </section>
  )
}

export default SectionHolder