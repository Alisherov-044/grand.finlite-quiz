import * as antd from "antd";
import styled from "styled-components";
import { twi } from "tw-to-css";

export const Title = styled(antd.Flex)`
    ${twi`
        w-full h-full items-center justify-center py-6 border-b
    `}
`;

export const HeaderCol = styled(antd.Col)`
    ${twi`
        border-r last-of-type:!border-none
    `}
`;

export const ContentCol = styled(HeaderCol)`
    ${twi`
        px-5 py-8
    `}
`;
