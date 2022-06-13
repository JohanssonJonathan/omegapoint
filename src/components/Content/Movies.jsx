import React from 'react';
import styled from '@emotion/styled';
import { DefaultImg, Flex, FlexColumn, H2, H3 } from '../styledComponents';
import { colors, fontSizes } from '../../util/styleGuide';

const Wrapper = styled(Flex)`
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const Info = styled(FlexColumn)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(171, 68, 68, 0.6);
  justify-content: flex-end;
  align-items: center;
  color: ${colors.white[0]};
  z-index: 2;
  opacity: 0;
  text-align: center;
  transition: opacity 0.2s ease-in;

  &:hover {
    opacity: 1;
  }
`;

const Title = styled(H2)`
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 3px 10px ${colors.black[0]};
  width: 100%;
  color: ${colors.white[0]};
  padding: 20px 0;
`;

const Release = styled(H3)`
  background-color: ${colors.red[1]};    
  color: ${colors.white[0]};
  width: 100%;
  padding: 10px 0;
`;

const AnchorTag = styled('a')`
  cursor: pointer;
  background-color: ${colors.red[1]};    
  width: 100%;
  margin: 0;
  font-size: ${fontSizes.small};
  padding-top: 10px;
  padding-bottom: 10px;
  color: ${colors.black[0]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Img = styled(DefaultImg)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Item = styled('div')`
  position: relative;
  padding-bottom: 134%;
  margin: 10px;
  width: 100%;
  box-shadow: 0px 1px 9px rgb(0 0 0 / 70%);

  @media only screen and (min-width: 400px) {
    padding-bottom: 63.5%;
    width: 45%;
  }

  @media only screen and (min-width: 850px) {
    padding-bottom: 42.5%;
    width: 30%;
  }
`;

const Movies = ({ movies }) => (
  <Wrapper>
    {movies.map(({ Poster, imdbID, Title: title, Year }) => (
      <Item key={imdbID}>
        <Info>
          <Title>{title}</Title>
          <Release>Release: {Year}</Release>
          <AnchorTag
            target="_blank"
            href={`https://www.imdb.com/title/${imdbID}`}
          >
            IMDB
          </AnchorTag>
        </Info>
        <Img src={Poster} />
      </Item>
    ))}
  </Wrapper>
);

export default Movies;
