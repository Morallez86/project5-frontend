import React, { useState } from 'react';
import Layout from './Layout';
import SearchChatRows from '../components/chatComponents/SearchChatRows';
import { userStore } from '../stores/UserStore';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function Chat() {
    const [searchResults, setSearchResults] = useState([]);
    const token = userStore((state) => state.token);

    const handleOnHover = (result) => {

    };

    const handleOnSelect = (item) => {

    };

    const handleOnFocus = () => {
    };

    const formatResult = (item) => {
        return (
            <div>
                <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
            </div>
        );
    };


    const handleSearch = (string) => {

        if (string.length >= 3) {
            fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/search?query=${string}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Search request failed');
                }
            })
            .then((data) => {
                // Format each item in the data array
                const formattedResults = data.map((item) => ({
                    id: item.id,
                    name: item.username,
                }));

                // Update searchResults state with formatted results
                setSearchResults(formattedResults);
            })
            .catch((error) => {
                console.error('Error searching users:', error);
                setSearchResults([]); // Clear search results on error
            });
        } else {
            setSearchResults([]); // Clear search results if query length is less than 3
        }
    };

    return (
        <Layout>
        <div className="container mx-auto shadow-lg rounded-lg p-6">
            <div className="px-5 py-5 flex justify-between items-center bg-white rounded border-b-2">
                <div className="font-semibold text-2xl">ScrumChat</div>
            </div>
            <div className="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto ">

                <div className="border-b-2 py-4 px-2">
                <ReactSearchAutocomplete
                    items={searchResults}
                    onSearch={handleSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
                </div>
                <SearchChatRows></SearchChatRows>
                <div
                className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                >
                <div className="w-1/4">
                    <img
                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                    className="object-cover h-12 w-12 rounded-full"
                    alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">MERN Stack</div>
                    <span className="text-gray-500">Lusi : Thanks Everyone</span>
                </div>
                </div>
            </div>

            <div className="w-full px-5 flex flex-col justify-between">
                <div className="flex flex-col mt-5">
                <div className="flex justify-end mb-4">
                    <div
                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                    Welcome to group everyone !
                    </div>
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                    <div
                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    at praesentium, aut ullam delectus odio error sit rem. Architecto
                    nulla doloribus laborum illo rem enim dolor odio saepe,
                    consequatur quas?
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div>
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Magnam, repudiandae.
                    </div>

                    <div
                        className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis, reiciendis!
                    </div>
                    </div>
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                    />
                    <div
                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                    happy holiday guys!
                    </div>
                </div>
                </div>
                <div className="py-5">
                <input
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                />
                </div>
            </div>
            </div>
            </div>
        </Layout>
    );
}

export default Chat;