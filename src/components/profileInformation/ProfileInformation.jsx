import React from 'react'

const ProfileInformation = () => {
  return (
    <div className="text-white h-[100vh] flex justify-center items-center">
    <div className="bg-cyan-900/60	border border-cyan-950 rounded-md p-12 backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div> 
                <h1 className="text-4xl text-whitefont-bold text-center mb-6">Profile</h1>
                <form /*onSubmit={handleSubmit}*/>
                <div className="relative my-4">
                    <input 
                        type="text" 
                        className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                        placeholder=""
                        //onChange={handleChange}
                        name="Username"/>
                    <label 
                        htmlFor="" 
                        className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                        >Username
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    //onChange={handleChange}
                    name="Firstname"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >First Name
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    //onChange={handleChange}
                    name="Lastname"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Last Name
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="email" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    //onChange={handleChange}
                    name="Email"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Email
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    //onChange={handleChange}
                    name="PhotoURL"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Photo URL
                    </label>
                </div>
                <div className="relative my-4">
                    <input 
                    type="text" 
                    className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-cyan-950 focus:outline-none focus:ring-0 focus:text-white focus:border-cyan-950 peer" 
                    placeholder=""
                    //onChange={handleChange}
                    name="Phone"
                    />
                    <label 
                    htmlFor="" 
                    className="absolute text-sm text-white duration-300 transform translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-900 peer-focus:dark:text-cyan-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-6"
                    >Phone
                    </label>
                </div>
                <button 
                    className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-teal-900 hover:bg-teal-950 hover:text-white py-2 transition-colors duration-300" 
                    type="submit"
                    >Save
                </button>
                </form>
            </div>
        </div>
        </div>
  )
}

export default ProfileInformation