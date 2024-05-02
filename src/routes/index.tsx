import { LoginPageSkeleton } from "@/components";
import {
    ExamQuizPage,
    ExamResultPage,
    ExamsPage,
    LoginPage,
    NotFoundPage,
    RedirectionToRolePage,
    UnAuthorizedPage,
} from "@/pages";
import { Role } from "@/types";
import type { ReactNode } from "react";

export type TRoute = {
    id: number;
    path: string;
    element: ReactNode;
    fallback?: ReactNode;
};

export type TPublicRoute = TRoute;
export type TPrivateRoute = TRoute & {
    roles: number[];
};

export type TRoutes = {
    public: TPublicRoute[];
    private: TPrivateRoute[];
};

const userRoles = {
    admin: [Role.admin],
    teacher: [Role.teacher],
    student: [Role.student],
};

export const routes: TRoutes = {
    public: [
        {
            id: 1,
            path: "/",
            element: <RedirectionToRolePage />,
        },
        {
            id: 2,
            path: "/login",
            element: <LoginPage />,
            fallback: <LoginPageSkeleton />,
        },
        {
            id: 3,
            path: "/un-authorized",
            element: <UnAuthorizedPage />,
        },
        {
            id: 4,
            path: "*",
            element: <NotFoundPage />,
        },
    ],
    private: [
        {
            id: 7,
            path: "/exams",
            element: <ExamsPage />,
            roles: [...userRoles.student],
        },
        {
            id: 17,
            path: "/exams/quiz/:id",
            element: <ExamQuizPage />,
            roles: [...userRoles.student],
        },
        {
            id: 18,
            path: "/exams/quiz/:id/result",
            element: <ExamResultPage />,
            roles: [...userRoles.student],
        },
    ],
};
