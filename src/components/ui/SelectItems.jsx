import Select from "react-select";
import chroma from "chroma-js"

const customStyle = {

  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
} 

const SelectItems = ({ selectedValues, options, setSelected }) => {
  return (
    <Select
      classNames={{
        content: () => "border border-solid bg-akimbo-light rounded-sm",
        container: () => "border border-solid bg-akimbo-light rounded-sm"
      }}
      defaultValue={selectedValues}
      styles={customStyle}
      options={options}
      name="tags"
      onChange={(value) =>
        setSelected(value.map((value) => value.value))
      }
      isMulti
      required
    />
  )
}

export default SelectItems