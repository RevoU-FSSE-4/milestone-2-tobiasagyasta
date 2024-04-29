import { useState } from "react";
import data from "../data/CountryData.json";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

const SearchBar = () => {
	const [query, setQuery] = useState<string>("");
	const [suggestions, setSuggestions] = useState<any>([]);
	polyfillCountryFlagEmojis();

	const handleInputChange = (event: any) => {
		const inputValue = event.target.value;
		setQuery(inputValue);

		// Filter countries and capitals based on user input
		const filteredSuggestions = data.filter((country) =>
			country.country
				.trim()
				.toLowerCase()
				.includes(inputValue.trim().toLowerCase())
		);
		const limitedSuggestions = filteredSuggestions.slice(0, 5);
		setSuggestions(limitedSuggestions);
	};

	return (
		<div className='relative flex flex-col my-8'>
			<div className='flex flex-row'>
				<input
					type='text'
					value={query}
					onChange={handleInputChange}
					className='text-base relative ml-1 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem]  font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none '
					placeholder='Search by country'
				/>
				<button
					className='z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 '
					type='button'
				>
					Search
				</button>
			</div>

			{query !== "" && suggestions.length !== 0 ? (
				<ul className=' border border-l border-r border-b border-solid border-neutral-200  text-gray-700  rounded-s '>
					{suggestions.map((suggestion: any, index: number) => (
						<li
							key={index}
							className=' py-2 ml-1 block text-base hover:bg-gray-100'
						>
							{`${suggestion.country} ${suggestion.emoji_code} (${suggestion.capital})`}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};

export default SearchBar;
