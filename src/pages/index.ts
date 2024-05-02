import { lazy } from "react";

export const ExamsPage = lazy(() => import("./exams"));
export const LoginPage = lazy(() => import("./login"));
export const UnAuthorizedPage = lazy(() => import("./un-authorized"));
export const NotFoundPage = lazy(() => import("./not-found"));
export const RedirectionToRolePage = lazy(() => import("./redirect-to-role"));
export const ExamQuizPage = lazy(() => import("./exams/[id]"));
