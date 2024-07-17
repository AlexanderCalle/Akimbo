import React, { useState } from 'react'
import Datepicker from "tailwind-datepicker-react"

const options = {
	autoHide: true,
	todayBtn: true,
	clearBtn: true,
	clearBtnText: "Clear",
	theme: {
		background: "bg-akimbo-light border border-akimbo-dark-900 rounded-none",
		todayBtn: "bg-akimbo-dark-500 hover:bg-akimbo-dark-900",
		clearBtn: "hover:bg-akimbo-dark-200",
		icons: "",
		text: "hover:bg-akimbo-dark-500 hover:text-akimbo-light",
		disabledText: "",
		input: "rounded-none border border-akimbo-dark-900",
		inputIcon: "text-akimbo-dark-900",
		selected: "bg-akimbo-dark-900 text-akimbo-light hover:bg-akimbo-dark-500",
	},
	icons: {
		prev: () => <span>Previous</span>,
		next: () => <span>Next</span>,
	},
  datepickerClassNames: "relative -mt-8",
  defaultDate: null,
	language: "en",
	disabledDates: [],
  weekStart: 1,
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Select Date",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

const DatePicker = ({ value, setValue }) => {

  const [show, setShow] = useState(false)

  const handleChange = (selectedDate) =>  {
    setValue(selectedDate)
  }

  const handleClose = (state) => {
		setShow(state)
	}

  return (
    <Datepicker 
      options={options}
      onChange={handleChange} 
      value={value}
      show={show}
      setShow={handleClose}
      weekStart={1}
    />
  )
}

export default DatePicker