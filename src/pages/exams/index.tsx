import { z } from "zod";
import { useDispatch, useSelector, useTranslate } from "@/hooks";
import { ExamCard, ExamCardSkeleton } from "@/components";
import { useQuery } from "react-query";
import { getCurrentRole } from "@/utils";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Empty, Flex, Typography } from "antd";
import { axiosPrivate } from "@/lib";
import { EXAMS_URL, EXAM_QUESTIONS_URL } from "@/utils/urls";
import type { TExam } from "@/components/cards/exam-card";
import { setExamId, setQuestions } from "@/redux/slices/examSlice";

export type TExamsRequest = {
    title: string;
    start: Date;
    end: Date;
    category_id: number;
    participant_ids: number[];
    file: any;
};

export type TExamDetail = {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    start: string;
    end: string;
    participants: {
        id: number;
        first_name: string;
        last_name: string;
    }[];
    answers: [];
    questions: {
        id: number;
        description: string;
    }[];
};

export type TExamsResponse = {
    data: TExam[];
};

export type TExamResponse = {
    data: TExamDetail[] | null;
};

export const ExamFormScheme = z.object({
    title: z.string().optional(),
    starting_date: z.any().optional(),
    starting_time: z.any().optional(),
    ending_time: z.any().optional(),
    category_id: z.number().optional(),
    participant_ids: z.array(z.number()).optional(),
    file: z.any().optional(),
});

export default function ExamsPage() {
    const { t } = useTranslate();
    const { roles, access_token } = useSelector((state) => state.auth);
    const currentRole = getCurrentRole(roles);
    const location = useLocation();
    const navigate = useNavigate();

    if (!currentRole) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const { data: exams, isLoading } = useQuery<TExamsResponse>("exams", {
        queryFn: async () =>
            await axiosPrivate
                .get(EXAMS_URL, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => res.data.data),
    });
    const dispatch = useDispatch();

    async function getExamQuestions(id: number) {
        try {
            const res = await axiosPrivate.get(EXAM_QUESTIONS_URL(id), {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            dispatch(setQuestions(res.data.data.data));
            return navigate(`/exams/quiz/${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    const filteredExams = exams?.data.filter(
        (exam) => new Date(exam.end).getTime() - new Date().getTime() <= 0
    );

    return (
        <main className="pb-10">
            <div className="flex flex-col container">
                <Typography className="!text-2xl font-semibold !text-blue-900">
                    {t("Imtihonlar")}
                </Typography>
                <Flex className="pb-10 flex-auto flex-col gap-y-6 mt-6">
                    {isLoading ? (
                        [...Array(3).keys()].map((key) => (
                            <ExamCardSkeleton key={key} />
                        ))
                    ) : filteredExams && filteredExams.length ? (
                        filteredExams.map((exam) => (
                            <ExamCard
                                onConfirm={() => {
                                    getExamQuestions(exam.id);
                                    dispatch(setExamId(exam.id));
                                }}
                                key={exam.id}
                                exam={exam}
                            />
                        ))
                    ) : (
                        <Flex className="flex-auto items-center justify-center">
                            <Empty description={t("Ma'lumotlar mavjud emas")} />
                        </Flex>
                    )}
                </Flex>
            </div>
        </main>
    );
}
