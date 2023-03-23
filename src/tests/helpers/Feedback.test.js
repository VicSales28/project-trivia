import Feedback from "../../pages/Feedback";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux"
import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import App from "../../App";

describe('Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  it('testa a tela de feedback e a rota para ranking', () => {
    const { history } = renderWithRouterAndRedux(<App /> , {name: 'Cassandra', assertions: 1, score: 33, gravatarEmail: 'cassandra@email.com'}, '/feedback');

    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackText = screen.getByTestId('feedback-text');
    const playAgainButton = screen.getByTestId('btn-play-again');
    
    expect(totalScore).toBeVisible()
    expect(totalQuestion).toBeVisible();
    expect(feedbackText).toBeVisible()

    userEvent.click(playAgainButton);
    waitFor(() => screen.findByTestId('input-player-name'))
    const { pathname } = history.location;
    expect(pathname).toBe('/')

  })
  it('testa a rota para Home', () => {
    const { history } = renderWithRouterAndRedux(<App /> , {name: 'Cassandra', assertions: 1, score: 33, gravatarEmail: 'cassandra@email.com'}, '/feedback');

    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);
    waitFor(() => screen.findByTestId('ranking-title'));
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  })
})