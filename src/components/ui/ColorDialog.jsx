import { useState } from "react"
import { ChromePicker } from "react-color";

export const ColorDialog = ({onResolve}) => {
  const [color, setColor] = useState({
      r: "0",
      g: "9",
      b: "153",
      a: "1"
  });
  const [changeColor, setChangeColor] = useState('#999')
  const [displayPicker, setDisplayPicker] = useState(false);

  const onChangeColorPicker = color => {
    setColor(color.rgb);
    setChangeColor(color.hex);
}

  const handleSet = () => {
    onResolve(changeColor)
  }

  return (
    <div className="border border-akimbo-dark-900 p-8 w-2/4">
      <h2>Select color for the new tag</h2>
      <label htmlFor="colorPicker">Background color</label>
      <div className="flex">
            <div className="w-10 h-10" style={{backgroundColor: color}} />
            <input 
                className="w-24 h-10"
                name="color-txt"
                type="text"
                value={color}
                onClick={() => setColor(true)}
                id="colorPicker"
                readOnly
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
        <p
            class="-mt-4 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
        >
            No idea? go to <a href="https://coolors.co/" target="_blank" rel="noopener noreferrer">coolors.co</a>
        </p>
        <button
            className="w-fit bg-akimbo-dark-900 text-akimbo-light px-3 py-2"
          >
            Create tag
          </button>
    </div>
  )
}