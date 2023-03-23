import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import { screen, act, waitFor, configure, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import timeOut from '../../pages/Game';

// configure({ asyncUtilTimeout: 5000 } );

// jest.useFakeTimers();
jest.setTimeout(40000)
describe('Teste de timeOut', () => {
    it('Testa se depois de 30 segundos os botões ficam desabilitados', async () => {
      renderWithRouterAndRedux(<App />)
      
      const nameInput = screen.getByTestId('input-player-name');
      const emailInput = screen.getByTestId('input-gravatar-email');
      userEvent.type(nameInput, 'Cassandra');
      userEvent.type(emailInput, 'cassandra@email.com');
      const playButton = screen.getByRole('button', { name: 'Play'});
      userEvent.click(playButton);
      

      await waitFor(() => {
        // const counter = screen.getByTestId('countdown');
        // console.log(counter.textContent)
        // expect(counter.textContent).toBe(0)

        const correctButton = screen.getByTestId('correct-answer');
        expect(correctButton).toBeDisabled();
      }, { timeout: 34000})

    //   await waitFor(() => screen.getByTestId('correct-answer'));
      
    //   const correctButton = screen.getByTestId('correct-answer');
  
      // waitFor(() => expect(screen.findByTestI('correct-answer'), {}, {timeOut: 35000 }).toBeDisabled());
    //   expect(correctButton).toBeDisabled();
    })
  });