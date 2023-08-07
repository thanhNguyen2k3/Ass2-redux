import { SyntheticEvent, useState } from 'react';
import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '../api/product';
import { useAppDispatch } from '../app/hook';
import Loading from '../components/Loading';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { add } from '../slices/cart';

const FilterPage = () => {
    const dispath = useAppDispatch();
    const { data: categories } = useGetCategoriesQuery();

    const [category, setCategory] = useState<string | number>('');
    const { data: products, isLoading } = useGetCategoryByIdQuery(category);

    const handleSelect = (e: SyntheticEvent) => {
        let target = e.target as HTMLInputElement;

        setCategory(target.value);
    };

    return (
        <section className="bg-gray-50 font-poppins dark:bg-gray-800 ">
            <div className="px-4 py-4 mx-auto max-w-7xl lg:py-6 md:px-6">
                <div className="flex flex-wrap mb-24 -mx-3">
                    <div className="w-full pr-4 lg:w-1/4 lg:block">
                        <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Select an option
                            </label>
                            <select
                                id="category"
                                onChange={(e) => handleSelect(e)}
                                // value={category}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value={''}>-- Loại hàng --</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.cateName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-full px-3 lg:w-3/4">
                        <div className="px-3 ">
                            <div className="items-center justify-between hidden px-4 py-2 mb-4 bg-gray-100 md:flex dark:bg-gray-900 ">
                                <h2 className="text-2xl dark:text-gray-400">Search Results for items</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-list"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                                ></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-3 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-grid-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
                                            </svg>
                                        </a>
                                        <a
                                            href="#"
                                            className="inline-block h-full p-2 mr-6 border rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="w-5 h-5 bi bi-grid-3x3-gap-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div>
                                        <select
                                            name=""
                                            id=""
                                            className="block w-40 text-base bg-gray-100 dark:text-gray-400 dark:bg-gray-900"
                                        >
                                            <option value="">Sort by latest</option>
                                            <option value="">Sort by Popularity</option>
                                            <option value="">Sort by Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center ">
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    {products?.map((product) => (
                                        <div key={product.id} className="w-full px-3 mb-6 sm:w-1/2 md:w-1/3">
                                            <div className="border border-gray-200 rounded-md dark:border-gray-800">
                                                <div className="relative bg-gray-200">
                                                    <a href="#" className="">
                                                        <img
                                                            src={product.image}
                                                            alt=""
                                                            className="object-cover w-full h-56 mx-auto "
                                                        />
                                                    </a>
                                                </div>
                                                <div className="p-5 bg-gray-50 dark:bg-gray-900">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <h3 className="text-xl font-medium dark:text-gray-400">
                                                            {product.name?.slice(0, 20)}...
                                                        </h3>
                                                        <FavoriteBorderIcon />
                                                    </div>
                                                    <div className="mb-4 ">
                                                        <p className="text-lg ">
                                                            <span className="text-red-400 dark:text-gray-400">
                                                                {product.price}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => dispath(add({ ...product, quantity: 1 }))}
                                                        className="w-full flex justify-center px-4 py-2 text-blue-600 border border-blue-300 rounded-full dark:border-gray-600 dark:text-gray-400 hover:bg-blue-700 hover:text-gray-100 dark:hover:bg-gray-800 dark:hover:border-gray-900"
                                                    >
                                                        Thêm giỏ hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="flex justify-end mt-6">
                            <nav aria-label="page-navigation">
                                <ul className="flex list-style-none">
                                    <li className="page-item disabled ">
                                        <a
                                            href="#"
                                            className="relative block pointer-events-none px-3 py-1.5 mr-3 text-base text-gray-700 transition-all duration-300  rounded-md dark:text-gray-400 hover:text-gray-100 hover:bg-blue-600"
                                        >
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item ">
                                        <a
                                            href="#"
                                            className="relative block px-3 py-1.5 mr-3 text-base hover:text-blue-700 transition-all duration-300 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-100 bg-blue-600"
                                        >
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item ">
                                        <a
                                            href="#"
                                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3  "
                                        >
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item ">
                                        <a
                                            href="#"
                                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md mr-3 "
                                        >
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item ">
                                        <a
                                            href="#"
                                            className="relative block px-3 py-1.5 text-base text-gray-700 transition-all duration-300 dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 rounded-md "
                                        >
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FilterPage;
