import React, { useState } from 'react'
import { ChromePicker} from 'react-color';
import { useFormContext } from 'react-hook-form';

const ColorPicker = ({ label, name, validationRules, ...rest }) => {

  const [color, setColor] = useState({
    r: "0",
    g: "9",
    b: "153",
    a: "1"
  });
  const [changeColor, setChangeColor] = useState("#000")
  const [displayPicker, setDisplayPicker] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = name in errors;

  const onChangeColorPicker = (color) => {
    setColor(color.rgb);
    setChangeColor(color.hex);
  }

  return (
    <div>
      <label htmlFor="colorPicker">{label}</label>
        <div className="flex">
          <div className="w-10 h-10" style={{backgroundColor: changeColor}} />
          <input 
              className="w-24 h-10"
              {...register(name, validationRules)}
              id={name}
              type="text"
              value={changeColor}
              onClick={() => setDisplayPicker(true)}
              placeholder={`${label}...`}
              readOnly
              {...rest}
          />
        </div>
        <div>
          {displayPicker && (
            <div className="absolute z-50">
              <div className="fixed top-0 left-0 right-0 bottom-0"  onClick={() => setDisplayPicker(false)}/>
              <ChromePicker color={color} onChange={onChangeColorPicker} />
            </div>
          )}
        </div>
        {hasError ? (
          <div className="text-tag-red text-sm">
            {errors[name].message}
          </div>
        ) : null}
    </div>
  )
}

export default ColorPicker