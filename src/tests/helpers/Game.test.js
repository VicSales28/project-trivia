import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import { screen, act, waitFor, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

configure({ asyncUtilTimeout: 5000 } );

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {
  it('Testa se indo para a rota "/game" sem login o usuário é redirecionado para efetuar o login', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
    act(() => {
      history.push('/game')
    })

    await waitFor(() => screen.getByRole('button', { name: 'Configurações'}));

    const { pathname } = history.location;
    expect(pathname).toBe('/')
  })
  it('Faz login e responde a cinco perguntas', async () => {
    const { history } = renderWithRouterAndRedux(<App />)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(nameInput, 'Cassandra');
    userEvent.type(emailInput, 'cassandra@email.com');
    const playButton = screen.getByRole('button', { name: 'Play'});
    userEvent.click(playButton);

    await waitFor(() => screen.getByText('30'));
    await waitFor(() => screen.findByTestId('question-category'));
    
    const { pathname } = history.location;
    expect(pathname).toBe('/game')


    for (let i = 0; i < 5; i++) {
      const correctButton = screen.getByTestId('correct-answer');
      const wrongButton = screen.getByTestId(`wrong-answer-0`);
      
      if (i % 2 === 0) {
        userEvent.click(correctButton);
        const nextButton = screen.getByRole('button', { name: 'Next'})
        userEvent.click(nextButton);
      } else {
        userEvent.click(wrongButton);
        const nextButton = screen.getByRole('button', { name: 'Next'})
        userEvent.click(nextButton);
      }
    }

    //Fazer expect de path quando o feedback existir

  })
  it.skip('Testa se depois de 30 segundos os botões ficam desabilitados', async () => {
    
    renderWithRouterAndRedux(<App />)
    
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(nameInput, 'Cassandra');
    userEvent.type(emailInput, 'cassandra@email.com');
    const playButton = screen.getByRole('button', { name: 'Play'});
    userEvent.click(playButton);
    
    await waitFor(() => screen.findByTestId('question-category'));
    
    const correctButton = screen.getByTestId('correct-answer');
    
    jest.useFakeTimers();
    jest.advanceTimersByTime(31000);
    expect(correctButton).toBeDisabled();
  })
});
