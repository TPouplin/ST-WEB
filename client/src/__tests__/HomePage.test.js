import React from 'react'
import renderer from 'react-test-renderer';
import HomePage from '../components/HomePage';
import {NewMoviePage} from '../components/NewMoviePage';
describe('NewMoviePage renders correctly', () => {
    it('renders correctly', () => {
     
      const rendered = renderer.create(
        <NewMoviePage/>
      );
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
  