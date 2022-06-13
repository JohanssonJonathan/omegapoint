import React from 'react';
import styled from '@emotion/styled';
import { Flex, H4 } from '../styledComponents';
import { colors, fontWeights } from '../../util/styleGuide';

const Wrapper = styled(Flex)`
  font-weight: ${fontWeights.normal} ;
  text-align: center;
  width: 95%;
  justify-content: space-evenly;
  padding: 20px 0;

  @media only screen and (min-width: 700px) {
    width: 40%;
  }
`;

const Selection = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const Order = styled(H4)`
  cursor: pointer;
  color: ${colors.gray[1]};

  ${({ active }) => {
    if (active) {
      return `
    color: ${colors.red[0]};
    font-weight: ${fontWeights.bold};
	  `;
    }
    return `
	  color: ${colors.gray[0]};
	`;
  }}

  &:last-child {
    margin-left: 20px;
  }
`;

const Description = styled(Order)`
  border-width: 0 3px;
  border-color: ${colors.red[0]};
  border-style: solid;
  padding 0 20px;
`;

const Sort = ({ updateExistingMovies, movies, sortState, setSortState }) => {
  const sortMovies = (type) => {
    // We only need to add the initial movies once every new search
    if (!sortState) {
      window.localStorage.setItem('movies', JSON.stringify(movies));
    }

    const sorted = movies.sort((a, b) => {
      const convertToNumber = (value) => Number(value[type].match(/[0-9]+/)[0]);

      a = type === 'Year' ? convertToNumber(a) : a[type].toLowerCase();
      b = type === 'Year' ? convertToNumber(b) : b[type].toLowerCase();

      return a < b ? -1 : b < a ? 1 : 0;
    });

    updateExistingMovies(() =>
      type === sortState
        ? [...JSON.parse(window.localStorage.getItem('movies'))]
        : [...sorted]
    );
    setSortState((state) => (state === type ? '' : type));
  };

  return (
    <Wrapper>
      <Description>Sort By</Description>
      <Selection>
        <Order
          active={sortState === 'Title'}
          onClick={() => sortMovies('Title')}
        >
          Alphabetic
        </Order>
        <Order
          active={sortState === 'Year'}
          onClick={() => sortMovies('Year')}
        >
          Release
        </Order>
      </Selection>
    </Wrapper>
  );
};

export default Sort;
