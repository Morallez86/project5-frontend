import CategoryComboBox from './categoryComboBox';

function CategoryEdition() {
  return (
    <div className="text-white mt-8 flex justify-center items-center">
      <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div>
          <h1 className="text-4xl font-bold text-center mb-6">Category Edition:</h1>
          <div className="flex justify-between items-center space-x-32">
            <div>
              <label className="mr-2" htmlFor="taskFilter">Categories:</label>
              <CategoryComboBox/>
            </div>
            <div>
              <label htmlFor="categoryInput">Category Title:</label>
              <input type="text" id="categoryInput" className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 py-2.5 text-sm" placeholder="Category title" />
            </div>
          </div>
          <div className="flex justify-end space-x-24 mt-10">
            <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-green-500 text-white hover:bg-green-700 py-2 transition-colors duration-300">Add Category</button>
            <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-gray-500 text-white hover:bg-gray-700 py-2 transition-colors duration-300">Rename Category</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CategoryEdition;
