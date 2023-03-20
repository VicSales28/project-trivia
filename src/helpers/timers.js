const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;

export const timer = setInterval(() => {
  this.setState((prevState) => ({
    countdown: prevState.countdown - 1,
  }));
}, ONE_SECOND);

export const timeout = setTimeout(() => {
  clearInterval(timer);
  this.setState({
    isDisabled: true,
  });
}, THIRTY_SECONDS);
