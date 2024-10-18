import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Card from "../../Components/Card"; // Adjust the path if necessary
import ProgressBar from "../../Components/ProgressBar"; // Adjust the path if necessary

const QuizWrapper = styled.div`
  display: flex; /* Flex layout for sidebar and main content */
  gap: 1rem;
`;

const Sidebar = styled.div`
  background-color: #f8f9fa; /* Light background color */
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 29%; /* Set width for sidebar */
  position: relative;
`;

const MainContent = styled.div`
  flex: 1; /* Allow main content to take up remaining space */
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff; /* White background for main content */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const FilterSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center cards */
`;

const PaginationWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfigSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e9ecef; /* Light gray background for configuration */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SelectWrapper = styled.div`
  margin-top: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 8px;
  border: 1px solid #003366;
  font-size: small;
`;

const StartButton = styled.button`
  margin: 1rem 0rem 1rem 0;
  color: #003366;
  text-transform: uppercase;
  border: 2px solid #003366;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: bold;
  background: transparent;
  position: relative;
  transition: all 0.4s ease;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e9ecef; /* Light background on hover */
    color: blue;
    border-color: blue;
  }
`;

const GeneralKnowlegeQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  // Sample Data for Training Courses
  const topics = {
    "general-knowledge": [
      { id: "chapter-1", title: "ARFFS Chapter 1 - Nepal", category: "Nepal", description: "Test your knowledge of ARFFS.", icon: "📜" },
      { id: "chapter-2", title: "ARFFS Chapter 2 - Definitions", category: "Definitions", description: "Test your knowledge of definitions.", icon: "📜" },
      { id: "chapter-3", title: "ARFFS Chapter 3 - Equipment", category: "Equipment", description: "Learn about ARFFS equipment.", icon: "📜" },
      { id: "chapter-4", title: "ARFFS Chapter 1 - ARFFS", category: "ARFFS", description: "Test your knowledge of ARFFS.", icon: "📜" },

      
    ]
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Title");
  const [currentPage, setCurrentPage] = useState(1);
  const [topicsPerPage] = useState(10);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [difficulty, setDifficulty] = useState("Easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [quizDuration, setQuizDuration] = useState(30);
  const [categories, setCategories] = useState([]);

  // Extract categories dynamically
  useEffect(() => {
    if (topics["general-knowledge"]) {
      const uniqueCategories = [
        "All",
        ...new Set(topics["general-knowledge"].map((topic) => topic.category))
      ];
      setCategories(uniqueCategories);
    }
  }, []);

  const filteredTopics = topics["general-knowledge"]?.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || topic.category === selectedCategory)
  );

  const sortedTopics = filteredTopics?.sort((a, b) => {
    if (sortOption === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = sortedTopics?.slice(
    indexOfFirstTopic,
    indexOfLastTopic
  );

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  const handleStartQuiz = () => {
    if (selectedTopic) {
      navigate(`/quiz/general-knowledge/${selectedTopic}`, {
        state: {
          difficulty,
          numberOfQuestions,
          quizDuration,
          isMixed: difficulty === 'Mixed',
        },
      });
    }
  };

  return (
    <QuizWrapper>
      
      <MainContent>
        <h1>General Knowledge</h1>
        <SearchBar
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSortWrapper>
          <div>
            {categories.map((category) => (
              <FilterButton
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </div>
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Title">Sort by Title</option>
          </SortSelect>
        </FilterSortWrapper>

        <CardsContainer>
          {currentTopics?.map((topic) => (
            <Card
              key={topic.id}
              icon={topic.icon}
              title={topic.title}
              description={topic.description}
              onClick={() => handleTopicSelect(topic.id)}
              isSelected={selectedTopic === topic.id}
            />
          ))}
        </CardsContainer>

        <PaginationWrapper>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastTopic >= sortedTopics?.length}
          >
            Next
          </PaginationButton>
        </PaginationWrapper>
      </MainContent>
      <Sidebar>
        {/* <ProgressBar /> */}
        <ConfigSection>
          <h2>Configure Your Quiz</h2>
          {selectedTopic && (
            <div>
              <p>
                <strong>Selected Topic:</strong>{" "}
                {topics["general-knowledge"]?.find((topic) => topic.id === selectedTopic)?.title}
              </p>
              <SelectWrapper>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Mixed">Mixed</option>
                </Select>
                <Select
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(e.target.value)}
                >
                  {[5, 10, 15, 20, 30, 40].map((num) => (
                    <option key={num} value={num}>
                      {num} Questions
                    </option>
                  ))}
                </Select>
                <Select
                  value={quizDuration}
                  onChange={(e) => setQuizDuration(e.target.value)}
                >
                  {[15, 30, 45, 60].map((num) => (
                    <option key={num} value={num}>
                      {num} Minutes
                    </option>
                  ))}
                </Select>
              </SelectWrapper>
              <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
            </div>
          )}
        </ConfigSection>
      </Sidebar>

    </QuizWrapper>
  );
};

export default GeneralKnowlegeQuiz;
