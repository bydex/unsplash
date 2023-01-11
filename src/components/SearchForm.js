import { useEffect, useMemo, useState } from "react";
import { topicsApiService } from "../services/api/topics.service";

export function SearchForm({ inputValue, onUpdateInputValue }) {
  const _onUpdateInputValue = (value) => {
    onUpdateInputValue(value);
    setInputMessage(value);
  };
  const handleChange = () => _onUpdateInputValue(inputMessage);
  const [topics, setTopics] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    inputValue && setInputMessage(inputValue);
  }, [inputValue]);

  const topicsTags = useMemo(
    () => topics.map((topic) => topic.title),
    [topics]
  );

  const fetchTopics = async () => {
    const result = await topicsApiService.getList({
      page: 1,
      per_page: 20,
    });

    setTopics(result.data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleChange();
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div>
      <div
        className="relative mb-6 before:absolute
                        before:bottom-0 before:h-[1px] before:w-full before:bg-gradient-to-r before:from-transparent before:via-light before:opacity-50"
      >
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onBlur={handleChange}
          className="w-full bg-transparent pb-4 text-center text-7xl placeholder-light outline-none"
          placeholder="Поиск"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div
        className="relative
                    before:pointer-events-none
                    before:absolute
                    before:right-0
                    before:top-0
                    before:bottom-0
                    before:z-10
                    before:w-[20%]
                    before:bg-gradient-to-r
                    before:from-transparent
                    before:to-dark"
      >
        <ul className="flex gap-4 overflow-x-auto whitespace-nowrap">
          {topicsTags.map((tag) => (
            <li
              className={"cursor-pointer"}
              onClick={() => _onUpdateInputValue(tag)}
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
