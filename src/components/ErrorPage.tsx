import React from 'react'
import { ErrorPageProps } from '@/types/components'
import Image from 'next/image'
import CustomButton from './forms/Button'

const ErrorPage: React.FC<ErrorPageProps> = ({ msg, action }) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="space-y-4 text-center">
        <Image
          src="/error.png"
          alt='error'
          width={280}
          height={280}
          loading='lazy'
        />

        <h2 className="font-sans font-semibold text-xl text-foreground">
          حدث خطأ أثناء تحميل البيانات
        </h2>

        <p className="font-sans text-muted-foreground">
          {msg || "يرجى المحاولة مرة أخرى"}
        </p>

        <CustomButton label='اعادة المحاولة' onClick={action} variant='danger' />
      </div>
    </div>
  )
}

export default ErrorPage