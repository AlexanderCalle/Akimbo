import React from 'react'
import { useFormContext } from 'react-hook-form';

const LabelTextField = ({ label, name, type, validationRules, ...rest}) => {

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        placeholder={`${label}...`}
        className="border border-akimbo-dark-900 px-3 py-1"
        {...rest}
      />
      {hasError ? (
        <div className="text-tag-red text-sm">
          {errors[name].message}
        </div>
      ) : null}
    </div>
  )
}

export default LabelTextField