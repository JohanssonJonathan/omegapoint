import styled from '@emotion/styled';
import { fontSizes, fontWeights } from '../util/styleGuide';

export const FlexColumn = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled('div')`
  display: flex;
`;

export const DefaultImg = styled('img')``;

export const H2 = styled('h2')`
  font-size: ${fontSizes.normal};
  font-weight: ${fontWeights.bold};
  margin: 0;
`;

export const H3 = styled('h3')`
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.normal};
  margin: 0;
`;

export const H4 = styled('h4')`
  font-weight: ${fontWeights.normal};
  margin: 0;
`;
