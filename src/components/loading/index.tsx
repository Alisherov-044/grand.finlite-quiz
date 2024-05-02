import { clsx } from "clsx";
import { Flex } from "antd";
import { LayoutSkeleton } from "@/components";
import { type ReactNode } from "react";

export type LoadingProps = {
    fallback?: ReactNode;
};

export function Loading({ fallback = <LayoutSkeleton /> }: LoadingProps) {
    return (
        <Flex className="w-full h-full items-center justify-center">
            {fallback}
            <Flex className="fixed top-0 left-0 w-full h-full z-50 items-center justify-center gap-x-6 backdrop-blur">
                {[...Array(3).keys()].map((key) => (
                    <div
                        key={key}
                        className={clsx(
                            "w-12 h-12 rounded-full animate-pulse",
                            `circle-animation-dot-${key + 1}`
                        )}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
