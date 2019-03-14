import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

Enzyme.configure({
    adapter: new Adapter(),
});

global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
global.currentQuarterId = '2194';