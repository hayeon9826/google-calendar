import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../store/modal";

const Modal = ({ isShow = false }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        !isShow && "hidden"
      } overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`}
      id="medium-modal"
    >
      <div className="relative px-4 w-full max-w-lg h-full md:h-auto mx-auto mt-48">
        <div className="relative bg-white rounded-lg shadow-lg ">
          <div className="flex justify-between items-center p-2 rounded-t ">
            <button
              type="button"
              onClick={() => dispatch(setModalState(false))}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="medium-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <div>
              <div className="mt-1 border-b-2 ">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full border-0 border-transparent text-2xl border-b-2 border-blue-600"
                  placeholder="제목 추가"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b flex-row-reverse">
            <button
              data-modal-toggle="medium-modal"
              type="button"
              className="text-white ml-2 bg-blue-700 hover:bg-blue-800   font-medium rounded-md text-sm px-5 py-2.5 text-center"
            >
              저장
            </button>
            <button
              data-modal-toggle="medium-modal"
              type="button"
              onClick={() => dispatch(setModalState(false))}
              className="text-gray-700 bg-white hover:bg-gray-100 rounded-md text-sm font-medium px-5 py-2.5   "
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
