import Ranking from "../../pages/Ranking"
import renderWithRouterAndRedux from "./renderWithRouterAndRedux"
import { screen, act, waitFor, configure } from '@testing-library/react';
import React from 'react';

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () =>{
  it('Testa a tela de ranking', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />, {name: 'Cassandra', assertions: 1, score: 33, gravatarEmail: 'cassandra@email.com'} );

    const rankingHeader = screen.getByRole('heading', {name: 'Ranking'})
    const homeButton = screen.getByRole('button');

    expect(rankingHeader).toBeVisible()
  }) 
})
