import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import { screen, act, waitFor, configure } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// configure({ asyncUtilTimeout: 5000 } );

jest.setTimeout();
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
      if (i % 2 === 0) {
        const correctButton = await screen.findByTestId('correct-answer');
        userEvent.click(correctButton);
        const nextButton = await screen.findByRole('button', { name: 'Next'})
        userEvent.click(nextButton);
      } else if (i % 2 !== 0) {
        const wrongButton = await screen.findByTestId('wrong-answer-0');
        userEvent.click(wrongButton);
        const nextButton = await screen.findByRole('button', { name: 'Next'})
        userEvent.click(nextButton);
      }
    }
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
  })
  it('Testa se o cabeçalho existe', async () => {
    renderWithRouterAndRedux(<App/>)

    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(nameInput, 'Cassandra');
    userEvent.type(emailInput, 'cassandra@email.com');
    const playButton = screen.getByRole('button', { name: 'Play'});
    userEvent.click(playButton);

    await waitFor(() => screen.getByText('30'));

    const headerImage = screen.getByTestId('header-profile-picture');
    const headerName = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');
    
    expect(headerImage).toBeVisible();
    expect(headerName).toBeVisible();
    expect(headerScore).toBeVisible();
  })
});

