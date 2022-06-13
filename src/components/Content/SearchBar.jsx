import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';
import { FlexColumn, Flex, DefaultImg } from '../styledComponents';
import Sort from './Sort';
import popcorn from '../../icons/popcorn-svgrepo-com.svg';
import { colors, fontSizes } from '../../util/styleGuide';

const Wrapper = styled(FlexColumn)`
  height: 100vh;
  justify-content: center;
  align-items: center;
  transition: height ${({ timeout }) => `${timeout}ms`} ease-in;
  min-height: 150px;

  &.entered {
    height: 40vh;

    @media only screen and (min-width: 500px) {
      height: 30vh;
    }
  }
`;

const Search = styled(Flex)`
  width: 95%;

  @media only screen and (min-width: 700px) {
    width: 40%;
  }
`;

const Img = styled(DefaultImg)`
  margin-bottom: 60px;
  width: 200px;
  padding: 40px;
  transition: width ${({ timeout }) => `${timeout}ms`} ease-in;

  &.entered {
    width: 100px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

const Input = styled('input')`
  flex: 2;
  font-size: ${fontSizes.big};
  padding: 5px;
  text-decoration: none;
  border-width: 0 0 3px;
  border-color: ${colors.red[0]};
  color: ${colors.gray[1]};
  text-align: center;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: ${fontSizes.big};
    line-height: 20px;
    color: ${({ status }) => {
      if (status === 'error') {
        return colors.red[0];
      }

      if (status === 'success') {
        return colors.green[0];
      }

      return colors.gray[0];
    }};
  }
`;

const Button = styled('button')`
  border: 0;
  width: 0;
  padding: 0;
  flex: 0;
  cursor: pointer;
  transition-property: flex-grow color;
  transition-duration: 0.2s;
  transition-timing-funciton: ease-in;
  transition-delay: 0 0.1s;
  background-color: ${colors.red[0]};
  color: ${colors.white[0]};
  font-size: 0;

  &.entered {
    color: ${colors.white[0]};
    font-size: ${fontSizes.small};
    flex-grow: 1;
  }
`;

const SearchBar = ({ getMovies, movies, updateExistingMovies }) => {
  const inputField = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [sortState, setSortState] = useState('');
  const [placeholder, setPlaceholder] = useState({
    status: null,
    message: 'Search for movies',
  });

  const findEnterKey = (event) =>
    event.key === 'Enter' && inputValue && triggerSearch();

  const updatePlaceHolder = (status, message) => {
    setPlaceholder({
      status,
      message,
    });
    setTimeout(
      () =>
        setPlaceholder({
          status: null,
          message: 'Search for movies',
        }),
      2000
    );
  };

  const triggerSearch = () => {
    getMovies(inputValue)
      .then((amount) =>
        updatePlaceHolder(
          'success',
          `Searched for ${inputValue}, found ${amount} movies`
        )
      )
      .then(() => setSortState(''))
      .catch((message) => updatePlaceHolder('error', message));

    setInputValue('');
  };

  useEffect(() => {
    inputField.current.focus();
  }, []);

  const timeout = 300;

  return (
    <Transition in={Boolean(movies.length)} timeout={timeout}>
      {(wrapperState) => (
        <Wrapper className={wrapperState} timeout={timeout}>
          <Img src={popcorn} className={wrapperState} timeout={timeout} />
          <Search>
            <Input
              status={placeholder.status}
              ref={inputField}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={placeholder.message}
              onKeyDown={findEnterKey}
            />
            <Button className={inputValue && 'entered'} onClick={triggerSearch}>
              {inputValue ? 'Search' : ''}
            </Button>
          </Search>
          {movies.length ? (
            <Sort
              updateExistingMovies={updateExistingMovies}
              movies={movies}
              sortState={sortState}
              setSortState={setSortState}
            />
          ) : null}
        </Wrapper>
      )}
    </Transition>
  );
};

export default SearchBar;
