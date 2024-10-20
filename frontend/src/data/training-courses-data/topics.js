import chapter1Data from '../../data/training-courses-data/chapter1';
import chapter2Data from '../../data/training-courses-data/chapter2';
import chapter3Data from '../../data/training-courses-data/chapter3';

const topics = {
  "training-courses": [
    {
      id: "chapter-1",
      title: chapter1Data.title,
      category: "ARFFS",
      description: chapter1Data.description,
      icon: "📜",
      questions: chapter1Data.questions
    },
    {
      id: "chapter-2",
      title: chapter2Data.title,
      category: "Definitions",
      description: chapter2Data.description,
      icon: "📜",
      questions: chapter2Data.questions
    },
    {
      id: "chapter-3",
      title: chapter3Data.title,
      category: "Equipment",
      description: chapter3Data.description,
      icon: "📜",
      questions: chapter3Data.questions
    },
  ]
};

export default topics;
