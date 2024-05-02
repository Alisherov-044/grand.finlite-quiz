import type { FC } from "react";
import { Icons, type IconProps } from "@/components/icons";

export type TSidebarLink = {
    id: number;
    link: string;
    title: string;
    Icon: FC<IconProps>;
};

export type TSidebarLinks = Record<string, TSidebarLink[]>;

export const sidebarLinks: TSidebarLinks = {
    student: [
        {
            id: 3,
            link: "/exams",
            title: "Imtihon",
            Icon: Icons.document,
        },
        {
            id: 4,
            link: "/grand",
            title: "Grand",
            Icon: Icons.diploma,
        },
    ],
};
