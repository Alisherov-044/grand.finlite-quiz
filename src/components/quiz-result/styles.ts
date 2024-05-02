import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const Title = styled(antd.Typography.Title)`
    ${twi`
        w-full h-full flex items-center justify-center !text-blue-900 !text-lg font-semibold py-4 capitalize border-b border-blue-300
    `}
`;

export const HeaderCol = styled(antd.Col)`
    ${twi`
        min-w-72 border-r border-blue-300 last-of-type:!border-none
    `}
`;

export const ContentCol = styled(HeaderCol)`
    ${twi`
        px-5 py-8 min-w-72
    `}
`;
