import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import CustomButton from "@/components/forms/Button"
import { DatePickerButtonProps } from "@/types/components"

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  date,
  onDateChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full sm:w-auto">
          <CustomButton
            variant="transparent-outline"
            className="w-fit justify-start"
            icon={Calendar}
            iconClassName="h-4 w-4"
            label={date ? date : placeholder}
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <input
          type="date"
          value={date ? format(date, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const newDate = e.target.value ? e.target.value : undefined;
            onDateChange(newDate);
            setOpen(false);
          }}
          className="bg-background w-full px-3 py-2 block border border-muted rounded-md text-foreground placeholder-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerButton
