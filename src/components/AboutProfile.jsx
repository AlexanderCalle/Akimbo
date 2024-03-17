import React from 'react'

const AboutProfile = ({idx, image, description, firstname, lastname, borderColor}) => {
  return (
        <div className={`${idx%2 !== 0 ? "lg:self-end lg:flex-row-reverse pl-2" : "lg:self-start lg:flex-row pr-2"} self-center w-3/4 lg:h-60 flex flex-col gap-5 items-center`}
         style={{
            backgroundColor: borderColor+"60"
        }}
        >
            <img
                src={image}
                alt={firstname + " " + lastname}
                className="h-60 lg:h-full aspect-square object-cover"
            />
            <div className="flex flex-col gap-3 items-center lg:items-end">
                <p className={`text-center ${idx%2 !== 0 ? "lg:text-end" : "lg:text-start"}`}>
                {description}
                </p>
            </div>
        </div>
  )
}

export default AboutProfile