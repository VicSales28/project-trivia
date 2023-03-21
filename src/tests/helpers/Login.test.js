import App from '../../App';
import Login from '../../pages/Login';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Requisito 4 - Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  test('Teste se os componentes para nome e email no input são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se existe 2 botões e 2 inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId("input-player-name");
    userEvent.type(name, 'test');
    userEvent.clear(name);
    userEvent.type(name, 'test');
    expect(name).toBeInTheDocument();
    const email = screen.getByTestId("input-gravatar-email");
    userEvent.type(email, 'test');
    userEvent.clear(email);
    userEvent.type(email, 'test');
    expect(email).toBeInTheDocument();
    const btn = screen.getAllByRole('button');
    expect(btn).toHaveLength(2);
    const play = screen.getByRole('button', { name: 'Play' });
    expect(play).toBeInTheDocument(); 
    // expect(play).toBeDisabled();
    // expect(play).not.toBeDisabled();
    const config = screen.getByRole('button', { name: 'Configurações' });
    expect(config).toBeInTheDocument();
    expect(config).not.toBeDisabled();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'logo');
    expect(img).toHaveAttribute('src', 'trivia.png');
  });
  test('Teste no botão Configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonConf = screen.getByRole('button', { name: 'Configurações'});
    userEvent.click(buttonConf);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
    const title = screen.getByTestId('settings-title');
    await waitFor(() => expect(title).toBeInTheDocument());
  });
  test('Teste no botão Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'test');
    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, 'test');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledTimes(1));
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});