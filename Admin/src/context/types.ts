import { Dayjs } from "dayjs"

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  uid: string
  username: string
  fullName?: string
  avatar?: string | null
  role: string
  email: string
  name?: {
    last_name: string
    first_name: string
  }
  password?: string
  birthday?: string | Date | Dayjs
  phone_number?: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams) => Promise<void>
}

export type Category = {
  _id: string,
  name: string,
  icon: string
  total?: number;
}

export type Courses = {
  _id: string,
  name: string,
  category_id: string,
  icon: string,
  status: string
}

export type ForgotPass = {
  email: string,
  otp: string,
  newPassword: string,
  confirmNewPassword: string
}

export type QuizQuestionStore = {
  _id: string,
  title: string,
  owner: string,
  owner_name: string,
  is_share: boolean,
  createAt: Date
}

export type QuizQuestion = {
  _id: string,
  quiz_store_id: string,
  level: string,
  question: string,
  answer: [{
    content: string,
    score: number,
  }]
}

export type Quiz = {
  _id: string,
  teacher_id: string,
  teacher_name: string,
  title: string,
  course_id: string,
  total_question_hard: number;
  total_question_middle: number;
  total_question_easy: number;
  total_time: number,
  max_score: number,
  time_begin: string | Date | Dayjs,
  time_end: string | Date | Dayjs,
  createAt: string | Date | Dayjs,
  type?: string

}

export type QuizList = {
  quiz: Quiz
}

export type Essay = {
  exam: {
    content: string;
    course_id: string;
    createAt: string | Date | Dayjs,
    files: string[];
    teacher_id: string;
    time_end: string | Date | Dayjs,
    time_start: string | Date | Dayjs,
    title: string;
    total_time: number;
    _id: string;
  }
  teacher_name: string;
}

export type CharacterAIType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  isChat: boolean;
  conversationID?: string;
  personality: string
  firstGreet: string
  information: string
};


export type EssayData = {
  data: {
    _id: string;
    essay_exam_id: string;
    student_id: string;
    content_answers: string;
    file_upload: string[];
    status: string;
    time_out: string | Date | Dayjs,
    createAt: string | Date | Dayjs,
  }
  student_name: string;
  essay_title?: string
}

export type QuizChart = {
  scores: string[]
  series: { data: number[] }[]
}

export type QuizScore = {
  id_Quiz: string
  totalScoreQuiz: number
}

export type Users = {
  email: string;
  username: string;
  uid: string;
  avatar?: string | null
};

export type VocabularyItem = {
  id: string;
  word: string;
  translation: string;
  mean: string;
  pronunciation: string;
  example: string;
}

export type CollectionItemData = {
  collectionID: string;
  name: string;
  desc: string;
  value: number;
  isPublish: boolean;
  isAdmin: boolean;
  date: string;
  vocabulary: VocabularyItem[];
}
