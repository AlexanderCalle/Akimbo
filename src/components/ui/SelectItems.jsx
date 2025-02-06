import CreateSelect from "react-select/creatable";
import chroma from "chroma-js"
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { createTag } from "../../services/Tags";


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

const SelectItems = ({ selectedValues, options, setSelected, handleCreate, isOpen, setIsOpen, color, setColor, newTag, setNewTag }) => {
  const [displayPicker, setDisplayPicker] = useState(false);

  const onChangeColorPicker = color => {
    setColor(color.hex);
  }

  const onCreateTag = async (input) => {
    console.log(`Creating ${input}...`)
    setNewTag(input);
    setIsOpen(true)
  }

  const onOpenChange = (input) => {
    setIsOpen(input)
  }

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select color for {newTag}</ModalHeader>
              <ModalBody>
                <label htmlFor="colorPicker">Background color</label>
                <div className="flex">
                  <div className="w-10 h-10" style={{backgroundColor: color}} />
                  <input 
                      className="w-24 h-10"
                      name="color-txt"
                      type="text"
                      value={color}
                      onClick={() => setDisplayPicker(true)}
                      id="colorPicker"
                      readOnly
                  />
                </div>
                  <div>
                    {displayPicker && (
                      <div className="fixed z-200">
                        <div className="fixed top-0 left-0 right-0 bottom-0"  onClick={() => setDisplayPicker(false)}/>
                        <ChromePicker color={color} onChange={onChangeColorPicker} />
                      </div>
                    )}
                  </div>
                  <p className="-mt-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                      No idea? go to <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer">coolors.co</a>
                  </p>
                <button
                  type="submit"
                  className="w-fit bg-akimbo-dark-900 text-akimbo-light px-3 py-2"
                  onClick={handleCreate}
                >
                  Post article
                </button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <CreateSelect
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
        onCreateOption={onCreateTag}
        isMulti
        required
      />
    </>
  )
}

export default SelectItems