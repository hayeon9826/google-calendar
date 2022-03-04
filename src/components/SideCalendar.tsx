import { Fragment } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const days = Array.from(Array(30).keys());

const SideCalendar = () => {
  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center ml-4 mt-2 px-8 py-2 border border-gray-300 shadow-lg text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        만들기
      </button>
      <div className="md:p-4 lg:p-6">
        <div className="flex items-center">
          <h2 className="ml-2 flex-auto font-semibold text-gray-600">
            2022년 3월
          </h2>
          <button
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-xs">
          {days.map((day, index) => (
            <div key={index} className={classNames("py-2")}>
              <button
                type="button"
                className={classNames(
                  "text-gray-600",
                  "text-xs",
                  "hover:bg-gray-200",
                  "mx-auto flex h-4 w-4 items-center justify-center rounded-full"
                )}
              >
                <time>{day}</time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideCalendar;
