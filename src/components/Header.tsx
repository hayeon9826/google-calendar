import { Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { HiMenu } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RootState } from "../store";
import { setDate } from "../store/calendar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface HeaderProps {
  sideOpen: boolean;
  weekView: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
  setWeekView: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  sideOpen = true,
  setSideOpen,
  weekView = true,
  setWeekView,
}: HeaderProps) => {
  const selectedDate = useSelector((state: RootState) => state.calendar.date);
  const dispatch = useDispatch();
  return (
    <header className="relative z-20 flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
      <div className="flex items-center">
        <HiMenu
          className="text-xl mr-4 text-gray-600 cursor-pointer hover:text-gray-300 rounded-full"
          onClick={() => setSideOpen(!sideOpen)}
        />
        <FcGoogle className="text-xl" />
        <div className="hidden md:block lg:block text-xl font-normal text-gray-600 ml-2">
          캘린더
        </div>
        <button
          onClick={() =>
            dispatch(setDate(moment(new Date()).format("YYYY-MM-DD")))
          }
          type="button"
          className="hidden md:block lg:block ml-16 items-center px-4 py-2 border border-gray-300 shadow-lg text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
        >
          오늘
        </button>
        <button
          type="button"
          className="ml-4 -my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon
            className="h-5 w-5"
            aria-hidden="true"
            onClick={() =>
              dispatch(
                setDate(
                  weekView
                    ? moment(selectedDate)
                        .subtract(1, "week")
                        .format("YYYY-MM-DD")
                    : moment(selectedDate)
                        .subtract(1, "month")
                        .format("YYYY-MM-DD")
                )
              )
            }
          />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon
            className="h-5 w-5"
            aria-hidden="true"
            onClick={() =>
              dispatch(
                setDate(
                  weekView
                    ? moment(selectedDate).add(1, "week").format("YYYY-MM-DD")
                    : moment(selectedDate).add(1, "month").format("YYYY-MM-DD")
                )
              )
            }
          />
        </button>
        <h2 className="ml-6 flex-auto text-lg font-semibold text-gray-600">
          {moment(selectedDate).format("YYYY년 MM월")}
        </h2>
      </div>
      <div className="flex items-center">
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button
              type="button"
              className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              {weekView ? "주" : "월"}
              <ChevronDownIcon
                className="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => setWeekView(true)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        주
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => setWeekView(false)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        월
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="ml-6 h-6 w-px bg-gray-300" />
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() =>
                        dispatch(
                          setDate(moment(new Date()).format("YYYY-MM-DD"))
                        )
                      }
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      오늘
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => setWeekView(true)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      주
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => setWeekView(false)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      월
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
