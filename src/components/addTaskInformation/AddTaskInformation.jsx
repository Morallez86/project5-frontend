import React from 'react';

function EditTaskInformation() {
  return (
    <div className="text-white mt-8 flex justify-center items-center">
      <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div>
          <h1 className="text-4xl font-bold text-center mb-6">New task</h1>
          <form>
            <div className="relative my-4">
              <input 
                        type="text" 
                        className="block w-72 py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                        placeholder=""
                        name="title"/>
                    <label 
                        htmlFor="" 
                        className="absolute text-sm duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                        >Task Title
                    </label>
              <div className="flex flex-row items-center space-x-4 mt-6">
                {/* startDate input */}
                <label><b>Start Date:</b></label>
                <input type="date" className="bg-cyan-950 rounded border border-white" />

                {/* endDate input */}
                <label><b>End Date:</b></label>
                <input type="date" className="bg-cyan-950 rounded border border-white" />
              </div>
              {/* Combobox */}
              <div className="flex flex-row items-center space-x-4 mt-6">
                <label><b>Status:</b></label>
                <select className="bg-cyan-950 rounded border border-white">
                  {/* Add options here */}
                  <option value="To Do">TO DO</option>
                  <option value="Doing">DOING</option>
                  <option value="Done">DONE</option>
                  {/* Add more options as needed */}
                </select>
                <label><b>Priority:</b></label>
                <select className="bg-cyan-950 rounded border border-white">
                  {/* Add options here */}
                  <option value="100">High</option>
                  <option value="200">Medium</option>
                  <option value="300">Low</option>
                  {/* Add more options as needed */}
                </select>
                <label><b>Category:</b></label>
                <select className="bg-cyan-950 rounded border border-white">
                {/* Map over categories to generate options */}
                {/*categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
                ))*/}
                </select>
              </div>
              <div className="flex flex-row items-center space-x-4 mt-6">
              <label><b>Description:</b></label>
              <textarea className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950"></textarea>
              </div>
              <div>
                <div>
                  <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-green-500 text-white hover:bg-green-700 py-2 transition-colors duration-300" id="save-btn">Save</button>
                  <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-gray-500 text-white hover:bg-gray-700 py-2 transition-colors duration-300" id="close-button-color">Cancel</button>
                </div>
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-red-500 text-white hover:bg-red-700 py-2 transition-colors duration-300" id="delete-btn">Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTaskInformation;
