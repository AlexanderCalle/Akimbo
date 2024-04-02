import React from 'react'

const ModalDelete = ({article, setShowModal, handleDelete}) => {
  return (
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#fff] outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-akimbo-dark-500">
                    <h3 className="text-3xl font-semibold">Delete article?</h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                    >
                        <span className="bg-transparent text-[#000] opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        x
                        </span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        Are you sure you want to delete {article.title}
                    </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-akimbo-dark-500">
                    <button
                        className="bg-tag-red text-akimbo-light  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-akimbo-dark-500 text-white text-sm px-6 py-2 outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-[#000]"></div>
    </>
  )
}

export default ModalDelete