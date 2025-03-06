import { useState } from 'react';
import Sidebar from './partials/Sidebar';
import Header from './partials/Header';
import DropdownFilter from './filter/DropdownFilter';
import DatePickerWithRange from './filter/DatePicker';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">b-smart</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <DropdownFilter align="right" />
                {/* Datepicker built with React Day Picker */}
                <DatePickerWithRange align="right" />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart */}
              <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
                <div className="p-5">
                  <header className="flex justify-between items-start space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Line Chart</h2>
                  </header>
                  <div className="mt-4"></div>
                </div>
              </div>

              {/* Bar chart */}
              <div className="col-span-full xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
                <div className="p-5">
                  <header className="flex justify-between items-start space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Bar Chart</h2>
                  </header>
                  <div className="mt-4"></div>
                </div>
              </div>

              {/* Pie chart */}
              <div className="col-span-full xl:col-span-4 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
                <div className="p-5">
                  <header className="flex justify-between items-start space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Pie Chart</h2>
                  </header>
                  <div className="mt-4"></div>
                </div>
              </div>

              {/* Table */}
              <div className="col-span-full bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
                <div className="p-5">
                  <header className="flex justify-between items-start space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Other Chart</h2>
                  </header>
                  <div className="mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
